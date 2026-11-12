// Login page functionality

class LoginPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupForm();
        this.setupPasswordToggle();
        this.setupForgotPassword();
        this.setupSocialLogin();
    }

    setupForm() {
        const form = document.getElementById('login-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Basic validation
        if (!Utils.validateRequired(username)) {
            this.showMessage('Please enter your username or email', 'error');
            return;
        }

        if (!Utils.validateRequired(password)) {
            this.showMessage('Please enter your password', 'error');
            return;
        }

        // Attempt login
        const success = window.app.login(username, password);

        if (success) {
            // Redirect based on user role or intended destination
            const redirectParam = Utils.getQueryParam('redirect');
            let redirectTo = '/aic/testweb/tamash-practice-site/';
            if (redirectParam) {
                redirectTo = '/aic/testweb/tamash-practice-site/' + redirectParam.replace('.html', '');
            }
            setTimeout(() => {
                window.location.href = redirectTo;
            }, 1000);
        } else {
            this.showMessage('Invalid username or password', 'error');
        }
    }

    setupPasswordToggle() {
        const toggleBtn = document.querySelector('.toggle-password');
        const passwordInput = document.getElementById('password');

        if (!toggleBtn || !passwordInput) return;

        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;

            const icon = toggleBtn.querySelector('i');
            icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });
    }

    setupForgotPassword() {
        const forgotLink = document.getElementById('forgot-password');
        if (!forgotLink) return;

        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showForgotPasswordModal();
        });
    }

    showForgotPasswordModal() {
        const content = `
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            <form id="forgot-password-form">
                <div class="form-group">
                    <label for="reset-email">Email Address</label>
                    <input type="email" id="reset-email" name="email" required placeholder="Enter your email">
                </div>
                <button type="submit" class="btn btn-primary">Send Reset Link</button>
            </form>
        `;

        Utils.showModal('Reset Password', content, [
            { text: 'Cancel', class: 'btn-secondary', action: 'cancel', handler: () => Utils.hideModal() }
        ]);

        // Setup form submission
        setTimeout(() => {
            const form = document.getElementById('forgot-password-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = document.getElementById('reset-email').value;

                    if (!Utils.validateEmail(email)) {
                        Utils.showToast('Please enter a valid email address', 'error');
                        return;
                    }

                    // Simulate sending reset email
                    Utils.showToast('Password reset link sent to your email', 'success');
                    Utils.hideModal();
                });
            }
        }, 100);
    }

    setupSocialLogin() {
        const googleBtn = document.querySelector('.google-btn');
        const facebookBtn = document.querySelector('.facebook-btn');

        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                Utils.showToast('Google login not implemented in demo', 'info');
            });
        }

        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                Utils.showToast('Facebook login not implemented in demo', 'info');
            });
        }
    }

    showMessage(message, type) {
        const messageElement = document.getElementById('login-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `form-message ${type}`;
        }
    }
}

// Initialize login page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('login')) {
        new LoginPage();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginPage;
}