#!/usr/bin/env python3
"""
Shopify Product CLI Tool - Python Version
Adds products to your Shopify store using Admin API
"""

import requests
import json
import os
import sys
from typing import Dict, Any

# Configuration
CONFIG = {
    'CLIENT_ID': 'e05bf1f0bc0a2bf0b95d7c9a270293dd',
    'CLIENT_SECRET': '76405d5c17ca4e637a32583091ed0a1f',
    'SHOP_DOMAIN': '1cc9bq-ci.myshopify.com',
    'API_VERSION': '2023-10'
}

# Product data for Brie cheese
BRIE_PRODUCT = {
    "product": {
        "title": "Artisanal Brie Cheese",
        "body_html": "<p>Premium French brie cheese crafted with traditional methods. Creamy texture with a rich, buttery flavor that pairs perfectly with wine and crackers.</p>",
        "vendor": "Brie",
        "product_type": "Cheese",
        "status": "active",
        "published": True,
        "tags": "cheese, brie, artisanal, french, premium",
        "variants": [{
            "price": "20.00",
            "inventory_quantity": 1000,
            "inventory_management": "shopify",
            "inventory_policy": "deny",
            "fulfillment_service": "manual",
            "requires_shipping": True,
            "taxable": True,
            "weight": 0.25,
            "weight_unit": "kg"
        }]
    }
}

def get_access_token() -> str:
    """Get access token from environment variable"""
    token = os.getenv('SHOPIFY_ACCESS_TOKEN')
    
    if not token:
        print("\n⚠️  IMPORTANT: This script requires a proper access token.")
        print("Please follow these steps to get your access token:")
        print("1. Go to your Shopify Admin: https://1cc9bq-ci.myshopify.com/admin")
        print("2. Navigate to Apps > App and sales channel settings")
        print("3. Click 'Develop apps' > 'Create an app'")
        print("4. Configure Admin API access scopes: write_products, read_products")
        print("5. Install the app and copy the Admin API access token")
        print("6. Set the token as environment variable:")
        print("   export SHOPIFY_ACCESS_TOKEN=\"your_access_token_here\"")
        raise ValueError("SHOPIFY_ACCESS_TOKEN environment variable not set")
    
    return token

def make_api_request(endpoint: str, method: str = 'GET', data: Dict = None, access_token: str = None) -> Dict[str, Any]:
    """Make API request to Shopify"""
    url = f"https://{CONFIG['SHOP_DOMAIN']}/admin/api/{CONFIG['API_VERSION']}/{endpoint}"
    
    headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': access_token
    }
    
    try:
        if method.upper() == 'POST':
            response = requests.post(url, headers=headers, json=data)
        elif method.upper() == 'GET':
            response = requests.get(url, headers=headers)
        else:
            raise ValueError(f"Unsupported HTTP method: {method}")
        
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.RequestException as e:
        if hasattr(e, 'response') and e.response is not None:
            try:
                error_data = e.response.json()
                error_msg = f"API Error {e.response.status_code}: {json.dumps(error_data)}"
            except:
                error_msg = f"API Error {e.response.status_code}: {e.response.text}"
        else:
            error_msg = f"Request failed: {str(e)}"
        
        raise Exception(error_msg)

def add_brie_product():
    """Add Brie product to store"""
    try:
        print("🧀 Adding Artisanal Brie Cheese to your store...")
        
        # Get access token
        access_token = get_access_token()
        print("✅ Access token obtained")
        
        # Create the product
        result = make_api_request('products.json', 'POST', BRIE_PRODUCT, access_token)
        
        product = result['product']
        variant = product['variants'][0]
        
        print("\n🎉 SUCCESS! Brie product added to your store:")
        print(f"📦 Product ID: {product['id']}")
        print(f"🏷️  Title: {product['title']}")
        print(f"💰 Price: ${variant['price']}")
        print(f"📊 Inventory: {variant['inventory_quantity']} units")
        print(f"🔗 Admin URL: https://{CONFIG['SHOP_DOMAIN']}/admin/products/{product['id']}")
        print(f"🌐 Storefront URL: https://{CONFIG['SHOP_DOMAIN']}/products/{product['handle']}")
        
        return result
        
    except Exception as e:
        print(f"\n❌ Error adding product: {e}")
        
        if "SHOPIFY_ACCESS_TOKEN" in str(e):
            print("\n💡 Quick setup guide:")
            print("1. Create a private app in your Shopify admin")
            print("2. Enable Admin API access with write_products scope")
            print("3. Copy the access token and run:")
            print("   export SHOPIFY_ACCESS_TOKEN=\"your_access_token_here\"")
            print("4. Run this script again: python add-product.py")
        
        sys.exit(1)

def list_products():
    """List existing products"""
    try:
        access_token = get_access_token()
        result = make_api_request('products.json?limit=10', 'GET', access_token=access_token)
        
        print("\n📋 Current products in your store:")
        for i, product in enumerate(result['products'], 1):
            price = product['variants'][0]['price'] if product['variants'] else 'N/A'
            print(f"{i}. {product['title']} - ${price}")
            
    except Exception as e:
        print(f"❌ Error listing products: {e}")

def show_help():
    """Show help information"""
    print("🛍️  Shopify Product CLI Tool - Python Version")
    print("============================")
    print("\nAvailable commands:")
    print("  python add-product.py add      - Add Brie cheese product")
    print("  python add-product.py list     - List existing products")
    print("  python add-product.py help     - Show this help message")
    print("\nSetup:")
    print("  export SHOPIFY_ACCESS_TOKEN=\"your_access_token_here\"")

def main():
    """Main CLI function"""
    if len(sys.argv) < 2:
        show_help()
        return
    
    command = sys.argv[1].lower()
    
    print("🛍️  Shopify Product CLI Tool - Python Version")
    print("============================")
    
    if command in ['add', 'add-brie']:
        add_brie_product()
    elif command == 'list':
        list_products()
    elif command == 'help':
        show_help()
    else:
        print(f"❌ Unknown command: {command}")
        show_help()

if __name__ == '__main__':
    main()