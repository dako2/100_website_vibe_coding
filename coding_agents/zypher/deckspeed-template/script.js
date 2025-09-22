// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 149.99,
        originalPrice: 199.99,
        category: "electronics",
        rating: 4.5,
        reviews: 234,
        discount: "25% OFF",
        image: null,
        featured: true
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable, sustainable organic cotton t-shirt available in multiple colors.",
        price: 29.99,
        originalPrice: null,
        category: "fashion",
        rating: 4.2,
        reviews: 89,
        discount: null,
        image: null,
        featured: true
    },
    {
        id: 3,
        name: "Smart Home Security Camera",
        description: "HD 1080p security camera with night vision, motion detection, and mobile app control.",
        price: 89.99,
        originalPrice: 119.99,
        category: "electronics",
        rating: 4.7,
        reviews: 456,
        discount: "25% OFF",
        image: null,
        featured: true
    },
    {
        id: 4,
        name: "Yoga Mat with Alignment Lines",
        description: "Premium non-slip yoga mat with alignment guides for perfect pose positioning.",
        price: 39.99,
        originalPrice: null,
        category: "sports",
        rating: 4.6,
        reviews: 123,
        discount: null,
        image: null,
        featured: true
    },
    {
        id: 5,
        name: "Ceramic Coffee Mug Set",
        description: "Set of 4 handcrafted ceramic mugs perfect for your morning coffee routine.",
        price: 24.99,
        originalPrice: 34.99,
        category: "home",
        rating: 4.3,
        reviews: 67,
        discount: "29% OFF",
        image: null,
        featured: true
    },
    {
        id: 6,
        name: "JavaScript Programming Book",
        description: "Complete guide to modern JavaScript programming with practical examples and projects.",
        price: 45.99,
        originalPrice: null,
        category: "books",
        rating: 4.8,
        reviews: 312,
        discount: null,
        image: null,
        featured: true
    },
    {
        id: 7,
        name: "Natural Face Moisturizer",
        description: "Hydrating face moisturizer with natural ingredients suitable for all skin types.",
        price: 32.99,
        originalPrice: 42.99,
        category: "beauty",
        rating: 4.4,
        reviews: 156,
        discount: "23% OFF",
        image: null,
        featured: true
    },
    {
        id: 8,
        name: "Wireless Phone Charger",
        description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
        price: 34.99,
        originalPrice: null,
        category: "electronics",
        rating: 4.1,
        reviews: 98,
        discount: null,
        image: null,
        featured: true
    },
    {
        id: 9,
        name: "Designer Sunglasses",
        description: "Stylish UV protection sunglasses with polarized lenses and durable frame.",
        price: 79.99,
        originalPrice: 99.99,
        category: "fashion",
        rating: 4.3,
        reviews: 201,
        discount: "20% OFF",
        image: null,
        featured: false
    },
    {
        id: 10,
        name: "Indoor Plant Collection",
        description: "Set of 3 air-purifying indoor plants with decorative pots included.",
        price: 49.99,
        originalPrice: null,
        category: "home",
        rating: 4.5,
        reviews: 87,
        discount: null,
        image: null,
        featured: false
    },
    {
        id: 11,
        name: "Resistance Bands Set",
        description: "Complete set of resistance bands with different strength levels for home workouts.",
        price: 19.99,
        originalPrice: 29.99,
        category: "sports",
        rating: 4.2,
        reviews: 134,
        discount: "33% OFF",
        image: null,
        featured: false
    },
    {
        id: 12,
        name: "Cookbook Collection",
        description: "Set of 3 bestselling cookbooks featuring international cuisine and healthy recipes.",
        price: 59.99,
        originalPrice: null,
        category: "books",
        rating: 4.6,
        reviews: 78,
        discount: null,
        image: null,
        featured: false
    }
];

// Application state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentProducts = [...products];
let displayedProducts = 8;

// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');
const notification = document.getElementById('notification');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartShipping = document.getElementById('cartShipping');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Cart sidebar
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    overlay.addEventListener('click', closeCartSidebar);
    
    // Filters
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // Search
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Modal
    closeModal.addEventListener('click', closeProductModal);
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            applyFilters();
            scrollToSection('products');
        });
    });
    
    // Newsletter
    document.querySelector('.subscribe-btn').addEventListener('click', handleNewsletterSubscription);
    
    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Product rendering
function renderProducts() {
    const productsToShow = currentProducts.slice(0, displayedProducts);
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image" onclick="openProductModal(${product.id})">
                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : '<i class="fas fa-image"></i>'}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <div>
                        <span class="price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    </div>
                    ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Add to Cart
                    </button>
                    <button class="btn-wishlist ${wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Show/hide load more button
    loadMoreBtn.style.display = currentProducts.length > displayedProducts ? 'block' : 'none';
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star star"></i>';
    }
    
    if (halfStar) {
        starsHtml += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star star empty"></i>';
    }
    
    return starsHtml;
}

// Filtering and sorting
function applyFilters() {
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    
    // Filter by category
    let filtered = category ? products.filter(p => p.category === category) : [...products];
    
    // Apply search if there's a search term
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort products
    switch (sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Featured products first
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    currentProducts = filtered;
    displayedProducts = 8;
    renderProducts();
}

function handleSearch() {
    applyFilters();
}

function loadMoreProducts() {
    displayedProducts += 8;
    renderProducts();
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            renderCartItems();
        }
    }
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${item.image ? `<img src="${item.image}" alt="${item.name}">` : '<i class="fas fa-image"></i>'}
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    updateCartTotals();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartShipping.textContent = subtotal > 50 ? 'Free' : `$${shipping.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    checkoutBtn.disabled = cart.length === 0;
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Wishlist functionality
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist!');
    }
    
    saveWishlist();
    updateWishlistUI();
    renderProducts(); // Re-render to update wishlist button states
}

function updateWishlistUI() {
    wishlistCount.textContent = wishlist.length;
    wishlistCount.style.display = wishlist.length > 0 ? 'flex' : 'none';
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Modal functionality
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <div style="height: 300px; background: linear-gradient(45deg, #f3f4f6, #e5e7eb); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 12px;">` : '<i class="fas fa-image" style="font-size: 4rem; color: var(--text-secondary);"></i>'}
                </div>
            </div>
            <div>
                <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">${product.name}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">${product.description}</p>
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div class="stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span style="color: var(--text-secondary);">(${product.reviews} reviews)</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">$${product.price}</span>
                    ${product.originalPrice ? `<span style="color: var(--text-secondary); text-decoration: line-through;">$${product.originalPrice}</span>` : ''}
                    ${product.discount ? `<span style="background: var(--error-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${product.discount}</span>` : ''}
                </div>
                
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeProductModal();" style="flex: 1;">
                        <i class="fas fa-cart-plus"></i>
                        Add to Cart
                    </button>
                    <button class="btn-wishlist ${wishlist.includes(product.id) ? 'active' : ''}" onclick="toggleWishlist(${product.id})" style="width: 48px; height: 48px;">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                
                <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <h4 style="margin-bottom: 0.5rem;">Product Details</h4>
                    <ul style="color: var(--text-secondary); line-height: 1.8;">
                        <li>Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</li>
                        <li>Rating: ${product.rating}/5 stars</li>
                        <li>Reviews: ${product.reviews}</li>
                        <li>Free shipping on orders over $50</li>
                        <li>30-day return policy</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    productModal.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Cart sidebar
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Utility functions
function showNotification(message) {
    const notificationText = document.getElementById('notificationText');
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Newsletter subscription
function handleNewsletterSubscription() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address');
        return;
    }
    
    // Simulate API call
    emailInput.value = '';
    showNotification('Thank you for subscribing to our newsletter!');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Checkout
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    // Simulate checkout process
    showNotification('Redirecting to secure checkout...');
    
    setTimeout(() => {
        alert('Checkout functionality would be implemented here with payment processing');
    }, 1500);
}

// Mobile menu toggle
function toggleMobileMenu() {
    // This would be implemented for mobile navigation
    console.log('Mobile menu toggle');
}