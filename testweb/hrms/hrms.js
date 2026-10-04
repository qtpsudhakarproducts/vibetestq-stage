/**
 * HRMS Application - Human Resource Management System
 * Playwright Test Automation Practice Application
 */

class HRMSApp {
    constructor() {
        this.api = new MockAPI('hrms_v2', this.getSeedData());
        this.currentUser = { id: 'E2001', name: 'Admin Master', role: 'HR Manager' };
        this.currentTab = 'dashboard';
        this.editingId = null;
        this.clockedIn = false;
        this.clockInTime = null;
        this.init();
    }

    getSeedData() {
        return {
            employees: [
                { id: 'EMP-001', employeeId: 'E2001', firstName: 'Admin', lastName: 'Master', email: 'admin@company.com', phone: '+91-9876500001', dob: '1985-03-15', gender: 'Male', jobTitle: 'HR Manager', department: 'Human Resources', reportingTo: null, joinDate: '2018-01-15', status: 'Active', salary: 95000, leaveBalances: { annual: 20, sick: 12, personal: 5, compOff: 0 } },
                { id: 'EMP-002', employeeId: 'E2042', firstName: 'Rahul', lastName: 'Sharma', email: 'rahul.sharma@company.com', phone: '+91-9876543210', dob: '1990-05-15', gender: 'Male', jobTitle: 'Senior QA Engineer', department: 'Quality Assurance', reportingTo: 'E2001', joinDate: '2020-03-15', status: 'Active', salary: 85000, leaveBalances: { annual: 18, sick: 10, personal: 5, compOff: 2 } },
                { id: 'EMP-003', employeeId: 'E2043', firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@company.com', phone: '+91-9876543211', dob: '1992-08-22', gender: 'Female', jobTitle: 'UI/UX Designer', department: 'Design', reportingTo: 'E2001', joinDate: '2021-06-01', status: 'Active', salary: 75000, leaveBalances: { annual: 15, sick: 8, personal: 4, compOff: 1 } },
                { id: 'EMP-004', employeeId: 'E2044', firstName: 'Amit', lastName: 'Kumar', email: 'amit.kumar@company.com', phone: '+91-9876543212', dob: '1988-12-10', gender: 'Male', jobTitle: 'DevOps Engineer', department: 'Engineering', reportingTo: 'E2046', joinDate: '2022-01-10', status: 'Active', salary: 90000, leaveBalances: { annual: 12, sick: 10, personal: 5, compOff: 3 } },
                { id: 'EMP-005', employeeId: 'E2045', firstName: 'Sneha', lastName: 'Reddy', email: 'sneha.reddy@company.com', phone: '+91-9876543213', dob: '1991-07-28', gender: 'Female', jobTitle: 'Product Manager', department: 'Product', reportingTo: 'E2001', joinDate: '2019-08-20', status: 'On Leave', salary: 110000, leaveBalances: { annual: 10, sick: 6, personal: 3, compOff: 0 } },
                { id: 'EMP-006', employeeId: 'E2046', firstName: 'Vikram', lastName: 'Singh', email: 'vikram.singh@company.com', phone: '+91-9876543214', dob: '1986-02-14', gender: 'Male', jobTitle: 'Software Architect', department: 'Engineering', reportingTo: 'E2001', joinDate: '2017-05-15', status: 'Active', salary: 150000, leaveBalances: { annual: 22, sick: 12, personal: 5, compOff: 4 } },
                { id: 'EMP-007', employeeId: 'E2047', firstName: 'Deepa', lastName: 'Nair', email: 'deepa.nair@company.com', phone: '+91-9876543215', dob: '1994-11-05', gender: 'Female', jobTitle: 'Data Scientist', department: 'Analytics', reportingTo: 'E2046', joinDate: '2023-02-01', status: 'Active', salary: 95000, leaveBalances: { annual: 8, sick: 10, personal: 5, compOff: 0 } },
                { id: 'EMP-008', employeeId: 'E2048', firstName: 'Arjun', lastName: 'Mehta', email: 'arjun.mehta@company.com', phone: '+91-9876543216', dob: '1996-04-18', gender: 'Male', jobTitle: 'Junior Developer', department: 'Engineering', reportingTo: 'E2046', joinDate: '2024-07-01', status: 'Active', salary: 55000, leaveBalances: { annual: 6, sick: 10, personal: 5, compOff: 1 } }
            ],
            leaves: [
                { id: 'LV-001', employeeId: 'E2042', employeeName: 'Rahul Sharma', leaveType: 'Annual', startDate: '2026-02-20', endDate: '2026-02-22', days: 3, reason: 'Family vacation to Goa', status: 'Pending', appliedOn: '2026-02-15T09:00:00Z' },
                { id: 'LV-002', employeeId: 'E2045', employeeName: 'Sneha Reddy', leaveType: 'Sick', startDate: '2026-02-17', endDate: '2026-02-19', days: 3, reason: 'Medical appointment and recovery', status: 'Approved', appliedOn: '2026-02-16T10:30:00Z', approvedBy: 'E2001', approvedOn: '2026-02-16T14:00:00Z' },
                { id: 'LV-003', employeeId: 'E2043', employeeName: 'Priya Patel', leaveType: 'Personal', startDate: '2026-02-25', endDate: '2026-02-25', days: 1, reason: 'Personal errands', status: 'Pending', appliedOn: '2026-02-18T08:00:00Z' },
                { id: 'LV-004', employeeId: 'E2044', employeeName: 'Amit Kumar', leaveType: 'Comp-Off', startDate: '2026-02-28', endDate: '2026-02-28', days: 1, reason: 'Worked on weekend for deployment', status: 'Approved', appliedOn: '2026-02-14T11:00:00Z', approvedBy: 'E2001', approvedOn: '2026-02-14T15:00:00Z' }
            ],
            attendance: [
                { id: 'ATT-001', employeeId: 'E2042', employeeName: 'Rahul Sharma', date: '2026-02-18', clockIn: '09:15:00', clockOut: null, status: 'Present', workType: 'Office', totalHours: 0 },
                { id: 'ATT-002', employeeId: 'E2043', employeeName: 'Priya Patel', date: '2026-02-18', clockIn: '09:00:00', clockOut: null, status: 'Present', workType: 'Remote', totalHours: 0 },
                { id: 'ATT-003', employeeId: 'E2044', employeeName: 'Amit Kumar', date: '2026-02-18', clockIn: '08:45:00', clockOut: '18:30:00', status: 'Present', workType: 'Office', totalHours: 9.75 }
            ],
            jobs: [
                { id: 'JOB-001', title: 'Senior Software Engineer', department: 'Engineering', location: 'Bangalore', type: 'Full-Time', experience: '5-8 years', salary: '$80,000 - $120,000', description: 'We are looking for an experienced software engineer to join our core platform team.', requirements: ['Java', 'Spring Boot', 'AWS', 'Microservices'], status: 'Open', postedDate: '2026-01-15', closingDate: '2026-03-15', hiringManager: 'E2046', applicantCount: 25 },
                { id: 'JOB-002', title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-Time', experience: '4-6 years', salary: '$70,000 - $100,000', description: 'Seeking a product manager to drive our B2B product strategy.', requirements: ['Product Strategy', 'Agile', 'Data Analysis', 'Stakeholder Management'], status: 'Open', postedDate: '2026-02-01', closingDate: '2026-03-30', hiringManager: 'E2001', applicantCount: 18 },
                { id: 'JOB-003', title: 'QA Automation Lead', department: 'Quality Assurance', location: 'Hyderabad', type: 'Full-Time', experience: '6-10 years', salary: '$90,000 - $130,000', description: 'Lead our QA automation efforts and build a world-class testing framework.', requirements: ['Playwright', 'Selenium', 'CI/CD', 'Test Strategy'], status: 'On Hold', postedDate: '2026-01-20', closingDate: '2026-02-28', hiringManager: 'E2001', applicantCount: 12 }
            ],
            candidates: [
                { id: 'CAN-001', jobId: 'JOB-001', firstName: 'Kavita', lastName: 'Joshi', email: 'kavita.joshi@email.com', phone: '+91-9123456789', experience: '6 years', currentCompany: 'TechCorp', expectedSalary: 95000, skills: ['Java', 'Spring Boot', 'AWS'], stage: 'Interview', rating: 4, appliedDate: '2026-02-01', notes: 'Strong technical background' },
                { id: 'CAN-002', jobId: 'JOB-001', firstName: 'Ravi', lastName: 'Verma', email: 'ravi.verma@email.com', phone: '+91-9123456790', experience: '7 years', currentCompany: 'InfoSys', expectedSalary: 110000, skills: ['Java', 'Kubernetes', 'Microservices'], stage: 'Screening', rating: 3, appliedDate: '2026-02-05', notes: 'Good experience but high salary expectation' },
                { id: 'CAN-003', jobId: 'JOB-002', firstName: 'Meera', lastName: 'Gupta', email: 'meera.gupta@email.com', phone: '+91-9123456791', experience: '5 years', currentCompany: 'Flipkart', expectedSalary: 90000, skills: ['Product Strategy', 'Agile', 'SQL'], stage: 'Offer', rating: 5, appliedDate: '2026-02-03', notes: 'Excellent product sense, offer extended' },
                { id: 'CAN-004', jobId: 'JOB-001', firstName: 'Suresh', lastName: 'Menon', email: 'suresh.menon@email.com', phone: '+91-9123456792', experience: '5 years', currentCompany: 'Wipro', expectedSalary: 85000, skills: ['Java', 'Python', 'Docker'], stage: 'Applied', rating: 0, appliedDate: '2026-02-10', notes: '' }
            ],
            reviews: [
                { id: 'REV-001', employeeId: 'E2042', employeeName: 'Rahul Sharma', reviewCycle: 'Q4-2025', reviewType: '360-Degree', reviewerId: 'E2001', reviewerName: 'Admin Master', status: 'Completed', goals: [{ title: 'Automation Coverage', achievement: 95 }, { title: 'Mentoring', achievement: 100 }], overallRating: 4.2, strengths: 'Strong technical skills, excellent problem solver', improvements: 'Can improve delegation', reviewedOn: '2026-01-10' },
                { id: 'REV-002', employeeId: 'E2043', employeeName: 'Priya Patel', reviewCycle: 'Q4-2025', reviewType: 'Manager', reviewerId: 'E2001', reviewerName: 'Admin Master', status: 'Pending', goals: [], overallRating: null, strengths: '', improvements: '', reviewedOn: null },
                { id: 'REV-003', employeeId: 'E2044', employeeName: 'Amit Kumar', reviewCycle: 'Q4-2025', reviewType: 'Peer', reviewerId: 'E2042', reviewerName: 'Rahul Sharma', status: 'Pending', goals: [], overallRating: null, strengths: '', improvements: '', reviewedOn: null }
            ],
            goals: [
                { id: 'GOAL-001', employeeId: 'E2042', employeeName: 'Rahul Sharma', title: 'Increase test automation coverage to 80%', description: 'Implement automated tests for all critical modules', period: 'Q1-2026', progress: 65, status: 'In Progress', dueDate: '2026-03-31', priority: 'High' },
                { id: 'GOAL-002', employeeId: 'E2042', employeeName: 'Rahul Sharma', title: 'Mentor 2 junior engineers', description: 'Guide new team members on automation best practices', period: 'Q1-2026', progress: 100, status: 'Completed', dueDate: '2026-02-28', priority: 'Medium' },
                { id: 'GOAL-003', employeeId: 'E2043', employeeName: 'Priya Patel', title: 'Redesign mobile app UI', description: 'Create new design system for mobile application', period: 'Q1-2026', progress: 40, status: 'In Progress', dueDate: '2026-03-15', priority: 'High' },
                { id: 'GOAL-004', employeeId: 'E2044', employeeName: 'Amit Kumar', title: 'Implement CI/CD pipeline', description: 'Set up automated deployment pipeline for all services', period: 'Q1-2026', progress: 80, status: 'In Progress', dueDate: '2026-02-28', priority: 'High' }
            ],
            users: [
                { id: 'USR-001', employeeId: 'E2001', username: 'admin.master', email: 'admin@company.com', role: 'HR Manager', permissions: ['all'], status: 'Active', lastLogin: '2026-02-18T08:00:00Z' },
                { id: 'USR-002', employeeId: 'E2042', username: 'rahul.sharma', email: 'rahul.sharma@company.com', role: 'Employee', permissions: ['view_self', 'apply_leave'], status: 'Active', lastLogin: '2026-02-18T09:15:00Z' },
                { id: 'USR-003', employeeId: 'E2046', username: 'vikram.singh', email: 'vikram.singh@company.com', role: 'Manager', permissions: ['view_team', 'approve_leave'], status: 'Active', lastLogin: '2026-02-17T18:00:00Z' }
            ],
            auditLogs: [
                { id: 'LOG-001', timestamp: '2026-02-18T09:00:00Z', userId: 'E2001', userName: 'Admin Master', action: 'LOGIN', module: 'Auth', details: 'User logged in successfully' },
                { id: 'LOG-002', timestamp: '2026-02-18T09:15:00Z', userId: 'E2042', userName: 'Rahul Sharma', action: 'CREATE', module: 'Leave', details: 'Applied for annual leave (3 days)' },
                { id: 'LOG-003', timestamp: '2026-02-18T08:30:00Z', userId: 'E2001', userName: 'Admin Master', action: 'UPDATE', module: 'Employee', details: 'Updated employee profile for E2043' },
                { id: 'LOG-004', timestamp: '2026-02-17T14:00:00Z', userId: 'E2001', userName: 'Admin Master', action: 'APPROVE', module: 'Leave', details: 'Approved leave request LV-002' }
            ],
            activities: [
                { id: 'ACT-001', type: 'leave', icon: 'calendar-plus', action: 'Rahul Sharma applied for 3 days annual leave', time: '2026-02-18T09:15:00Z' },
                { id: 'ACT-002', type: 'recruit', icon: 'user-plus', action: 'New applicant for Senior Software Engineer position', time: '2026-02-18T08:30:00Z' },
                { id: 'ACT-003', type: 'perf', icon: 'star', action: 'Q4-2025 review completed for Rahul Sharma', time: '2026-02-17T14:00:00Z' },
                { id: 'ACT-004', type: 'time', icon: 'clock', action: 'Amit Kumar clocked out at 6:30 PM', time: '2026-02-17T18:30:00Z' }
            ]
        };
    }

    async init() {
        this.setupNavigation();
        this.setupModals();
        await this.loadDashboard();
        this.startClock();
    }

    // Navigation
    setupNavigation() {
        document.querySelectorAll('.hrms-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (tab) this.showTab(tab);
            });
        });
    }

    async showTab(tabId) {
        // Update nav
        document.querySelectorAll('.hrms-nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tabId);
        });

        // Update tab content
        document.querySelectorAll('.hrms-tab').forEach(tab => {
            tab.classList.toggle('active', tab.id === `tab-${tabId}`);
        });

        // Update header
        const titles = {
            'dashboard': '<i class="fas fa-th-large"></i> Dashboard',
            'pim': '<i class="fas fa-users"></i> People Management',
            'leave': '<i class="fas fa-calendar-alt"></i> Leave Management',
            'time': '<i class="fas fa-clock"></i> Time & Attendance',
            'recruit': '<i class="fas fa-user-tie"></i> Recruitment',
            'performance': '<i class="fas fa-chart-line"></i> Performance',
            'admin': '<i class="fas fa-cog"></i> Administration'
        };
        document.getElementById('header-title').innerHTML = titles[tabId] || 'Dashboard';

        this.currentTab = tabId;

        // Load tab data
        switch (tabId) {
            case 'dashboard': await this.loadDashboard(); break;
            case 'pim': await this.loadEmployees(); break;
            case 'leave': await this.loadLeaves(); break;
            case 'time': await this.loadAttendance(); break;
            case 'recruit': await this.loadJobs(); break;
            case 'performance': await this.loadPerformance(); break;
            case 'admin': await this.loadAdmin(); break;
        }
    }

    // Modal Management
    setupModals() {
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.hrms-modal').classList.remove('open');
            });
        });

        document.querySelectorAll('.hrms-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        });
    }

    openModal(id) {
        document.getElementById(id)?.classList.add('open');
    }

    closeModal(id) {
        document.getElementById(id)?.classList.remove('open');
        this.editingId = null;
    }

    // Dashboard
    async loadDashboard() {
        const employees = await this.api.get('employees');
        const leaves = await this.api.get('leaves');
        const jobs = await this.api.get('jobs');
        const reviews = await this.api.get('reviews');
        const activities = await this.api.get('activities');

        // Stats
        document.getElementById('stat-employees').textContent = employees.length;
        document.getElementById('stat-onleave').textContent = employees.filter(e => e.status === 'On Leave').length;
        document.getElementById('stat-pending-leaves').textContent = leaves.filter(l => l.status === 'Pending').length;
        document.getElementById('stat-open-jobs').textContent = jobs.filter(j => j.status === 'Open').length;
        document.getElementById('stat-pending-reviews').textContent = reviews.filter(r => r.status === 'Pending').length;

        // Activities
        const activityHtml = activities.slice(0, 5).map(act => `
            <div class="activity-item">
                <div class="activity-icon ${act.type}"><i class="fas fa-${act.icon}"></i></div>
                <div class="activity-content">
                    <p>${act.action}</p>
                    <span class="time">${this.formatTime(act.time)}</span>
                </div>
            </div>
        `).join('');
        document.getElementById('activity-feed').innerHTML = activityHtml || '<p class="empty-state">No recent activity</p>';
    }

    // People Management (PIM)
    async loadEmployees(filter = '', dept = 'all') {
        await this.delay(800);
        const employees = await this.api.get('employees');

        let filtered = employees;
        if (filter) {
            const q = filter.toLowerCase();
            filtered = filtered.filter(e =>
                e.firstName.toLowerCase().includes(q) ||
                e.lastName.toLowerCase().includes(q) ||
                e.employeeId.toLowerCase().includes(q) ||
                e.email.toLowerCase().includes(q)
            );
        }
        if (dept !== 'all') {
            filtered = filtered.filter(e => e.department === dept);
        }

        const tbody = document.getElementById('employees-body');
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No employees found</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(emp => `
            <tr>
                <td>
                    <div class="emp-info">
                        <div class="emp-avatar">${emp.firstName[0]}${emp.lastName[0]}</div>
                        <div class="emp-details">
                            <div class="name">${emp.firstName} ${emp.lastName}</div>
                            <div class="email">${emp.email}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge badge-info">${emp.employeeId}</span></td>
                <td>${emp.jobTitle}</td>
                <td>${emp.department}</td>
                <td><span class="badge badge-${emp.status === 'Active' ? 'success' : emp.status === 'On Leave' ? 'warning' : 'danger'}">${emp.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-icon btn-secondary" onclick="hrmsApp.viewEmployee('${emp.id}')" title="View"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-icon btn-secondary" onclick="hrmsApp.editEmployee('${emp.id}')" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon btn-secondary" onclick="hrmsApp.deleteEmployee('${emp.id}')" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    searchEmployees() {
        const query = document.getElementById('emp-search').value;
        const dept = document.getElementById('emp-filter-dept').value;
        this.loadEmployees(query, dept);
    }

    async viewEmployee(id) {
        const employees = await this.api.get('employees');
        const emp = employees.find(e => e.id === id);
        if (!emp) return;

        document.getElementById('view-emp-name').textContent = `${emp.firstName} ${emp.lastName}`;
        document.getElementById('view-emp-title').textContent = `${emp.jobTitle} | ${emp.department}`;
        document.getElementById('view-emp-status').textContent = emp.status;
        document.getElementById('view-emp-status').className = `badge badge-${emp.status === 'Active' ? 'success' : 'warning'}`;

        document.getElementById('view-emp-details').innerHTML = `
            <div class="detail-grid">
                <div class="detail-item"><div class="label">Employee ID</div><div class="value">${emp.employeeId}</div></div>
                <div class="detail-item"><div class="label">Email</div><div class="value">${emp.email}</div></div>
                <div class="detail-item"><div class="label">Phone</div><div class="value">${emp.phone || 'N/A'}</div></div>
                <div class="detail-item"><div class="label">Date of Birth</div><div class="value">${emp.dob || 'N/A'}</div></div>
                <div class="detail-item"><div class="label">Gender</div><div class="value">${emp.gender || 'N/A'}</div></div>
                <div class="detail-item"><div class="label">Join Date</div><div class="value">${emp.joinDate}</div></div>
                <div class="detail-item"><div class="label">Department</div><div class="value">${emp.department}</div></div>
                <div class="detail-item"><div class="label">Job Title</div><div class="value">${emp.jobTitle}</div></div>
            </div>
            <h4 style="margin-top:1.5rem;margin-bottom:0.75rem;">Leave Balances</h4>
            <div class="detail-grid">
                <div class="detail-item"><div class="label">Annual</div><div class="value">${emp.leaveBalances?.annual || 0} days</div></div>
                <div class="detail-item"><div class="label">Sick</div><div class="value">${emp.leaveBalances?.sick || 0} days</div></div>
                <div class="detail-item"><div class="label">Personal</div><div class="value">${emp.leaveBalances?.personal || 0} days</div></div>
                <div class="detail-item"><div class="label">Comp-Off</div><div class="value">${emp.leaveBalances?.compOff || 0} days</div></div>
            </div>
        `;

        this.openModal('modal-view-employee');
    }

    openAddEmployee() {
        this.editingId = null;
        document.getElementById('modal-emp-title').innerHTML = '<i class="fas fa-user-plus"></i> Add New Employee';
        document.getElementById('emp-form').reset();
        this.openModal('modal-employee');
    }

    async editEmployee(id) {
        const employees = await this.api.get('employees');
        const emp = employees.find(e => e.id === id);
        if (!emp) return;

        this.editingId = id;
        document.getElementById('modal-emp-title').innerHTML = '<i class="fas fa-user-edit"></i> Edit Employee';

        document.getElementById('emp-firstName').value = emp.firstName;
        document.getElementById('emp-lastName').value = emp.lastName;
        document.getElementById('emp-email').value = emp.email;
        document.getElementById('emp-phone').value = emp.phone || '';
        document.getElementById('emp-dob').value = emp.dob || '';
        document.getElementById('emp-gender').value = emp.gender || 'Male';
        document.getElementById('emp-jobTitle').value = emp.jobTitle;
        document.getElementById('emp-department').value = emp.department;
        document.getElementById('emp-joinDate').value = emp.joinDate;
        document.getElementById('emp-status').value = emp.status;

        this.openModal('modal-employee');
    }

    async saveEmployee() {
        const firstName = document.getElementById('emp-firstName').value.trim();
        const lastName = document.getElementById('emp-lastName').value.trim();
        const email = document.getElementById('emp-email').value.trim();
        const phone = document.getElementById('emp-phone').value.trim();
        const dob = document.getElementById('emp-dob').value;
        const gender = document.getElementById('emp-gender').value;
        const jobTitle = document.getElementById('emp-jobTitle').value;
        const department = document.getElementById('emp-department').value;
        const joinDate = document.getElementById('emp-joinDate').value;
        const status = document.getElementById('emp-status').value;

        if (!firstName || !lastName || !email || !jobTitle || !department || !joinDate) {
            this.toast('Please fill all required fields', 'error');
            return;
        }

        const btn = document.getElementById('btn-save-employee');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Saving...';

        await this.delay(1000);

        const empData = { firstName, lastName, email, phone, dob, gender, jobTitle, department, joinDate, status };

        if (this.editingId) {
            const employees = await this.api.get('employees');
            const existing = employees.find(e => e.id === this.editingId);
            await this.api.put('employees', this.editingId, { ...existing, ...empData });
            this.toast('Employee updated successfully', 'success');
        } else {
            const employees = await this.api.get('employees');
            const newId = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
            const employeeId = `E${2050 + employees.length}`;
            await this.api.post('employees', {
                ...empData,
                id: newId,
                employeeId,
                leaveBalances: { annual: 20, sick: 12, personal: 5, compOff: 0 }
            });
            this.toast('Employee added successfully', 'success');
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-save"></i> Save Employee';
        this.closeModal('modal-employee');
        this.loadEmployees();
    }

    async deleteEmployee(id) {
        if (!confirm('Are you sure you want to delete this employee?')) return;

        await this.delay(500);
        await this.api.delete('employees', id);
        this.toast('Employee deleted', 'warning');
        this.loadEmployees();
    }

    // Leave Management
    async loadLeaves() {
        await this.delay(800);
        const leaves = await this.api.get('leaves');
        const employees = await this.api.get('employees');

        // Find current user's balances (simulating logged-in user)
        const currentEmp = employees.find(e => e.employeeId === 'E2042') || employees[0];
        if (currentEmp?.leaveBalances) {
            document.getElementById('balance-annual').textContent = currentEmp.leaveBalances.annual;
            document.getElementById('balance-sick').textContent = currentEmp.leaveBalances.sick;
            document.getElementById('balance-personal').textContent = currentEmp.leaveBalances.personal;
            document.getElementById('balance-compoff').textContent = currentEmp.leaveBalances.compOff;
        }

        // Leave requests table
        const tbody = document.getElementById('leaves-body');
        tbody.innerHTML = leaves.map(lv => `
            <tr>
                <td>${lv.employeeName}</td>
                <td><span class="badge badge-${this.getLeaveTypeBadge(lv.leaveType)}">${lv.leaveType}</span></td>
                <td>${lv.startDate} to ${lv.endDate}</td>
                <td>${lv.days}</td>
                <td><span class="badge badge-${lv.status === 'Approved' ? 'success' : lv.status === 'Rejected' ? 'danger' : 'warning'}">${lv.status}</span></td>
                <td>
                    ${lv.status === 'Pending' ? `
                        <div class="action-btns">
                            <button class="btn btn-sm btn-success" onclick="hrmsApp.approveLeave('${lv.id}')"><i class="fas fa-check"></i> Approve</button>
                            <button class="btn btn-sm btn-danger" onclick="hrmsApp.rejectLeave('${lv.id}')"><i class="fas fa-times"></i> Reject</button>
                        </div>
                    ` : `<span class="text-muted">-</span>`}
                </td>
            </tr>
        `).join('');
    }

    getLeaveTypeBadge(type) {
        const map = { 'Annual': 'info', 'Sick': 'danger', 'Personal': 'warning', 'Comp-Off': 'success' };
        return map[type] || 'gray';
    }

    openApplyLeave() {
        document.getElementById('leave-form').reset();
        document.getElementById('leave-days').value = '';
        this.openModal('modal-leave');
    }

    calculateLeaveDays() {
        const start = document.getElementById('leave-startDate').value;
        const end = document.getElementById('leave-endDate').value;
        if (start && end) {
            const days = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
            document.getElementById('leave-days').value = days > 0 ? days : 0;
        }
    }

    async submitLeave() {
        const leaveType = document.getElementById('leave-type').value;
        const startDate = document.getElementById('leave-startDate').value;
        const endDate = document.getElementById('leave-endDate').value;
        const reason = document.getElementById('leave-reason').value.trim();
        const days = parseInt(document.getElementById('leave-days').value) || 0;

        if (!startDate || !endDate || !reason) {
            this.toast('Please fill all required fields', 'error');
            return;
        }

        if (days <= 0) {
            this.toast('Invalid date range', 'error');
            return;
        }

        const btn = document.getElementById('btn-submit-leave');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Submitting...';

        await this.delay(1000);

        const leaves = await this.api.get('leaves');
        const newId = `LV-${String(leaves.length + 1).padStart(3, '0')}`;

        await this.api.post('leaves', {
            id: newId,
            employeeId: 'E2042',
            employeeName: 'Rahul Sharma',
            leaveType,
            startDate,
            endDate,
            days,
            reason,
            status: 'Pending',
            appliedOn: new Date().toISOString()
        });

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
        this.closeModal('modal-leave');
        this.toast('Leave request submitted successfully', 'success');
        this.loadLeaves();
    }

    async approveLeave(id) {
        await this.delay(500);
        const leaves = await this.api.get('leaves');
        const leave = leaves.find(l => l.id === id);
        if (leave) {
            await this.api.put('leaves', id, {
                ...leave,
                status: 'Approved',
                approvedBy: 'E2001',
                approvedOn: new Date().toISOString()
            });
            this.toast('Leave approved', 'success');
            this.loadLeaves();
        }
    }

    async rejectLeave(id) {
        await this.delay(500);
        const leaves = await this.api.get('leaves');
        const leave = leaves.find(l => l.id === id);
        if (leave) {
            await this.api.put('leaves', id, { ...leave, status: 'Rejected' });
            this.toast('Leave rejected', 'warning');
            this.loadLeaves();
        }
    }

    // Time & Attendance
    startClock() {
        this.updateClockDisplay();
        setInterval(() => this.updateClockDisplay(), 1000);
    }

    updateClockDisplay() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        const timeEl = document.getElementById('clock-time');
        const dateEl = document.getElementById('clock-date');
        if (timeEl) timeEl.textContent = timeStr;
        if (dateEl) dateEl.textContent = dateStr;

        if (this.clockedIn && this.clockInTime) {
            const diff = now - this.clockInTime;
            const hours = Math.floor(diff / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const hoursEl = document.getElementById('worked-hours');
            if (hoursEl) hoursEl.textContent = `${hours}h ${mins}m`;
        }
    }

    async loadAttendance() {
        await this.delay(600);
        const attendance = await this.api.get('attendance');

        // Check if user already clocked in today
        const today = new Date().toISOString().split('T')[0];
        const todayRecord = attendance.find(a => a.employeeId === 'E2042' && a.date === today);

        if (todayRecord && !todayRecord.clockOut) {
            this.clockedIn = true;
            this.clockInTime = new Date(`${today}T${todayRecord.clockIn}`);
            document.getElementById('clock-status').innerHTML = '<i class="fas fa-check-circle"></i> Clocked In at ' + todayRecord.clockIn;
            document.getElementById('btn-clock').textContent = 'Clock Out';
            document.getElementById('btn-clock').classList.add('clocked-in');
        } else {
            this.clockedIn = false;
            this.clockInTime = null;
            document.getElementById('clock-status').innerHTML = '<i class="fas fa-circle"></i> Not Clocked In';
            document.getElementById('btn-clock').textContent = 'Clock In';
            document.getElementById('btn-clock').classList.remove('clocked-in');
            document.getElementById('worked-hours').textContent = '0h 0m';
        }

        // Attendance table
        const tbody = document.getElementById('attendance-body');
        tbody.innerHTML = attendance.slice(0, 10).map(att => `
            <tr>
                <td>${att.date}</td>
                <td>${att.employeeName}</td>
                <td>${att.clockIn || '-'}</td>
                <td>${att.clockOut || '-'}</td>
                <td>${att.totalHours ? att.totalHours.toFixed(2) + 'h' : '-'}</td>
                <td><span class="badge badge-${att.status === 'Present' ? 'success' : 'warning'}">${att.status}</span></td>
            </tr>
        `).join('');
    }

    async toggleClock() {
        const btn = document.getElementById('btn-clock');
        btn.disabled = true;

        await this.delay(800);

        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

        if (this.clockedIn) {
            // Clock out
            const attendance = await this.api.get('attendance');
            const record = attendance.find(a => a.employeeId === 'E2042' && a.date === today);
            if (record) {
                const clockIn = new Date(`${today}T${record.clockIn}`);
                const totalHours = (now - clockIn) / 3600000;
                await this.api.put('attendance', record.id, {
                    ...record,
                    clockOut: timeStr,
                    totalHours: parseFloat(totalHours.toFixed(2))
                });
            }
            this.clockedIn = false;
            this.clockInTime = null;
            this.toast('Clocked out successfully', 'success');
        } else {
            // Clock in
            const attendance = await this.api.get('attendance');
            const newId = `ATT-${String(attendance.length + 1).padStart(3, '0')}`;
            await this.api.post('attendance', {
                id: newId,
                employeeId: 'E2042',
                employeeName: 'Rahul Sharma',
                date: today,
                clockIn: timeStr,
                clockOut: null,
                status: 'Present',
                workType: 'Office',
                totalHours: 0
            });
            this.clockedIn = true;
            this.clockInTime = now;
            this.toast('Clocked in successfully', 'success');
        }

        btn.disabled = false;
        this.loadAttendance();
    }

    // Recruitment
    async loadJobs() {
        await this.delay(800);
        const jobs = await this.api.get('jobs');
        const candidates = await this.api.get('candidates');

        // Job cards
        const jobsGrid = document.getElementById('jobs-grid');
        jobsGrid.innerHTML = jobs.map(job => `
            <div class="job-card">
                <div class="job-card-header">
                    <h4>${job.title}</h4>
                    <span class="badge badge-${job.status === 'Open' ? 'success' : job.status === 'On Hold' ? 'warning' : 'gray'}">${job.status}</span>
                </div>
                <p class="dept"><i class="fas fa-building"></i> ${job.department}</p>
                <div class="job-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-briefcase"></i> ${job.experience}</span>
                    <span><i class="fas fa-clock"></i> ${job.type}</span>
                </div>
                <div class="job-card-footer">
                    <span class="applicant-count"><i class="fas fa-users"></i> ${job.applicantCount} applicants</span>
                    <button class="btn btn-sm btn-primary" onclick="hrmsApp.viewCandidates('${job.id}')">View</button>
                </div>
            </div>
        `).join('');

        // Pipeline summary
        const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
        stages.forEach(stage => {
            const count = candidates.filter(c => c.stage === stage).length;
            const el = document.getElementById(`pipeline-${stage.toLowerCase()}`);
            if (el) el.textContent = count;
        });
    }

    openPostJob() {
        document.getElementById('job-form').reset();
        this.openModal('modal-job');
    }

    async saveJob() {
        const title = document.getElementById('job-title').value.trim();
        const department = document.getElementById('job-department').value;
        const location = document.getElementById('job-location').value.trim();
        const type = document.getElementById('job-type').value;
        const experience = document.getElementById('job-experience').value.trim();
        const salary = document.getElementById('job-salary').value.trim();
        const description = document.getElementById('job-description').value.trim();

        if (!title || !department || !location) {
            this.toast('Please fill all required fields', 'error');
            return;
        }

        const btn = document.getElementById('btn-save-job');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Posting...';

        await this.delay(1000);

        const jobs = await this.api.get('jobs');
        const newId = `JOB-${String(jobs.length + 1).padStart(3, '0')}`;

        await this.api.post('jobs', {
            id: newId,
            title,
            department,
            location,
            type,
            experience,
            salary,
            description,
            requirements: [],
            status: 'Open',
            postedDate: new Date().toISOString().split('T')[0],
            closingDate: '',
            hiringManager: 'E2001',
            applicantCount: 0
        });

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-plus"></i> Post Job';
        this.closeModal('modal-job');
        this.toast('Job posted successfully', 'success');
        this.loadJobs();
    }

    async viewCandidates(jobId) {
        const jobs = await this.api.get('jobs');
        const candidates = await this.api.get('candidates');
        const job = jobs.find(j => j.id === jobId);

        if (!job) return;

        const jobCandidates = candidates.filter(c => c.jobId === jobId);

        document.getElementById('candidates-job-title').textContent = job.title;

        const tbody = document.getElementById('candidates-body');
        if (jobCandidates.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No candidates yet</td></tr>';
        } else {
            tbody.innerHTML = jobCandidates.map(can => `
                <tr>
                    <td>
                        <div class="emp-info">
                            <div class="emp-avatar">${can.firstName[0]}${can.lastName[0]}</div>
                            <div class="emp-details">
                                <div class="name">${can.firstName} ${can.lastName}</div>
                                <div class="email">${can.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>${can.experience}</td>
                    <td>${can.skills?.slice(0, 2).join(', ') || '-'}</td>
                    <td>
                        <div class="star-rating">
                            ${[1,2,3,4,5].map(i => `<i class="${i <= can.rating ? 'fas' : 'far'} fa-star"></i>`).join('')}
                        </div>
                    </td>
                    <td><span class="badge badge-${this.getCandidateStageBadge(can.stage)}">${can.stage}</span></td>
                    <td>
                        <select class="form-select" style="width:120px;padding:0.35rem;" onchange="hrmsApp.updateCandidateStage('${can.id}', this.value)">
                            <option ${can.stage === 'Applied' ? 'selected' : ''}>Applied</option>
                            <option ${can.stage === 'Screening' ? 'selected' : ''}>Screening</option>
                            <option ${can.stage === 'Interview' ? 'selected' : ''}>Interview</option>
                            <option ${can.stage === 'Offer' ? 'selected' : ''}>Offer</option>
                            <option ${can.stage === 'Hired' ? 'selected' : ''}>Hired</option>
                            <option ${can.stage === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </td>
                </tr>
            `).join('');
        }

        this.openModal('modal-candidates');
    }

    getCandidateStageBadge(stage) {
        const map = { 'Applied': 'gray', 'Screening': 'info', 'Interview': 'warning', 'Offer': 'purple', 'Hired': 'success', 'Rejected': 'danger' };
        return map[stage] || 'gray';
    }

    async updateCandidateStage(id, stage) {
        const candidates = await this.api.get('candidates');
        const candidate = candidates.find(c => c.id === id);
        if (candidate) {
            await this.api.put('candidates', id, { ...candidate, stage });
            this.toast(`Candidate moved to ${stage}`, 'success');
        }
    }

    // Performance Management
    async loadPerformance() {
        await this.delay(800);
        const goals = await this.api.get('goals');
        const reviews = await this.api.get('reviews');

        // Goals
        const goalsContainer = document.getElementById('goals-list');
        goalsContainer.innerHTML = goals.map(goal => `
            <div class="goal-item">
                <div class="goal-header">
                    <h4>${goal.title}</h4>
                    <span class="badge badge-${goal.priority === 'High' ? 'danger' : goal.priority === 'Medium' ? 'warning' : 'info'}">${goal.priority}</span>
                </div>
                <div class="goal-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${goal.progress >= 100 ? 'success' : goal.progress >= 50 ? '' : 'warning'}" style="width:${goal.progress}%"></div>
                    </div>
                    <span class="progress-text">${goal.progress}%</span>
                </div>
                <div class="goal-meta">
                    <span><i class="fas fa-user"></i> ${goal.employeeName}</span>
                    <span><i class="fas fa-calendar"></i> Due: ${goal.dueDate}</span>
                    <span class="badge badge-${goal.status === 'Completed' ? 'success' : 'info'}">${goal.status}</span>
                </div>
            </div>
        `).join('');

        // Reviews
        const reviewsBody = document.getElementById('reviews-body');
        reviewsBody.innerHTML = reviews.map(rev => `
            <tr>
                <td>${rev.employeeName}</td>
                <td>${rev.reviewCycle}</td>
                <td>${rev.reviewType}</td>
                <td><span class="badge badge-${rev.status === 'Completed' ? 'success' : 'warning'}">${rev.status}</span></td>
                <td>${rev.overallRating ? rev.overallRating.toFixed(1) + '/5' : '-'}</td>
                <td>
                    ${rev.status === 'Pending' ? `
                        <button class="btn btn-sm btn-primary" onclick="hrmsApp.openReview('${rev.id}')"><i class="fas fa-edit"></i> Complete</button>
                    ` : `
                        <button class="btn btn-sm btn-secondary" onclick="hrmsApp.viewReview('${rev.id}')"><i class="fas fa-eye"></i> View</button>
                    `}
                </td>
            </tr>
        `).join('');
    }

    openAddGoal() {
        document.getElementById('goal-form').reset();
        this.openModal('modal-goal');
    }

    async saveGoal() {
        const title = document.getElementById('goal-title').value.trim();
        const description = document.getElementById('goal-description').value.trim();
        const dueDate = document.getElementById('goal-dueDate').value;
        const priority = document.getElementById('goal-priority').value;

        if (!title || !dueDate) {
            this.toast('Please fill all required fields', 'error');
            return;
        }

        const btn = document.getElementById('btn-save-goal');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Saving...';

        await this.delay(1000);

        const goals = await this.api.get('goals');
        const newId = `GOAL-${String(goals.length + 1).padStart(3, '0')}`;

        await this.api.post('goals', {
            id: newId,
            employeeId: 'E2042',
            employeeName: 'Rahul Sharma',
            title,
            description,
            period: 'Q1-2026',
            progress: 0,
            status: 'In Progress',
            dueDate,
            priority
        });

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-save"></i> Save Goal';
        this.closeModal('modal-goal');
        this.toast('Goal created successfully', 'success');
        this.loadPerformance();
    }

    async openReview(id) {
        const reviews = await this.api.get('reviews');
        const review = reviews.find(r => r.id === id);
        if (!review) return;

        this.editingId = id;
        document.getElementById('review-employee-name').textContent = review.employeeName;
        document.getElementById('review-cycle').textContent = review.reviewCycle;
        document.getElementById('review-strengths').value = '';
        document.getElementById('review-improvements').value = '';

        this.openModal('modal-review');
    }

    async submitReview() {
        const strengths = document.getElementById('review-strengths').value.trim();
        const improvements = document.getElementById('review-improvements').value.trim();
        const rating = document.querySelector('#modal-review .star-rating')?.dataset.rating || 4;

        if (!strengths) {
            this.toast('Please provide feedback', 'error');
            return;
        }

        const btn = document.getElementById('btn-submit-review');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Submitting...';

        await this.delay(1000);

        const reviews = await this.api.get('reviews');
        const review = reviews.find(r => r.id === this.editingId);
        if (review) {
            await this.api.put('reviews', this.editingId, {
                ...review,
                status: 'Completed',
                overallRating: parseFloat(rating),
                strengths,
                improvements,
                reviewedOn: new Date().toISOString().split('T')[0]
            });
        }

        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-check"></i> Submit Review';
        this.closeModal('modal-review');
        this.toast('Review submitted successfully', 'success');
        this.loadPerformance();
    }

    // Administration
    async loadAdmin() {
        await this.delay(800);
        const users = await this.api.get('users');
        const auditLogs = await this.api.get('auditLogs');

        // Users table
        const usersBody = document.getElementById('users-body');
        usersBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><span class="badge badge-${user.role === 'HR Manager' ? 'purple' : user.role === 'Manager' ? 'info' : 'gray'}">${user.role}</span></td>
                <td><span class="badge badge-${user.status === 'Active' ? 'success' : 'danger'}">${user.status}</span></td>
                <td>${this.formatTime(user.lastLogin)}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-icon btn-secondary" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon btn-secondary" title="Reset Password"><i class="fas fa-key"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Audit logs
        const logsContainer = document.getElementById('audit-logs');
        logsContainer.innerHTML = auditLogs.slice(0, 10).map(log => `
            <div class="log-entry">
                <span class="log-time">${new Date(log.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                <span class="log-user">${log.userName}</span>
                <span class="log-action"><span class="badge badge-${log.action === 'CREATE' ? 'success' : log.action === 'DELETE' ? 'danger' : log.action === 'APPROVE' ? 'info' : 'gray'}">${log.action}</span></span>
                <span class="log-module">${log.module}</span>
                <span class="log-details">${log.details}</span>
            </div>
        `).join('');
    }

    // Utilities
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    formatTime(dateStr) {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    toast(message, type = 'info') {
        const container = document.getElementById('toast-container') || this.createToastContainer();
        const icons = { success: 'check-circle', error: 'exclamation-circle', warning: 'exclamation-triangle', info: 'info-circle' };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${icons[type]}"></i><p>${message}</p>`;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), 4000);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.hrmsApp = new HRMSApp();
});
