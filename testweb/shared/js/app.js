// Main application logic for Tamash Practice Site
/*
 * Copyright © 2024 [Your Name/Organization]
 * Tamash Practice Site - Educational E-commerce Platform
 * All rights reserved. Licensed under MIT License.
 * This code is proprietary and was developed specifically for test automation training.
 */

class App {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.init();
    }

    init() {
        this.loadUser();
        this.loadCart();
        this.setupEventListeners();
        this.updateUI();
    }

    // User management
    loadUser() {
        const userData = Utils.loadFromStorage('currentUser');
        if (userData) {
            this.currentUser = userData;
        }
    }

    saveUser() {
        Utils.saveToStorage('currentUser', this.currentUser);
    }

    login(username, password) {
        const user = window.MOCK_DATA.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            this.saveUser();
            this.updateUI();
            Utils.showToast('Login successful!', 'success');
            return true;
        } else {
            Utils.showToast('Invalid credentials', 'error');
            return false;
        }
    }

    logout() {
        this.currentUser = null;
        Utils.saveToStorage('currentUser', null);
        this.updateUI();
        Utils.showToast('Logged out successfully', 'success');
    }

    register(userData) {
        // Check if user already exists
        const existingUser = window.MOCK_DATA.users.find(u => u.email === userData.email || u.username === userData.username);
        if (existingUser) {
            Utils.showToast('User already exists', 'error');
            return false;
        }

        // Create new user
        const newUser = {
            id: Utils.generateId(),
            ...userData,
            role: 'user'
        };

        window.MOCK_DATA.users.push(newUser);
        this.currentUser = newUser;
        this.saveUser();
        this.updateUI();
        Utils.showToast('Registration successful!', 'success');
        return true;
    }

    // Cart management
    loadCart() {
        const cartData = Utils.loadFromStorage('cart');
        this.cart = cartData || [];
    }

    saveCart() {
        Utils.saveToStorage('cart', this.cart);
    }

    addToCart(productId, quantity = 1) {
        const product = window.MOCK_DATA.products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartCount();
        Utils.showToast(`${product.name} added to cart!`, 'success');
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        Utils.showToast('Item removed from cart', 'success');
    }

    updateCartItemQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }

    // UI updates
    updateUI() {
        this.updateUserUI();
        this.updateCartCount();
    }

    updateUserUI() {
        const userNameElement = document.getElementById('user-name');
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const dashboardLink = document.getElementById('dashboard-link');
        const adminLink = document.getElementById('admin-link');
        const navAdminLink = document.getElementById('nav-admin-link');
        const logoutLink = document.getElementById('logout-link');

        if (this.currentUser) {
            if (userNameElement) userNameElement.textContent = this.currentUser.firstName;
            if (loginLink) loginLink.classList.add('hidden');
            if (registerLink) registerLink.classList.add('hidden');
            if (dashboardLink) dashboardLink.classList.remove('hidden');
            if (logoutLink) logoutLink.classList.remove('hidden');

            // Show admin panel only for admin users
            if (adminLink) {
                if (this.currentUser.role === 'admin') {
                    adminLink.classList.remove('hidden');
                } else {
                    adminLink.classList.add('hidden');
                }
            }
            if (navAdminLink) {
                if (this.currentUser.role === 'admin') {
                    navAdminLink.classList.remove('hidden');
                } else {
                    navAdminLink.classList.add('hidden');
                }
            }
        } else {
            if (userNameElement) userNameElement.textContent = 'Guest';
            if (loginLink) loginLink.classList.remove('hidden');
            if (registerLink) registerLink.classList.remove('hidden');
            if (dashboardLink) dashboardLink.classList.add('hidden');
            if (adminLink) adminLink.classList.add('hidden');
            if (navAdminLink) navAdminLink.classList.add('hidden');
            if (logoutLink) logoutLink.classList.add('hidden');
        }
    }

    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const count = this.getCartCount();
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Event listeners
    setupEventListeners() {
        // Logout functionality
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Search functionality
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = document.getElementById('search-input').value.trim();
                if (query) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            });
        }

        // Modal close
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                Utils.hideModal();
            });
        }

        // Back to top
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Cookie banner - removed for cleaner UI
        // const acceptCookies = document.getElementById('accept-cookies');
        // const rejectCookies = document.getElementById('reject-cookies');
        // const cookieBanner = document.getElementById('cookie-banner');

        // if (acceptCookies && rejectCookies && cookieBanner) {
        //     const cookieConsent = Utils.loadFromStorage('cookieConsent');
        //     if (!cookieConsent) {
        //         cookieBanner.style.display = 'block';
        //     }

        //     acceptCookies.addEventListener('click', () => {
        //         Utils.saveToStorage('cookieConsent', true);
        //         cookieBanner.style.display = 'none';
        //         Utils.showToast('Cookies accepted', 'success');
        //     });

        //     rejectCookies.addEventListener('click', () => {
        //         Utils.saveToStorage('cookieConsent', false);
        //         cookieBanner.style.display = 'none';
        //         Utils.showToast('Cookies rejected', 'info');
        //     });
        // }

        // Notification banner close - removed for cleaner UI
        // const closeNotification = document.getElementById('close-notification');
        // const notificationBanner = document.getElementById('notification-banner');

        // if (closeNotification && notificationBanner) {
        //     closeNotification.addEventListener('click', () => {
        //         notificationBanner.style.display = 'none';
        //     });
        // }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}