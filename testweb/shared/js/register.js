// Register page functionality

class RegisterPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupForm();
        this.setupPasswordToggle();
        this.setupPasswordValidation();
        this.setupSocialRegister();
    }

    setupForm() {
        const form = document.getElementById('register-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegistration();
        });
    }

    handleRegistration() {
        const formData = {
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            username: document.getElementById('reg-username').value.trim(),
            email: document.getElementById('reg-email').value.trim(),
            password: document.getElementById('reg-password').value,
            confirmPassword: document.getElementById('confirm-password').value,
            agreeTerms: document.getElementById('agree-terms').checked,
            subscribeNewsletter: document.getElementById('subscribe-newsletter').checked
        };

        // Validation
        if (!this.validateForm(formData)) {
            return;
        }

        // Create user data for registration
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        // Attempt registration
        const success = window.app.register(userData);

        if (success) {
            // Handle newsletter subscription
            if (formData.subscribeNewsletter) {
                Utils.showToast('Welcome! You\'ve been subscribed to our newsletter.', 'success');
            }

            // Redirect to dashboard or home
            setTimeout(() => {
                window.location.href = '/aic/testweb/tamash-practice-site/dashboard';
            }, 1000);
        }
    }

    validateForm(data) {
        // Required fields
        if (!Utils.validateRequired(data.firstName)) {
            this.showMessage('First name is required', 'error');
            return false;
        }

        if (!Utils.validateRequired(data.lastName)) {
            this.showMessage('Last name is required', 'error');
            return false;
        }

        if (!Utils.validateRequired(data.username)) {
            this.showMessage('Username is required', 'error');
            return false;
        }

        if (!Utils.validateEmail(data.email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return false;
        }

        if (!Utils.validatePassword(data.password)) {
            this.showMessage('Password must be at least 6 characters long', 'error');
            return false;
        }

        if (data.password !== data.confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return false;
        }

        if (!data.agreeTerms) {
            this.showMessage('You must agree to the Terms of Service and Privacy Policy', 'error');
            return false;
        }

        return true;
    }

    setupPasswordToggle() {
        const toggleBtn = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('reg-password');

        if (!toggleBtn || !passwordInput) return;

        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;

            const icon = toggleBtn.querySelector('i');
            icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    }

    setupPasswordValidation() {
        const passwordInput = document.getElementById('reg-password');
        const confirmInput = document.getElementById('confirm-password');
        const hintElement = document.querySelector('.password-hint');

        if (!passwordInput || !confirmInput) return;

        // Real-time password validation
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            if (password.length > 0 && password.length < 6) {
                hintElement.style.color = '#e74c3c';
            } else if (password.length >= 6) {
                hintElement.style.color = '#27ae60';
            } else {
                hintElement.style.color = '#7f8c8d';
            }
        });

        // Password confirmation validation
        confirmInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const confirm = confirmInput.value;

            if (confirm.length > 0) {
                if (password === confirm) {
                    confirmInput.style.borderColor = '#27ae60';
                } else {
                    confirmInput.style.borderColor = '#e74c3c';
                }
            } else {
                confirmInput.style.borderColor = '#ddd';
            }
        });
    }

    setupSocialRegister() {
        const googleBtn = document.querySelector('.google-btn');
        const facebookBtn = document.querySelector('.facebook-btn');

        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                Utils.showToast('Google registration not implemented in demo', 'info');
            });
        }

        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                Utils.showToast('Facebook registration not implemented in demo', 'info');
            });
        }
    }

    showMessage(message, type) {
        const messageElement = document.getElementById('register-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `form-message ${type}`;
        }
    }
}

// Initialize register page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('register')) {
        new RegisterPage();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RegisterPage;
}