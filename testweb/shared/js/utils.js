// Utility functions for Tamash Practice Site

class Utils {
    // DOM manipulation utilities
    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'data-testid') {
                element.setAttribute('data-testid', attributes[key]);
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        if (content) {
            element.innerHTML = content;
        }
        return element;
    }

    static showToast(message, type = 'success', duration = 3000) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = this.createElement('div', {
            className: `toast ${type}`,
            'data-testid': 'toast'
        }, message);

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, duration);
    }

    static showModal(title, content, footerButtons = []) {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalFooter = document.getElementById('modal-footer');

        if (!modalOverlay || !modalTitle || !modalBody || !modalFooter) return;

        modalTitle.textContent = title;
        modalBody.innerHTML = content;

        modalFooter.innerHTML = '';
        footerButtons.forEach(button => {
            const btn = this.createElement('button', {
                className: `btn ${button.class || 'btn-secondary'}`,
                'data-action': button.action
            }, button.text);
            if (button.handler) {
                btn.addEventListener('click', button.handler);
            }
            modalFooter.appendChild(btn);
        });

        modalOverlay.classList.add('active');

        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.hideModal();
            }
        });
    }

    static hideModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    // Form validation utilities
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePassword(password) {
        return password.length >= 6;
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    // Local storage utilities
    static saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    static loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    // URL and navigation utilities
    static getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    static setQueryParam(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    }

    // Animation utilities
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';

        const start = performance.now();

        const fade = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;

            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(fade);
            } else {
                element.style.opacity = '1';
            }
        };

        requestAnimationFrame(fade);
    }

    static fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(getComputedStyle(element).opacity);

        const fade = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;

            if (progress < 1) {
                element.style.opacity = startOpacity * (1 - progress);
                requestAnimationFrame(fade);
            } else {
                element.style.display = 'none';
                element.style.opacity = startOpacity;
            }
        };

        requestAnimationFrame(fade);
    }

    // Array and data utilities
    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    static formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    }

    // Generate unique ID
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Debounce function
    static debounce(func, wait) {
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

    // Check if element is in viewport
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}