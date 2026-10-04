/**
 * CRM Application
 * Comprehensive Customer Relationship Management System
 * Modules: Dashboard, Contacts, Leads, Pipeline, Activities, Communications, Campaigns, Support
 */

class CRMApp {
    constructor() {
        this.currentTab = 'dashboard';
        this.editingId = null;
        this.currentEntity = null;

        // Initialize MockAPI with seed data
        this.api = new MockAPI('crm_v2', this.getSeedData());

        this.init();
    }

    /**
     * Seed Data for CRM
     */
    getSeedData() {
        return {
            contacts: [
                { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@techcorp.com', phone: '+1-555-0101', company: 'TechCorp Inc', position: 'VP of Engineering', accountId: 1, notes: 'Key decision maker for infrastructure projects', createdAt: '2024-01-15' },
                { id: 2, firstName: 'Michael', lastName: 'Chen', email: 'mchen@globalretail.com', phone: '+1-555-0102', company: 'Global Retail', position: 'CTO', accountId: 2, notes: 'Interested in digital transformation', createdAt: '2024-01-20' },
                { id: 3, firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.r@innovate.io', phone: '+1-555-0103', company: 'Innovate.io', position: 'Product Manager', accountId: 3, notes: 'Following up on demo request', createdAt: '2024-02-05' },
                { id: 4, firstName: 'David', lastName: 'Thompson', email: 'dthompson@healthcare.org', phone: '+1-555-0104', company: 'HealthCare Plus', position: 'IT Director', accountId: 4, notes: 'HIPAA compliance is priority', createdAt: '2024-02-10' },
                { id: 5, firstName: 'Jessica', lastName: 'Martinez', email: 'jmartinez@finservices.com', phone: '+1-555-0105', company: 'FinServices Group', position: 'Operations Manager', accountId: 5, notes: 'Budget approval pending Q2', createdAt: '2024-02-15' },
                { id: 6, firstName: 'Robert', lastName: 'Kim', email: 'rkim@edutech.edu', phone: '+1-555-0106', company: 'EduTech Solutions', position: 'Director of Technology', accountId: 6, notes: 'Academic discount requested', createdAt: '2024-02-20' },
                { id: 7, firstName: 'Amanda', lastName: 'Wilson', email: 'awilson@techcorp.com', phone: '+1-555-0107', company: 'TechCorp Inc', position: 'Procurement Lead', accountId: 1, notes: 'Handles all vendor contracts', createdAt: '2024-03-01' },
                { id: 8, firstName: 'James', lastName: 'Brown', email: 'jbrown@globalretail.com', phone: '+1-555-0108', company: 'Global Retail', position: 'Finance Director', accountId: 2, notes: 'Signs off on purchases over $50k', createdAt: '2024-03-05' }
            ],
            accounts: [
                { id: 1, name: 'TechCorp Inc', industry: 'Technology', type: 'Enterprise', website: 'www.techcorp.com', phone: '+1-555-1000', address: '123 Tech Blvd, San Francisco, CA', employees: 5000, revenue: '$500M', contacts: 2 },
                { id: 2, name: 'Global Retail', industry: 'Retail', type: 'Enterprise', website: 'www.globalretail.com', phone: '+1-555-2000', address: '456 Commerce St, New York, NY', employees: 15000, revenue: '$2B', contacts: 2 },
                { id: 3, name: 'Innovate.io', industry: 'Technology', type: 'Mid-Market', website: 'www.innovate.io', phone: '+1-555-3000', address: '789 Startup Ave, Austin, TX', employees: 200, revenue: '$25M', contacts: 1 },
                { id: 4, name: 'HealthCare Plus', industry: 'Healthcare', type: 'Enterprise', website: 'www.healthcareplus.org', phone: '+1-555-4000', address: '321 Medical Dr, Boston, MA', employees: 8000, revenue: '$750M', contacts: 1 },
                { id: 5, name: 'FinServices Group', industry: 'Financial', type: 'Enterprise', website: 'www.finservices.com', phone: '+1-555-5000', address: '654 Wall St, Chicago, IL', employees: 3000, revenue: '$400M', contacts: 1 },
                { id: 6, name: 'EduTech Solutions', industry: 'Education', type: 'Mid-Market', website: 'www.edutech.edu', phone: '+1-555-6000', address: '987 Campus Rd, Seattle, WA', employees: 500, revenue: '$50M', contacts: 1 }
            ],
            leads: [
                { id: 1, firstName: 'Thomas', lastName: 'Anderson', email: 'tanderson@matrix.com', company: 'Matrix Corp', position: 'Engineering Lead', phone: '+1-555-0201', source: 'Website', status: 'New', score: 85, rating: 'Hot', assignedTo: 'Sales Team A', createdAt: '2024-03-10' },
                { id: 2, firstName: 'Lisa', lastName: 'Park', email: 'lpark@cloudnine.io', company: 'CloudNine Inc', position: 'VP Operations', phone: '+1-555-0202', source: 'Referral', status: 'Contacted', score: 72, rating: 'Warm', assignedTo: 'Sales Team B', createdAt: '2024-03-08' },
                { id: 3, firstName: 'Kevin', lastName: 'Wright', email: 'kwright@startupx.com', company: 'StartupX', position: 'Founder', phone: '+1-555-0203', source: 'Trade Show', status: 'Qualified', score: 90, rating: 'Hot', assignedTo: 'Sales Team A', createdAt: '2024-03-05' },
                { id: 4, firstName: 'Rachel', lastName: 'Green', email: 'rgreen@fashionco.com', company: 'FashionCo', position: 'Digital Manager', phone: '+1-555-0204', source: 'LinkedIn', status: 'New', score: 45, rating: 'Cold', assignedTo: 'Sales Team C', createdAt: '2024-03-12' },
                { id: 5, firstName: 'Daniel', lastName: 'Lee', email: 'dlee@autoworks.com', company: 'AutoWorks', position: 'IT Manager', phone: '+1-555-0205', source: 'Website', status: 'Contacted', score: 68, rating: 'Warm', assignedTo: 'Sales Team B', createdAt: '2024-03-07' },
                { id: 6, firstName: 'Michelle', lastName: 'Taylor', email: 'mtaylor@greentech.com', company: 'GreenTech', position: 'Sustainability Director', phone: '+1-555-0206', source: 'Conference', status: 'Qualified', score: 78, rating: 'Hot', assignedTo: 'Sales Team A', createdAt: '2024-03-01' }
            ],
            opportunities: [
                { id: 1, name: 'TechCorp Enterprise License', accountId: 1, contactId: 1, amount: 250000, stage: 'Negotiation', probability: 75, closeDate: '2024-04-30', type: 'New Business', notes: 'Final contract review' },
                { id: 2, name: 'Global Retail Digital Transformation', accountId: 2, contactId: 2, amount: 500000, stage: 'Proposal', probability: 50, closeDate: '2024-05-15', type: 'New Business', notes: 'Waiting for budget approval' },
                { id: 3, name: 'Innovate.io Starter Package', accountId: 3, contactId: 3, amount: 35000, stage: 'Qualification', probability: 40, closeDate: '2024-04-20', type: 'New Business', notes: 'Demo scheduled' },
                { id: 4, name: 'HealthCare Plus Compliance Suite', accountId: 4, contactId: 4, amount: 180000, stage: 'Prospect', probability: 20, closeDate: '2024-06-01', type: 'New Business', notes: 'Initial discovery call completed' },
                { id: 5, name: 'TechCorp Support Renewal', accountId: 1, contactId: 7, amount: 75000, stage: 'Closed Won', probability: 100, closeDate: '2024-03-15', type: 'Renewal', notes: 'Renewed for 2 years' },
                { id: 6, name: 'FinServices Analytics Module', accountId: 5, contactId: 5, amount: 120000, stage: 'Closed Lost', probability: 0, closeDate: '2024-03-10', type: 'Expansion', notes: 'Lost to competitor on price' }
            ],
            activities: [
                { id: 1, type: 'Call', subject: 'Follow-up on proposal', contactId: 1, accountId: 1, dueDate: '2024-03-20', dueTime: '10:00', status: 'Scheduled', priority: 'High', notes: 'Discuss contract terms', assignedTo: 'John Smith' },
                { id: 2, type: 'Meeting', subject: 'Product Demo', contactId: 3, accountId: 3, dueDate: '2024-03-22', dueTime: '14:00', status: 'Scheduled', priority: 'High', notes: 'Prepare custom demo environment', assignedTo: 'Sarah Wilson' },
                { id: 3, type: 'Email', subject: 'Send pricing update', contactId: 2, accountId: 2, dueDate: '2024-03-18', dueTime: '09:00', status: 'Completed', priority: 'Medium', notes: 'Include volume discounts', assignedTo: 'John Smith' },
                { id: 4, type: 'Task', subject: 'Prepare quarterly review', contactId: 7, accountId: 1, dueDate: '2024-03-25', dueTime: '16:00', status: 'Scheduled', priority: 'Medium', notes: 'Include usage metrics', assignedTo: 'Mike Johnson' },
                { id: 5, type: 'Call', subject: 'Discovery call', contactId: 4, accountId: 4, dueDate: '2024-03-15', dueTime: '11:00', status: 'Overdue', priority: 'High', notes: 'Understand compliance requirements', assignedTo: 'Sarah Wilson' }
            ],
            communications: [
                { id: 1, type: 'Email', subject: 'Welcome to Our Platform', contactId: 1, accountId: 1, direction: 'Outbound', status: 'Opened', sentAt: '2024-03-10 09:30', template: 'Welcome Series' },
                { id: 2, type: 'Email', subject: 'RE: Product Inquiry', contactId: 2, accountId: 2, direction: 'Inbound', status: 'Replied', sentAt: '2024-03-12 14:15', template: null },
                { id: 3, type: 'Email', subject: 'Monthly Newsletter - March', contactId: 3, accountId: 3, direction: 'Outbound', status: 'Sent', sentAt: '2024-03-01 08:00', template: 'Newsletter' },
                { id: 4, type: 'Call', subject: 'Product Demo Follow-up', contactId: 1, accountId: 1, direction: 'Outbound', status: 'Completed', sentAt: '2024-03-15 10:00', duration: '25 min', notes: 'Very positive response' }
            ],
            campaigns: [
                { id: 1, name: 'Spring Product Launch', type: 'Email', status: 'Active', startDate: '2024-03-01', endDate: '2024-04-15', budget: 15000, sent: 5000, delivered: 4850, opened: 2425, clicked: 485, converted: 48, description: 'New product feature announcement' },
                { id: 2, name: 'Customer Retention Q1', type: 'Email', status: 'Completed', startDate: '2024-01-15', endDate: '2024-02-28', budget: 8000, sent: 3000, delivered: 2940, opened: 1764, clicked: 294, converted: 35, description: 'Re-engage inactive customers' },
                { id: 3, name: 'Trade Show Follow-up', type: 'Email', status: 'Draft', startDate: '2024-04-01', endDate: '2024-04-30', budget: 5000, sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0, description: 'Follow up with trade show leads' }
            ],
            tickets: [
                { id: 1, subject: 'Login Issues After Update', contactId: 1, accountId: 1, priority: 'High', status: 'In Progress', category: 'Technical', createdAt: '2024-03-18 09:00', slaDeadline: '2024-03-19 09:00', assignedTo: 'Tech Support A', description: 'Unable to login after latest system update' },
                { id: 2, subject: 'Invoice Discrepancy', contactId: 8, accountId: 2, priority: 'Medium', status: 'Open', category: 'Billing', createdAt: '2024-03-17 14:30', slaDeadline: '2024-03-20 14:30', assignedTo: 'Billing Team', description: 'Invoice amount does not match contract' },
                { id: 3, subject: 'Feature Request: Dark Mode', contactId: 3, accountId: 3, priority: 'Low', status: 'Open', category: 'Feature Request', createdAt: '2024-03-16 11:00', slaDeadline: '2024-03-23 11:00', assignedTo: 'Product Team', description: 'Customer requesting dark mode option' },
                { id: 4, name: 'API Integration Error', contactId: 4, accountId: 4, priority: 'Critical', status: 'Resolved', category: 'Technical', createdAt: '2024-03-15 08:00', slaDeadline: '2024-03-15 12:00', resolvedAt: '2024-03-15 10:30', assignedTo: 'Tech Support A', description: 'API returning 500 errors intermittently' }
            ]
        };
    }

    /**
     * Initialize Application
     */
    init() {
        this.bindNavigation();
        this.bindModals();
        this.loadDashboard();
    }

    /**
     * Navigation
     */
    bindNavigation() {
        document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = item.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelector(`.nav-item[data-tab="${tab}"]`)?.classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`tab-${tab}`)?.classList.add('active');

        this.currentTab = tab;
        this.loadTabData(tab);
    }

    async loadTabData(tab) {
        switch(tab) {
            case 'dashboard': await this.loadDashboard(); break;
            case 'contacts': await this.loadContacts(); break;
            case 'leads': await this.loadLeads(); break;
            case 'pipeline': await this.loadPipeline(); break;
            case 'activities': await this.loadActivities(); break;
            case 'communications': await this.loadCommunications(); break;
            case 'campaigns': await this.loadCampaigns(); break;
            case 'support': await this.loadSupport(); break;
        }
    }

    /**
     * Dashboard Module
     */
    async loadDashboard() {
        this.showLoader('dashboard-loader');

        try {
            const [contacts, accounts, leads, opportunities, tickets, campaigns] = await Promise.all([
                this.api.getAll('contacts'),
                this.api.getAll('accounts'),
                this.api.getAll('leads'),
                this.api.getAll('opportunities'),
                this.api.getAll('tickets'),
                this.api.getAll('campaigns')
            ]);

            // Update stats
            document.getElementById('stat-contacts').textContent = contacts.length;
            document.getElementById('stat-accounts').textContent = accounts.length;

            const pipelineValue = opportunities
                .filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage))
                .reduce((sum, o) => sum + o.amount, 0);
            document.getElementById('stat-pipeline').textContent = this.formatCurrency(pipelineValue);

            const openTickets = tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
            document.getElementById('stat-tickets').textContent = openTickets;

            const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
            document.getElementById('stat-campaigns').textContent = activeCampaigns;

            // Recent Activity
            this.renderRecentActivity();

            // Pipeline Summary
            this.renderPipelineSummary(opportunities);

        } catch(err) {
            this.showToast('Failed to load dashboard', 'error');
        } finally {
            this.hideLoader('dashboard-loader');
        }
    }

    async renderRecentActivity() {
        const activities = await this.api.getAll('activities');
        const container = document.getElementById('recent-activity-list');

        const recentActivities = activities.slice(0, 5);

        container.innerHTML = recentActivities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type.toLowerCase()}">
                    <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.subject}</div>
                    <div class="activity-meta">
                        <span class="activity-time ${activity.status === 'Overdue' ? 'activity-overdue' : ''}">
                            <i class="fas fa-clock"></i> ${activity.dueDate} at ${activity.dueTime}
                        </span>
                        <span><i class="fas fa-user"></i> ${activity.assignedTo}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPipelineSummary(opportunities) {
        const stages = ['Prospect', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];
        const summary = {};

        stages.forEach(stage => {
            summary[stage] = opportunities.filter(o => o.stage === stage).length;
        });

        document.getElementById('pipeline-summary').innerHTML = stages.map(stage => `
            <div class="funnel-item ${stage.toLowerCase().replace(' ', '-')}">
                <div class="funnel-count">${summary[stage]}</div>
                <div class="funnel-label">${stage}</div>
            </div>
        `).join('');
    }

    /**
     * Contacts & Accounts Module
     */
    async loadContacts() {
        this.showLoader('contacts-loader');

        try {
            const [contacts, accounts] = await Promise.all([
                this.api.getAll('contacts'),
                this.api.getAll('accounts')
            ]);

            // Render contacts table
            const tbody = document.getElementById('contacts-table-body');
            tbody.innerHTML = contacts.map(contact => {
                const account = accounts.find(a => a.id === contact.accountId);
                return `
                    <tr>
                        <td>
                            <div class="table-user">
                                <div class="table-avatar">${contact.firstName[0]}${contact.lastName[0]}</div>
                                <div class="table-user-info">
                                    <h4>${contact.firstName} ${contact.lastName}</h4>
                                    <span>${contact.position}</span>
                                </div>
                            </div>
                        </td>
                        <td>${contact.email}</td>
                        <td>${contact.phone}</td>
                        <td>${account ? account.name : '-'}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-ghost btn-icon" onclick="app.viewContact(${contact.id})" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-ghost btn-icon" onclick="app.editContact(${contact.id})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-ghost btn-icon" onclick="app.deleteContact(${contact.id})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            // Render accounts grid
            const accountsGrid = document.getElementById('accounts-grid');
            accountsGrid.innerHTML = accounts.map(account => `
                <div class="stat-card">
                    <div class="stat-icon purple">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="stat-info">
                        <h3>${account.name}</h3>
                        <div style="font-size: 0.85rem; color: var(--crm-text-muted);">
                            ${account.industry} | ${account.type}
                        </div>
                        <div style="font-size: 0.8rem; margin-top: 4px;">
                            <span><i class="fas fa-users"></i> ${account.contacts} contacts</span>
                        </div>
                    </div>
                </div>
            `).join('');

            // Populate account dropdown in form
            const accountSelect = document.getElementById('contact-account');
            if (accountSelect) {
                accountSelect.innerHTML = '<option value="">Select Account</option>' +
                    accounts.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
            }

        } catch(err) {
            this.showToast('Failed to load contacts', 'error');
        } finally {
            this.hideLoader('contacts-loader');
        }
    }

    async viewContact(id) {
        const contact = await this.api.getById('contacts', id);
        const accounts = await this.api.getAll('accounts');
        const account = accounts.find(a => a.id === contact.accountId);

        document.getElementById('view-contact-name').textContent = `${contact.firstName} ${contact.lastName}`;
        document.getElementById('view-contact-details').innerHTML = `
            <p><strong>Position:</strong> ${contact.position}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Phone:</strong> ${contact.phone}</p>
            <p><strong>Company:</strong> ${account ? account.name : '-'}</p>
            <p><strong>Notes:</strong> ${contact.notes || '-'}</p>
            <p><strong>Created:</strong> ${contact.createdAt}</p>
        `;

        this.openModal('view-contact-modal');
    }

    async editContact(id) {
        const contact = await this.api.getById('contacts', id);
        this.editingId = id;
        this.currentEntity = 'contact';

        document.getElementById('contact-modal-title').textContent = 'Edit Contact';
        document.getElementById('contact-firstName').value = contact.firstName;
        document.getElementById('contact-lastName').value = contact.lastName;
        document.getElementById('contact-email').value = contact.email;
        document.getElementById('contact-phone').value = contact.phone;
        document.getElementById('contact-position').value = contact.position;
        document.getElementById('contact-account').value = contact.accountId || '';
        document.getElementById('contact-notes').value = contact.notes || '';

        this.openModal('contact-modal');
    }

    async saveContact() {
        const data = {
            firstName: document.getElementById('contact-firstName').value,
            lastName: document.getElementById('contact-lastName').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            position: document.getElementById('contact-position').value,
            accountId: parseInt(document.getElementById('contact-account').value) || null,
            notes: document.getElementById('contact-notes').value,
            company: document.getElementById('contact-account').selectedOptions[0]?.text || ''
        };

        if (!data.firstName || !data.lastName || !data.email) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }

        this.showLoader('contact-modal-loader');

        try {
            if (this.editingId) {
                await this.api.update('contacts', this.editingId, data);
                this.showToast('Contact updated successfully', 'success');
            } else {
                data.createdAt = new Date().toISOString().split('T')[0];
                await this.api.create('contacts', data);
                this.showToast('Contact created successfully', 'success');
            }

            this.closeModal('contact-modal');
            this.loadContacts();
        } catch(err) {
            this.showToast('Failed to save contact', 'error');
        } finally {
            this.hideLoader('contact-modal-loader');
        }
    }

    async deleteContact(id) {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            await this.api.delete('contacts', id);
            this.showToast('Contact deleted successfully', 'success');
            this.loadContacts();
        } catch(err) {
            this.showToast('Failed to delete contact', 'error');
        }
    }

    /**
     * Lead Management Module
     */
    async loadLeads() {
        this.showLoader('leads-loader');

        try {
            const leads = await this.api.getAll('leads');

            // Update funnel stats
            const statusCounts = {
                'New': leads.filter(l => l.status === 'New').length,
                'Contacted': leads.filter(l => l.status === 'Contacted').length,
                'Qualified': leads.filter(l => l.status === 'Qualified').length,
                'Converted': leads.filter(l => l.status === 'Converted').length
            };

            document.getElementById('funnel-new').textContent = statusCounts['New'];
            document.getElementById('funnel-contacted').textContent = statusCounts['Contacted'];
            document.getElementById('funnel-qualified').textContent = statusCounts['Qualified'];
            document.getElementById('funnel-converted').textContent = statusCounts['Converted'];

            // Render leads table
            const tbody = document.getElementById('leads-table-body');
            tbody.innerHTML = leads.map(lead => `
                <tr>
                    <td>
                        <div class="table-user">
                            <div class="table-avatar" style="background: #fef3c7; color: #d97706;">
                                ${lead.firstName[0]}${lead.lastName[0]}
                            </div>
                            <div class="table-user-info">
                                <h4>${lead.firstName} ${lead.lastName}</h4>
                                <span>${lead.company}</span>
                            </div>
                        </div>
                    </td>
                    <td>${lead.email}</td>
                    <td>${lead.source}</td>
                    <td>
                        <div class="lead-score">
                            <div class="lead-score-bar">
                                <div class="lead-score-fill ${this.getScoreColor(lead.score)}" style="width: ${lead.score}%"></div>
                            </div>
                            <span class="lead-score-value">${lead.score}</span>
                        </div>
                    </td>
                    <td><span class="badge badge-${lead.rating.toLowerCase()}">${lead.rating}</span></td>
                    <td><span class="badge badge-${lead.status.toLowerCase()}">${lead.status}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="btn btn-ghost btn-icon" onclick="app.editLead(${lead.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-ghost btn-icon" onclick="app.convertLead(${lead.id})" title="Convert to Contact">
                                <i class="fas fa-user-check"></i>
                            </button>
                            <button class="btn btn-ghost btn-icon" onclick="app.deleteLead(${lead.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');

        } catch(err) {
            this.showToast('Failed to load leads', 'error');
        } finally {
            this.hideLoader('leads-loader');
        }
    }

    getScoreColor(score) {
        if (score >= 80) return 'green';
        if (score >= 60) return 'blue';
        if (score >= 40) return 'orange';
        return 'red';
    }

    openAddLead() {
        this.editingId = null;
        this.currentEntity = 'lead';
        document.getElementById('lead-modal-title').textContent = 'Capture New Lead';
        document.getElementById('lead-form').reset();
        this.openModal('lead-modal');
    }

    async editLead(id) {
        const lead = await this.api.getById('leads', id);
        this.editingId = id;
        this.currentEntity = 'lead';

        document.getElementById('lead-modal-title').textContent = 'Edit Lead';
        document.getElementById('lead-firstName').value = lead.firstName;
        document.getElementById('lead-lastName').value = lead.lastName;
        document.getElementById('lead-email').value = lead.email;
        document.getElementById('lead-phone').value = lead.phone;
        document.getElementById('lead-company').value = lead.company;
        document.getElementById('lead-position').value = lead.position;
        document.getElementById('lead-source').value = lead.source;
        document.getElementById('lead-score').value = lead.score;
        document.getElementById('lead-rating').value = lead.rating;
        document.getElementById('lead-status').value = lead.status;

        this.openModal('lead-modal');
    }

    async saveLead() {
        const data = {
            firstName: document.getElementById('lead-firstName').value,
            lastName: document.getElementById('lead-lastName').value,
            email: document.getElementById('lead-email').value,
            phone: document.getElementById('lead-phone').value,
            company: document.getElementById('lead-company').value,
            position: document.getElementById('lead-position').value,
            source: document.getElementById('lead-source').value,
            score: parseInt(document.getElementById('lead-score').value) || 0,
            rating: document.getElementById('lead-rating').value,
            status: document.getElementById('lead-status').value,
            assignedTo: 'Sales Team A'
        };

        if (!data.firstName || !data.lastName || !data.email || !data.company) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }

        if (data.score < 0 || data.score > 100) {
            this.showToast('Score must be between 0 and 100', 'error');
            return;
        }

        this.showLoader('lead-modal-loader');

        try {
            if (this.editingId) {
                await this.api.update('leads', this.editingId, data);
                this.showToast('Lead updated successfully', 'success');
            } else {
                data.createdAt = new Date().toISOString().split('T')[0];
                await this.api.create('leads', data);
                this.showToast('Lead captured successfully', 'success');
            }

            this.closeModal('lead-modal');
            this.loadLeads();
        } catch(err) {
            this.showToast('Failed to save lead', 'error');
        } finally {
            this.hideLoader('lead-modal-loader');
        }
    }

    async convertLead(id) {
        if (!confirm('Convert this lead to a contact?')) return;

        try {
            const lead = await this.api.getById('leads', id);

            // Create contact from lead
            const contactData = {
                firstName: lead.firstName,
                lastName: lead.lastName,
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                position: lead.position,
                notes: `Converted from lead on ${new Date().toISOString().split('T')[0]}`,
                createdAt: new Date().toISOString().split('T')[0]
            };

            await this.api.create('contacts', contactData);

            // Update lead status
            await this.api.update('leads', id, { status: 'Converted' });

            this.showToast('Lead converted to contact successfully', 'success');
            this.loadLeads();
        } catch(err) {
            this.showToast('Failed to convert lead', 'error');
        }
    }

    async deleteLead(id) {
        if (!confirm('Are you sure you want to delete this lead?')) return;

        try {
            await this.api.delete('leads', id);
            this.showToast('Lead deleted successfully', 'success');
            this.loadLeads();
        } catch(err) {
            this.showToast('Failed to delete lead', 'error');
        }
    }

    /**
     * Sales Pipeline Module
     */
    async loadPipeline() {
        this.showLoader('pipeline-loader');

        try {
            const [opportunities, accounts, contacts] = await Promise.all([
                this.api.getAll('opportunities'),
                this.api.getAll('accounts'),
                this.api.getAll('contacts')
            ]);

            const stages = ['Prospect', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];

            stages.forEach(stage => {
                const stageOpps = opportunities.filter(o => o.stage === stage);
                const container = document.getElementById(`stage-${stage.toLowerCase().replace(' ', '-')}`);
                const countEl = document.getElementById(`count-${stage.toLowerCase().replace(' ', '-')}`);

                if (countEl) countEl.textContent = stageOpps.length;

                if (container) {
                    container.innerHTML = stageOpps.map(opp => {
                        const account = accounts.find(a => a.id === opp.accountId);
                        return `
                            <div class="opportunity-card" onclick="app.editOpportunity(${opp.id})">
                                <div class="opp-header">
                                    <span class="opp-name">${opp.name}</span>
                                    <span class="opp-amount">${this.formatCurrency(opp.amount)}</span>
                                </div>
                                <div class="opp-account">${account ? account.name : '-'}</div>
                                <div class="opp-footer">
                                    <span class="opp-probability">
                                        <i class="fas fa-chart-line"></i> ${opp.probability}%
                                    </span>
                                    <span><i class="fas fa-calendar"></i> ${opp.closeDate}</span>
                                </div>
                            </div>
                        `;
                    }).join('') || '<div class="empty-state"><p>No opportunities</p></div>';
                }
            });

            // Update pipeline metrics
            const activeOpps = opportunities.filter(o => !['Closed Won', 'Closed Lost'].includes(o.stage));
            const totalValue = activeOpps.reduce((sum, o) => sum + o.amount, 0);
            const weightedValue = activeOpps.reduce((sum, o) => sum + (o.amount * o.probability / 100), 0);
            const wonValue = opportunities.filter(o => o.stage === 'Closed Won').reduce((sum, o) => sum + o.amount, 0);
            const lostValue = opportunities.filter(o => o.stage === 'Closed Lost').reduce((sum, o) => sum + o.amount, 0);

            document.getElementById('metric-total-value').textContent = this.formatCurrency(totalValue);
            document.getElementById('metric-weighted-value').textContent = this.formatCurrency(weightedValue);
            document.getElementById('metric-won-value').textContent = this.formatCurrency(wonValue);
            document.getElementById('metric-lost-value').textContent = this.formatCurrency(lostValue);

            // Populate dropdowns for opportunity form
            const accountSelect = document.getElementById('opp-account');
            const contactSelect = document.getElementById('opp-contact');

            if (accountSelect) {
                accountSelect.innerHTML = '<option value="">Select Account</option>' +
                    accounts.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
            }

            if (contactSelect) {
                contactSelect.innerHTML = '<option value="">Select Contact</option>' +
                    contacts.map(c => `<option value="${c.id}">${c.firstName} ${c.lastName}</option>`).join('');
            }

        } catch(err) {
            this.showToast('Failed to load pipeline', 'error');
        } finally {
            this.hideLoader('pipeline-loader');
        }
    }

    openAddOpportunity() {
        this.editingId = null;
        this.currentEntity = 'opportunity';
        document.getElementById('opp-modal-title').textContent = 'Create Opportunity';
        document.getElementById('opp-form').reset();
        this.openModal('opp-modal');
    }

    async editOpportunity(id) {
        const opp = await this.api.getById('opportunities', id);
        this.editingId = id;
        this.currentEntity = 'opportunity';

        document.getElementById('opp-modal-title').textContent = 'Edit Opportunity';
        document.getElementById('opp-name').value = opp.name;
        document.getElementById('opp-account').value = opp.accountId || '';
        document.getElementById('opp-contact').value = opp.contactId || '';
        document.getElementById('opp-amount').value = opp.amount;
        document.getElementById('opp-stage').value = opp.stage;
        document.getElementById('opp-probability').value = opp.probability;
        document.getElementById('opp-closeDate').value = opp.closeDate;
        document.getElementById('opp-type').value = opp.type;
        document.getElementById('opp-notes').value = opp.notes || '';

        this.openModal('opp-modal');
    }

    async saveOpportunity() {
        const data = {
            name: document.getElementById('opp-name').value,
            accountId: parseInt(document.getElementById('opp-account').value) || null,
            contactId: parseInt(document.getElementById('opp-contact').value) || null,
            amount: parseFloat(document.getElementById('opp-amount').value) || 0,
            stage: document.getElementById('opp-stage').value,
            probability: parseInt(document.getElementById('opp-probability').value) || 0,
            closeDate: document.getElementById('opp-closeDate').value,
            type: document.getElementById('opp-type').value,
            notes: document.getElementById('opp-notes').value
        };

        if (!data.name || !data.amount || !data.closeDate) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }

        this.showLoader('opp-modal-loader');

        try {
            if (this.editingId) {
                await this.api.update('opportunities', this.editingId, data);
                this.showToast('Opportunity updated successfully', 'success');
            } else {
                await this.api.create('opportunities', data);
                this.showToast('Opportunity created successfully', 'success');
            }

            this.closeModal('opp-modal');
            this.loadPipeline();
        } catch(err) {
            this.showToast('Failed to save opportunity', 'error');
        } finally {
            this.hideLoader('opp-modal-loader');
        }
    }

    /**
     * Activities Module
     */
    async loadActivities() {
        this.showLoader('activities-loader');

        try {
            const [activities, contacts, accounts] = await Promise.all([
                this.api.getAll('activities'),
                this.api.getAll('contacts'),
                this.api.getAll('accounts')
            ]);

            const tbody = document.getElementById('activities-table-body');
            tbody.innerHTML = activities.map(activity => {
                const contact = contacts.find(c => c.id === activity.contactId);
                const isOverdue = activity.status === 'Overdue';

                return `
                    <tr>
                        <td>
                            <div class="activity-icon ${activity.type.toLowerCase()}" style="width: 32px; height: 32px;">
                                <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                            </div>
                        </td>
                        <td><strong>${activity.subject}</strong></td>
                        <td>${activity.type}</td>
                        <td>${contact ? `${contact.firstName} ${contact.lastName}` : '-'}</td>
                        <td class="${isOverdue ? 'text-danger' : ''}">${activity.dueDate} at ${activity.dueTime}</td>
                        <td>
                            <span class="badge badge-${activity.priority.toLowerCase()}">${activity.priority}</span>
                        </td>
                        <td>
                            <span class="badge ${isOverdue ? 'badge-critical' : activity.status === 'Completed' ? 'badge-qualified' : 'badge-new'}">
                                ${activity.status}
                            </span>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-ghost btn-icon" onclick="app.completeActivity(${activity.id})" title="Mark Complete">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-ghost btn-icon" onclick="app.editActivity(${activity.id})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-ghost btn-icon" onclick="app.deleteActivity(${activity.id})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            // Populate contact dropdown
            const contactSelect = document.getElementById('activity-contact');
            if (contactSelect) {
                contactSelect.innerHTML = '<option value="">Select Contact</option>' +
                    contacts.map(c => `<option value="${c.id}">${c.firstName} ${c.lastName}</option>`).join('');
            }

        } catch(err) {
            this.showToast('Failed to load activities', 'error');
        } finally {
            this.hideLoader('activities-loader');
        }
    }

    getActivityIcon(type) {
        const icons = {
            'Call': 'fa-phone',
            'Meeting': 'fa-calendar-check',
            'Email': 'fa-envelope',
            'Task': 'fa-tasks'
        };
        return icons[type] || 'fa-clock';
    }

    openAddActivity() {
        this.editingId = null;
        this.currentEntity = 'activity';
        document.getElementById('activity-modal-title').textContent = 'Schedule Activity';
        document.getElementById('activity-form').reset();
        this.openModal('activity-modal');
    }

    async editActivity(id) {
        const activity = await this.api.getById('activities', id);
        this.editingId = id;
        this.currentEntity = 'activity';

        document.getElementById('activity-modal-title').textContent = 'Edit Activity';
        document.getElementById('activity-type').value = activity.type;
        document.getElementById('activity-subject').value = activity.subject;
        document.getElementById('activity-contact').value = activity.contactId || '';
        document.getElementById('activity-dueDate').value = activity.dueDate;
        document.getElementById('activity-dueTime').value = activity.dueTime;
        document.getElementById('activity-priority').value = activity.priority;
        document.getElementById('activity-notes').value = activity.notes || '';

        this.openModal('activity-modal');
    }

    async saveActivity() {
        const data = {
            type: document.getElementById('activity-type').value,
            subject: document.getElementById('activity-subject').value,
            contactId: parseInt(document.getElementById('activity-contact').value) || null,
            dueDate: document.getElementById('activity-dueDate').value,
            dueTime: document.getElementById('activity-dueTime').value,
            priority: document.getElementById('activity-priority').value,
            notes: document.getElementById('activity-notes').value,
            status: 'Scheduled',
            assignedTo: 'Current User'
        };

        if (!data.subject || !data.dueDate || !data.dueTime) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }

        this.showLoader('activity-modal-loader');

        try {
            if (this.editingId) {
                await this.api.update('activities', this.editingId, data);
                this.showToast('Activity updated successfully', 'success');
            } else {
                await this.api.create('activities', data);
                this.showToast('Activity scheduled successfully', 'success');
            }

            this.closeModal('activity-modal');
            this.loadActivities();
        } catch(err) {
            this.showToast('Failed to save activity', 'error');
        } finally {
            this.hideLoader('activity-modal-loader');
        }
    }

    async completeActivity(id) {
        try {
            await this.api.update('activities', id, { status: 'Completed' });
            this.showToast('Activity marked as completed', 'success');
            this.loadActivities();
        } catch(err) {
            this.showToast('Failed to complete activity', 'error');
        }
    }

    async deleteActivity(id) {
        if (!confirm('Are you sure you want to delete this activity?')) return;

        try {
            await this.api.delete('activities', id);
            this.showToast('Activity deleted successfully', 'success');
            this.loadActivities();
        } catch(err) {
            this.showToast('Failed to delete activity', 'error');
        }
    }

    /**
     * Communications Module
     */
    async loadCommunications() {
        this.showLoader('communications-loader');

        try {
            const [communications, contacts] = await Promise.all([
                this.api.getAll('communications'),
                this.api.getAll('contacts')
            ]);

            const tbody = document.getElementById('communications-table-body');
            tbody.innerHTML = communications.map(comm => {
                const contact = contacts.find(c => c.id === comm.contactId);
                return `
                    <tr>
                        <td>
                            <i class="fas ${comm.type === 'Email' ? 'fa-envelope' : 'fa-phone'}"
                               style="color: var(--accent-communications);"></i>
                        </td>
                        <td><strong>${comm.subject}</strong></td>
                        <td>${contact ? `${contact.firstName} ${contact.lastName}` : '-'}</td>
                        <td>
                            <span class="badge ${comm.direction === 'Outbound' ? 'badge-new' : 'badge-contacted'}">
                                ${comm.direction}
                            </span>
                        </td>
                        <td>
                            <span class="badge badge-${comm.status.toLowerCase().replace(' ', '-')}">
                                ${comm.status}
                            </span>
                        </td>
                        <td>${comm.sentAt}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-ghost btn-icon" onclick="app.viewCommunication(${comm.id})" title="View">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

        } catch(err) {
            this.showToast('Failed to load communications', 'error');
        } finally {
            this.hideLoader('communications-loader');
        }
    }

    async viewCommunication(id) {
        const comm = await this.api.getById('communications', id);
        const contacts = await this.api.getAll('contacts');
        const contact = contacts.find(c => c.id === comm.contactId);

        document.getElementById('view-comm-details').innerHTML = `
            <p><strong>Type:</strong> ${comm.type}</p>
            <p><strong>Subject:</strong> ${comm.subject}</p>
            <p><strong>Contact:</strong> ${contact ? `${contact.firstName} ${contact.lastName}` : '-'}</p>
            <p><strong>Direction:</strong> ${comm.direction}</p>
            <p><strong>Status:</strong> ${comm.status}</p>
            <p><strong>Date/Time:</strong> ${comm.sentAt}</p>
            ${comm.template ? `<p><strong>Template:</strong> ${comm.template}</p>` : ''}
            ${comm.duration ? `<p><strong>Duration:</strong> ${comm.duration}</p>` : ''}
            ${comm.notes ? `<p><strong>Notes:</strong> ${comm.notes}</p>` : ''}
        `;

        this.openModal('view-comm-modal');
    }

    /**
     * Marketing Campaigns Module
     */
    async loadCampaigns() {
        this.showLoader('campaigns-loader');

        try {
            const campaigns = await this.api.getAll('campaigns');

            const grid = document.getElementById('campaigns-grid');
            grid.innerHTML = campaigns.map(campaign => {
                const openRate = campaign.delivered > 0 ? ((campaign.opened / campaign.delivered) * 100).toFixed(1) : 0;
                const clickRate = campaign.opened > 0 ? ((campaign.clicked / campaign.opened) * 100).toFixed(1) : 0;

                return `
                    <div class="campaign-card">
                        <div class="campaign-header">
                            <div class="d-flex justify-between align-center">
                                <h4>${campaign.name}</h4>
                                <span class="badge badge-${campaign.status.toLowerCase()}">${campaign.status}</span>
                            </div>
                            <div class="campaign-type">${campaign.type} Campaign</div>
                        </div>
                        <div class="campaign-metrics">
                            <div class="metric-item">
                                <span>Sent</span>
                                <strong>${campaign.sent.toLocaleString()}</strong>
                            </div>
                            <div class="metric-item">
                                <span>Delivered</span>
                                <strong>${campaign.delivered.toLocaleString()}</strong>
                            </div>
                            <div class="metric-item">
                                <span>Open Rate</span>
                                <strong>${openRate}%</strong>
                            </div>
                            <div class="metric-item">
                                <span>Click Rate</span>
                                <strong>${clickRate}%</strong>
                            </div>
                        </div>
                        <div class="campaign-footer">
                            <span class="text-muted">${campaign.startDate} - ${campaign.endDate}</span>
                            <div class="action-btns">
                                <button class="btn btn-ghost btn-icon" onclick="app.editCampaign(${campaign.id})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-ghost btn-icon" onclick="app.deleteCampaign(${campaign.id})" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

        } catch(err) {
            this.showToast('Failed to load campaigns', 'error');
        } finally {
            this.hideLoader('campaigns-loader');
        }
    }

    openAddCampaign() {
        this.editingId = null;
        this.currentEntity = 'campaign';
        document.getElementById('campaign-modal-title').textContent = 'Create Campaign';
        document.getElementById('campaign-form').reset();
        this.openModal('campaign-modal');
    }

    async editCampaign(id) {
        const campaign = await this.api.getById('campaigns', id);
        this.editingId = id;
        this.currentEntity = 'campaign';

        document.getElementById('campaign-modal-title').textContent = 'Edit Campaign';
        document.getElementById('campaign-name').value = campaign.name;
        document.getElementById('campaign-type').value = campaign.type;
        document.getElementById('campaign-status').value = campaign.status;
        document.getElementById('campaign-startDate').value = campaign.startDate;
        document.getElementById('campaign-endDate').value = campaign.endDate;
        document.getElementById('campaign-budget').value = campaign.budget;
        document.getElementById('campaign-description').value = campaign.description || '';

        this.openModal('campaign-modal');
    }

    async saveCampaign() {
        const data = {
            name: document.getElementById('campaign-name').value,
            type: document.getElementById('campaign-type').value,
            status: document.getElementById('campaign-status').value,
            startDate: document.getElementById('campaign-startDate').value,
            endDate: document.getElementById('campaign-endDate').value,
            budget: parseFloat(document.getElementById('campaign-budget').value) || 0,
            description: document.getElementById('campaign-description').value,
            sent: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
            converted: 0
        };

        if (!data.name || !data.startDate || !data.endDate) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }

        this.showLoader('campaign-modal-loader');

        try {
            if (this.editingId) {
                const existing = await this.api.getById('campaigns', this.editingId);
                // Preserve metrics when editing
                data.sent = existing.sent;
                data.delivered = existing.delivered;
                data.opened = existing.opened;
                data.clicked = existing.clicked;
                data.converted = existing.converted;

                await this.api.update('campaigns', this.editingId, data);
                this.showToast('Campaign updated successfully', 'success');
            } else {
                await this.api.create('campaigns', data);
                this.showToast('Campaign created successfully', 'success');
            }

            this.closeModal('campaign-modal');
            this.loadCampaigns();
        } catch(err) {
            this.showToast('Failed to save campaign', 'error');
        } finally {
            this.hideLoader('campaign-modal-loader');
        }
    }

    async deleteCampaign(id) {
        if (!confirm('Are you sure you want to delete this campaign?')) return;

        try {
            await this.api.delete('campaigns', id);
            this.showToast('Campaign deleted successfully', 'success');
            this.loadCampaigns();
        } catch(err) {
            this.showToast('Failed to delete campaign', 'error');
        }
    }

    /**
     * Support Tickets Module
     */
    async loadSupport() {
        this.showLoader('support-loader');

        try {
            const [tickets, contacts, accounts] = await Promise.all([
                this.api.getAll('tickets'),
                this.api.getAll('contacts'),
                this.api.getAll('accounts')
            ]);

            // Update stats
            const openTickets = tickets.filter(t => t.status === 'Open').length;
            const inProgress = tickets.filter(t => t.status === 'In Progress').length;
            const resolved = tickets.filter(t => t.status === 'Resolved').length;
            const critical = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Resolved').length;

            document.getElementById('tickets-open').textContent = openTickets;
            document.getElementById('tickets-progress').textContent = inProgress;
            document.getElementById('tickets-resolved').textContent = resolved;
            document.getElementById('tickets-critical').textContent = critical;

            // Render tickets table
            const tbody = document.getElementById('tickets-table-body');
            tbody.innerHTML = tickets.map(ticket => {
                const contact = contacts.find(c => c.id === ticket.contactId);
                const account = accounts.find(a => a.id === ticket.accountId);
                const slaStatus = this.getSLAStatus(ticket);

                return `
                    <tr>
                        <td><strong>#${ticket.id}</strong></td>
                        <td>${ticket.subject}</td>
                        <td>${contact ? `${contact.firstName} ${contact.lastName}` : '-'}</td>
                        <td>${account ? account.name : '-'}</td>
                        <td><span class="badge badge-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
                        <td><span class="badge badge-${ticket.status.toLowerCase().replace(' ', '-')}">${ticket.status}</span></td>
                        <td>
                            <span class="sla-indicator ${slaStatus.class}">
                                <i class="fas ${slaStatus.icon}"></i> ${slaStatus.text}
                            </span>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-ghost btn-icon" onclick="app.editTicket(${ticket.id})" title="Edit">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-ghost btn-icon" onclick="app.resolveTicket(${ticket.id})" title="Resolve">
                                    <i class="fas fa-check-circle"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            // Populate dropdowns
            const contactSelect = document.getElementById('ticket-contact');
            const accountSelect = document.getElementById('ticket-account');

            if (contactSelect) {
                contactSelect.innerHTML = '<option value="">Select Contact</option>' +
                    contacts.map(c => `<option value="${c.id}">${c.firstName} ${c.lastName}</option>`).join('');
            }

            if (accountSelect) {
                accountSelect.innerHTML = '<option value="">Select Account</option>' +
                    accounts.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
            }

        } catch(err) {
            this.showToast('Failed to load tickets', 'error');
        } finally {
            this.hideLoader('support-loader');
        }
    }

    getSLAStatus(ticket) {
        if (ticket.status === 'Resolved' || ticket.status === 'Closed') {
            return { class: 'on-track', icon: 'fa-check-circle', text: 'Met' };
        }

        const now = new Date();
        const deadline = new Date(ticket.slaDeadline);
        const hoursLeft = (deadline - now) / (1000 * 60 * 60);

        if (hoursLeft < 0) {
            return { class: 'breached', icon: 'fa-exclamation-circle', text: 'Breached' };
        } else if (hoursLeft < 4) {
            return { class: 'warning', icon: 'fa-exclamation-triangle', text: 'At Risk' };
        }
        return { class: 'on-track', icon: 'fa-clock', text: 'On Track' };
    }

    openAddTicket() {
        this.editingId = null;
        this.currentEntity = 'ticket';
        document.getElementById('ticket-modal-title').textContent = 'Create Ticket';
        document.getElementById('ticket-form').reset();
        this.openModal('ticket-modal');
    }

    async editTicket(id) {
        const ticket = await this.api.getById('tickets', id);
        this.editingId = id;
        this.currentEntity = 'ticket';

        document.getElementById('ticket-modal-title').textContent = 'Edit Ticket';
        document.getElementById('ticket-subject').value = ticket.subject;
        document.getElementById('ticket-contact').value = ticket.contactId || '';
        document.getElementById('ticket-account').value = ticket.accountId || '';
        document.getElementById('ticket-priority').value = ticket.priority;
        document.getElementById('ticket-category').value = ticket.category;
        document.getElementById('ticket-status').value = ticket.status;
        document.getElementById('ticket-description').value = ticket.description || '';

        this.openModal('ticket-modal');
    }

    async saveTicket() {
        const data = {
            subject: document.getElementById('ticket-subject').value,
            contactId: parseInt(document.getElementById('ticket-contact').value) || null,
            accountId: parseInt(document.getElementById('ticket-account').value) || null,
            priority: document.getElementById('ticket-priority').value,
            category: document.getElementById('ticket-category').value,
            status: document.getElementById('ticket-status').value,
            description: document.getElementById('ticket-description').value,
            assignedTo: 'Support Team'
        };

        if (!data.subject) {
            this.showToast('Please fill in required fields', 'error');
            return;
        }

        this.showLoader('ticket-modal-loader');

        try {
            if (this.editingId) {
                await this.api.update('tickets', this.editingId, data);
                this.showToast('Ticket updated successfully', 'success');
            } else {
                // Set SLA based on priority
                const slaHours = { 'Critical': 4, 'High': 8, 'Medium': 24, 'Low': 48 };
                const now = new Date();
                now.setHours(now.getHours() + slaHours[data.priority]);
                data.slaDeadline = now.toISOString();
                data.createdAt = new Date().toISOString();

                await this.api.create('tickets', data);
                this.showToast('Ticket created successfully', 'success');
            }

            this.closeModal('ticket-modal');
            this.loadSupport();
        } catch(err) {
            this.showToast('Failed to save ticket', 'error');
        } finally {
            this.hideLoader('ticket-modal-loader');
        }
    }

    async resolveTicket(id) {
        if (!confirm('Mark this ticket as resolved?')) return;

        try {
            await this.api.update('tickets', id, {
                status: 'Resolved',
                resolvedAt: new Date().toISOString()
            });
            this.showToast('Ticket resolved successfully', 'success');
            this.loadSupport();
        } catch(err) {
            this.showToast('Failed to resolve ticket', 'error');
        }
    }

    /**
     * Search Functionality
     */
    searchContacts(query) {
        const rows = document.querySelectorAll('#contacts-table-body tr');
        const lowerQuery = query.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(lowerQuery) ? '' : 'none';
        });
    }

    searchLeads(query) {
        const rows = document.querySelectorAll('#leads-table-body tr');
        const lowerQuery = query.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(lowerQuery) ? '' : 'none';
        });
    }

    searchTickets(query) {
        const rows = document.querySelectorAll('#tickets-table-body tr');
        const lowerQuery = query.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(lowerQuery) ? '' : 'none';
        });
    }

    /**
     * Modal Management
     */
    bindModals() {
        // Close modal on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('open');
                }
            });
        });

        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.open').forEach(m => {
                    m.classList.remove('open');
                });
            }
        });
    }

    openModal(id) {
        document.getElementById(id)?.classList.add('open');
    }

    closeModal(id) {
        document.getElementById(id)?.classList.remove('open');
        this.editingId = null;
        this.currentEntity = null;
    }

    openAddContact() {
        this.editingId = null;
        this.currentEntity = 'contact';
        document.getElementById('contact-modal-title').textContent = 'Add New Contact';
        document.getElementById('contact-form').reset();
        this.openModal('contact-modal');
    }

    /**
     * Utility Methods
     */
    showLoader(id) {
        document.getElementById(id)?.classList.add('active');
    }

    hideLoader(id) {
        document.getElementById(id)?.classList.remove('active');
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: 'fa-check',
            error: 'fa-times',
            warning: 'fa-exclamation',
            info: 'fa-info'
        };

        toast.innerHTML = `
            <div class="toast-icon"><i class="fas ${icons[type]}"></i></div>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        setTimeout(() => toast.remove(), 4000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new CRMApp();
});
