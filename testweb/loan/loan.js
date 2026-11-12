// ================================================
//  LoanEdge – Loan Management System
//  LoanApp class  (mirrors CRMApp pattern)
// ================================================

// Synchronous localStorage wrapper (loan module uses sync reads/writes)
class LoanStorage {
    constructor(key, defaultData) {
        this.key = key;
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(defaultData));
        }
    }
    get(collection) {
        var data = JSON.parse(localStorage.getItem(this.key)) || {};
        return data[collection] || [];
    }
    set(collection, rows) {
        var data = JSON.parse(localStorage.getItem(this.key)) || {};
        data[collection] = rows;
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}

class LoanApp {
    constructor() {
        this.api = null;
        this.currentTab = 'dashboard';
        this.editingId  = null;
    }

    // ── Seed data ──────────────────────────────
    getSeedData() {
        return {
            borrowers: [
                { id:'B001', name:'Arjun Mehta',  email:'arjun.mehta@email.com',    phone:'9876543210', occupation:'Software Engineer', city:'Bengaluru', income:950000, creditScore:780, pan:'ABCPM1234A', status:'active',   joinDate:'2024-08-15' },
                { id:'B002', name:'Priya Sharma', email:'priya.sharma@email.com',   phone:'9123456789', occupation:'Business Owner',   city:'Mumbai',    income:1500000,creditScore:810, pan:'BCDPS5678B', status:'active',   joinDate:'2024-09-22' },
                { id:'B003', name:'Rohit Verma',  email:'rohit.verma@email.com',    phone:'9988776655', occupation:'Doctor',           city:'Delhi',     income:2200000,creditScore:820, pan:'CDERV9012C', status:'active',   joinDate:'2024-07-10' },
                { id:'B004', name:'Sneha Kapoor', email:'sneha.kapoor@email.com',   phone:'9765432100', occupation:'Teacher',          city:'Pune',      income:620000, creditScore:700, pan:'DEFSK3456D', status:'active',   joinDate:'2025-01-05' },
                { id:'B005', name:'Kiran Nair',   email:'kiran.nair@email.com',     phone:'9845123670', occupation:'IT Manager',       city:'Hyderabad', income:1100000,creditScore:760, pan:'EFGKN7890E', status:'active',   joinDate:'2024-11-18' },
                { id:'B006', name:'Vivek Singh',  email:'vivek.singh@email.com',    phone:'9512346780', occupation:'Contractor',       city:'Ahmedabad', income:780000, creditScore:580, pan:'FGHVS2345F', status:'inactive', joinDate:'2024-10-30' },
                { id:'B007', name:'Ananya Das',   email:'ananya.das@email.com',     phone:'9678901234', occupation:'Marketing Manager',city:'Chennai',   income:870000, creditScore:730, pan:'GHIAD6789G', status:'active',   joinDate:'2025-01-20' },
                { id:'B008', name:'Ravi Kumar',   email:'ravi.kumar@email.com',     phone:'9034567812', occupation:'Chartered Accountant',city:'Bengaluru',income:1800000,creditScore:800, pan:'HIJRK1234H', status:'active', joinDate:'2024-06-01' }
            ],
            products: [
                { id:'P001', name:'Personal Loan',  rate:10.50, maxAmount:2000000,  maxTenure:60,  processingFee:1.0, prepaymentFee:2.0, description:'Instant personal loans with minimal documentation.',               status:'active'   },
                { id:'P002', name:'Home Loan',      rate:8.50,  maxAmount:50000000, maxTenure:300, processingFee:0.5, prepaymentFee:0.0,  description:'Competitive home loans for purchase, construction or renovation.', status:'active'   },
                { id:'P003', name:'Auto Loan',      rate:9.25,  maxAmount:4000000,  maxTenure:84,  processingFee:1.0, prepaymentFee:1.5, description:'Finance your dream vehicle at attractive rates.',                   status:'active'   },
                { id:'P004', name:'Education Loan', rate:7.75,  maxAmount:5000000,  maxTenure:180, processingFee:0.0, prepaymentFee:0.0,  description:'Support higher education in India and abroad.',                    status:'active'   },
                { id:'P005', name:'Business Loan',  rate:12.00, maxAmount:10000000, maxTenure:120, processingFee:1.5, prepaymentFee:2.5, description:'Flexible loans to grow your business.',                            status:'inactive' }
            ],
            applications: [
                { id:'LN-2025-0001', borrowerId:'B002', borrowerName:'Priya Sharma', productId:'P002', productName:'Home Loan',      amount:5000000, tenure:240, purpose:'Home Purchase',      status:'approved',      officerId:'OFF01', appliedDate:'2025-01-10', lastUpdated:'2025-02-01' },
                { id:'LN-2025-0002', borrowerId:'B007', borrowerName:'Ananya Das',   productId:'P001', productName:'Personal Loan',  amount:500000,  tenure:36,  purpose:'Medical Emergency',  status:'under_review',  officerId:'OFF02', appliedDate:'2025-01-18', lastUpdated:'2025-02-03' },
                { id:'LN-2025-0003', borrowerId:'B001', borrowerName:'Arjun Mehta',  productId:'P003', productName:'Auto Loan',      amount:1200000, tenure:60,  purpose:'Vehicle Purchase',   status:'disbursed',     officerId:'OFF01', appliedDate:'2024-12-05', lastUpdated:'2025-01-15' },
                { id:'LN-2025-0004', borrowerId:'B005', borrowerName:'Kiran Nair',   productId:'P001', productName:'Personal Loan',  amount:800000,  tenure:48,  purpose:'Home Renovation',    status:'docs_required', officerId:'OFF03', appliedDate:'2025-01-25', lastUpdated:'2025-02-04' },
                { id:'LN-2025-0005', borrowerId:'B003', borrowerName:'Rohit Verma',  productId:'P002', productName:'Home Loan',      amount:8000000, tenure:300, purpose:'Property Purchase',  status:'approved',      officerId:'OFF02', appliedDate:'2025-01-08', lastUpdated:'2025-01-30' },
                { id:'LN-2025-0006', borrowerId:'B006', borrowerName:'Vivek Singh',  productId:'P003', productName:'Auto Loan',      amount:900000,  tenure:60,  purpose:'Commercial Vehicle', status:'rejected',      officerId:'OFF01', appliedDate:'2025-01-12', lastUpdated:'2025-01-28' },
                { id:'LN-2025-0007', borrowerId:'B004', borrowerName:'Sneha Kapoor', productId:'P004', productName:'Education Loan', amount:1500000, tenure:120, purpose:'Post Graduate Study', status:'under_review',  officerId:'OFF03', appliedDate:'2025-01-22', lastUpdated:'2025-02-02' },
                { id:'LN-2025-0008', borrowerId:'B008', borrowerName:'Ravi Kumar',   productId:'P001', productName:'Personal Loan',  amount:300000,  tenure:24,  purpose:'Business Capital',   status:'submitted',     officerId:'OFF02', appliedDate:'2025-02-01', lastUpdated:'2025-02-01' }
            ],
            assessments: [
                { id:'A001', applicationId:'LN-2025-0001', creditScore:810, dti:28, existingLoans:1, monthlyIncome:125000, obligation:35000, risk:'low',    decision:'approved', remarks:'Excellent profile. Approved.',       reviewedBy:'OFF01', reviewDate:'2025-01-28' },
                { id:'A002', applicationId:'LN-2025-0002', creditScore:730, dti:38, existingLoans:0, monthlyIncome:72500,  obligation:27500, risk:'medium', decision:'pending',  remarks:'Further income verification needed.',reviewedBy:'OFF02', reviewDate:'2025-02-01' },
                { id:'A003', applicationId:'LN-2025-0003', creditScore:780, dti:22, existingLoans:0, monthlyIncome:79167,  obligation:17417, risk:'low',    decision:'approved', remarks:'Sound financials. Approved.',        reviewedBy:'OFF01', reviewDate:'2025-01-02' },
                { id:'A004', applicationId:'LN-2025-0004', creditScore:760, dti:45, existingLoans:2, monthlyIncome:91667,  obligation:41250, risk:'medium', decision:'pending',  remarks:'Awaiting outstanding documents.',    reviewedBy:'OFF03', reviewDate:'2025-02-02' },
                { id:'A005', applicationId:'LN-2025-0005', creditScore:820, dti:18, existingLoans:0, monthlyIncome:183333, obligation:33000, risk:'low',    decision:'approved', remarks:'Strong income, low DTI. Approved.',  reviewedBy:'OFF02', reviewDate:'2025-01-25' },
                { id:'A006', applicationId:'LN-2025-0006', creditScore:580, dti:62, existingLoans:3, monthlyIncome:65000,  obligation:40300, risk:'high',   decision:'rejected', remarks:'High DTI and poor credit score.',    reviewedBy:'OFF01', reviewDate:'2025-01-24' },
                { id:'A007', applicationId:'LN-2025-0007', creditScore:700, dti:42, existingLoans:1, monthlyIncome:51667,  obligation:21700, risk:'medium', decision:'pending',  remarks:'Co-applicant income under review.',  reviewedBy:'OFF03', reviewDate:'2025-01-30' },
                { id:'A008', applicationId:'LN-2025-0008', creditScore:800, dti:20, existingLoans:0, monthlyIncome:150000, obligation:30000, risk:'low',    decision:'pending',  remarks:'Initial review in progress.',        reviewedBy:'OFF02', reviewDate:'2025-02-01' }
            ],
            documents: [
                { id:'D001', applicationId:'LN-2025-0001', docType:'Salary Slip',     status:'verified', receivedDate:'2025-01-14', notes:'' },
                { id:'D002', applicationId:'LN-2025-0001', docType:'Bank Statement',  status:'verified', receivedDate:'2025-01-14', notes:'' },
                { id:'D003', applicationId:'LN-2025-0001', docType:'Property Papers', status:'verified', receivedDate:'2025-01-18', notes:'' },
                { id:'D004', applicationId:'LN-2025-0002', docType:'Salary Slip',     status:'received', receivedDate:'2025-01-20', notes:'Needs 3-month slip' },
                { id:'D005', applicationId:'LN-2025-0002', docType:'Bank Statement',  status:'missing',  receivedDate:'',           notes:'Not submitted' },
                { id:'D006', applicationId:'LN-2025-0003', docType:'Auto Invoice',    status:'verified', receivedDate:'2024-12-10', notes:'' },
                { id:'D007', applicationId:'LN-2025-0004', docType:'Bank Statement',  status:'missing',  receivedDate:'',           notes:'Requested via email' },
                { id:'D008', applicationId:'LN-2025-0004', docType:'IT Return',       status:'missing',  receivedDate:'',           notes:'FY2024 needed' },
                { id:'D009', applicationId:'LN-2025-0005', docType:'Sale Agreement',  status:'verified', receivedDate:'2025-01-12', notes:'' },
                { id:'D010', applicationId:'LN-2025-0007', docType:'Admission Letter',status:'received', receivedDate:'2025-01-24', notes:'' }
            ],
            disbursements: [
                { id:'DIS001', applicationId:'LN-2025-0001', borrowerName:'Priya Sharma', amount:5000000, accountNo:'HDFC000123456', ifsc:'HDFC0001234', disbursedDate:'2025-02-03', emi:43560, mode:'NEFT', status:'disbursed', reference:'NEFT20250203001' },
                { id:'DIS002', applicationId:'LN-2025-0003', borrowerName:'Arjun Mehta',  amount:1200000, accountNo:'SBI00098765',   ifsc:'SBIN0001001', disbursedDate:'2025-01-16', emi:24920, mode:'RTGS', status:'disbursed', reference:'RTGS20250116002' },
                { id:'DIS003', applicationId:'LN-2025-0005', borrowerName:'Rohit Verma',  amount:8000000, accountNo:'ICIC00045678',  ifsc:'ICIC0004001', disbursedDate:'2025-02-05', emi:61710, mode:'NEFT', status:'pending',   reference:'' }
            ],
            repayments: [
                { id:'R001', applicationId:'LN-2025-0003', borrowerName:'Arjun Mehta',  emiNo:1, emiAmount:24920, dueDate:'2025-02-16', paidDate:'2025-02-14', status:'paid',     principal:22420, interest:2500, balance:1177580 },
                { id:'R002', applicationId:'LN-2025-0003', borrowerName:'Arjun Mehta',  emiNo:2, emiAmount:24920, dueDate:'2025-03-16', paidDate:'',           status:'upcoming', principal:22607, interest:2313, balance:1154973 },
                { id:'R003', applicationId:'LN-2025-0001', borrowerName:'Priya Sharma', emiNo:1, emiAmount:43560, dueDate:'2025-03-03', paidDate:'',           status:'upcoming', principal:40977, interest:2583, balance:4959023 },
                { id:'R004', applicationId:'LN-2025-0003', borrowerName:'Arjun Mehta',  emiNo:3, emiAmount:24920, dueDate:'2025-04-16', paidDate:'',           status:'upcoming', principal:22795, interest:2125, balance:1132178 }
            ],
            tickets: [
                { id:'T001', applicationId:'LN-2025-0004', borrowerName:'Kiran Nair',   subject:'Missing documents clarification', priority:'high',   status:'open',        createdDate:'2025-02-04', notes:'Borrower emailed regarding pending bank statement.' },
                { id:'T002', applicationId:'LN-2025-0006', borrowerName:'Vivek Singh',  subject:'Rejection appeal request',        priority:'medium', status:'open',        createdDate:'2025-01-29', notes:'Borrower has requested reconsideration.' },
                { id:'T003', applicationId:'LN-2025-0001', borrowerName:'Priya Sharma', subject:'Disbursement confirmation',       priority:'low',    status:'resolved',    createdDate:'2025-02-04', notes:'NEFT transfer confirmed.' },
                { id:'T004', applicationId:'LN-2025-0007', borrowerName:'Sneha Kapoor', subject:'Co-applicant document request',   priority:'medium', status:'in_progress', createdDate:'2025-02-02', notes:'Co-applicant income docs awaited.' }
            ]
        };
    }

