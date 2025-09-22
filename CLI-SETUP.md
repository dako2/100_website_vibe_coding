# 🛍️ Shopify Product CLI Tool

A Node.js command-line tool to add products to your Shopify store using the Admin API.

## 🚀 Quick Start

### 1. Setup Shopify App Access

To use this CLI tool, you need to create a private app in your Shopify admin:

1. **Go to Shopify Admin**: https://1cc9bq-ci.myshopify.com/admin
2. **Navigate to Apps**: Apps → App and sales channel settings
3. **Create Private App**: Click "Develop apps" → "Create an app"
4. **Configure App**:
   - App name: "Product CLI Tool"
   - App URL: `https://localhost` (for development)
5. **Set API Scopes**:
   - Enable "Admin API access"
   - Add scopes: `write_products`, `read_products`
6. **Install App**: Click "Install app"
7. **Get Access Token**: Copy the "Admin API access token"

### 2. Set Environment Variable

```bash
# Set your access token (replace with your actual token)
export SHOPIFY_ACCESS_TOKEN="shpat_your_access_token_here"
```

### 3. Run the CLI Tool

```bash
# Add the Brie cheese product
node add-product.js add

# List existing products
node add-product.js list

# Show help
node add-product.js help
```

## 📋 Available Commands

### Add Brie Product
```bash
node add-product.js add
# or
node add-product.js add-brie
```

Adds an "Artisanal Brie Cheese" product with:
- **Price**: $20.00
- **Inventory**: 1000 units
- **Description**: Premium French brie cheese
- **Type**: Cheese
- **Vendor**: Brie

### List Products
```bash
node add-product.js list
```

Shows the first 10 products in your store.

### Help
```bash
node add-product.js help
```

Displays usage instructions.

## 🔧 Configuration

The script uses these settings (configured in the file):

```javascript
const CONFIG = {
  CLIENT_ID: 'e05bf1f0bc0a2bf0b95d7c9a270293dd',
  CLIENT_SECRET: '76405d5c17ca4e637a32583091ed0a1f',
  SHOP_DOMAIN: '1cc9bq-ci.myshopify.com',
  API_VERSION: '2023-10'
};
```

## 📦 Product Details

The Brie product will be created with these specifications:

```json
{
  "title": "Artisanal Brie Cheese",
  "price": "20.00",
  "inventory_quantity": 1000,
  "vendor": "Brie",
  "product_type": "Cheese",
  "description": "Premium French brie cheese crafted with traditional methods...",
  "tags": "cheese, brie, artisanal, french, premium",
  "weight": 0.25,
  "weight_unit": "kg"
}
```

## ✅ Success Output

When successful, you'll see:

```
🧀 Adding Artisanal Brie Cheese to your store...
✅ Access token obtained

🎉 SUCCESS! Brie product added to your store:
📦 Product ID: 1234567890
🏷️  Title: Artisanal Brie Cheese
💰 Price: $20.00
📊 Inventory: 1000 units
🔗 Admin URL: https://1cc9bq-ci.myshopify.com/admin/products/1234567890
🌐 Storefront URL: https://1cc9bq-ci.myshopify.com/products/artisanal-brie-cheese
```

## 🚨 Troubleshooting

### Error: "SHOPIFY_ACCESS_TOKEN environment variable not set"

**Solution**: Set your access token:
```bash
export SHOPIFY_ACCESS_TOKEN="shpat_your_actual_token_here"
```

### Error: "API Error 401: Unauthorized"

**Possible causes**:
- Invalid access token
- App doesn't have required permissions
- Token expired

**Solution**: 
1. Verify your access token is correct
2. Check app has `write_products` scope
3. Regenerate token if needed

### Error: "API Error 422: Unprocessable Entity"

**Possible causes**:
- Product with same title already exists
- Invalid product data

**Solution**:
1. Check if product already exists
2. Modify product title in the script

## 🔒 Security Best Practices

1. **Never commit access tokens** to version control
2. **Use environment variables** for sensitive data
3. **Limit API scopes** to only what's needed
4. **Rotate tokens regularly**
5. **Monitor API usage** in Shopify admin

## 🛠️ Customization

To add different products, modify the `BRIE_PRODUCT` object in `add-product.js`:

```javascript
const YOUR_PRODUCT = {
  product: {
    title: 'Your Product Name',
    body_html: '<p>Your product description</p>',
    vendor: 'Your Brand',
    product_type: 'Your Category',
    variants: [{
      price: '25.00',
      inventory_quantity: 500,
      // ... other variant properties
    }]
  }
};
```

## 📚 API Documentation

- [Shopify Admin API](https://shopify.dev/docs/api/admin-rest)
- [Products API](https://shopify.dev/docs/api/admin-rest/2023-10/resources/product)
- [Authentication](https://shopify.dev/docs/apps/auth)

## 🎯 Next Steps

After adding the product:

1. **Check your Hydrogen storefront**: http://localhost:3000/
2. **View in Shopify admin**: Check the product was created correctly
3. **Test the purchase flow**: Add to cart and test checkout
4. **Add product images**: Upload high-quality photos in Shopify admin
5. **Optimize SEO**: Add meta descriptions and keywords

## 💡 Tips

- The product will automatically appear on your Hydrogen storefront
- No code changes needed in your Hydrogen app
- Product URLs are auto-generated based on the title
- You can run the script multiple times (it will create duplicate products)
- Use the Shopify admin to manage products after creation

---

**Happy selling! 🧀✨**