/**
 * Simple Shop Logic for Tamash Practice Site
 * Handles Products, Cart, and basic UI interactions.
 * Replaces complex modular system for robustness.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Shop JS Loaded');
    initApp();
});

function initApp() {
    updateCartCount();

    // Check which page we are on
    const path = window.location.pathname;

    if (path.includes('ecommerce/') || path.endsWith('/ecommerce') || path.includes('products.html')) {
        initProductsPage();
    } else if (path.includes('cart.html') || path.endsWith('/cart')) {
        initCartPage();
    } else if (path.includes('index.html') || path.endsWith('/') || path.endsWith('testweb')) {
        initHomePage();
    }
}

// Global State
const state = {
    cart: JSON.parse(localStorage.getItem('tamash_cart')) || []
};

// --- Data Handling ---
function getProducts() {
    if (window.MOCK_DATA && window.MOCK_DATA.products) {
        return window.MOCK_DATA.products;
    }
    console.error('MOCK_DATA not found!');
    return [];
}

// --- Home Page Logic ---
function initHomePage() {
    console.log('Initializing Home Page');
    const container = document.getElementById('featured-products');
    if (!container) return;

    const products = getProducts().slice(0, 4); // Just show first 4 as featured
    renderProductGrid(container, products);
}

// --- Products Page Logic ---
function initProductsPage() {
    console.log('Initializing Products Page');
    const container = document.getElementById('products-list');
    if (!container) return;

    let products = getProducts();

    // Check URL Params for filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        products = products.filter(p => p.category === categoryParam);
        // Update radio button
        const radio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (radio) radio.checked = true;
    }

    renderProductGrid(container, products);

    // Setup Filters
    const radios = document.querySelectorAll('input[name="category"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const cat = e.target.value;
            let filtered = getProducts();
            if (cat !== 'all') {
                filtered = filtered.filter(p => p.category === cat);
            }
            renderProductGrid(container, filtered);
        });
    });

    // Setup Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortVal = e.target.value;
            let currentProducts = getProducts(); // Should filter properly, but simplifying for now
            // Re-apply current category filter
            const activeCat = document.querySelector('input[name="category"]:checked')?.value || 'all';
            if (activeCat !== 'all') {
                currentProducts = currentProducts.filter(p => p.category === activeCat);
            }

            if (sortVal === 'price-low') {
                currentProducts.sort((a, b) => a.price - b.price);
            } else if (sortVal === 'price-high') {
                currentProducts.sort((a, b) => b.price - a.price);
            }

            renderProductGrid(container, currentProducts);
        });
    }
}

// --- Rendering Helper ---
function renderProductGrid(container, products) {
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => { /* Redirect to detail? For now just alert or nothing */ };

        card.innerHTML = `
            <div style="height: 200px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                ${product.image || '📦'}
            </div>
            <div style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">${product.category}</span>
                    <span style="font-weight: 600; color: var(--primary-color);">$${product.price}</span>
                </div>
                <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${product.name}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.4;">
                    ${product.description ? product.description.substring(0, 60) + '...' : ''}
                </p>
                <button class="btn btn-primary" style="width: 100%;" onclick="addToCart(${product.id}, event)">
                    Add to Cart
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Cart Logic ---
window.addToCart = function (productId, event) {
    if (event) event.stopPropagation(); // Prevent card click

    const product = getProducts().find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    alert(`Added ${product.name} to cart!`);
};

function saveCart() {
    localStorage.setItem('tamash_cart', JSON.stringify(state.cart));
}

function updateCartCount() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

function initCartPage() {
    // Basic cart rendering if we were to implement cart.html fully
    console.log('Cart page init');
}
