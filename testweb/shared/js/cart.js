// Cart page functionality

class CartPage {
    constructor() {
        this.init();
    }

    init() {
        this.loadCart();
        this.setupEventListeners();
    }

    loadCart() {
        const cartItems = window.app.cart;
        this.renderCart(cartItems);
        this.updateSummary(cartItems);
        this.toggleEmptyCart(cartItems.length === 0);
    }

    renderCart(cartItems) {
        const container = document.getElementById('cart-items');
        const loading = document.getElementById('cart-loading');

        if (!container) return;

        // Hide loading
        if (loading) loading.style.display = 'none';

        if (cartItems.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = '';

        cartItems.forEach((item, index) => {
            const cartItem = this.createCartItem(item, index);
            container.appendChild(cartItem);
        });
    }

    createCartItem(item, index) {
        const itemElement = Utils.createElement('div', {
            className: 'cart-item',
            'data-testid': `cart-item-${item.id}`
        });

        const product = window.MOCK_DATA.products.find(p => p.id === item.id);
        if (!product) return itemElement;

        itemElement.innerHTML = `
            <div class="cart-item-image">
                <span class="product-icon">${product.image}</span>
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${product.name}</h4>
                <div class="cart-item-price">${Utils.formatPrice(product.price)}</div>
                <div class="cart-item-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span>(${product.reviews})</span>
                </div>
            </div>
            <div class="cart-item-quantity">
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-index="${index}" data-testid="decrease-qty-${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number"
                           class="quantity-input"
                           value="${item.quantity}"
                           min="1"
                           max="99"
                           data-index="${index}"
                           data-testid="quantity-input-${item.id}">
                    <button class="quantity-btn plus" data-index="${index}" data-testid="increase-qty-${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart-item-total">
                <div class="item-total-price">${Utils.formatPrice(product.price * item.quantity)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item-btn" data-index="${index}" data-testid="remove-item-${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        return itemElement;
    }

    updateSummary(cartItems) {
        const itemCount = document.getElementById('item-count');
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');

        const subtotalAmount = cartItems.reduce((sum, item) => {
            const product = window.MOCK_DATA.products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);

        const shippingAmount = subtotalAmount > 50 ? 0 : 9.99;
        const taxAmount = subtotalAmount * 0.08; // 8% tax
        const totalAmount = subtotalAmount + shippingAmount + taxAmount;

        if (itemCount) itemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (subtotal) subtotal.textContent = Utils.formatPrice(subtotalAmount);
        if (shipping) shipping.textContent = Utils.formatPrice(shippingAmount);
        if (tax) tax.textContent = Utils.formatPrice(taxAmount);
        if (total) total.textContent = Utils.formatPrice(totalAmount);
    }

    toggleEmptyCart(isEmpty) {
        const emptyCart = document.getElementById('empty-cart');
        const cartContent = document.getElementById('cart-content');

        if (emptyCart) emptyCart.classList.toggle('hidden', !isEmpty);
        if (cartContent) cartContent.classList.toggle('hidden', isEmpty);
    }

    setupEventListeners() {
        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quantity-btn')) {
                const btn = e.target.closest('.quantity-btn');
                const index = parseInt(btn.dataset.index);
                const isIncrease = btn.classList.contains('plus');

                this.updateQuantity(index, isIncrease);
            }
        });

        // Quantity input change
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const input = e.target;
                const index = parseInt(input.dataset.index);
                const quantity = parseInt(input.value);

                if (quantity > 0) {
                    this.setQuantity(index, quantity);
                } else {
                    input.value = window.app.cart[index].quantity;
                }
            }
        });

        // Remove item
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-item-btn')) {
                const btn = e.target.closest('.remove-item-btn');
                const index = parseInt(btn.dataset.index);

                this.removeItem(index);
            }
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (window.app.cart.length === 0) {
                    Utils.showToast('Your cart is empty', 'warning');
                    return;
                }

                if (!window.app.currentUser) {
                    Utils.showModal('Login Required', 'Please log in to proceed with checkout.', [
                        { text: 'Login', class: 'btn-primary', handler: () => window.location.href = 'login.html?redirect=checkout.html' },
                        { text: 'Cancel', class: 'btn-secondary', handler: () => Utils.hideModal() }
                    ]);
                    return;
                }

                window.location.href = 'checkout.html';
            });
        }

        // Continue shopping
        const continueShoppingBtn = document.getElementById('continue-shopping-btn');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                window.location.href = 'index';
            });
        }

        // Clear cart
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                Utils.showModal('Clear Cart', 'Are you sure you want to remove all items from your cart?', [
                    { text: 'Clear Cart', class: 'btn-danger', handler: () => this.clearCart() },
                    { text: 'Cancel', class: 'btn-secondary', handler: () => Utils.hideModal() }
                ]);
            });
        }

        // Promo code
        const applyPromoBtn = document.getElementById('apply-promo');
        if (applyPromoBtn) {
            applyPromoBtn.addEventListener('click', () => {
                this.applyPromoCode();
            });
        }
    }

    updateQuantity(index, isIncrease) {
        const item = window.app.cart[index];
        if (!item) return;

        const newQuantity = isIncrease ? item.quantity + 1 : Math.max(1, item.quantity - 1);

        if (newQuantity !== item.quantity) {
            this.setQuantity(index, newQuantity);
        }
    }

    setQuantity(index, quantity) {
        window.app.cart[index].quantity = quantity;
        window.app.saveCart();
        this.loadCart(); // Re-render cart
        Utils.showToast('Cart updated', 'success');
    }

    removeItem(index) {
        const item = window.app.cart[index];
        if (!item) return;

        const product = window.MOCK_DATA.products.find(p => p.id === item.id);
        const productName = product ? product.name : 'Item';

        window.app.cart.splice(index, 1);
        window.app.saveCart();
        this.loadCart();
        Utils.showToast(`${productName} removed from cart`, 'success');
    }

    clearCart() {
        window.app.clearCart();
        this.loadCart();
        Utils.hideModal();
        Utils.showToast('Cart cleared', 'success');
    }

    applyPromoCode() {
        const promoInput = document.getElementById('promo-input');
        const promoMessage = document.getElementById('promo-message');

        if (!promoInput || !promoMessage) return;

        const code = promoInput.value.trim().toUpperCase();

        // Simple promo code logic
        if (code === 'SAVE10') {
            promoMessage.textContent = '10% discount applied!';
            promoMessage.className = 'promo-message success';
            Utils.showToast('Promo code applied successfully!', 'success');
        } else if (code === 'FREESHIP') {
            promoMessage.textContent = 'Free shipping applied!';
            promoMessage.className = 'promo-message success';
            Utils.showToast('Free shipping applied!', 'success');
        } else if (code) {
            promoMessage.textContent = 'Invalid promo code';
            promoMessage.className = 'promo-message error';
            Utils.showToast('Invalid promo code', 'error');
        } else {
            promoMessage.textContent = '';
        }
    }
}

// Initialize cart page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cart')) {
        new CartPage();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartPage;
}