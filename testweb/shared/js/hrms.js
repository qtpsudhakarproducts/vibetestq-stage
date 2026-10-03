/**
 * HRMS Logic - Mock API Driven
 */

class HRMS {
    constructor() {
        this.api = new MockAPI('tamash_hrms_store', {
            employees: [
                { id: 'E2042', firstName: 'Admin', lastName: 'Master', jobTitle: 'System Admin', department: 'Operations', status: 'Active' },
                { id: 'E7710', firstName: 'John', lastName: 'Cypress', jobTitle: 'QA Engineer', department: 'Quality Assurance', status: 'Active' },
                { id: 'E8812', firstName: 'Sarah', lastName: 'Playwright', jobTitle: 'Senior QA Automation', department: 'Quality Assurance', status: 'Active' }
            ],
            activities: [
                { id: 'ACT001', type: 'System', action: 'HRMS Environment Initialized', user: 'System', time: new Date().toISOString() }
            ]
        });

        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadDashboard();
    }

    setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.addEventListener('click', async (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                await this.showTab(target);
            });
        });

        // Form Submit
        const form = document.getElementById('add-employee-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                await this.handleFormSubmit();
            };
        }

        // Search
        const searchInput = document.getElementById('employee-search');
        if (searchInput) {
            searchInput.oninput = Utils.debounce(() => this.renderEmployees(searchInput.value), 300);
        }
    }

    async showTab(id) {
        document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        const target = document.getElementById(id);
        if (target) target.classList.add('active');
        const link = document.querySelector(`.nav-link[data-target="${id}"]`);
        if (link) link.classList.add('active');

        // Contextual Load
        if (id === 'dashboard') await this.loadDashboard();
        if (id === 'employee-list') await this.renderEmployees();
        if (id === 'leave-mgt') await this.loadLeaves();
    }

    setLoader(id, active) {
        const loader = document.getElementById(`loader-${id}`);
        if (loader) loader.classList.toggle('active', active);
    }

    async loadDashboard() {
        this.setLoader('dashboard', true);
        const emps = await this.api.get('employees');
        const acts = await this.api.get('activities');

        document.getElementById('total-employees').textContent = emps.length;
        document.getElementById('pending-leaves').textContent = '2'; // Dummy for now

        const tbody = document.getElementById('recent-activities');
        tbody.innerHTML = acts.slice(0, 8).map(act => `
            <tr>
                <td><strong>${act.type}</strong>: ${act.action}</td>
                <td>HR Operations</td>
                <td>${act.user}</td>
                <td style="font-size: 0.8rem; color: #64748b;">${new Date(act.time).toLocaleTimeString()}</td>
            </tr>
        `).join('');

        this.setLoader('dashboard', false);
    }

    async renderEmployees(filter = '') {
        this.setLoader('employees', true);
        let emps = await this.api.get('employees');

        if (filter) {
            filter = filter.toLowerCase();
            emps = emps.filter(e => e.firstName.toLowerCase().includes(filter) || e.lastName.toLowerCase().includes(filter) || e.id.toLowerCase().includes(filter));
        }

        const tbody = document.getElementById('employee-table-body');
        tbody.innerHTML = emps.map(e => `
            <tr>
                <td><code style="background: #f1f5f9; padding: 2px 4px; border-radius: 4px;">${e.id}</code></td>
                <td>${e.firstName} ${e.lastName}</td>
                <td>${e.jobTitle}</td>
                <td>${e.department}</td>
                <td><span class="status-badge" style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:4px; font-size:0.75rem;">${e.status}</span></td>
                <td>
                    <button class="btn-portal" style="padding: 4px 8px; font-size:0.7rem; background:#eff6ff; color:#1d4ed8;" onclick="hrms.prepEdit('${e.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn-portal" style="padding: 4px 8px; font-size:0.7rem; background:#fef2f2; color:#b91c1c;" onclick="hrms.deleteEmp('${e.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
        this.setLoader('employees', false);
    }

    async handleFormSubmit() {
        const form = document.getElementById('add-employee-form');
        this.setLoader('form', true);

        const payload = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            jobTitle: document.getElementById('jobTitle').value,
            department: document.getElementById('department').value,
            status: 'Active'
        };

        const editingId = form.dataset.editId;
        if (editingId) {
            await this.api.put('employees', editingId, payload);
            await this.api.post('activities', { type: 'PIM', action: `Record updated for ${editingId}`, user: 'System', time: new Date().toISOString() });
            Utils.showToast('Employee Data Synchronized', 'success');
        } else {
            const newEmp = await this.api.post('employees', payload);
            await this.api.post('activities', { type: 'PIM', action: `New Onboarding: ${newEmp.id}`, user: 'System', time: new Date().toISOString() });
            Utils.showToast('Onboarding Completed', 'success');
        }

        form.reset();
        delete form.dataset.editId;
        this.setLoader('form', false);
        await this.showTab('employee-list');
    }

    async prepEdit(id) {
        const emps = await this.api.get('employees');
        const e = emps.find(i => i.id === id);
        if (!e) return;

        await this.showTab('add-employee');
        const form = document.getElementById('add-employee-form');
        form.dataset.editId = id;

        document.getElementById('firstName').value = e.firstName;
        document.getElementById('lastName').value = e.lastName;
        document.getElementById('jobTitle').value = e.jobTitle;
        document.getElementById('department').value = e.department;

        document.getElementById('submit-btn').textContent = 'Update Profile';
        document.getElementById('form-title').textContent = 'Employee Profile / Editing ' + id;
    }

    async deleteEmp(id) {
        if (!confirm(`Permanently remove employee ${id}?`)) return;

        this.setLoader('employees', true);
        await this.api.delete('employees', id);
        await this.api.post('activities', { type: 'Security', action: `Record purged: ${id}`, user: 'Admin', time: new Date().toISOString() });
        Utils.showToast('Record purged from database', 'success');
        await this.renderEmployees();
    }

    async loadLeaves() {
        this.setLoader('leaves', true);
        // Simulating data
        const tbody = document.getElementById('leave-table-body');
        setTimeout(() => {
            tbody.innerHTML = `
                <tr>
                    <td><code>E8812</code></td>
                    <td>Annual Leave</td>
                    <td>3 Days (Feb 20 - Feb 22)</td>
                    <td>Policy GL-QA</td>
                    <td><span style="color:#f59e0b;">Pending Review</span></td>
                </tr>
            `;
            this.setLoader('leaves', false);
        }, 800);
    }
}

// Initialize Instance
window.hrms = new HRMS();
window.showTab = (id) => hrms.showTab(id);
