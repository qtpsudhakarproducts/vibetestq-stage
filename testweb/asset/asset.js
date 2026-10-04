/**
 * AssetExplorer — Enterprise IT Asset Management
 * Full ITSM asset lifecycle for Playwright test automation practice
 */

// =========================================
// MOCK DATA
// =========================================
const ASSET_DATA = {
    hardware: [
        { id: 'HW-001', tag: 'AT-2026-001', name: 'DESK-WS-001', type: 'Workstation', category: 'IT', model: 'Dell OptiPlex 7090', serial: 'DELLOP7090-A1B2', ip: '192.168.1.101', os: 'Windows 11 Pro', cpu: 'Intel i7-12700', ram: '32GB', storage: '512GB SSD', user: 'Rahul Sharma', dept: 'Engineering', location: 'Floor 3, B-Wing', status: 'In Use', purchaseDate: '2024-06-15', warrantyEnd: '2027-06-15', cost: 1250 },
        { id: 'HW-002', tag: 'AT-2026-002', name: 'LAP-MBP-042', type: 'Laptop', category: 'IT', model: 'MacBook Pro 14"', serial: 'C02F92XJML7H', ip: '192.168.1.142', os: 'macOS Sonoma', cpu: 'Apple M3 Pro', ram: '18GB', storage: '512GB SSD', user: 'Priya Patel', dept: 'Design', location: 'Floor 2, A-Wing', status: 'In Use', purchaseDate: '2024-01-20', warrantyEnd: '2027-01-20', cost: 2199 },
        { id: 'HW-003', tag: 'AT-2026-003', name: 'SRV-PROD-01', type: 'Server', category: 'IT', model: 'Dell PowerEdge R750', serial: 'DELLPE-R750-X1', ip: '10.0.0.10', os: 'Ubuntu 22.04 LTS', cpu: 'Xeon Gold 6338', ram: '128GB', storage: '4TB RAID', user: 'DevOps Team', dept: 'Infrastructure', location: 'Server Room A', status: 'In Use', purchaseDate: '2023-03-01', warrantyEnd: '2028-03-01', cost: 8500 },
        { id: 'HW-004', tag: 'AT-2026-004', name: 'LAP-THK-019', type: 'Laptop', category: 'IT', model: 'ThinkPad X1 Carbon', serial: 'LENOVO-X1C-019', ip: '192.168.1.119', os: 'Windows 11 Pro', cpu: 'Intel i7-1365U', ram: '16GB', storage: '256GB SSD', user: 'Amit Kumar', dept: 'QA', location: 'Floor 2, B-Wing', status: 'In Use', purchaseDate: '2024-03-10', warrantyEnd: '2027-03-10', cost: 1599 },
        { id: 'HW-005', tag: 'AT-2026-005', name: 'DESK-WS-012', type: 'Workstation', category: 'IT', model: 'HP Z2 Tower G9', serial: 'HP-Z2G9-012', ip: '192.168.1.112', os: 'Windows 11 Pro', cpu: 'Intel i9-12900', ram: '64GB', storage: '1TB SSD', user: 'Deepa Nair', dept: 'Data Science', location: 'Floor 4, A-Wing', status: 'In Use', purchaseDate: '2024-08-01', warrantyEnd: '2027-08-01', cost: 2800 },
        { id: 'HW-006', tag: 'AT-2026-006', name: 'LAP-MBP-055', type: 'Laptop', category: 'IT', model: 'MacBook Air M2', serial: 'C02G12ABKL7M', ip: '192.168.1.155', os: 'macOS Ventura', cpu: 'Apple M2', ram: '8GB', storage: '256GB SSD', user: 'Sneha Reddy', dept: 'Marketing', location: 'Floor 1, A-Wing', status: 'In Use', purchaseDate: '2023-11-15', warrantyEnd: '2026-11-15', cost: 1199 },
        { id: 'HW-007', tag: 'AT-2026-007', name: 'SRV-DEV-02', type: 'Server', category: 'IT', model: 'HP ProLiant DL380', serial: 'HP-DL380-002', ip: '10.0.0.20', os: 'CentOS 8', cpu: 'Xeon Silver 4314', ram: '64GB', storage: '2TB RAID', user: 'Dev Team', dept: 'Engineering', location: 'Server Room B', status: 'Maintenance', purchaseDate: '2022-07-20', warrantyEnd: '2025-07-20', cost: 6200 },
        { id: 'HW-008', tag: 'AT-2026-008', name: 'MON-LG-034', type: 'Monitor', category: 'IT', model: 'LG UltraWide 34"', serial: 'LG-UW34-034', ip: 'N/A', os: 'N/A', cpu: 'N/A', ram: 'N/A', storage: 'N/A', user: 'Rahul Sharma', dept: 'Engineering', location: 'Floor 3, B-Wing', status: 'In Use', purchaseDate: '2024-06-15', warrantyEnd: '2027-06-15', cost: 450 },
        { id: 'HW-009', tag: 'AT-2026-009', name: 'PRINT-HP-01', type: 'Printer', category: 'IT', model: 'HP LaserJet Pro MFP', serial: 'HP-LJP-MFP-01', ip: '192.168.1.200', os: 'N/A', cpu: 'N/A', ram: 'N/A', storage: 'N/A', user: 'Shared', dept: 'Admin', location: 'Floor 1, Common', status: 'In Use', purchaseDate: '2023-09-01', warrantyEnd: '2026-09-01', cost: 380 },
        { id: 'HW-010', tag: 'AT-2026-010', name: 'SW-CISCO-01', type: 'Network Switch', category: 'IT', model: 'Cisco Catalyst 9200', serial: 'CISCO-C9200-01', ip: '10.0.0.1', os: 'IOS XE', cpu: 'N/A', ram: 'N/A', storage: 'N/A', user: 'Network Team', dept: 'Infrastructure', location: 'Server Room A', status: 'In Use', purchaseDate: '2023-01-15', warrantyEnd: '2028-01-15', cost: 3200 },
        { id: 'HW-011', tag: 'AT-2026-011', name: 'LAP-DELL-088', type: 'Laptop', category: 'IT', model: 'Dell Latitude 5540', serial: 'DELL-L5540-088', ip: '192.168.1.188', os: 'Windows 11 Pro', cpu: 'Intel i5-1345U', ram: '16GB', storage: '256GB SSD', user: 'Unassigned', dept: 'IT Pool', location: 'IT Store', status: 'In Stock', purchaseDate: '2024-10-01', warrantyEnd: '2027-10-01', cost: 1100 },
        { id: 'HW-012', tag: 'AT-2026-012', name: 'DESK-OLD-005', type: 'Workstation', category: 'IT', model: 'Dell OptiPlex 3060', serial: 'DELL-OP3060-005', ip: 'N/A', os: 'Windows 10', cpu: 'Intel i5-8500', ram: '8GB', storage: '256GB HDD', user: 'Disposed', dept: 'N/A', location: 'Warehouse', status: 'Retired', purchaseDate: '2019-04-01', warrantyEnd: '2022-04-01', cost: 650 },
    ],
    nonit: [
        { id: 'NI-001', tag: 'NI-2026-001', name: 'Office Desk - Ergonomic', category: 'Non-IT', type: 'Furniture', model: 'Steelcase Leap V2', location: 'Floor 3, B-Wing', assignedTo: 'Rahul Sharma', dept: 'Engineering', status: 'In Use', purchaseDate: '2024-01-10', cost: 780 },
        { id: 'NI-002', tag: 'NI-2026-002', name: 'Conference Room Projector', category: 'Non-IT', type: 'AV Equipment', model: 'Epson EB-U50', location: 'Floor 2, Conf Room A', assignedTo: 'Shared', dept: 'Admin', status: 'In Use', purchaseDate: '2023-06-20', cost: 1200 },
        { id: 'NI-003', tag: 'NI-2026-003', name: 'Standing Desk Converter', category: 'Non-IT', type: 'Furniture', model: 'VariDesk Pro 36', location: 'Floor 4, A-Wing', assignedTo: 'Deepa Nair', dept: 'Data Science', status: 'In Use', purchaseDate: '2024-05-15', cost: 395 },
        { id: 'NI-004', tag: 'NI-2026-004', name: 'Whiteboard - Glass', category: 'Non-IT', type: 'Office Equipment', model: 'Quartet Infinity 72"', location: 'Floor 3, Agile Zone', assignedTo: 'Shared', dept: 'Engineering', status: 'In Use', purchaseDate: '2023-12-01', cost: 320 },
        { id: 'NI-005', tag: 'NI-2026-005', name: 'Air Purifier', category: 'Non-IT', type: 'Appliance', model: 'Dyson Pure Cool TP07', location: 'Floor 1, Reception', assignedTo: 'Shared', dept: 'Facilities', status: 'In Use', purchaseDate: '2024-02-28', cost: 550 },
    ],
    software: [
        { id: 'SW-001', publisher: 'Microsoft', name: 'Microsoft 365 Business', version: 'E5', licenseType: 'Subscription', purchased: 150, installed: 128, category: 'Productivity', expiry: '2026-12-31', cost: 22, compliance: 'compliant', usage: 'frequent' },
        { id: 'SW-002', publisher: 'JetBrains', name: 'IntelliJ IDEA Ultimate', version: '2024.1', licenseType: 'Subscription', purchased: 30, installed: 28, category: 'Development', expiry: '2025-06-30', cost: 599, compliance: 'compliant', usage: 'frequent' },
        { id: 'SW-003', publisher: 'Adobe', name: 'Creative Cloud', version: '2024', licenseType: 'Subscription', purchased: 20, installed: 24, category: 'Design', expiry: '2025-09-15', cost: 55, compliance: 'over', usage: 'frequent' },
        { id: 'SW-004', publisher: 'Atlassian', name: 'Jira Software', version: 'Cloud', licenseType: 'SaaS', purchased: 100, installed: 95, category: 'Project Management', expiry: '2026-03-31', cost: 8, compliance: 'compliant', usage: 'frequent' },
        { id: 'SW-005', publisher: 'Slack', name: 'Slack Business+', version: 'Cloud', licenseType: 'SaaS', purchased: 200, installed: 178, category: 'Communication', expiry: '2026-06-30', cost: 13, compliance: 'compliant', usage: 'frequent' },
        { id: 'SW-006', publisher: 'Zoom', name: 'Zoom Workplace', version: '6.0', licenseType: 'Subscription', purchased: 100, installed: 42, category: 'Communication', expiry: '2025-12-31', cost: 20, compliance: 'under', usage: 'occasional' },
        { id: 'SW-007', publisher: 'AutoDesk', name: 'AutoCAD', version: '2024', licenseType: 'Perpetual', purchased: 10, installed: 3, category: 'Design', expiry: 'N/A', cost: 1775, compliance: 'under', usage: 'rarely' },
        { id: 'SW-008', publisher: 'Postman', name: 'Postman Enterprise', version: '11.x', licenseType: 'Subscription', purchased: 40, installed: 38, category: 'Development', expiry: '2025-11-30', cost: 30, compliance: 'compliant', usage: 'frequent' },
        { id: 'SW-009', publisher: 'Tableau', name: 'Tableau Creator', version: '2024.1', licenseType: 'Subscription', purchased: 15, installed: 12, category: 'Analytics', expiry: '2025-08-31', cost: 75, compliance: 'compliant', usage: 'occasional' },
        { id: 'SW-010', publisher: 'Kaspersky', name: 'Endpoint Security', version: '12.5', licenseType: 'Subscription', purchased: 200, installed: 198, category: 'Security', expiry: '2025-10-15', cost: 40, compliance: 'compliant', usage: 'frequent' },
    ],
    purchases: [
        { id: 'PO-2026-001', title: 'Q1 Laptop Procurement', vendor: 'Dell Technologies', items: '15x Dell Latitude 5540', amount: 16500, requestedBy: 'Suresh Iyer', approver: 'VP Engineering', status: 'approved', requestDate: '2026-01-15', approvalDate: '2026-01-20', deliveryDate: '2026-02-10', priority: 'high' },
        { id: 'PO-2026-002', title: 'Server Expansion', vendor: 'HP Enterprise', items: '2x ProLiant DL380 Gen11', amount: 18400, requestedBy: 'Vikram Singh', approver: 'CTO', status: 'approved', requestDate: '2026-01-22', approvalDate: '2026-01-25', deliveryDate: '2026-03-01', priority: 'high' },
        { id: 'PO-2026-003', title: 'Office Monitors Refresh', vendor: 'LG Electronics', items: '30x LG 27" 4K Monitors', amount: 13500, requestedBy: 'Anita Desai', approver: 'CFO', status: 'pending', requestDate: '2026-02-01', approvalDate: null, deliveryDate: null, priority: 'medium' },
        { id: 'PO-2026-004', title: 'Network Switch Upgrade', vendor: 'Cisco Systems', items: '4x Catalyst 9300', amount: 28000, requestedBy: 'Rajesh Menon', approver: 'CTO', status: 'pending', requestDate: '2026-02-05', approvalDate: null, deliveryDate: null, priority: 'high' },
        { id: 'PO-2026-005', title: 'Ergonomic Keyboards', vendor: 'Logitech', items: '50x Logitech Ergo K860', amount: 6500, requestedBy: 'HR Dept', approver: 'VP Operations', status: 'approved', requestDate: '2026-01-10', approvalDate: '2026-01-12', deliveryDate: '2026-01-25', priority: 'low' },
        { id: 'PO-2026-006', title: 'Security Camera System', vendor: 'Hikvision', items: '12x IP Cameras + NVR', amount: 4800, requestedBy: 'Facilities', approver: 'VP Operations', status: 'rejected', requestDate: '2025-12-20', approvalDate: null, deliveryDate: null, priority: 'medium' },
    ],
    contracts: [
        { id: 'CT-001', title: 'Microsoft Enterprise Agreement', vendor: 'Microsoft', type: 'Software', startDate: '2024-01-01', endDate: '2026-12-31', value: 180000, status: 'valid', renewalAlert: 90, owner: 'IT Procurement', notes: 'Covers M365, Azure, Windows licenses' },
        { id: 'CT-002', title: 'AWS Cloud Services', vendor: 'Amazon Web Services', type: 'Cloud', startDate: '2024-06-01', endDate: '2025-05-31', value: 96000, status: 'expiring', renewalAlert: 60, owner: 'Cloud Ops', notes: 'Reserved instances + on-demand' },
        { id: 'CT-003', title: 'Annual Hardware Maintenance', vendor: 'Dell Technologies', type: 'Maintenance', startDate: '2024-04-01', endDate: '2025-03-31', value: 42000, status: 'expired', renewalAlert: 30, owner: 'IT Support', notes: 'Next business day on-site support' },
        { id: 'CT-004', title: 'Managed Network Services', vendor: 'Cisco', type: 'Service', startDate: '2025-01-01', endDate: '2027-12-31', value: 120000, status: 'valid', renewalAlert: 90, owner: 'Network Team', notes: '24x7 NOC monitoring + support' },
        { id: 'CT-005', title: 'Cybersecurity Suite', vendor: 'CrowdStrike', type: 'Security', startDate: '2025-03-01', endDate: '2026-02-28', value: 65000, status: 'valid', renewalAlert: 60, owner: 'Security Ops', notes: 'Falcon Prevent + Insight' },
        { id: 'CT-006', title: 'Office Lease - Building A', vendor: 'Prestige Group', type: 'Facility', startDate: '2023-01-01', endDate: '2025-12-31', value: 360000, status: 'expiring', renewalAlert: 90, owner: 'Facilities', notes: '3-floor office space rental' },
    ],
    consumables: [
        { id: 'CON-001', name: 'HP Toner Cartridge 80A', category: 'Printer Supplies', stock: 24, minStock: 10, unit: 'pcs', costPerUnit: 45, lastOrdered: '2026-01-10' },
        { id: 'CON-002', name: 'Cat6 Ethernet Cable 3m', category: 'Networking', stock: 150, minStock: 50, unit: 'pcs', costPerUnit: 5, lastOrdered: '2025-12-20' },
        { id: 'CON-003', name: 'USB-C Adapter Hub', category: 'Accessories', stock: 8, minStock: 15, unit: 'pcs', costPerUnit: 35, lastOrdered: '2026-02-01' },
        { id: 'CON-004', name: 'Wireless Mouse', category: 'Peripherals', stock: 42, minStock: 20, unit: 'pcs', costPerUnit: 25, lastOrdered: '2026-01-25' },
        { id: 'CON-005', name: 'HDMI Cable 2m', category: 'Cables', stock: 65, minStock: 30, unit: 'pcs', costPerUnit: 8, lastOrdered: '2025-11-15' },
        { id: 'CON-006', name: 'Keyboard Replacement', category: 'Peripherals', stock: 5, minStock: 10, unit: 'pcs', costPerUnit: 45, lastOrdered: '2025-12-05' },
    ]
};