    // ── Initialise ──────────────────────────────
    init() {
        this.api = new LoanStorage('loan_v2', this.getSeedData());
        this.bindNavigation();
        this.switchTab('dashboard');
    }

    // ── Navigation ─────────────────────────────
    bindNavigation() {
        document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
            item.addEventListener('click', () => this.switchTab(item.dataset.tab));
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.nav-item[data-tab]').forEach(n => n.classList.toggle('active', n.dataset.tab === tab));
        document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('active', s.id === 'tab-' + tab));
        this.loadTabData(tab);
    }

    loadTabData(tab) {
        const map = {
            dashboard:     () => this.loadDashboard(),
            borrowers:     () => this.loadBorrowers(),
            applications:  () => this.loadApplications(),
            products:      () => this.loadProducts(),
            credit:        () => this.loadCredit(),
            documents:     () => this.loadDocuments(),
            disbursements: () => this.loadDisbursements(),
            repayments:    () => this.loadRepayments(),
            support:       () => this.loadSupport()
        };
        if (map[tab]) map[tab]();
    }

    // ── Utilities ──────────────────────────────
    fmt(n) { return '\u20B9' + Number(n).toLocaleString('en-IN'); }
    fmtDate(d) { if (!d) return '\u2014'; const dt = new Date(d); return dt.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'}); }
    initials(name) { return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase(); }
    calcEMI(p, r, n) { const mr = r / (12 * 100); return mr === 0 ? Math.round(p / n) : Math.round(p * mr * Math.pow(1 + mr, n) / (Math.pow(1 + mr, n) - 1)); }

    statusBadge(status) {
        const map = {
            submitted:'submitted',     under_review:'under-review',  docs_required:'docs-required',
            credit_check:'credit-check', approved:'approved',        rejected:'rejected',
            disbursed:'disbursed',     closed:'closed',
            paid:'paid',    due:'due',   overdue:'overdue',  upcoming:'upcoming',
            pending:'pending', verified:'verified', received:'received', missing:'missing',
            open:'open',    in_progress:'in-progress', resolved:'resolved',
            low:'low', medium:'medium', high:'high',
            active:'approved', inactive:'closed',
            'priority-high':'priority-high', 'priority-medium':'priority-medium', 'priority-low':'priority-low', 'priority-critical':'critical'
        };
        const cls = map[status] || 'pending';
        const label = status.replace(/_/g, ' ').replace(/priority-/g, '').replace(/\b\w/g, c => c.toUpperCase());
        return '<span class="badge badge-' + cls + '">' + label + '</span>';
    }

    showToast(msg, type) {
        if (!type) type = 'success';
        var icons = { success:'&#10003;', error:'&#10005;', warning:'&#9888;', info:'&#8505;' };
        var t = document.createElement('div');
        t.className = 'toast ' + type;
        t.innerHTML = '<span class="toast-icon">' + (icons[type] || icons.info) + '</span><span class="toast-message">' + msg + '</span><button class="toast-close" onclick="this.parentElement.remove()">&#10005;</button>';
        document.getElementById('toast-container').appendChild(t);
        setTimeout(function() { if (t.parentElement) t.remove(); }, 4000);
    }

    openModal(id)  { var el = document.getElementById(id); if (el) el.classList.add('open'); }
    closeModal(id) { var el = document.getElementById(id); if (el) el.classList.remove('open'); this.editingId = null; }
    closeAllModals() { document.querySelectorAll('.modal-overlay').forEach(function(m) { m.classList.remove('open'); }); this.editingId = null; }

    // ════════════════════════════════════════════
    //  DASHBOARD
    // ════════════════════════════════════════════
    loadDashboard() {
        var apps  = this.api.get('applications')  || [];
        var borr  = this.api.get('borrowers')     || [];
        var disb  = this.api.get('disbursements') || [];
        var repay = this.api.get('repayments')    || [];

        var totalPortfolio = disb.reduce(function(s, d) { return s + Number(d.amount); }, 0);
        var overdue  = repay.filter(function(r) { return r.status === 'overdue'; }).length;
        var pending  = apps.filter(function(a) { return ['submitted','under_review','docs_required','credit_check'].indexOf(a.status) >= 0; }).length;
        var approved = apps.filter(function(a) { return a.status === 'approved'; }).length;

        var self = this;
        function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
        set('dash-total-apps',  apps.length);
        set('dash-active-borr', borr.filter(function(b) { return b.status === 'active'; }).length);
        set('dash-portfolio',   self.fmt(totalPortfolio));
        set('dash-pending',     pending);
        set('dash-approved',    approved);
        set('dash-overdue',     overdue);
        set('dash-disbursed',   disb.length);
        set('dash-products',    (this.api.get('products') || []).filter(function(p) { return p.status === 'active'; }).length);

        set('funnel-submitted', apps.filter(function(a) { return ['submitted','docs_required'].indexOf(a.status) >= 0; }).length);
        set('funnel-review',    apps.filter(function(a) { return ['under_review','credit_check'].indexOf(a.status) >= 0; }).length);
        set('funnel-approved',  approved);
        set('funnel-disbursed', disb.length);

        var recent = apps.slice().sort(function(a, b) { return new Date(b.lastUpdated) - new Date(a.lastUpdated); }).slice(0, 6);
        var iconMap = { submitted:'new', under_review:'docs', approved:'approved', rejected:'rejected', disbursed:'disbursed', docs_required:'docs' };
        var listEl = document.getElementById('dash-activity');
        if (listEl) {
            listEl.innerHTML = recent.map(function(a) {
                var ic = iconMap[a.status] || 'new';
                return '<div class="activity-item"><div class="activity-icon ' + ic + '">&#9711;</div><div class="activity-content"><div class="activity-title">' + a.id + ' \u2014 ' + a.borrowerName + '</div><div class="activity-meta"><span>' + a.productName + '</span><span>' + self.fmt(a.amount) + '</span><span>' + self.fmtDate(a.lastUpdated) + '</span>' + self.statusBadge(a.status) + '</div></div></div>';
            }).join('');
        }
    }

    // ════════════════════════════════════════════
    //  BORROWERS
    // ════════════════════════════════════════════
    loadBorrowers(query) {
        if (!query) query = '';
        var rows = this.api.get('borrowers') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(b) { return (b.name + b.email + b.city + b.occupation).toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('borrowers-tbody');
        if (!tbody) return;
        var self = this;
        if (!rows.length) { tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><span style="font-size:2rem;display:block;margin-bottom:1rem">&#128100;</span><h3>No borrowers found</h3></div></td></tr>'; return; }
        tbody.innerHTML = rows.map(function(b) {
            var scoreColor = b.creditScore >= 750 ? '#10b981' : b.creditScore >= 650 ? '#f59e0b' : '#ef4444';
            var scoreW = Math.round(b.creditScore / 9);
            return '<tr><td><div class="table-user"><div class="table-avatar">' + self.initials(b.name) + '</div><div class="table-user-info"><h4>' + b.name + '</h4><span>' + b.pan + '</span></div></div></td>' +
                '<td>' + b.email + '<br><span class="text-muted fs-sm">' + b.phone + '</span></td>' +
                '<td>' + b.occupation + '</td><td>' + b.city + '</td>' +
                '<td>' + self.fmt(b.income) + '/yr</td>' +
                '<td><div class="score-bar"><div class="score-bar-track"><div class="score-bar-fill" style="width:' + scoreW + '%;background:' + scoreColor + '"></div></div><span class="score-val">' + b.creditScore + '</span></div></td>' +
                '<td>' + self.statusBadge(b.status) + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.viewBorrower(\'' + b.id + '\')" title="View">&#128065;</button><button class="btn btn-ghost btn-sm" onclick="app.editBorrower(\'' + b.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteBorrower(\'' + b.id + '\')" title="Delete">&#128465;</button></div></td></tr>';
        }).join('');
        var cnt = document.getElementById('borrowers-count');
        if (cnt) cnt.textContent = rows.length;
    }

    openAddBorrower() {
        this.editingId = null;
        document.getElementById('borrower-modal-title').textContent = 'Add New Borrower';
        document.getElementById('borrower-form').reset();
        this.openModal('borrower-modal');
    }

    saveBorrower() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var data = { name:f('bf-name'), email:f('bf-email'), phone:f('bf-phone'), occupation:f('bf-occupation'), city:f('bf-city'), income:Number(f('bf-income')), creditScore:Number(f('bf-credit-score')), pan:f('bf-pan'), status:f('bf-status') };
        if (!data.name || !data.email) { this.showToast('Name and Email are required.', 'error'); return; }
        var rows = this.api.get('borrowers') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(b) { return b.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('borrowers', rows); this.showToast('Borrower updated.'); }
        } else {
            data.id = 'B' + String(Date.now() % 1000000).padStart(6, '0');
            data.joinDate = new Date().toISOString().substring(0, 10);
            rows.push(data); this.api.set('borrowers', rows); this.showToast('Borrower added.');
        }
        this.closeModal('borrower-modal');
        this.loadBorrowers();
    }

    editBorrower(id) {
        var b = (this.api.get('borrowers') || []).find(function(x) { return x.id === id; });
        if (!b) return;
        this.editingId = id;
        document.getElementById('borrower-modal-title').textContent = 'Edit Borrower';
        ['name','email','phone','occupation','city','income','pan','status'].forEach(function(k) {
            var el = document.getElementById('bf-' + k);
            if (el) el.value = b[k] || '';
        });
        document.getElementById('bf-credit-score').value = b.creditScore;
        this.openModal('borrower-modal');
    }

    deleteBorrower(id) {
        if (!confirm('Delete this borrower?')) return;
        var rows = (this.api.get('borrowers') || []).filter(function(b) { return b.id !== id; });
        this.api.set('borrowers', rows);
        this.showToast('Borrower deleted.', 'warning');
        this.loadBorrowers();
    }

    viewBorrower(id) {
        var b = (this.api.get('borrowers') || []).find(function(x) { return x.id === id; });
        if (!b) return;
        var self = this;
        var apps = (this.api.get('applications') || []).filter(function(a) { return a.borrowerId === id; });
        var appRows = apps.length ? '<table class="ln-table">' + apps.map(function(a) { return '<tr><td>' + a.id + '</td><td>' + a.productName + '</td><td>' + self.fmt(a.amount) + '</td><td>' + self.statusBadge(a.status) + '</td></tr>'; }).join('') + '</table>' : '<p class="text-muted">No applications yet.</p>';
        document.getElementById('vb-content').innerHTML =
            '<div class="detail-grid">' +
            '<div class="detail-item"><div class="di-label">Full Name</div><div class="di-value">' + b.name + '</div></div>' +
            '<div class="detail-item"><div class="di-label">PAN</div><div class="di-value">' + b.pan + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Email</div><div class="di-value">' + b.email + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Phone</div><div class="di-value">' + b.phone + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Occupation</div><div class="di-value">' + b.occupation + '</div></div>' +
            '<div class="detail-item"><div class="di-label">City</div><div class="di-value">' + b.city + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Annual Income</div><div class="di-value">' + self.fmt(b.income) + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Credit Score</div><div class="di-value">' + b.creditScore + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Status</div><div class="di-value">' + self.statusBadge(b.status) + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Member Since</div><div class="di-value">' + self.fmtDate(b.joinDate) + '</div></div>' +
            '</div><h4 style="margin:1rem 0 .5rem">Loan Applications (' + apps.length + ')</h4>' + appRows;
        this.openModal('view-borrower-modal');
    }

    searchBorrowers(q) { this.loadBorrowers(q); }

    // ════════════════════════════════════════════
    //  APPLICATIONS
    // ════════════════════════════════════════════
    loadApplications(query, filterStatus) {
        if (!query) query = '';
        if (!filterStatus) filterStatus = '';
        var rows = this.api.get('applications') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(a) { return (a.id + a.borrowerName + a.productName).toLowerCase().indexOf(q) >= 0; });
        if (filterStatus) rows = rows.filter(function(a) { return a.status === filterStatus; });
        var tbody = document.getElementById('applications-tbody');
        if (!tbody) return;
        var self = this;
        if (!rows.length) { tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><span style="font-size:2rem;display:block;margin-bottom:1rem">&#128203;</span><h3>No applications</h3></div></td></tr>'; return; }
        tbody.innerHTML = rows.map(function(a) {
            return '<tr>' +
                '<td><span class="fw-600 text-primary">' + a.id + '</span></td>' +
                '<td>' + a.borrowerName + '</td>' +
                '<td>' + a.productName + '</td>' +
                '<td class="fw-600">' + self.fmt(a.amount) + '</td>' +
                '<td>' + a.tenure + ' mo</td>' +
                '<td>' + self.statusBadge(a.status) + '</td>' +
                '<td>' + a.officerId + '</td>' +
                '<td>' + self.fmtDate(a.appliedDate) + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.viewApplication(\'' + a.id + '\')" title="View">&#128065;</button><button class="btn btn-ghost btn-sm" onclick="app.editApplication(\'' + a.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteApplication(\'' + a.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
        var cnt = document.getElementById('applications-count');
        if (cnt) cnt.textContent = rows.length;
    }

    openAddApplication() {
        this.editingId = null;
        document.getElementById('app-modal-title').textContent = 'New Loan Application';
        document.getElementById('app-form').reset();
        this._populateBorrowerSelect('af-borrower', '');
        this._populateProductSelect('af-product', '');
        this.openModal('application-modal');
    }

    saveApplication() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var borrower = (this.api.get('borrowers') || []).find(function(b) { return b.id === f('af-borrower'); });
        var product  = (this.api.get('products')  || []).find(function(p) { return p.id === f('af-product'); });
        if (!borrower || !product) { this.showToast('Select borrower and product.', 'error'); return; }
        var data = {
            borrowerId: borrower.id, borrowerName: borrower.name,
            productId: product.id,   productName: product.name,
            amount: Number(f('af-amount')), tenure: Number(f('af-tenure')),
            purpose: f('af-purpose'), officerId: f('af-officer'),
            status: f('af-status'),   lastUpdated: new Date().toISOString().substring(0, 10)
        };
        if (!data.amount || !data.tenure) { this.showToast('Amount and tenure are required.', 'error'); return; }
        var rows = this.api.get('applications') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(a) { return a.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('applications', rows); this.showToast('Application updated.'); }
        } else {
            var nextNum = String(rows.length + 1).padStart(4, '0');
            data.id = 'LN-' + new Date().getFullYear() + '-' + nextNum;
            data.appliedDate = new Date().toISOString().substring(0, 10);
            rows.push(data); this.api.set('applications', rows); this.showToast('Application created.');
        }
        this.closeModal('application-modal');
        this.loadApplications();
    }

    editApplication(id) {
        var a = (this.api.get('applications') || []).find(function(x) { return x.id === id; });
        if (!a) return;
        this.editingId = id;
        document.getElementById('app-modal-title').textContent = 'Edit Application';
        this._populateBorrowerSelect('af-borrower', a.borrowerId);
        this._populateProductSelect('af-product', a.productId);
        document.getElementById('af-amount').value  = a.amount;
        document.getElementById('af-tenure').value  = a.tenure;
        document.getElementById('af-purpose').value = a.purpose || '';
        document.getElementById('af-officer').value = a.officerId || '';
        document.getElementById('af-status').value  = a.status;
        this.openModal('application-modal');
    }

    deleteApplication(id) {
        if (!confirm('Delete application ' + id + '?')) return;
        var rows = (this.api.get('applications') || []).filter(function(a) { return a.id !== id; });
        this.api.set('applications', rows);
        this.showToast('Application deleted.', 'warning');
        this.loadApplications();
    }

    viewApplication(id) {
        var a = (this.api.get('applications') || []).find(function(x) { return x.id === id; });
        if (!a) return;
        var self = this;
        var prod = (this.api.get('products') || []).find(function(p) { return p.id === a.productId; });
        var emi = this.calcEMI(a.amount, prod ? prod.rate : 10, a.tenure);
        var statuses = ['submitted','under_review','docs_required','credit_check','approved','rejected','disbursed','closed'];
        var statusBtns = statuses.map(function(s) {
            return '<button class="btn btn-sm btn-outline" style="margin:2px" onclick="app.updateApplicationStatus(\'' + a.id + '\',\'' + s + '\')">' + s.replace(/_/g,' ') + '</button>';
        }).join('');
        document.getElementById('va-content').innerHTML =
            '<div class="detail-grid">' +
            '<div class="detail-item"><div class="di-label">Application ID</div><div class="di-value fw-600 text-primary">' + a.id + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Status</div><div class="di-value">' + self.statusBadge(a.status) + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Borrower</div><div class="di-value">' + a.borrowerName + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Product</div><div class="di-value">' + a.productName + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Loan Amount</div><div class="di-value fw-600">' + self.fmt(a.amount) + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Tenure</div><div class="di-value">' + a.tenure + ' months</div></div>' +
            '<div class="detail-item"><div class="di-label">Monthly EMI</div><div class="di-value text-primary fw-600">' + self.fmt(emi) + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Purpose</div><div class="di-value">' + (a.purpose || '\u2014') + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Loan Officer</div><div class="di-value">' + a.officerId + '</div></div>' +
            '<div class="detail-item"><div class="di-label">Applied Date</div><div class="di-value">' + self.fmtDate(a.appliedDate) + '</div></div>' +
            '</div><div style="margin-top:1rem"><span class="fw-600">Update Status: </span>' + statusBtns + '</div>';
        this.openModal('view-application-modal');
    }

    updateApplicationStatus(id, status) {
        var rows = this.api.get('applications') || [];
        var idx = rows.findIndex(function(a) { return a.id === id; });
        if (idx > -1) { rows[idx].status = status; rows[idx].lastUpdated = new Date().toISOString().substring(0, 10); this.api.set('applications', rows); }
        this.closeAllModals();
        this.showToast('Status updated to ' + status.replace(/_/g,' ') + '.');
        this.loadApplications();
    }

    searchApplications(q) { this.loadApplications(q); }

    _populateBorrowerSelect(elId, selectedId) {
        var el = document.getElementById(elId); if (!el) return;
        var borr = this.api.get('borrowers') || [];
        el.innerHTML = '<option value="">-- Select Borrower --</option>' + borr.map(function(b) { return '<option value="' + b.id + '"' + (b.id === selectedId ? ' selected' : '') + '>' + b.name + ' (' + b.pan + ')</option>'; }).join('');
    }

    _populateProductSelect(elId, selectedId) {
        var el = document.getElementById(elId); if (!el) return;
        var prods = (this.api.get('products') || []).filter(function(p) { return p.status === 'active'; });
        el.innerHTML = '<option value="">-- Select Product --</option>' + prods.map(function(p) { return '<option value="' + p.id + '"' + (p.id === selectedId ? ' selected' : '') + '>' + p.name + ' (' + p.rate + '%)</option>'; }).join('');
    }

    _populateAppSelect(elId, selectedId) {
        var el = document.getElementById(elId); if (!el) return;
        var apps = this.api.get('applications') || [];
        el.innerHTML = '<option value="">-- Select Application --</option>' + apps.map(function(a) { return '<option value="' + a.id + '"' + (a.id === selectedId ? ' selected' : '') + '>' + a.id + ' \u2013 ' + a.borrowerName + '</option>'; }).join('');
    }

    // ════════════════════════════════════════════
    //  PRODUCTS
    // ════════════════════════════════════════════
    loadProducts(query) {
        if (!query) query = '';
        var rows = this.api.get('products') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(p) { return p.name.toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('products-tbody');
        if (!tbody) return;
        var self = this;
        if (!rows.length) { tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><span style="font-size:2rem;display:block;margin-bottom:1rem">&#128230;</span><h3>No products</h3></div></td></tr>'; return; }
        tbody.innerHTML = rows.map(function(p) {
            return '<tr>' +
                '<td class="fw-600">' + p.name + '</td>' +
                '<td class="text-primary fw-600">' + p.rate + '%</td>' +
                '<td>' + self.fmt(p.maxAmount) + '</td>' +
                '<td>' + p.maxTenure + ' mo</td>' +
                '<td>' + p.processingFee + '%</td>' +
                '<td>' + p.prepaymentFee + '%</td>' +
                '<td>' + self.statusBadge(p.status) + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.editProduct(\'' + p.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteProduct(\'' + p.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
    }

    openAddProduct() {
        this.editingId = null;
        document.getElementById('product-modal-title').textContent = 'Add Loan Product';
        document.getElementById('product-form').reset();
        this.openModal('product-modal');
    }

    saveProduct() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var data = { name:f('pf-name'), rate:Number(f('pf-rate')), maxAmount:Number(f('pf-max-amount')), maxTenure:Number(f('pf-max-tenure')), processingFee:Number(f('pf-proc-fee')), prepaymentFee:Number(f('pf-preclose-fee')), description:f('pf-description'), status:f('pf-status') };
        if (!data.name || !data.rate) { this.showToast('Name and rate are required.', 'error'); return; }
        var rows = this.api.get('products') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(p) { return p.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('products', rows); this.showToast('Product updated.'); }
        } else {
            data.id = 'P' + String(Date.now() % 10000).padStart(3, '0');
            rows.push(data); this.api.set('products', rows); this.showToast('Product added.');
        }
        this.closeModal('product-modal'); this.loadProducts();
    }

    editProduct(id) {
        var p = (this.api.get('products') || []).find(function(x) { return x.id === id; });
        if (!p) return;
        this.editingId = id;
        document.getElementById('product-modal-title').textContent = 'Edit Loan Product';
        document.getElementById('pf-name').value          = p.name;
        document.getElementById('pf-rate').value          = p.rate;
        document.getElementById('pf-max-amount').value    = p.maxAmount;
        document.getElementById('pf-max-tenure').value    = p.maxTenure;
        document.getElementById('pf-proc-fee').value      = p.processingFee;
        document.getElementById('pf-preclose-fee').value  = p.prepaymentFee;
        document.getElementById('pf-description').value   = p.description || '';
        document.getElementById('pf-status').value        = p.status;
        this.openModal('product-modal');
    }

    deleteProduct(id) {
        if (!confirm('Delete this product?')) return;
        var rows = (this.api.get('products') || []).filter(function(p) { return p.id !== id; });
        this.api.set('products', rows); this.showToast('Product deleted.', 'warning'); this.loadProducts();
    }

    searchProducts(q) { this.loadProducts(q); }

    // ════════════════════════════════════════════
    //  CREDIT REVIEW
    // ════════════════════════════════════════════
    loadCredit(query) {
        if (!query) query = '';
        var rows = this.api.get('assessments') || [];
        var apps = this.api.get('applications') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(a) { return a.applicationId.toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('credit-tbody');
        if (!tbody) return;
        var self = this;
        tbody.innerHTML = rows.map(function(a) {
            var app = apps.find(function(x) { return x.id === a.applicationId; }) || {};
            var scoreColor = a.creditScore >= 750 ? '#10b981' : a.creditScore >= 650 ? '#f59e0b' : '#ef4444';
            return '<tr>' +
                '<td class="fw-600 text-primary">' + a.applicationId + '</td>' +
                '<td>' + (app.borrowerName || '\u2014') + '</td>' +
                '<td><div class="score-bar"><div class="score-bar-track"><div class="score-bar-fill" style="width:' + Math.round(a.creditScore / 9) + '%;background:' + scoreColor + '"></div></div><span class="score-val">' + a.creditScore + '</span></div></td>' +
                '<td>' + a.dti + '%</td>' +
                '<td>' + a.existingLoans + '</td>' +
                '<td>' + self.statusBadge(a.risk) + '</td>' +
                '<td>' + self.statusBadge(a.decision) + '</td>' +
                '<td>' + self.fmtDate(a.reviewDate) + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.editAssessment(\'' + a.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteAssessment(\'' + a.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
    }

    openAddAssessment() {
        this.editingId = null;
        document.getElementById('assessment-modal-title').textContent = 'New Credit Assessment';
        document.getElementById('assessment-form').reset();
        this._populateAppSelect('asf-application', '');
        this.openModal('assessment-modal');
    }

    saveAssessment() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var data = { applicationId:f('asf-application'), creditScore:Number(f('asf-credit-score')), dti:Number(f('asf-dti')), existingLoans:Number(f('asf-existing-loans')), monthlyIncome:Number(f('asf-monthly-income')), obligation:Number(f('asf-obligation')), risk:f('asf-risk'), decision:f('asf-decision'), remarks:f('asf-remarks'), reviewedBy:f('asf-reviewed-by'), reviewDate:f('asf-review-date') || new Date().toISOString().substring(0, 10) };
        if (!data.applicationId) { this.showToast('Select application.', 'error'); return; }
        var rows = this.api.get('assessments') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(a) { return a.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('assessments', rows); this.showToast('Assessment updated.'); }
        } else {
            data.id = 'A' + String(Date.now() % 1000000).padStart(6, '0');
            rows.push(data); this.api.set('assessments', rows); this.showToast('Assessment saved.');
        }
        this.closeModal('assessment-modal'); this.loadCredit();
    }

    editAssessment(id) {
        var a = (this.api.get('assessments') || []).find(function(x) { return x.id === id; });
        if (!a) return;
        this.editingId = id;
        document.getElementById('assessment-modal-title').textContent = 'Edit Credit Assessment';
        this._populateAppSelect('asf-application', a.applicationId);
        document.getElementById('asf-credit-score').value   = a.creditScore;
        document.getElementById('asf-dti').value            = a.dti;
        document.getElementById('asf-existing-loans').value = a.existingLoans;
        document.getElementById('asf-monthly-income').value = a.monthlyIncome;
        document.getElementById('asf-obligation').value     = a.obligation;
        document.getElementById('asf-risk').value           = a.risk;
        document.getElementById('asf-decision').value       = a.decision;
        document.getElementById('asf-remarks').value        = a.remarks || '';
        document.getElementById('asf-reviewed-by').value    = a.reviewedBy || '';
        document.getElementById('asf-review-date').value    = a.reviewDate || '';
        this.openModal('assessment-modal');
    }

    deleteAssessment(id) {
        if (!confirm('Delete this assessment?')) return;
        var rows = (this.api.get('assessments') || []).filter(function(a) { return a.id !== id; });
        this.api.set('assessments', rows); this.showToast('Assessment deleted.', 'warning'); this.loadCredit();
    }

    searchCredit(q) { this.loadCredit(q); }

    // ════════════════════════════════════════════
    //  DOCUMENTS
    // ════════════════════════════════════════════
    loadDocuments(query) {
        if (!query) query = '';
        var rows = this.api.get('documents') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(d) { return (d.applicationId + d.docType).toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('documents-tbody');
        if (!tbody) return;
        var self = this;
        tbody.innerHTML = rows.map(function(d) {
            return '<tr>' +
                '<td class="fw-600 text-primary">' + d.applicationId + '</td>' +
                '<td>' + d.docType + '</td>' +
                '<td>' + self.statusBadge(d.status) + '</td>' +
                '<td>' + (d.receivedDate ? self.fmtDate(d.receivedDate) : '\u2014') + '</td>' +
                '<td>' + (d.notes || '\u2014') + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.editDocument(\'' + d.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteDocument(\'' + d.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
    }

    openAddDocument() {
        this.editingId = null;
        document.getElementById('document-modal-title').textContent = 'Add Document';
        document.getElementById('document-form').reset();
        this._populateAppSelect('df-application', '');
        this.openModal('document-modal');
    }

    saveDocument() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var data = { applicationId:f('df-application'), docType:f('df-doc-type'), status:f('df-status'), receivedDate:f('df-received-date'), notes:f('df-notes') };
        if (!data.applicationId || !data.docType) { this.showToast('Application and doc type required.', 'error'); return; }
        var rows = this.api.get('documents') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(d) { return d.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('documents', rows); this.showToast('Document updated.'); }
        } else {
            data.id = 'D' + String(Date.now() % 1000000).padStart(6, '0');
            rows.push(data); this.api.set('documents', rows); this.showToast('Document added.');
        }
        this.closeModal('document-modal'); this.loadDocuments();
    }

    editDocument(id) {
        var d = (this.api.get('documents') || []).find(function(x) { return x.id === id; });
        if (!d) return;
        this.editingId = id;
        document.getElementById('document-modal-title').textContent = 'Edit Document';
        this._populateAppSelect('df-application', d.applicationId);
        document.getElementById('df-doc-type').value      = d.docType;
        document.getElementById('df-status').value        = d.status;
        document.getElementById('df-received-date').value = d.receivedDate || '';
        document.getElementById('df-notes').value         = d.notes || '';
        this.openModal('document-modal');
    }

    deleteDocument(id) {
        if (!confirm('Delete this document record?')) return;
        var rows = (this.api.get('documents') || []).filter(function(d) { return d.id !== id; });
        this.api.set('documents', rows); this.showToast('Document deleted.', 'warning'); this.loadDocuments();
    }

    searchDocuments(q) { this.loadDocuments(q); }

    // ════════════════════════════════════════════
    //  DISBURSEMENTS
    // ════════════════════════════════════════════
    loadDisbursements(query) {
        if (!query) query = '';
        var rows = this.api.get('disbursements') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(d) { return (d.applicationId + d.borrowerName).toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('disbursements-tbody');
        if (!tbody) return;
        var self = this;
        if (!rows.length) { tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><span style="font-size:2rem;display:block;margin-bottom:1rem">&#128184;</span><h3>No disbursements</h3></div></td></tr>'; return; }
        tbody.innerHTML = rows.map(function(d) {
            return '<tr>' +
                '<td class="fw-600 text-primary">' + d.applicationId + '</td>' +
                '<td>' + d.borrowerName + '</td>' +
                '<td class="fw-600">' + self.fmt(d.amount) + '</td>' +
                '<td>' + self.fmt(d.emi) + '/mo</td>' +
                '<td>' + d.accountNo + '<br><span class="text-muted fs-sm">' + d.ifsc + '</span></td>' +
                '<td>' + d.mode + '</td>' +
                '<td>' + self.statusBadge(d.status) + '</td>' +
                '<td>' + (d.disbursedDate ? self.fmtDate(d.disbursedDate) : 'Pending') + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.editDisbursement(\'' + d.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteDisbursement(\'' + d.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
    }

    openAddDisbursement() {
        this.editingId = null;
        document.getElementById('disbursement-modal-title').textContent = 'Record Disbursement';
        document.getElementById('disbursement-form').reset();
        this._populateAppSelect('disbf-application', '');
        this.openModal('disbursement-modal');
    }

    saveDisbursement() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var appId = f('disbf-application');
        var appRec = (this.api.get('applications') || []).find(function(a) { return a.id === appId; });
        if (!appRec) { this.showToast('Select a valid application.', 'error'); return; }
        var data = { applicationId:appId, borrowerName:appRec.borrowerName, amount:Number(f('disbf-amount')), accountNo:f('disbf-account'), ifsc:f('disbf-ifsc'), disbursedDate:f('disbf-date'), emi:Number(f('disbf-emi')), mode:f('disbf-mode'), status:f('disbf-status'), reference:f('disbf-reference') };
        var rows = this.api.get('disbursements') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(d) { return d.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('disbursements', rows); this.showToast('Disbursement updated.'); }
        } else {
            data.id = 'DIS' + String(Date.now() % 100000).padStart(5, '0');
            rows.push(data); this.api.set('disbursements', rows); this.showToast('Disbursement recorded.');
        }
        this.closeModal('disbursement-modal'); this.loadDisbursements();
    }

    editDisbursement(id) {
        var d = (this.api.get('disbursements') || []).find(function(x) { return x.id === id; });
        if (!d) return;
        this.editingId = id;
        document.getElementById('disbursement-modal-title').textContent = 'Edit Disbursement';
        this._populateAppSelect('disbf-application', d.applicationId);
        document.getElementById('disbf-amount').value    = d.amount;
        document.getElementById('disbf-account').value   = d.accountNo;
        document.getElementById('disbf-ifsc').value      = d.ifsc;
        document.getElementById('disbf-date').value      = d.disbursedDate || '';
        document.getElementById('disbf-emi').value       = d.emi;
        document.getElementById('disbf-mode').value      = d.mode;
        document.getElementById('disbf-status').value    = d.status;
        document.getElementById('disbf-reference').value = d.reference || '';
        this.openModal('disbursement-modal');
    }

    deleteDisbursement(id) {
        if (!confirm('Delete disbursement record?')) return;
        var rows = (this.api.get('disbursements') || []).filter(function(d) { return d.id !== id; });
        this.api.set('disbursements', rows); this.showToast('Disbursement deleted.', 'warning'); this.loadDisbursements();
    }

    searchDisbursements(q) { this.loadDisbursements(q); }

    // ════════════════════════════════════════════
    //  REPAYMENTS
    // ════════════════════════════════════════════
    loadRepayments(query) {
        if (!query) query = '';
        var rows = this.api.get('repayments') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(r) { return (r.applicationId + r.borrowerName).toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('repayments-tbody');
        if (!tbody) return;
        var self = this;
        if (!rows.length) { tbody.innerHTML = '<tr><td colspan="10"><div class="empty-state"><span style="font-size:2rem;display:block;margin-bottom:1rem">&#128197;</span><h3>No repayments</h3></div></td></tr>'; return; }
        tbody.innerHTML = rows.map(function(r) {
            return '<tr>' +
                '<td class="fw-600 text-primary">' + r.applicationId + '</td>' +
                '<td>' + r.borrowerName + '</td>' +
                '<td>EMI #' + r.emiNo + '</td>' +
                '<td class="fw-600">' + self.fmt(r.emiAmount) + '</td>' +
                '<td>' + self.fmt(r.principal) + '</td>' +
                '<td>' + self.fmt(r.interest) + '</td>' +
                '<td>' + self.fmtDate(r.dueDate) + '</td>' +
                '<td>' + (r.paidDate ? self.fmtDate(r.paidDate) : '\u2014') + '</td>' +
                '<td>' + self.statusBadge(r.status) + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.editPayment(\'' + r.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deletePayment(\'' + r.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
    }

    openAddPayment() {
        this.editingId = null;
        document.getElementById('payment-modal-title').textContent = 'Record EMI Payment';
        document.getElementById('payment-form').reset();
        this._populateAppSelect('pf-application', '');
        this.openModal('payment-modal');
    }

    savePayment() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var appId = f('pf-application');
        var appRec = (this.api.get('applications') || []).find(function(a) { return a.id === appId; });
        if (!appRec) { this.showToast('Select application.', 'error'); return; }
        var data = { applicationId:appId, borrowerName:appRec.borrowerName, emiNo:Number(f('pf-emi-no')), emiAmount:Number(f('pf-emi-amount')), principal:Number(f('pf-principal')), interest:Number(f('pf-interest')), balance:Number(f('pf-balance')), dueDate:f('pf-due-date'), paidDate:f('pf-paid-date') || '', status:f('pf-status') };
        var rows = this.api.get('repayments') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(r) { return r.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('repayments', rows); this.showToast('Payment updated.'); }
        } else {
            data.id = 'R' + String(Date.now() % 1000000).padStart(6, '0');
            rows.push(data); this.api.set('repayments', rows); this.showToast('Payment recorded.');
        }
        this.closeModal('payment-modal'); this.loadRepayments();
    }

    editPayment(id) {
        var r = (this.api.get('repayments') || []).find(function(x) { return x.id === id; });
        if (!r) return;
        this.editingId = id;
        document.getElementById('payment-modal-title').textContent = 'Edit Payment';
        this._populateAppSelect('pf-application', r.applicationId);
        document.getElementById('pf-emi-no').value     = r.emiNo;
        document.getElementById('pf-emi-amount').value = r.emiAmount;
        document.getElementById('pf-principal').value  = r.principal;
        document.getElementById('pf-interest').value   = r.interest;
        document.getElementById('pf-balance').value    = r.balance;
        document.getElementById('pf-due-date').value   = r.dueDate || '';
        document.getElementById('pf-paid-date').value  = r.paidDate || '';
        document.getElementById('pf-status').value     = r.status;
        this.openModal('payment-modal');
    }

    deletePayment(id) {
        if (!confirm('Delete payment record?')) return;
        var rows = (this.api.get('repayments') || []).filter(function(r) { return r.id !== id; });
        this.api.set('repayments', rows); this.showToast('Payment deleted.', 'warning'); this.loadRepayments();
    }

    searchRepayments(q) { this.loadRepayments(q); }

    // ════════════════════════════════════════════
    //  SUPPORT TICKETS
    // ════════════════════════════════════════════
    loadSupport(query) {
        if (!query) query = '';
        var rows = this.api.get('tickets') || [];
        var q = query.toLowerCase();
        if (q) rows = rows.filter(function(t) { return (t.subject + t.borrowerName + t.applicationId).toLowerCase().indexOf(q) >= 0; });
        var tbody = document.getElementById('support-tbody');
        if (!tbody) return;
        var self = this;
        if (!rows.length) { tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><span style="font-size:2rem;display:block;margin-bottom:1rem">&#127915;</span><h3>No tickets</h3></div></td></tr>'; return; }
        tbody.innerHTML = rows.map(function(t) {
            return '<tr>' +
                '<td class="fw-600">' + t.id + '</td>' +
                '<td class="fw-600 text-primary">' + t.applicationId + '</td>' +
                '<td>' + t.borrowerName + '</td>' +
                '<td>' + t.subject + '</td>' +
                '<td>' + self.statusBadge('priority-' + t.priority) + '</td>' +
                '<td>' + self.statusBadge(t.status) + '</td>' +
                '<td>' + self.fmtDate(t.createdDate) + '</td>' +
                '<td><div class="action-btns"><button class="btn btn-ghost btn-sm" onclick="app.editTicket(\'' + t.id + '\')" title="Edit">&#9998;</button><button class="btn btn-ghost btn-sm text-danger" onclick="app.deleteTicket(\'' + t.id + '\')" title="Delete">&#128465;</button></div></td>' +
                '</tr>';
        }).join('');
    }

    openAddTicket() {
        this.editingId = null;
        document.getElementById('ticket-modal-title').textContent = 'New Support Ticket';
        document.getElementById('ticket-form').reset();
        this._populateAppSelect('tf-application', '');
        this.openModal('ticket-modal');
    }

    saveTicket() {
        var self = this;
        function f(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
        var appId = f('tf-application');
        var appRec = (this.api.get('applications') || []).find(function(a) { return a.id === appId; }) || { borrowerName: 'Unknown' };
        var data = { applicationId:appId, borrowerName:appRec.borrowerName, subject:f('tf-subject'), priority:f('tf-priority'), status:f('tf-status'), notes:f('tf-notes'), createdDate:new Date().toISOString().substring(0, 10) };
        if (!data.subject) { this.showToast('Subject is required.', 'error'); return; }
        var rows = this.api.get('tickets') || [];
        if (this.editingId) {
            var idx = rows.findIndex(function(t) { return t.id === self.editingId; });
            if (idx > -1) { rows[idx] = Object.assign({}, rows[idx], data); this.api.set('tickets', rows); this.showToast('Ticket updated.'); }
        } else {
            data.id = 'T' + String(Date.now() % 1000000).padStart(6, '0');
            rows.push(data); this.api.set('tickets', rows); this.showToast('Ticket created.');
        }
        this.closeModal('ticket-modal'); this.loadSupport();
    }

    editTicket(id) {
        var t = (this.api.get('tickets') || []).find(function(x) { return x.id === id; });
        if (!t) return;
        this.editingId = id;
        document.getElementById('ticket-modal-title').textContent = 'Edit Ticket';
        this._populateAppSelect('tf-application', t.applicationId);
        document.getElementById('tf-subject').value  = t.subject;
        document.getElementById('tf-priority').value = t.priority;
        document.getElementById('tf-status').value   = t.status;
        document.getElementById('tf-notes').value    = t.notes || '';
        this.openModal('ticket-modal');
    }

    deleteTicket(id) {
        if (!confirm('Delete this ticket?')) return;
        var rows = (this.api.get('tickets') || []).filter(function(t) { return t.id !== id; });
        this.api.set('tickets', rows); this.showToast('Ticket deleted.', 'warning'); this.loadSupport();
    }

    searchSupport(q) { this.loadSupport(q); }
}
