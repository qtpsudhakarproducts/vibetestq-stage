/**
 * Asset Manager Logic - Mock API Driven
 */

class AssetManager {
    constructor() {
        this.api = new MockAPI('tamash_asset_store', {
            hardware: [
                { id: 'H101', tag: 'AT-2026-001', name: 'DESK-WS-001', model: 'Dell OptiPlex', user: 'Admin', status: 'In Use' },
                { id: 'H102', tag: 'AT-2026-002', name: 'LAP-MBP-042', model: 'MacBook Pro', user: 'Sarah J.', status: 'In Use' }
            ],
            software: [
                { id: 'S201', publisher: 'Microsoft', name: 'Office 365', version: 'v24.2', count: 50, used: 12 },
                { id: 'S202', publisher: 'JetBrains', name: 'WebStorm', version: '2023.3', count: 20, used: 15 }
            ]
        });

        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadDashboard();
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.addEventListener('click', async (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                await this.showTab(target);
            });
        });

        const form = document.getElementById('asset-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                await this.handleOnboard();
            };
        }
    }

    async showTab(id) {
        document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        const target = document.getElementById(id);
        if (target) target.classList.add('active');
        const link = document.querySelector(`.nav-link[data-target="${id}"]`);
        if (link) link.classList.add('active');

        if (id === 'dashboard') await this.loadDashboard();
        if (id === 'hardware') await this.renderHardware();
        if (id === 'software') await this.renderSoftware();
    }

    setLoader(id, active) {
        const loader = document.getElementById(`loader-${id}`);
        if (loader) loader.classList.toggle('active', active);
    }

    async loadDashboard() {
        this.setLoader('dashboard', true);
        const hw = await this.api.get('hardware');
        const sw = await this.api.get('software');

        document.getElementById('stat-total').textContent = hw.length;
        document.getElementById('stat-sw').textContent = sw.length;

        const tbody = document.getElementById('recent-assets');
        tbody.innerHTML = hw.slice(0, 5).map(h => `
            <tr>
                <td><span style="background:#f1f5f9; padding:2px 8px; border-radius:4px; font-weight:700;">${h.tag}</span></td>
                <td>${h.name}</td>
                <td>${h.model}</td>
                <td>${h.user}</td>
                <td><span style="color:#10b981;">•</span> ${h.status}</td>
            </tr>
        `).join('');
        this.setLoader('dashboard', false);
    }

    async renderHardware() {
        this.setLoader('hardware', true);
        const hw = await this.api.get('hardware');
        const tbody = document.getElementById('hardware-list');
        tbody.innerHTML = hw.map(h => `
            <tr>
                <td><code>${h.tag}</code></td>
                <td>${h.name}</td>
                <td>${h.model}</td>
                <td>${h.user}</td>
                <td>
                    <button class="btn-portal" style="padding: 4px 8px; background:#fef2f2; color:#b91c1c;" onclick="assetManager.deleteHardware('${h.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
        this.setLoader('hardware', false);
    }

    async renderSoftware() {
        this.setLoader('software', true);
        const sw = await this.api.get('software');
        const tbody = document.getElementById('software-list');
        tbody.innerHTML = sw.map(s => `
            <tr>
                <td>${s.publisher}</td>
                <td>${s.name}</td>
                <td>${s.version}</td>
                <td><strong>${s.used}</strong> / ${s.count} Seats</td>
                <td>
                    <button class="btn-portal" style="padding: 4px 8px; background:#fef2f2; color:#b91c1c;" onclick="assetManager.deleteSoftware('${s.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
        this.setLoader('software', false);
    }

    async handleOnboard() {
        this.setLoader('form', true);
        const payload = {
            tag: document.getElementById('assetTag').value,
            name: document.getElementById('assetName').value,
            model: document.getElementById('assetModel').value,
            user: document.getElementById('assetUser').value,
            status: 'In Use'
        };
        await this.api.post('hardware', payload);
        Utils.showToast('Asset Successfully Tagged in MIS', 'success');
        document.getElementById('asset-form').reset();
        this.setLoader('form', false);
        await this.showTab('dashboard');
    }

    async deleteHardware(id) {
        if (!confirm('Decommission asset ' + id + '?')) return;
        this.setLoader('hardware', true);
        await this.api.delete('hardware', id);
        Utils.showToast('Asset decommissioned', 'success');
        await this.renderHardware();
    }

    async deleteSoftware(id) {
        if (!confirm('Reclaim license ' + id + '?')) return;
        this.setLoader('software', true);
        await this.api.delete('software', id);
        Utils.showToast('License reclaimed', 'success');
        await this.renderSoftware();
    }
}

window.assetManager = new AssetManager();
window.showTab = (id) => assetManager.showTab(id);
