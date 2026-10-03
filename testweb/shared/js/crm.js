/**
 * CRM Logic - Mock API Driven
 */

class CRM {
    constructor() {
        this.api = new MockAPI('tamash_crm_store', {
            opportunities: [
                { id: 'DEAL-99', name: 'Cloud Migration', account: 'Acme Corp', amount: 45000, stage: 'Negotiation' },
                { id: 'DEAL-102', name: 'License Renewal', account: 'Globex', amount: 12000, stage: 'Prospecting' }
            ],
            leads: [
                { id: 'LEAD-001', firstName: 'Sam', lastName: 'Altman', account: 'OpenAI', status: 'In Progress' },
                { id: 'LEAD-002', firstName: 'Satya', lastName: 'Nadella', account: 'Microsoft', status: 'New' }
            ],
            accounts: [
                { id: 'ACC-01', name: 'Acme Corp', phone: '+1-555-0199', website: 'acme.io', industry: 'Industrial' },
                { id: 'ACC-02', name: 'Globex Corp', phone: '+1-555-0200', website: 'globex.net', industry: 'Telecom' }
            ]
        });

        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadPipeline();
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.addEventListener('click', async (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                await this.showTab(target);
            });
        });

        const form = document.getElementById('opp-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                await this.handleOppSubmit();
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

        if (id === 'dashboard') await this.loadPipeline();
        if (id === 'leads-tab') await this.renderLeads();
        if (id === 'accounts-tab') await this.renderAccounts();
    }

    setLoader(id, active) {
        const loader = document.getElementById(`loader-${id}`);
        if (loader) loader.classList.toggle('active', active);
    }

    async loadPipeline() {
        this.setLoader('opps', true);
        const opps = await this.api.get('opportunities');
        const leads = await this.api.get('leads');

        const total = opps.reduce((sum, o) => sum + Number(o.amount), 0);
        document.getElementById('total-value').textContent = '$' + total.toLocaleString();
        document.getElementById('stat-leads').textContent = leads.length;

        const tbody = document.getElementById('opp-list');
        tbody.innerHTML = opps.map(opp => `
            <tr>
                <td><code>${opp.id}</code></td>
                <td>${opp.name}</td>
                <td>${opp.account}</td>
                <td>$${Number(opp.amount).toLocaleString()}</td>
                <td><span style="background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:4px; font-size:0.75rem;">${opp.stage}</span></td>
                <td>
                    <button class="btn-portal" style="padding: 4px 8px; background:#fef2f2; color:#b91c1c;" onclick="crm.deleteOpp('${opp.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
        this.setLoader('opps', false);
    }

    async renderLeads() {
        this.setLoader('leads', true);
        const leads = await this.api.get('leads');
        const tbody = document.getElementById('leads-list');
        tbody.innerHTML = leads.map(l => `
            <tr>
                <td><i class="fas fa-user-circle"></i> Sales User</td>
                <td>${l.firstName} ${l.lastName}</td>
                <td>${l.account}</td>
                <td><span class="status-pill pill-new">${l.status}</span></td>
                <td>
                    <button class="btn-portal" style="padding: 4px 8px; background:#fef2f2; color:#b91c1c;" onclick="crm.deleteLead('${l.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
        this.setLoader('leads', false);
    }

    async renderAccounts() {
        this.setLoader('accounts', true);
        const accs = await this.api.get('accounts');
        const tbody = document.getElementById('accounts-list');
        tbody.innerHTML = accs.map(a => `
            <tr>
                <td>${a.name}</td>
                <td>${a.phone}</td>
                <td>${a.website}</td>
                <td>${a.industry}</td>
            </tr>
        `).join('');
        this.setLoader('accounts', false);
    }

    async handleOppSubmit() {
        this.setLoader('form', true);
        const payload = {
            name: document.getElementById('oppName').value,
            account: document.getElementById('oppAccount').value,
            amount: document.getElementById('oppAmount').value,
            stage: document.getElementById('oppStage').value
        };
        await this.api.post('opportunities', payload);
        Utils.showToast('Opportunity Forecasted Successfully', 'success');
        document.getElementById('opp-form').reset();
        this.setLoader('form', false);
        await this.showTab('dashboard');
    }

    async deleteOpp(id) {
        if (!confirm('Drop deal ' + id + '?')) return;
        this.setLoader('opps', true);
        await this.api.delete('opportunities', id);
        Utils.showToast('Deal dropped from pipeline', 'success');
        await this.loadPipeline();
    }

    async deleteLead(id) {
        if (!confirm('Remove lead ' + id + '?')) return;
        this.setLoader('leads', true);
        await this.api.delete('leads', id);
        Utils.showToast('Lead entry removed', 'success');
        await this.renderLeads();
    }
}

window.crm = new CRM();
window.showTab = (id) => crm.showTab(id);
