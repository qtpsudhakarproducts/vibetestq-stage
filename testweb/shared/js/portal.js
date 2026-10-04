/**
 * TAMASH Training Portal - Global Logic
 * Handles common UI behaviors like Sidebar, Tabs, and Time
 */

class Portal {
    constructor() {
        this.initSidebar();
        this.initTabs();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    initSidebar() {
        // Toggle sidebar on mobile
        const burger = document.querySelector('.mobile-toggle');
        const sidebar = document.querySelector('.portal-sidebar');

        if (burger && sidebar) {
            burger.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                burger.setAttribute('aria-expanded', sidebar.classList.contains('open'));
            });
        }

        // Highlight active link based on current URL
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;

            // Check if current URL contains the link target (works for folders)
            if (path.includes('/' + linkHref) ||
                (linkHref === 'index' && (path.endsWith('/') || path.endsWith('/index.html') || path.split('/').pop() === ''))) {
                link.classList.add('active');
            }
        });
    }

    initTabs() {
        const tabLinks = document.querySelectorAll('.portal-sidebar .nav-link[data-target]');
        const tabs = document.querySelectorAll('.section-tab');

        if (tabLinks.length > 0) {
            tabLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('data-target');
                    if (targetId) {
                        e.preventDefault();
                        this.showTab(targetId);

                        // Update active state in sidebar
                        tabLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                });
            });
        }
    }

    showTab(tabId) {
        const tabs = document.querySelectorAll('.section-tab');
        const targetTab = document.getElementById(tabId);

        if (targetTab) {
            tabs.forEach(tab => tab.classList.remove('active'));
            targetTab.classList.add('active');

            // Focus management for accessibility
            const h2 = targetTab.querySelector('h2');
            if (h2) h2.focus();

            // Update page title context if header exists
            const contextTitle = document.getElementById('page-context-title');
            if (contextTitle) {
                const navLabel = document.querySelector(`.nav-link[data-target="${tabId}"] span`) ||
                    document.querySelector(`.nav-link[data-target="${tabId}"]`);
                if (navLabel) {
                    contextTitle.textContent = navLabel.textContent.trim();
                }
            }
        }
    }

    updateTime() {
        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            const now = new Date();
            timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.portal = new Portal();
});

// Global helper that apps can call
window.showTab = (id) => {
    if (window.portal) window.portal.showTab(id);
};
