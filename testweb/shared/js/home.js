// Home page specific functionality

class HomePage {
    constructor() {
        // Check if we're on the home page
        const featuredProductsGrid = document.getElementById('featured-products-grid');
        if (!featuredProductsGrid) {
            return;
        }
        
        this.init();
    }

    init() {
        this.setupHeroCarousel();
        this.loadFeaturedProducts();
        this.loadDeals();
        this.setupNewsletterForm();
        this.startDealTimer();
        this.setupSearchSuggestions();
    }

    setupHeroCarousel() {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');

        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentSlide = index;
        };

        const nextSlide = () => {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        };

        const prevSlide = () => {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        };

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });

        // Auto-play
        setInterval(nextSlide, 5000);
    }

    loadFeaturedProducts() {
        const container = document.getElementById('featured-products-grid');
        const loading = document.getElementById('products-loading');

        if (!container) return;

        // Show loading
        if (loading) loading.style.display = 'block';

        // Simulate API call delay
        setTimeout(() => {
            try {
                const featuredProducts = window.MOCK_DATA.products.filter(p => p.featured);

                if (loading) loading.style.display = 'none';

                featuredProducts.forEach(product => {
                    const productCard = this.createProductCard(product);
                    container.appendChild(productCard);
                });
            } catch (error) {
                console.error('Error in loadFeaturedProducts:', error);
                if (loading) loading.style.display = 'none';
            }
        }, 1000);
    }

    loadDeals() {
        const container = document.getElementById('deals-grid');
        if (!container) return;

        // Get products with discounts
        const deals = window.MOCK_DATA.products.filter(p => p.originalPrice && p.originalPrice > p.price);

        deals.forEach(product => {
            const productCard = this.createProductCard(product, true);
            container.appendChild(productCard);
        });
    }

    createProductCard(product, isDeal = false) {
        const card = Utils.createElement('div', {
            className: 'product-card',
            'data-testid': `product-${product.id}`
        });

        const discount = isDeal && product.originalPrice ?
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

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
                <div class="product-price">
                    ${Utils.formatPrice(product.price)}
                    ${product.originalPrice ? `<span class="original-price">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}" data-testid="add-to-cart-${product.id}">
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        `;

        // Add event listener for add to cart
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn && product.inStock) {
            addToCartBtn.addEventListener('click', () => {
                window.app.addToCart(product.id);
            });
        }

        // Make card clickable to go to product detail
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                window.location.href = `/aic/testweb/tamash-practice-site/products?id=${product.id}`;
            }
        });

        return card;
    }

    setupNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        const messageElement = document.getElementById('newsletter-message');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('newsletter-email').value;
            const agree = document.getElementById('newsletter-agree').checked;

            if (!Utils.validateEmail(email)) {
                this.showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            if (!agree) {
                this.showFormMessage('Please agree to receive marketing emails', 'error');
                return;
            }

            // Simulate API call
            this.showFormMessage('Thank you for subscribing!', 'success');
            form.reset();

            setTimeout(() => {
                this.showFormMessage('', '');
            }, 3000);
        });
    }

    showFormMessage(message, type) {
        const messageElement = document.getElementById('newsletter-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `form-message ${type}`;
        }
    }

    startDealTimer() {
        const timerElement = document.getElementById('deal-timer');
        if (!timerElement) return;

        const hoursElement = timerElement.querySelector('.hours');
        const minutesElement = timerElement.querySelector('.minutes');
        const secondsElement = timerElement.querySelector('.seconds');

        let timeLeft = 12 * 60 * 60 + 34 * 60 + 56; // 12:34:56

        const updateTimer = () => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;

            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');

            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateTimer, 1000);
            }
        };

        updateTimer();
    }

    setupSearchSuggestions() {
        const searchInput = document.querySelector('.search-input');
        const searchSuggestions = document.querySelector('.search-suggestions');

        if (!searchInput || !searchSuggestions) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            clearTimeout(searchTimeout);

            if (query.length < 2) {
                searchSuggestions.classList.remove('active');
                return;
            }

            searchTimeout = setTimeout(() => {
                this.showSearchSuggestions(query, searchSuggestions);
            }, 300);
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('active');
            }
        });

        // Handle keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            const suggestions = searchSuggestions.querySelectorAll('.suggestion-item');
            const activeSuggestion = searchSuggestions.querySelector('.suggestion-item.active');

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (activeSuggestion) {
                    const next = activeSuggestion.nextElementSibling || suggestions[0];
                    activeSuggestion.classList.remove('active');
                    next.classList.add('active');
                } else if (suggestions.length > 0) {
                    suggestions[0].classList.add('active');
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (activeSuggestion) {
                    const prev = activeSuggestion.previousElementSibling || suggestions[suggestions.length - 1];
                    activeSuggestion.classList.remove('active');
                    prev.classList.add('active');
                } else if (suggestions.length > 0) {
                    suggestions[suggestions.length - 1].classList.add('active');
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestion) {
                    activeSuggestion.click();
                } else {
                    this.performSearch(searchInput.value.trim());
                }
            } else if (e.key === 'Escape') {
                searchSuggestions.classList.remove('active');
                searchInput.blur();
            }
        });
    }

    showSearchSuggestions(query, container) {
        const products = window.MOCK_DATA.products || [];
        const categories = [...new Set(products.map(p => p.category))];

        const productMatches = products
            .filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            )
            .slice(0, 3);

        const categoryMatches = categories
            .filter(category => category.toLowerCase().includes(query))
            .slice(0, 2);

        if (productMatches.length === 0 && categoryMatches.length === 0) {
            container.innerHTML = '<div class="suggestion-item"><i class="fas fa-search"></i><span class="suggestion-text">No results found</span></div>';
        } else {
            let html = '';

            // Product suggestions
            productMatches.forEach(product => {
                html += `
                    <div class="suggestion-item" data-type="product" data-id="${product.id}">
                        <i class="fas fa-box"></i>
                        <div>
                            <span class="suggestion-text">${product.name}</span>
                            <span class="suggestion-category">Product • ${Utils.formatPrice(product.price)}</span>
                        </div>
                    </div>
                `;
            });

            // Category suggestions
            categoryMatches.forEach(category => {
                const productCount = products.filter(p => p.category === category).length;
                html += `
                    <div class="suggestion-item" data-type="category" data-category="${category}">
                        <i class="fas fa-tag"></i>
                        <div>
                            <span class="suggestion-text">${category}</span>
                            <span class="suggestion-category">Category • ${productCount} products</span>
                        </div>
                    </div>
                `;
            });

            // Show all results option
            html += `
                <div class="suggestion-item" data-type="search">
                    <i class="fas fa-search"></i>
                    <span class="suggestion-text">Search for "${query}"</span>
                </div>
            `;

            container.innerHTML = html;
        }

        container.classList.add('active');

        // Add click handlers
        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type;

                if (type === 'product') {
                    window.location.href = `/aic/testweb/tamash-practice-site/products?id=${item.dataset.id}`;
                } else if (type === 'category') {
                    window.location.href = `/aic/testweb/tamash-practice-site/products?category=${encodeURIComponent(item.dataset.category)}`;
                } else if (type === 'search') {
                    this.performSearch(query);
                }

                container.classList.remove('active');
            });
        });
    }

    performSearch(query) {
        if (query.trim()) {
            window.location.href = `/aic/testweb/tamash-practice-site/products?search=${encodeURIComponent(query)}`;
        }
    }
}

// Initialize home page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Always try to initialize HomePage - it will check internally if it should run
    new HomePage();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomePage;
}