// =========================================
// ASSET EXPLORER APP
// =========================================
class AssetExplorer {
    constructor() {
        const stored = JSON.parse(localStorage.getItem('assetexplorer_v2') || '{}');
        localStorage.setItem('assetexplorer_v2', JSON.stringify({
            ...ASSET_DATA,
            bookings: stored.bookings || []
        }));
        this.api = new MockAPI('assetexplorer_v2', ASSET_DATA);
        this.currentTab = 'tab-dashboard';
        this.init();
    }

    init() {
        this.setupNav();
        this.loadDashboard();
    }

    // ===== NAVIGATION =====
    setupNav() {
        document.querySelectorAll('.nav-link[data-target]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = link.dataset.target;
                this.showTab(target);
            });
        });
    }

    showTab(tabId) {
        document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const tab = document.getElementById(tabId);
        if (tab) tab.classList.add('active');
        const navLink = document.querySelector(`.nav-link[data-target="${tabId}"]`);
        if (navLink) navLink.classList.add('active');
        this.currentTab = tabId;

        if (tabId === 'tab-dashboard') this.loadDashboard();
        else if (tabId === 'tab-it') this.loadIT();
        else if (tabId === 'tab-nonit') this.loadNonIT();
        else if (tabId === 'tab-software') this.loadSoftware();
        else if (tabId === 'tab-cmdb') this.loadCMDB();
        else if (tabId === 'tab-purchases') this.loadPurchases();
        else if (tabId === 'tab-contracts') this.loadContracts();
        else if (tabId === 'tab-consumables') this.loadConsumables();
    }

    // ===== DASHBOARD =====
    async loadDashboard() {
        const hw = await this.api.get('hardware');
        const ni = await this.api.get('nonit');
        const sw = await this.api.get('software');
        const po = await this.api.get('purchases');
        const ct = await this.api.get('contracts');
        const con = await this.api.get('consumables');

        document.getElementById('stat-it').textContent = hw.length;
        document.getElementById('stat-nonit').textContent = ni.length;
        document.getElementById('stat-sw').textContent = sw.length;
        document.getElementById('stat-po').textContent = po.filter(p => p.status === 'pending').length;
        document.getElementById('stat-contracts').textContent = ct.length;
        document.getElementById('stat-consumables').textContent = con.length;

        // Compliance summary
        const overLic = sw.filter(s => s.compliance === 'over').length;
        const underLic = sw.filter(s => s.compliance === 'under').length;
        document.getElementById('stat-compliance').textContent = overLic > 0 ? `${overLic} Over` : 'All OK';
        document.getElementById('stat-compliance').className = `stat-value ${overLic > 0 ? 'text-danger' : ''}`;

        // Expiring contracts
        const expiring = ct.filter(c => c.status === 'expiring' || c.status === 'expired').length;
        document.getElementById('stat-expiring').textContent = expiring;

        // Recent assets table
        const recent = [...hw].sort((a, b) => b.purchaseDate.localeCompare(a.purchaseDate)).slice(0, 6);
        document.getElementById('recent-assets-body').innerHTML = recent.map(h => `
            <tr>
                <td><span class="tag-chip">${h.tag}</span></td>
                <td><strong>${h.name}</strong><br><span style="font-size:0.72rem;color:var(--ae-muted)">${h.model}</span></td>
                <td>${h.type}</td>
                <td>${h.user}</td>
                <td>${h.dept}</td>
                <td><span class="badge badge-${h.status.toLowerCase().replace(/\s/g, '-')}">${h.status}</span></td>
            </tr>
        `).join('');

        // Low stock alerts
        const lowStock = con.filter(c => c.stock <= c.minStock);
        document.getElementById('low-stock-body').innerHTML = lowStock.length > 0 ? lowStock.map(c => `
            <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.category}</td>
                <td style="color:var(--ae-danger);font-weight:700;">${c.stock} ${c.unit}</td>
                <td>${c.minStock} ${c.unit}</td>
            </tr>
        `).join('') : '<tr><td colspan="4" style="text-align:center;color:var(--ae-muted);padding:1.5rem;">All consumables are well-stocked ✓</td></tr>';
    }

    // ===== IT ASSETS =====
    async loadIT() {
        const container = document.getElementById('it-assets-body');
        container.innerHTML = '<tr><td colspan="8" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></td></tr>';
        await this.delay(600);
        const hw = await this.api.get('hardware');
        container.innerHTML = hw.map(h => `
            <tr id="hw-row-${h.id}">
                <td><span class="tag-chip">${h.tag}</span></td>
                <td><strong>${h.name}</strong></td>
                <td>${h.type}</td>
                <td>${h.model}</td>
                <td>${h.user}</td>
                <td>${h.location}</td>
                <td><span class="badge badge-${h.status.toLowerCase().replace(/\s/g, '-')}">${h.status}</span></td>
                <td>
                    <div style="display:flex;gap:4px;">
                        <button class="btn-ae-icon" title="View" onclick="app.viewAsset('${h.id}')"><i class="fas fa-eye"></i></button>
                        <button class="btn-ae-icon" title="Edit" onclick="app.editAsset('${h.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn-ae-icon" title="Delete" onclick="app.deleteAsset('${h.id}','hardware')" style="color:var(--ae-danger);"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
        document.getElementById('it-count').textContent = `${hw.length} assets`;
    }

    async viewAsset(id) {
        const hw = await this.api.get('hardware');
        const a = hw.find(h => h.id === id);
        if (!a) return;
        document.getElementById('view-asset-body').innerHTML = `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="ae-form-group"><span class="ae-form-label">Asset Tag</span><span class="tag-chip">${a.tag}</span></div>
                <div class="ae-form-group"><span class="ae-form-label">Hostname</span><strong>${a.name}</strong></div>
                <div class="ae-form-group"><span class="ae-form-label">Type</span>${a.type}</div>
                <div class="ae-form-group"><span class="ae-form-label">Model</span>${a.model}</div>
                <div class="ae-form-group"><span class="ae-form-label">Serial Number</span><code>${a.serial}</code></div>
                <div class="ae-form-group"><span class="ae-form-label">IP Address</span><code>${a.ip}</code></div>
                <div class="ae-form-group"><span class="ae-form-label">Operating System</span>${a.os}</div>
                <div class="ae-form-group"><span class="ae-form-label">CPU</span>${a.cpu}</div>
                <div class="ae-form-group"><span class="ae-form-label">RAM</span>${a.ram}</div>
                <div class="ae-form-group"><span class="ae-form-label">Storage</span>${a.storage}</div>
                <div class="ae-form-group"><span class="ae-form-label">Assigned To</span>${a.user}</div>
                <div class="ae-form-group"><span class="ae-form-label">Department</span>${a.dept}</div>
                <div class="ae-form-group"><span class="ae-form-label">Location</span>${a.location}</div>
                <div class="ae-form-group"><span class="ae-form-label">Status</span><span class="badge badge-${a.status.toLowerCase().replace(/\s/g, '-')}">${a.status}</span></div>
                <div class="ae-form-group"><span class="ae-form-label">Purchase Date</span>${a.purchaseDate}</div>
                <div class="ae-form-group"><span class="ae-form-label">Warranty End</span>${a.warrantyEnd}</div>
                <div class="ae-form-group"><span class="ae-form-label">Cost</span><strong>$${a.cost.toLocaleString()}</strong></div>
            </div>
        `;
        this.openModal('modal-view-asset');
    }

    editAsset(id) {
        this.editingAssetId = id;
        this.api.get('hardware').then(hw => {
            const a = hw.find(h => h.id === id);
            if (!a) return;
            document.getElementById('edit-tag').value = a.tag;
            document.getElementById('edit-name').value = a.name;
            document.getElementById('edit-type').value = a.type;
            document.getElementById('edit-model').value = a.model;
            document.getElementById('edit-serial').value = a.serial;
            document.getElementById('edit-ip').value = a.ip;
            document.getElementById('edit-user').value = a.user;
            document.getElementById('edit-dept').value = a.dept;
            document.getElementById('edit-location').value = a.location;
            document.getElementById('edit-status').value = a.status;
            this.openModal('modal-edit-asset');
        });
    }

    async saveAssetEdit() {
        const updates = {
            tag: document.getElementById('edit-tag').value,
            name: document.getElementById('edit-name').value,
            type: document.getElementById('edit-type').value,
            model: document.getElementById('edit-model').value,
            serial: document.getElementById('edit-serial').value,
            ip: document.getElementById('edit-ip').value,
            user: document.getElementById('edit-user').value,
            dept: document.getElementById('edit-dept').value,
            location: document.getElementById('edit-location').value,
            status: document.getElementById('edit-status').value,
        };
        await this.api.put('hardware', this.editingAssetId, updates);
        this.closeModal('modal-edit-asset');
        this.toast('Asset updated successfully', 'success');
        this.loadIT();
    }

    async deleteAsset(id, collection) {
        if (!confirm(`Decommission asset ${id}? This action cannot be undone.`)) return;
        await this.api.delete(collection, id);
        this.toast('Asset decommissioned', 'warning');
        if (collection === 'hardware') this.loadIT();
        else if (collection === 'nonit') this.loadNonIT();
    }

    // Register new asset
    async registerAsset() {
        const tag = document.getElementById('reg-tag').value.trim();
        const name = document.getElementById('reg-name').value.trim();
        const type = document.getElementById('reg-type').value;
        const model = document.getElementById('reg-model').value.trim();
        const serial = document.getElementById('reg-serial').value.trim();
        const ip = document.getElementById('reg-ip').value.trim();
        const user = document.getElementById('reg-user').value.trim();
        const dept = document.getElementById('reg-dept').value;
        const location = document.getElementById('reg-location').value.trim();

        if (!tag || !name || !model) {
            this.toast('Please fill all required fields', 'error');
            return;
        }

        const btn = document.getElementById('btn-register');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        btn.disabled = true;
        await this.delay(1000);

        await this.api.post('hardware', {
            tag, name, type, category: 'IT', model, serial,
            ip: ip || 'N/A', os: 'N/A', cpu: 'N/A', ram: 'N/A', storage: 'N/A',
            user: user || 'Unassigned', dept: dept || 'IT Pool',
            location: location || 'IT Store', status: 'In Stock',
            purchaseDate: new Date().toISOString().split('T')[0],
            warrantyEnd: 'TBD', cost: 0
        });

        btn.innerHTML = '<i class="fas fa-plus"></i> Register Asset';
        btn.disabled = false;
        document.getElementById('register-form').reset();
        this.closeModal('modal-register');
        this.toast(`Asset ${tag} registered successfully!`, 'success');
        this.loadIT();
    }

    // ===== NON-IT ASSETS =====
    async loadNonIT() {
        const container = document.getElementById('nonit-assets-body');
        container.innerHTML = '<tr><td colspan="7" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></td></tr>';
        await this.delay(600);
        const items = await this.api.get('nonit');
        container.innerHTML = items.map(n => `
            <tr>
                <td><span class="tag-chip">${n.tag}</span></td>
                <td><strong>${n.name}</strong></td>
                <td>${n.type}</td>
                <td>${n.location}</td>
                <td>${n.assignedTo}</td>
                <td><span class="badge badge-${n.status.toLowerCase().replace(/\s/g, '-')}">${n.status}</span></td>
                <td>
                    <button class="btn-ae-icon" title="Delete" onclick="app.deleteAsset('${n.id}','nonit')" style="color:var(--ae-danger);"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    // ===== SOFTWARE =====
    async loadSoftware() {
        const container = document.getElementById('software-body');
        container.innerHTML = '<tr><td colspan="8" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></td></tr>';
        await this.delay(600);
        const sw = await this.api.get('software');
        container.innerHTML = sw.map(s => {
            const pct = Math.round((s.installed / s.purchased) * 100);
            const barClass = s.compliance === 'over' ? 'compliance-danger' : s.compliance === 'under' ? 'compliance-warn' : 'compliance-ok';
            return `
            <tr id="sw-row-${s.id}">
                <td><strong>${s.name}</strong><br><span style="font-size:0.72rem;color:var(--ae-muted)">${s.publisher}</span></td>
                <td>${s.version}</td>
                <td>${s.licenseType}</td>
                <td>${s.category}</td>
                <td>
                    <strong>${s.installed}</strong> / ${s.purchased}
                    <div class="compliance-bar"><div class="compliance-fill ${barClass}" style="width:${Math.min(pct, 100)}%"></div></div>
                </td>
                <td><span class="badge badge-${s.compliance}">${s.compliance === 'over' ? 'Over-Licensed' : s.compliance === 'under' ? 'Under-Utilized' : 'Compliant'}</span></td>
                <td><span class="badge badge-${s.usage}">${s.usage}</span></td>
                <td>$${(s.cost * s.purchased).toLocaleString()}</td>
            </tr>`;
        }).join('');
    }

    // ===== CMDB =====
    async loadCMDB() {
        const hw = await this.api.get('hardware');
        const sw = await this.api.get('software');
        const container = document.getElementById('cmdb-body');

        // Build simple relationship view
        const servers = hw.filter(h => h.type === 'Server');
        const workstations = hw.filter(h => h.type === 'Workstation' || h.type === 'Laptop');
        const network = hw.filter(h => h.type === 'Network Switch');

        container.innerHTML = `
            <div class="cmdb-map">
                <div style="font-size:0.82rem;font-weight:700;color:var(--ae-primary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Infrastructure Layer</div>
                ${network.map(n => `
                    <div class="cmdb-node" onclick="app.viewAsset('${n.id}')">
                        <div class="cmdb-node-icon" style="background:#0ea5e9;"><i class="fas fa-network-wired"></i></div>
                        <div class="cmdb-node-info"><div class="cmdb-node-title">${n.name}</div><div class="cmdb-node-sub">${n.model} · ${n.ip}</div></div>
                        <span class="badge badge-${n.status.toLowerCase().replace(/\s/g, '-')}">${n.status}</span>
                    </div>
                `).join('<div class="cmdb-connector"></div>')}
                <div class="cmdb-connector"></div>
                <div style="font-size:0.82rem;font-weight:700;color:var(--ae-primary);text-transform:uppercase;letter-spacing:0.05em;margin:0.5rem 0;">Server Layer</div>
                ${servers.map(s => `
                    <div class="cmdb-node" onclick="app.viewAsset('${s.id}')">
                        <div class="cmdb-node-icon" style="background:#8b5cf6;"><i class="fas fa-server"></i></div>
                        <div class="cmdb-node-info"><div class="cmdb-node-title">${s.name}</div><div class="cmdb-node-sub">${s.model} · ${s.ip} · ${s.os}</div></div>
                        <span class="badge badge-${s.status.toLowerCase().replace(/\s/g, '-')}">${s.status}</span>
                    </div>
                `).join('<div class="cmdb-connector"></div>')}
                <div class="cmdb-connector"></div>
                <div style="font-size:0.82rem;font-weight:700;color:var(--ae-primary);text-transform:uppercase;letter-spacing:0.05em;margin:0.5rem 0;">Endpoint Layer (${workstations.length} devices)</div>
                ${workstations.slice(0, 5).map(w => `
                    <div class="cmdb-node" onclick="app.viewAsset('${w.id}')">
                        <div class="cmdb-node-icon" style="background:#10b981;"><i class="fas fa-${w.type === 'Laptop' ? 'laptop' : 'desktop'}"></i></div>
                        <div class="cmdb-node-info"><div class="cmdb-node-title">${w.name}</div><div class="cmdb-node-sub">${w.model} · ${w.user} · ${w.ip}</div></div>
                        <span class="badge badge-${w.status.toLowerCase().replace(/\s/g, '-')}">${w.status}</span>
                    </div>
                `).join('')}
                ${workstations.length > 5 ? `<div style="text-align:center;color:var(--ae-muted);font-size:0.82rem;padding:0.5rem;">+ ${workstations.length - 5} more endpoints</div>` : ''}
                <div class="cmdb-connector"></div>
                <div style="font-size:0.82rem;font-weight:700;color:var(--ae-primary);text-transform:uppercase;letter-spacing:0.05em;margin:0.5rem 0;">Software Layer (${sw.length} titles)</div>
                ${sw.slice(0, 4).map(s => `
                    <div class="cmdb-node">
                        <div class="cmdb-node-icon" style="background:#f59e0b;"><i class="fas fa-cube"></i></div>
                        <div class="cmdb-node-info"><div class="cmdb-node-title">${s.name}</div><div class="cmdb-node-sub">${s.publisher} · ${s.version} · ${s.installed}/${s.purchased} seats</div></div>
                        <span class="badge badge-${s.compliance}">${s.compliance === 'over' ? 'Over' : s.compliance === 'under' ? 'Under' : 'OK'}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ===== PURCHASES =====
    async loadPurchases() {
        const container = document.getElementById('purchases-body');
        container.innerHTML = '<tr><td colspan="7" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></td></tr>';
        await this.delay(600);
        const po = await this.api.get('purchases');
        container.innerHTML = po.map(p => `
            <tr id="po-row-${p.id}">
                <td><span class="tag-chip">${p.id}</span></td>
                <td><strong>${p.title}</strong><br><span style="font-size:0.72rem;color:var(--ae-muted)">${p.items}</span></td>
                <td>${p.vendor}</td>
                <td><strong>$${p.amount.toLocaleString()}</strong></td>
                <td>${p.requestedBy}</td>
                <td><span class="badge badge-${p.status}">${p.status}</span></td>
                <td>
                    ${p.status === 'pending' ? `
                        <div style="display:flex;gap:4px;">
                            <button class="btn-ae btn-ae-sm btn-ae-success" onclick="app.approvePO('${p.id}')"><i class="fas fa-check"></i> Approve</button>
                            <button class="btn-ae btn-ae-sm btn-ae-danger" onclick="app.rejectPO('${p.id}')"><i class="fas fa-times"></i></button>
                        </div>
                    ` : `<span style="font-size:0.75rem;color:var(--ae-muted)">${p.approvalDate || 'N/A'}</span>`}
                </td>
            </tr>
        `).join('');
    }

    async approvePO(id) {
        await this.api.put('purchases', id, { status: 'approved', approvalDate: new Date().toISOString().split('T')[0] });
        this.toast(`Purchase Order ${id} approved!`, 'success');
        this.loadPurchases();
    }

    async rejectPO(id) {
        if (!confirm(`Reject Purchase Order ${id}?`)) return;
        await this.api.put('purchases', id, { status: 'rejected' });
        this.toast(`Purchase Order ${id} rejected`, 'warning');
        this.loadPurchases();
    }

    // ===== CONTRACTS =====
    async loadContracts() {
        const container = document.getElementById('contracts-body');
        container.innerHTML = '<tr><td colspan="7" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></td></tr>';
        await this.delay(600);
        const ct = await this.api.get('contracts');
        container.innerHTML = ct.map(c => `
            <tr>
                <td><span class="tag-chip">${c.id}</span></td>
                <td><strong>${c.title}</strong><br><span style="font-size:0.72rem;color:var(--ae-muted)">${c.notes}</span></td>
                <td>${c.vendor}</td>
                <td>${c.type}</td>
                <td><strong>$${c.value.toLocaleString()}</strong></td>
                <td>${c.startDate} → ${c.endDate}</td>
                <td><span class="badge badge-${c.status}">${c.status === 'valid' ? 'Active' : c.status === 'expiring' ? 'Expiring Soon' : 'Expired'}</span></td>
            </tr>
        `).join('');
    }

    // ===== CONSUMABLES =====
    async loadConsumables() {
        const container = document.getElementById('consumables-body');
        container.innerHTML = '<tr><td colspan="6" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></td></tr>';
        await this.delay(600);
        const con = await this.api.get('consumables');
        container.innerHTML = con.map(c => {
            const isLow = c.stock <= c.minStock;
            return `
            <tr>
                <td><span class="tag-chip">${c.id}</span></td>
                <td><strong>${c.name}</strong></td>
                <td>${c.category}</td>
                <td style="${isLow ? 'color:var(--ae-danger);font-weight:700;' : ''}">${c.stock} ${c.unit} ${isLow ? '<i class="fas fa-exclamation-triangle" style="color:var(--ae-danger);"></i>' : ''}</td>
                <td>${c.minStock} ${c.unit}</td>
                <td>$${c.costPerUnit}</td>
            </tr>`;
        }).join('');
    }

    // Search IT assets
    searchIT(query) {
        const q = query.toLowerCase();
        document.querySelectorAll('#it-assets-body tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    }

    filterIT(status) {
        if (status === 'all') {
            document.querySelectorAll('#it-assets-body tr').forEach(r => r.style.display = '');
        } else {
            document.querySelectorAll('#it-assets-body tr').forEach(row => {
                const badge = row.querySelector('.badge');
                row.style.display = badge && badge.textContent.trim().toLowerCase() === status.toLowerCase() ? '' : 'none';
            });
        }
    }

    // ===== MODAL HELPERS =====
    openModal(id) { document.getElementById(id).classList.add('open'); }
    closeModal(id) { document.getElementById(id).classList.remove('open'); }

    // ===== UTILITIES =====
    toast(msg, type = 'success') {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.innerHTML = msg;
        container.appendChild(el);
        setTimeout(() => el.remove(), 3500);
    }

    delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}

window.app = new AssetExplorer();
