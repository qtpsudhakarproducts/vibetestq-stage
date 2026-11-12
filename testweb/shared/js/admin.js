// Admin Panel JavaScript
/*
 * Copyright © 2024 [Your Name/Organization]
 * Tamash Practice Site - Admin Panel Functionality
 * All rights reserved. Licensed under MIT License.
 * Admin module for test automation practice.
 */

class AdminPanel {
    constructor() {
        this.currentTab = 'dashboard';
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAdminAccess();
        this.setupEventListeners();
        this.loadDashboardData();
        this.showTab('dashboard');
    }

    checkAdminAccess() {
        // Check if user is admin
        const userData = Utils.loadFromStorage('currentUser');
        if (!userData) {
            // User not logged in - redirect to login
            Utils.showToast('Please login to access admin panel.', 'info');
            window.location.href = '/aic/testweb/tamash-practice-site/login?redirect=admin';
            return;
        }
        if (userData.role !== 'admin') {
            // User logged in but not admin
            Utils.showToast('Access denied. Admin privileges required.', 'error');
            window.location.href = '/aic/testweb/tamash-practice-site/';
            return;
        }
        this.currentUser = userData;
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.admin-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = e.target.closest('a').getAttribute('data-tab');
                this.showTab(tab);
            });
        });

        // User management
        document.getElementById('add-user-btn').addEventListener('click', () => this.openUserModal());
        document.getElementById('user-modal-close').addEventListener('click', () => this.closeUserModal());
        document.getElementById('user-cancel-btn').addEventListener('click', () => this.closeUserModal());
        document.getElementById('user-form').addEventListener('submit', (e) => this.handleUserSubmit(e));

        // Product management
        document.getElementById('add-product-btn').addEventListener('click', () => this.openProductModal());
        document.getElementById('product-modal-close').addEventListener('click', () => this.closeProductModal());
        document.getElementById('product-cancel-btn').addEventListener('click', () => this.closeProductModal());
        document.getElementById('product-form').addEventListener('submit', (e) => this.handleProductSubmit(e));

        // Close modals when clicking outside
        document.getElementById('user-modal').addEventListener('click', (e) => {
            if (e.target.id === 'user-modal') this.closeUserModal();
        });
        document.getElementById('product-modal').addEventListener('click', (e) => {
            if (e.target.id === 'product-modal') this.closeProductModal();
        });
    }

    showTab(tabName) {
        // Update active tab
        document.querySelectorAll('.admin-nav a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Show tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // Load tab data
        switch (tabName) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'users':
                this.loadUsersData();
                break;
            case 'products':
                this.loadProductsData();
                break;
            case 'orders':
                this.loadOrdersData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
        }
    }

    // Dashboard functionality
    loadDashboardData() {
        // Update stats
        const totalUsers = window.MOCK_DATA.users.length;
        const totalProducts = window.MOCK_DATA.products.length;
        const totalOrders = this.getTotalOrders();
        const totalRevenue = this.getTotalRevenue();

        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('total-products').textContent = totalProducts;
        document.getElementById('total-orders').textContent = totalOrders;
        document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;

        // Load recent activity
        this.loadRecentActivity();
    }

    getTotalOrders() {
        return window.MOCK_DATA.orders.length;
    }

    getTotalRevenue() {
        return window.MOCK_DATA.orders.reduce((total, order) => total + order.total, 0);
    }

    loadRecentActivity() {
        const activityDiv = document.getElementById('recent-activity');
        const activities = [
            'New user registered: johndoe@example.com',
            'Product added: Wireless Headphones',
            'Order completed: Order #1234',
            'User updated profile: testuser',
            'New product category added: Electronics'
        ];

        activityDiv.innerHTML = activities.map(activity => `
            <div class="activity-item" style="padding: 0.5rem; border-bottom: 1px solid var(--border-color);">
                <i class="fas fa-circle" style="color: var(--primary-color); margin-right: 0.5rem;"></i>
                ${activity}
            </div>
        `).join('');
    }

    // User management
    loadUsersData() {
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = window.MOCK_DATA.users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td><span class="status-badge status-active">${user.role}</span></td>
                <td><span class="status-badge status-active">Active</span></td>
                <td>
                    <button class="action-btn btn-edit" onclick="adminPanel.editUser(${user.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn btn-delete" onclick="adminPanel.deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    openUserModal(userId = null) {
        const modal = document.getElementById('user-modal');
        const form = document.getElementById('user-form');
        const title = document.getElementById('user-modal-title');

        if (userId) {
            // Edit mode
            const user = MOCK_DATA.users.find(u => u.id === userId);
            if (user) {
                title.textContent = 'Edit User';
                form['firstName'].value = user.firstName;
                form['lastName'].value = user.lastName;
                form['username'].value = user.username;
                form['email'].value = user.email;
                form['password'].value = user.password;
                form['role'].value = user.role;
                form.dataset.userId = userId;
            }
        } else {
            // Add mode
            title.textContent = 'Add User';
            form.reset();
            delete form.dataset.userId;
        }

        modal.style.display = 'block';
    }

    closeUserModal() {
        document.getElementById('user-modal').style.display = 'none';
    }

    handleUserSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);

        if (form.dataset.userId) {
            // Update existing user
            const userId = parseInt(form.dataset.userId);
            const userIndex = MOCK_DATA.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                MOCK_DATA.users[userIndex] = { ...MOCK_DATA.users[userIndex], ...userData };
                Utils.showToast('User updated successfully!', 'success');
            }
        } else {
            // Add new user
            const newUser = {
                id: Utils.generateId(),
                ...userData
            };
            MOCK_DATA.users.push(newUser);
            Utils.showToast('User added successfully!', 'success');
        }

        this.closeUserModal();
        this.loadUsersData();
    }

    editUser(userId) {
        this.openUserModal(userId);
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            const userIndex = MOCK_DATA.users.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                MOCK_DATA.users.splice(userIndex, 1);
                Utils.showToast('User deleted successfully!', 'success');
                this.loadUsersData();
            }
        }
    }

    // Product management
    loadProductsData() {
        const tbody = document.getElementById('products-table-body');
        tbody.innerHTML = MOCK_DATA.products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><span class="status-badge status-active">In Stock</span></td>
                <td>
                    <button class="action-btn btn-edit" onclick="adminPanel.editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn btn-delete" onclick="adminPanel.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    }

    openProductModal(productId = null) {
        const modal = document.getElementById('product-modal');
        const form = document.getElementById('product-form');
        const title = document.getElementById('product-modal-title');

        if (productId) {
            // Edit mode
            const product = MOCK_DATA.products.find(p => p.id === productId);
            if (product) {
                title.textContent = 'Edit Product';
                form['name'].value = product.name;
                form['price'].value = product.price;
                form['category'].value = product.category;
                form['description'].value = product.description;
                form['image'].value = product.image;
                form.dataset.productId = productId;
            }
        } else {
            // Add mode
            title.textContent = 'Add Product';
            form.reset();
            delete form.dataset.productId;
        }

        modal.style.display = 'block';
    }

    closeProductModal() {
        document.getElementById('product-modal').style.display = 'none';
    }

    handleProductSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const productData = Object.fromEntries(formData);

        // Convert price to number
        productData.price = parseFloat(productData.price);
        productData.id = parseInt(productData.id) || Utils.generateId();
        productData.inStock = true;
        productData.featured = false;
        productData.rating = 4.0;
        productData.reviews = 0;

        if (form.dataset.productId) {
            // Update existing product
            const productId = parseInt(form.dataset.productId);
            const productIndex = MOCK_DATA.products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                MOCK_DATA.products[productIndex] = { ...MOCK_DATA.products[productIndex], ...productData };
                Utils.showToast('Product updated successfully!', 'success');
            }
        } else {
            // Add new product
            const newProduct = {
                id: Utils.generateId(),
                ...productData
            };
            MOCK_DATA.products.push(newProduct);
            Utils.showToast('Product added successfully!', 'success');
        }

        this.closeProductModal();
        this.loadProductsData();
    }

    editProduct(productId) {
        this.openProductModal(productId);
    }

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            const productIndex = MOCK_DATA.products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                MOCK_DATA.products.splice(productIndex, 1);
                Utils.showToast('Product deleted successfully!', 'success');
                this.loadProductsData();
            }
        }
    }

    // Orders management
    loadOrdersData() {
        const tbody = document.getElementById('orders-table-body');
        tbody.innerHTML = MOCK_DATA.orders.map(order => `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.items.length} items</td>
                <td>$${order.total.toFixed(2)}</td>
                <td><span class="status-badge status-${order.status === 'completed' ? 'active' : order.status === 'pending' ? 'pending' : 'active'}">${order.status}</span></td>
                <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="adminPanel.viewOrder(${order.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>
        `).join('');
    }

    viewOrder(orderId) {
        Utils.showToast(`Viewing order #${orderId}`, 'info');
        // In a real app, this would open order details modal
    }

    // Analytics
    loadAnalyticsData() {
        const avgOrderValue = this.getTotalRevenue() / this.getTotalOrders();
        const conversionRate = Math.floor(Math.random() * 20) + 5; // Mock 5-25%
        const topCategory = this.getTopCategory();
        const activeUsers = Math.floor(MOCK_DATA.users.length * 0.7); // Mock 70% active

        document.getElementById('avg-order-value').textContent = `$${avgOrderValue.toFixed(2)}`;
        document.getElementById('conversion-rate').textContent = `${conversionRate}%`;
        document.getElementById('top-category').textContent = topCategory;
        document.getElementById('active-users').textContent = activeUsers;
    }

    getTopCategory() {
        const categoryCount = {};
        MOCK_DATA.products.forEach(product => {
            categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
        });

        let topCategory = 'Electronics';
        let maxCount = 0;
        for (const [category, count] of Object.entries(categoryCount)) {
            if (count > maxCount) {
                maxCount = count;
                topCategory = category;
            }
        }
        return topCategory.charAt(0).toUpperCase() + topCategory.slice(1);
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});