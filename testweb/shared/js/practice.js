/**
 * Sandbox Studio Master Functionality
 * Handles interactions for all "Daily Struggle" elements.
 */

class PracticePage {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFormInteractions();
        this.setupDialogs();
        this.setupAsyncOperations();
        this.setupAdvancedActions();
        this.setupLists();
        this.setupShadowDOM();
        this.setupClock();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.onclick = (e) => {
                const targetId = e.currentTarget.dataset.target;
                document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

                document.getElementById(targetId).classList.add('active');
                e.currentTarget.classList.add('active');
            };
        });
    }

    setupClock() {
        const el = document.getElementById('current-time');
        if (el) setInterval(() => el.textContent = new Date().toLocaleTimeString(), 1000);
    }

    setupFormInteractions() {
        // Slider value display
        const slider = document.getElementById('skill-slider');
        const valDisplay = document.getElementById('range-val');
        if (slider && valDisplay) {
            slider.oninput = (e) => valDisplay.textContent = `Score: ${e.target.value}`;
        }

        // File upload mock feedback
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.onchange = (e) => {
                if (e.target.files.length > 0) {
                    Utils.showToast(`Selected file: ${e.target.files[0].name}`, 'info');
                }
            };
        }

        // I-Frame Simulator action
        const frameBtn = document.getElementById('frame-btn');
        const frameInput = document.getElementById('frame-input');
        if (frameBtn && frameInput) {
            frameBtn.onclick = () => {
                const val = frameInput.value;
                Utils.showToast(val ? `Frame Message: ${val}` : 'Frame Action Executed!', 'success');
            };
        }
    }

    setupDialogs() {
        const alertBtn = document.getElementById('btn-alert');
        if (alertBtn) alertBtn.onclick = () => alert('Welcome to Automated Testing Lab!');

        const confirmBtn = document.getElementById('btn-confirm');
        if (confirmBtn) confirmBtn.onclick = () => {
            const res = confirm('Delete user configuration?');
            Utils.showToast(res ? 'Config Wiped' : 'Action Aborted', res ? 'error' : 'info');
        };

        const promptBtn = document.getElementById('btn-prompt');
        if (promptBtn) promptBtn.onclick = () => {
            const res = prompt('Enter validation code:', 'QA-2026');
            if (res) Utils.showToast(`Code Accepted: ${res}`, 'success');
        };

        const tabBtn = document.getElementById('btn-new-tab');
        if (tabBtn) tabBtn.onclick = () => window.open('https://vibetestq.com', '_blank');
    }

    setupAsyncOperations() {
        const asyncBtn = document.getElementById('btn-load-async');
        const container = document.getElementById('async-result-container');
        if (asyncBtn && container) {
            asyncBtn.onclick = () => {
                asyncBtn.disabled = true;
                asyncBtn.textContent = 'Wait for it... (4s)';
                container.innerHTML = '<span class="spinner"></span>';

                setTimeout(() => {
                    container.innerHTML = `
                        <div style="text-align:center; padding:1rem; background: var(--bg-card); border:1px solid var(--sandbox-accent); border-radius:8px; width:100%;">
                            <h4 style="margin:0; color: var(--sandbox-accent);">Sync Success!</h4>
                            <p style="margin:5px 0 0; font-size:0.75rem; color: var(--text-muted);">Server Response: 200 OK</p>
                            <button class="btn-portal" style="font-size:0.7rem; padding:4px 12px; margin-top:10px; min-height: auto;" onclick="this.parentElement.remove()">Dismiss</button>
                        </div>
                    `;
                    asyncBtn.disabled = false;
                    asyncBtn.textContent = 'Generate Delayed Results (4s)';
                    Utils.showToast('Delayed element loaded successfully', 'success');
                }, 4000);
            };
        }

        const progressBtn = document.getElementById('btn-progress-run');
        const bar = document.getElementById('progress-bar');
        const status = document.getElementById('progress-status');
        if (progressBtn && bar) {
            progressBtn.onclick = () => {
                progressBtn.disabled = true;
                let width = 0;
                status.textContent = 'MIGRATING...';
                const interval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                        progressBtn.disabled = false;
                        status.textContent = 'COMPLETED';
                        Utils.showToast('Data migration complete', 'success');
                    } else {
                        width += 2;
                        bar.style.width = width + '%';
                        status.textContent = `TRANSFERRING: ${width}%`;
                    }
                }, 100);
            };
        }
    }

    setupAdvancedActions() {
        // Drag Source Items
        const sources = ['drag-source-1', 'drag-source-2'];
        sources.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', id);
                    el.style.opacity = '0.5';
                });
                el.addEventListener('dragend', () => {
                    el.style.opacity = '1';
                });
            }
        });

        const dropZone = document.getElementById('drop-zone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });
            dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                const dragId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(dragId);

                if (draggedEl) {
                    const clone = draggedEl.cloneNode(true);
                    clone.style.opacity = '1';
                    clone.style.margin = '5px';
                    clone.style.cursor = 'default';
                    clone.id = `dropped-${Date.now()}`;

                    // Remove placeholder if exists
                    const placeholder = dropZone.querySelector('span');
                    const icon = dropZone.querySelector('i');
                    if (placeholder) placeholder.style.display = 'none';
                    if (icon) icon.style.display = 'none';

                    dropZone.appendChild(clone);
                    Utils.showToast(`${dragId.replace('drag-source-', 'Item ')} dropped successfully!`, 'success');
                }
            });
        }
    }

    setupLists() {
        const addBtn = document.getElementById('add-item-btn');
        const input = document.getElementById('new-item-input');
        const list = document.getElementById('dynamic-list');

        if (addBtn && input && list) {
            const addAction = () => {
                const text = input.value.trim();
                if (text) {
                    const li = document.createElement('li');
                    li.className = 'list-item';
                    li.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--bg-main); border: 1px solid var(--border); border-radius: 4px; margin-bottom: 5px; animation: fadeIn 0.3s ease-out;';
                    li.innerHTML = `
                        <span>${text}</span>
                        <button class="delete-btn" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.9rem;" title="Remove Item"><i class="fas fa-trash"></i></button>
                    `;
                    list.appendChild(li);
                    input.value = '';

                    // Bind delete event for new item
                    li.querySelector('.delete-btn').onclick = () => li.remove();
                }
            };

            addBtn.onclick = addAction;
            input.onkeypress = (e) => {
                if (e.key === 'Enter') addAction();
            };

            // Bind delete event for existing items
            list.querySelectorAll('.delete-btn').forEach(btn => {
                btn.onclick = (e) => e.currentTarget.closest('li').remove();
            });
        }
    }

    setupShadowDOM() {
        const host = document.getElementById('shadow-host');
        if (!host) return;

        const shadow = host.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                .shadow-box { 
                    padding: 1.5rem; 
                    border: 2px solid var(--sandbox-accent); 
                    border-radius: 12px; 
                    background: var(--bg-card); 
                    color: var(--text-main);
                    box-shadow: var(--shadow-sm);
                }
                .shadow-btn { 
                    background: var(--sandbox-accent); 
                    color: white; 
                    border: none; 
                    padding: 10px; 
                    border-radius: 8px; 
                    cursor: pointer; 
                    width:100%; 
                    font-weight:700;
                    margin-top: 10px;
                }
                .shadow-input { 
                    border: 1px solid var(--border); 
                    padding: 10px; 
                    margin-bottom: 10px; 
                    border-radius: 8px; 
                    width: 100%; 
                    box-sizing: border-box;
                    background: var(--bg-main);
                    color: var(--text-main);
                }
            </style>
            <div class="shadow-box">
                <p style="margin:0 0 10px; font-weight:700; color:var(--sandbox-accent);">Shadow Root Elements</p>
                <input type="text" id="shadow-txt" class="shadow-input" placeholder="Type inside shadow DOM...">
                <button id="shadow-btn" class="shadow-btn">Execute Shadow Action</button>
            </div>
        `;

        shadow.getElementById('shadow-btn').onclick = () => {
            const val = shadow.getElementById('shadow-txt').value;
            Utils.showToast(val ? `Captured: ${val}` : 'Shadow Action Successful', 'info');
        };
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    window.sandbox = new PracticePage();
});