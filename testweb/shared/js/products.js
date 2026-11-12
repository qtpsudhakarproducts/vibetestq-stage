// Products page functionality

class ProductsPage {
    constructor() {
        // Check if we're on the products page
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer) {
            return;
        }
        
        this.products = [...window.MOCK_DATA.products];
        this.filteredProducts = [...this.products];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentView = 'grid';
        this.filters = {
            categories: [],
            priceRange: { min: null, max: null },
            rating: null,
            availability: ['in-stock']
        };
        this.sortBy = 'name';

        this.init();
    }

    init() {
        // Parse URL parameters
        this.parseUrlParameters();
        
        this.setupFilters();
        this.setupSorting();
        this.setupViewToggle();
        this.setupPagination();
        this.loadProducts();
        this.updateResultsCount();
    }

    parseUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Category parameter
        const category = urlParams.get('category');
        if (category) {
            this.filters.categories = [category];
        }
        
        // Other potential parameters can be added here
        // const search = urlParams.get('search');
        // const minPrice = urlParams.get('minPrice');
        // const maxPrice = urlParams.get('maxPrice');
        // etc.
    }

    loadProducts() {
        this.applyFilters();
        this.applySorting();
        this.renderProducts();
        this.renderPagination();
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            if (this.filters.categories.length > 0) {
                if (!this.filters.categories.includes(product.category)) {
                    return false;
                }
            }

            // Price range filter
            if (this.filters.priceRange.min !== null && product.price < this.filters.priceRange.min) {
                return false;
            }
            if (this.filters.priceRange.max !== null && product.price > this.filters.priceRange.max) {
                return false;
            }

            // Rating filter
            if (this.filters.rating && product.rating < this.filters.rating) {
                return false;
            }

            // Availability filter
            if (this.filters.availability.includes('in-stock') && !product.inStock) {
                return false;
            }
            if (this.filters.availability.includes('on-sale') && (!product.originalPrice || product.originalPrice <= product.price)) {
                return false;
            }

            return true;
        });
    }

    applySorting() {
        this.filteredProducts.sort((a, b) => {
            switch (this.sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id; // Assuming higher ID is newer
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        const loading = document.getElementById('products-loading');

        if (!container) return;

        // Show loading
        if (loading) loading.style.display = 'block';

        // Simulate API delay
        setTimeout(() => {
            try {
                if (loading) loading.style.display = 'none';

                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

                container.innerHTML = '';
                container.className = `products-container ${this.currentView === 'list' ? 'products-list' : 'products-grid'}`;

                if (productsToShow.length === 0) {
                    container.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
                    return;
                }

                productsToShow.forEach(product => {
                    const productCard = this.createProductCard(product);
                    container.appendChild(productCard);
                });
            } catch (error) {
                console.error('Error in renderProducts:', error);
                if (loading) loading.style.display = 'none';
            }
        }, 300);
    }

    createProductCard(product) {
        const card = Utils.createElement('div', {
            className: 'product-card',
            'data-testid': `product-${product.id}`
        });

        const discount = product.originalPrice ?
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        if (this.currentView === 'grid') {
            card.innerHTML = `
                <div class="product-image">
                    ${product.image}
                    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
                    <div class="product-overlay">
                        <button class="quick-view-btn" data-product-id="${product.id}" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="wishlist-btn" data-product-id="${product.id}" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ${Utils.formatPrice(product.price)}
                        ${product.originalPrice ? `<span class="original-price">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-product-id="${product.id}" title="Decrease quantity">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="1" min="1" max="99" data-product-id="${product.id}">
                            <button class="quantity-btn plus" data-product-id="${product.id}" title="Increase quantity">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="add-to-cart-btn ${product.inStock ? '' : 'disabled'}" data-product-id="${product.id}" data-testid="add-to-cart-${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <span class="btn-text">${product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                            <span class="btn-loading" style="display: none;">
                                <span class="spinner"></span>
                                Adding...
                            </span>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // List view with enhanced features
            card.innerHTML = `
                <div class="product-image">
                    ${product.image}
                    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span>(${product.reviews})</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        ${Utils.formatPrice(product.price)}
                        ${product.originalPrice ? `<span class="original-price">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-product-id="${product.id}" title="Decrease quantity">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="1" min="1" max="99" data-product-id="${product.id}">
                            <button class="quantity-btn plus" data-product-id="${product.id}" title="Increase quantity">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="add-to-cart-btn ${product.inStock ? '' : 'disabled'}" data-product-id="${product.id}" data-testid="add-to-cart-${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <span class="btn-text">${product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                            <span class="btn-loading" style="display: none;">
                                <span class="spinner"></span>
                                Adding...
                            </span>
                        </button>
                    </div>
                </div>
            `;
        }

        // Add event listeners
        this.setupProductCardEvents(card, product);

        return card;
    }

    setupProductCardEvents(card, product) {
        // Quantity controls
        const quantityInput = card.querySelector('.quantity-input');
        const minusBtn = card.querySelector('.quantity-btn.minus');
        const plusBtn = card.querySelector('.quantity-btn.plus');

        if (quantityInput && minusBtn && plusBtn) {
            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                    this.animateQuantityChange(quantityInput, 'decrease');
                }
            });

            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const currentValue = parseInt(quantityInput.value);
                if (currentValue < 99) {
                    quantityInput.value = currentValue + 1;
                    this.animateQuantityChange(quantityInput, 'increase');
                }
            });

            quantityInput.addEventListener('change', (e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value) || value < 1) value = 1;
                if (value > 99) value = 99;
                e.target.value = value;
            });
        }

        // Enhanced Add to Cart
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn && product.inStock) {
            addToCartBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await this.addToCartWithAnimation(addToCartBtn, product, quantityInput?.value || 1);
            });
        }

        // Quick view and wishlist buttons
        const quickViewBtn = card.querySelector('.quick-view-btn');
        const wishlistBtn = card.querySelector('.wishlist-btn');

        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showQuickView(product);
            });
        }

        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleWishlist(wishlistBtn, product);
            });
        }

        // Make card clickable to go to product detail (excluding buttons)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart-btn, .quantity-controls, .quick-view-btn, .wishlist-btn')) {
                window.location.href = `/aic/testweb/tamash-practice-site/products?id=${product.id}`;
            }
        });
    }

    animateQuantityChange(input, direction) {
        input.style.transform = direction === 'increase' ? 'scale(1.1)' : 'scale(0.9)';
        input.style.color = direction === 'increase' ? 'var(--primary-color)' : 'var(--text-secondary)';

        setTimeout(() => {
            input.style.transform = 'scale(1)';
            input.style.color = 'var(--text-primary)';
        }, 200);
    }

    async addToCartWithAnimation(button, product, quantity) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        button.disabled = true;

        // Add bounce animation to card
        const card = button.closest('.product-card');
        card.style.animation = 'bounce 0.6s ease';

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add to cart
        for (let i = 0; i < quantity; i++) {
            window.app.addToCart(product.id);
        }

        // Show success state
        btnLoading.innerHTML = '<i class="fas fa-check"></i> Added!';
        Utils.showToast(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`, 'success');

        // Reset after delay
        setTimeout(() => {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            button.disabled = false;
            card.style.animation = '';
        }, 2000);
    }

    showQuickView(product) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="quick-view-overlay" onclick="this.parentElement.remove()"></div>
            <div class="quick-view-content">
                <button class="quick-view-close" onclick="this.closest('.quick-view-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-image">
                    ${product.image}
                </div>
                <div class="quick-view-info">
                    <h3>${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <div class="product-price">
                        ${Utils.formatPrice(product.price)}
                        ${product.originalPrice ? `<span class="original-price">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="quick-view-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                            <input type="number" class="quantity-input" value="1" min="1" max="99">
                            <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup modal events
        const quantityInput = modal.querySelector('.quantity-input');
        const minusBtn = modal.querySelector('.quantity-btn.minus');
        const plusBtn = modal.querySelector('.quantity-btn.plus');
        const addToCartBtn = modal.querySelector('.add-to-cart-btn');

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 99) {
                quantityInput.value = currentValue + 1;
            }
        });

        addToCartBtn.addEventListener('click', async () => {
            await this.addToCartWithAnimation(addToCartBtn, product, quantityInput.value);
            setTimeout(() => modal.remove(), 2000);
        });

        // Animate modal entrance
        setTimeout(() => modal.classList.add('active'), 10);
    }

    toggleWishlist(button, product) {
        const icon = button.querySelector('i');
        const isWishlisted = button.classList.contains('active');

        if (isWishlisted) {
            button.classList.remove('active');
            icon.className = 'fas fa-heart';
            Utils.showToast(`Removed ${product.name} from wishlist`, 'info');
        } else {
            button.classList.add('active');
            icon.className = 'fas fa-heart';
            button.style.animation = 'heartbeat 0.6s ease';
            Utils.showToast(`Added ${product.name} to wishlist!`, 'success');

            setTimeout(() => button.style.animation = '', 600);
        }
    }

    renderPagination() {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `<button ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}" data-testid="prev-page">
            <i class="fas fa-chevron-left"></i>
        </button>`;

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span>...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="${i === this.currentPage ? 'active' : ''}" data-page="${i}" data-testid="page-${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span>...</span>`;
            }
            paginationHTML += `<button data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        paginationHTML += `<button ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}" data-testid="next-page">
            <i class="fas fa-chevron-right"></i>
        </button>`;

        paginationContainer.innerHTML = paginationHTML;

        // Add event listeners
        paginationContainer.querySelectorAll('button[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.loadProducts();
                    this.updateResultsCount();
                }
            });
        });
    }

    setupFilters() {
        // Category filters
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.filters.categories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                    .map(cb => cb.value);
                this.currentPage = 1;
                this.loadProducts();
                this.updateResultsCount();
            });
        });

        // Price range
        const applyPriceBtn = document.getElementById('apply-price');
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', () => {
                const minPrice = parseFloat(document.getElementById('min-price').value) || null;
                const maxPrice = parseFloat(document.getElementById('max-price').value) || null;
                this.filters.priceRange = { min: minPrice, max: maxPrice };
                this.currentPage = 1;
                this.loadProducts();
                this.updateResultsCount();
            });
        }

        // Rating filters
        document.querySelectorAll('input[name="rating"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
                    .map(cb => parseInt(cb.value));
                this.filters.rating = checkedRatings.length > 0 ? Math.max(...checkedRatings) : null;
                this.currentPage = 1;
                this.loadProducts();
                this.updateResultsCount();
            });
        });

        // Availability filters
        document.querySelectorAll('input[name="availability"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.filters.availability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
                    .map(cb => cb.value);
                this.currentPage = 1;
                this.loadProducts();
                this.updateResultsCount();
            });
        });

        // Clear filters
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }
    }

    clearFilters() {
        // Reset all filter inputs
        document.querySelectorAll('input[name="category"], input[name="rating"], input[name="availability"]').forEach(cb => {
            cb.checked = cb.name === 'availability' && cb.value === 'in-stock';
        });

        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';

        // Reset filter object
        this.filters = {
            categories: [],
            priceRange: { min: null, max: null },
            rating: null,
            availability: ['in-stock']
        };

        this.currentPage = 1;
        this.loadProducts();
        this.updateResultsCount();
    }

    setupSorting() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.currentPage = 1;
                this.loadProducts();
            });
        }
    }

    setupViewToggle() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.closest('.view-btn').dataset.view;
                this.setView(view);
            });
        });
    }

    setView(view) {
        this.currentView = view;
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.renderProducts();
    }

    setupPagination() {
        // Pagination is handled in renderPagination
    }

    updateResultsCount() {
        const showingCount = document.getElementById('showing-count');
        const totalCount = document.getElementById('total-count');

        if (showingCount && totalCount) {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
            const endIndex = Math.min(startIndex + this.itemsPerPage - 1, this.filteredProducts.length);

            showingCount.textContent = this.filteredProducts.length > 0 ? `${startIndex}-${endIndex}` : '0';
            totalCount.textContent = this.filteredProducts.length;
        }
    }
}

// Initialize products page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Products DOMContentLoaded fired, pathname:', window.location.pathname);
    // Always try to initialize ProductsPage - it will check internally if it should run
    console.log('Initializing ProductsPage');
    new ProductsPage();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsPage;
}/ /   I n i t i a l i z e   p r o d u c t s   p a g e   w h e n   D O M   i s   l o a d e d 
 d o c u m e n t . a d d E v e n t L i s t e n e r ( ' D O M C o n t e n t L o a d e d ' ,   ( )   = >   { 
         / /   A l w a y s   t r y   t o   i n i t i a l i z e   P r o d u c t s P a g e   -   i t   w i l l   c h e c k   i n t e r n a l l y   i f   i t   s h o u l d   r u n 
         n e w   P r o d u c t s P a g e ( ) ; 
 } ) ; 
 
 / /   E x p o r t   f o r   u s e   i n   o t h e r   m o d u l e s 
 i f   ( t y p e o f   m o d u l e   ! = =   ' u n d e f i n e d '   & &   m o d u l e . e x p o r t s )   { 
         m o d u l e . e x p o r t s   =   P r o d u c t s P a g e ; 
 } 
 
 