// Dashboard page functionality
/*
 * Copyright © 2026 VibeTestQ
 * Tamash Practice Site - Educational E-commerce Platform
 * All rights reserved. Licensed under MIT License.
 * This code is proprietary and was developed specifically for test automation training.
 */

class Dashboard {
    constructor() {
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.loadUserData();
        this.loadRecentOrders();
        this.loadCartSummary();
        this.loadActivityFeed();
        this.setupEventListeners();
    }

    checkAuthentication() {
        if (!app.currentUser) {
            Utils.showToast('Please login to access your dashboard', 'warning');
            window.location.href = 'login.html';
            return;
        }
    }

    loadUserData() {
        const user = app.currentUser;
        if (user) {
            document.getElementById('user-fullname').textContent = user.firstName + ' ' + user.lastName;
            document.getElementById('user-username').textContent = user.username;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-joined').textContent = new Date(user.joinDate).toLocaleDateString();
            document.getElementById('user-name').textContent = user.firstName;
        }
    }

    loadRecentOrders() {
        // Load recent orders from localStorage or mock data
        const orders = Utils.loadFromStorage('userOrders') || [];
        const recentOrders = orders.slice(-5).reverse(); // Get last 5 orders

        const ordersContainer = document.getElementById('recent-orders');

        if (recentOrders.length === 0) {
            ordersContainer.innerHTML = '<p class="no-orders" data-testid="no-orders">No recent orders found.</p>';
            return;
        }

        const ordersHtml = recentOrders.map(order => `
            <div class="order-item" data-testid="order-item-${order.id}">
                <div class="order-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div class="order-details">
                    <span class="order-items">${order.items.length} item(s)</span>
                    <span class="order-total">$${order.total.toFixed(2)}</span>
                </div>
                <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
            </div>
        `).join('');

        ordersContainer.innerHTML = ordersHtml;
    }

    loadCartSummary() {
        const cart = app.cart || [];
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        document.getElementById('cart-item-count').textContent = itemCount;
        document.getElementById('cart-total').textContent = total.toFixed(2);
    }

    loadActivityFeed() {
        // Load recent activity from localStorage or create default
        const activities = Utils.loadFromStorage('userActivity') || [
            {
                type: 'login',
                message: 'Logged in to dashboard',
                timestamp: new Date().toISOString()
            }
        ];

        const activityContainer = document.getElementById('activity-feed');

        const activitiesHtml = activities.slice(-10).reverse().map(activity => {
            const timeAgo = this.getTimeAgo(new Date(activity.timestamp));
            const iconClass = this.getActivityIcon(activity.type);

            return `
                <div class="activity-item" data-testid="activity-item">
                    <i class="${iconClass}"></i>
                    <span>${activity.message}</span>
                    <small>${timeAgo}</small>
                </div>
            `;
        }).join('');

        activityContainer.innerHTML = activitiesHtml;
    }

    getActivityIcon(type) {
        const icons = {
            login: 'fas fa-sign-in-alt',
            logout: 'fas fa-sign-out-alt',
            order: 'fas fa-shopping-bag',
            cart: 'fas fa-shopping-cart',
            profile: 'fas fa-user-edit'
        };
        return icons[type] || 'fas fa-info-circle';
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }

    setupEventListeners() {
        // Export data functionality
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportUserData();
        });

        // Update cart count when cart changes
        document.addEventListener('cartUpdated', () => {
            this.loadCartSummary();
        });
    }

    exportUserData() {
        const userData = {
            user: app.currentUser,
            cart: app.cart,
            orders: Utils.loadFromStorage('userOrders') || [],
            activity: Utils.loadFromStorage('userActivity') || [],
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `user-data-${app.currentUser.username}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Utils.showToast('User data exported successfully!', 'success');

        // Log activity
        this.logActivity('export', 'Exported user data');
    }

    logActivity(type, message) {
        const activities = Utils.loadFromStorage('userActivity') || [];
        activities.push({
            type: type,
            message: message,
            timestamp: new Date().toISOString()
        });

        // Keep only last 50 activities
        if (activities.length > 50) {
            activities.splice(0, activities.length - 50);
        }

        Utils.saveToStorage('userActivity', activities);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});