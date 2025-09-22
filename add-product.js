#!/usr/bin/env node

/**
 * Shopify Product CLI Tool
 * Adds products to your Shopify store using Admin API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  CLIENT_ID: 'e05bf1f0bc0a2bf0b95d7c9a270293dd',
  CLIENT_SECRET: '76405d5c17ca4e637a32583091ed0a1f',
  SHOP_DOMAIN: '1cc9bq-ci.myshopify.com',
  API_VERSION: '2023-10'
};

// Product data for Brie cheese
const BRIE_PRODUCT = {
  product: {
    title: 'Artisanal Brie Cheese',
    body_html: '<p>Premium French brie cheese crafted with traditional methods. Creamy texture with a rich, buttery flavor that pairs perfectly with wine and crackers.</p>',
    vendor: 'Brie',
    product_type: 'Cheese',
    status: 'active',
    published: true,
    tags: 'cheese, brie, artisanal, french, premium',
    variants: [{
      price: '20.00',
      inventory_quantity: 1000,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      fulfillment_service: 'manual',
      requires_shipping: true,
      taxable: true,
      weight: 0.25,
      weight_unit: 'kg'
    }]
  }
};

/**
 * Get access token using OAuth flow
 */
function getAccessToken() {
  return new Promise((resolve, reject) => {
    // For this example, we'll use a simplified approach
    // In production, you'd implement proper OAuth flow
    console.log('\n⚠️  IMPORTANT: This script requires a proper access token.');
    console.log('Please follow these steps to get your access token:');
    console.log('1. Go to your Shopify Admin: https://1cc9bq-ci.myshopify.com/admin');
    console.log('2. Navigate to Apps > App and sales channel settings');
    console.log('3. Click "Develop apps" > "Create an app"');
    console.log('4. Configure Admin API access scopes: write_products, read_products');
    console.log('5. Install the app and copy the Admin API access token');
    console.log('6. Set the token as environment variable: export SHOPIFY_ACCESS_TOKEN="your_token_here"');
    
    const token = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!token) {
      reject(new Error('SHOPIFY_ACCESS_TOKEN environment variable not set'));
    } else {
      resolve(token);
    }
  });
}

/**
 * Make API request to Shopify
 */
function makeApiRequest(endpoint, method, data, accessToken) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: CONFIG.SHOP_DOMAIN,
      port: 443,
      path: `/admin/api/${CONFIG.API_VERSION}/${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      }
    };
    
    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }
    
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsedData);
          } else {
            reject(new Error(`API Error ${res.statusCode}: ${JSON.stringify(parsedData)}`));
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

/**
 * Add Brie product to store
 */
async function addBrieProduct() {
  try {
    console.log('🧀 Adding Artisanal Brie Cheese to your store...');
    
    // Get access token
    const accessToken = await getAccessToken();
    console.log('✅ Access token obtained');
    
    // Create the product
    const result = await makeApiRequest('products.json', 'POST', BRIE_PRODUCT, accessToken);
    
    console.log('\n🎉 SUCCESS! Brie product added to your store:');
    console.log(`📦 Product ID: ${result.product.id}`);
    console.log(`🏷️  Title: ${result.product.title}`);
    console.log(`💰 Price: $${result.product.variants[0].price}`);
    console.log(`📊 Inventory: ${result.product.variants[0].inventory_quantity} units`);
    console.log(`🔗 Admin URL: https://${CONFIG.SHOP_DOMAIN}/admin/products/${result.product.id}`);
    console.log(`🌐 Storefront URL: https://${CONFIG.SHOP_DOMAIN}/products/${result.product.handle}`);
    
    return result;
    
  } catch (error) {
    console.error('\n❌ Error adding product:', error.message);
    
    if (error.message.includes('SHOPIFY_ACCESS_TOKEN')) {
      console.log('\n💡 Quick setup guide:');
      console.log('1. Create a private app in your Shopify admin');
      console.log('2. Enable Admin API access with write_products scope');
      console.log('3. Copy the access token and run:');
      console.log('   export SHOPIFY_ACCESS_TOKEN="your_access_token_here"');
      console.log('4. Run this script again: node add-product.js');
    }
    
    process.exit(1);
  }
}

/**
 * List existing products (optional feature)
 */
async function listProducts() {
  try {
    const accessToken = await getAccessToken();
    const result = await makeApiRequest('products.json?limit=10', 'GET', null, accessToken);
    
    console.log('\n📋 Current products in your store:');
    result.products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.variants[0]?.price || 'N/A'}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing products:', error.message);
  }
}

/**
 * Main CLI function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🛍️  Shopify Product CLI Tool');
  console.log('============================');
  
  switch (command) {
    case 'add':
    case 'add-brie':
      addBrieProduct();
      break;
      
    case 'list':
      listProducts();
      break;
      
    case 'help':
    case '--help':
    case '-h':
    default:
      console.log('\n📖 Usage:');
      console.log('  node add-product.js add      # Add Brie cheese product');
      console.log('  node add-product.js list     # List existing products');
      console.log('  node add-product.js help     # Show this help');
      console.log('\n🔧 Setup:');
      console.log('  1. Set your access token: export SHOPIFY_ACCESS_TOKEN="your_token"');
      console.log('  2. Run the script: node add-product.js add');
      console.log('\n📚 More info: https://shopify.dev/docs/api/admin-rest');
      break;
  }
}

// Run the CLI
if (require.main === module) {
  main();
}

module.exports = { addBrieProduct, listProducts };