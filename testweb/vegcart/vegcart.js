/* ==========================================
   VegCart Application – vegcart.js
   Fresh Fruits & Vegetables E-Commerce SPA
   ========================================== */

'use strict';

// ─── MockAPI ────────────────────────────────────────────────────────────────
class MockAPI {
    constructor(storageKey, seedData) {
        this.key = storageKey;
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(this.key, JSON.stringify(seedData));
        }
    }
    _load() {
        return JSON.parse(localStorage.getItem(this.key));
    }
    _save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
    get(collection) {
        return this._load()[collection] || [];
    }
    getById(collection, id) {
        return this.get(collection).find(r => r.id === id) || null;
    }
    add(collection, record) {
        const data = this._load();
        record.id = record.id || `${collection.slice(0,2).toUpperCase()}-${Date.now()}`;
        (data[collection] = data[collection] || []).push(record);
        this._save(data); return record;
    }
    update(collection, id, changes) {
        const data = this._load();
        const idx  = (data[collection] || []).findIndex(r => r.id === id);
        if (idx === -1) return null;
        data[collection][idx] = { ...data[collection][idx], ...changes };
        this._save(data); return data[collection][idx];
    }
    delete(collection, id) {
        const data = this._load();
        const before = (data[collection] || []).length;
        data[collection] = (data[collection] || []).filter(r => r.id !== id);
        this._save(data); return data[collection].length < before;
    }
}

// ─── Seed Data ───────────────────────────────────────────────────────────────
function getSeedData() {
    return {
        products: [
            // ── Fruits ──
            { id:'P001', name:'Alphonso Mango',   emoji:'🥭', category:'fruits',     price:249, unit:'kg',  stock:50, rating:4.9, reviews:320, badge:'seasonal', organic:false },
            { id:'P002', name:'Strawberries',     emoji:'🍓', category:'fruits',     price:149, unit:'250g',stock:30, rating:4.8, reviews:210, badge:'fresh',    organic:true  },
            { id:'P003', name:'Watermelon',       emoji:'🍉', category:'fruits',     price:59,  unit:'kg',  stock:40, rating:4.6, reviews:180, badge:'',         organic:false },
            { id:'P004', name:'Banana',           emoji:'🍌', category:'fruits',     price:49,  unit:'doz', stock:80, rating:4.7, reviews:420, badge:'',         organic:false },
            { id:'P005', name:'Pomegranate',      emoji:'🍎', category:'fruits',     price:199, unit:'kg',  stock:25, rating:4.8, reviews:155, badge:'organic',  organic:true  },
            { id:'P006', name:'Grapes (Green)',   emoji:'🍇', category:'fruits',     price:129, unit:'500g',stock:35, rating:4.6, reviews:198, badge:'',         organic:false },
            // ── Vegetables ──
            { id:'P007', name:'Tomatoes',         emoji:'🍅', category:'vegetables', price:39,  unit:'kg',  stock:100,rating:4.5, reviews:530, badge:'',         organic:false },
            { id:'P008', name:'Carrots',          emoji:'🥕', category:'vegetables', price:45,  unit:'kg',  stock:90, rating:4.7, reviews:290, badge:'organic',  organic:true  },
            { id:'P009', name:'Broccoli',         emoji:'🥦', category:'vegetables', price:89,  unit:'piece',stock:40,rating:4.6, reviews:175, badge:'',         organic:false },
            { id:'P010', name:'Bell Peppers Mix',emoji:'🫑', category:'vegetables', price:79,  unit:'500g',stock:55, rating:4.7, reviews:201, badge:'fresh',    organic:false },
            { id:'P011', name:'Onions',           emoji:'🧅', category:'vegetables', price:35,  unit:'kg',  stock:120,rating:4.4, reviews:610, badge:'',         organic:false },
            { id:'P012', name:'Garlic',           emoji:'🧄', category:'vegetables', price:99,  unit:'250g',stock:60, rating:4.8, reviews:345, badge:'organic',  organic:true  },
            // ── Greens ──
            { id:'P013', name:'Spinach',          emoji:'🥬', category:'greens',     price:29,  unit:'bunch',stock:70,rating:4.8, reviews:380, badge:'organic',  organic:true  },
            { id:'P014', name:'Coriander',        emoji:'🌿', category:'greens',     price:15,  unit:'bunch',stock:100,rating:4.7,reviews:290, badge:'fresh',    organic:false },
            { id:'P015', name:'Mint Leaves',      emoji:'🌱', category:'greens',     price:19,  unit:'bunch',stock:80, rating:4.6, reviews:210, badge:'',         organic:false },
            { id:'P016', name:'Fenugreek (Methi)',emoji:'🌾', category:'greens',     price:25,  unit:'bunch',stock:65, rating:4.7, reviews:175, badge:'organic',  organic:true  },
            { id:'P017', name:'Curry Leaves',     emoji:'🍃', category:'greens',     price:12,  unit:'bunch',stock:90, rating:4.8, reviews:220, badge:'',         organic:false },
            { id:'P018', name:'Lettuce',          emoji:'🥗', category:'greens',     price:59,  unit:'head', stock:30, rating:4.5, reviews:130, badge:'new',      organic:true  },
            // ── Exotic ──
            { id:'P019', name:'Avocado',          emoji:'🥑', category:'exotic',     price:149, unit:'piece',stock:25, rating:4.9, reviews:220, badge:'imported', organic:false },
            { id:'P020', name:'Baby Corn',        emoji:'🌽', category:'exotic',     price:89,  unit:'250g',stock:40, rating:4.7, reviews:165, badge:'',         organic:false },
            { id:'P021', name:'Zucchini',         emoji:'🫒', category:'exotic',     price:99,  unit:'kg',  stock:30, rating:4.6, reviews:140, badge:'new',       organic:false },
            { id:'P022', name:'Dragon Fruit',     emoji:'🐉', category:'exotic',     price:199, unit:'piece',stock:20, rating:4.8, reviews:180, badge:'exotic',   organic:false },
            { id:'P023', name:'Cherry Tomatoes',  emoji:'🍒', category:'exotic',     price:129, unit:'250g',stock:35, rating:4.7, reviews:195, badge:'',         organic:true  },
            { id:'P024', name:'Kale',             emoji:'🥦', category:'exotic',     price:119, unit:'bunch',stock:25, rating:4.6, reviews:145, badge:'new',       organic:true  },
        ],
        users: [
            { id:'U001', name:'Priya Sharma',  email:'priya@example.com', phone:'9876543210', password:'test123', avatar:'PS', addresses:[{ id:'A1', label:'Home', line1:'12 Lotus Colony', city:'Bengaluru', state:'Karnataka', pin:'560001' }] },
            { id:'U002', name:'Ravi Kumar',    email:'ravi@example.com',  phone:'9123456789', password:'demo123', avatar:'RK', addresses:[{ id:'A2', label:'Home', line1:'45 Anna Nagar', city:'Chennai', state:'Tamil Nadu', pin:'600040' }] },
        ],
        orders: [
            { id:'ORD-10021', userId:'U001', date:'2025-06-10', status:'delivered',  items:[{ productId:'P001', name:'Alphonso Mango', emoji:'🥭', qty:2, price:249 },{ productId:'P007', name:'Tomatoes', emoji:'🍅', qty:1, price:39 }],  total:537, address:'12 Lotus Colony, Bengaluru' },
            { id:'ORD-10018', userId:'U001', date:'2025-06-05', status:'delivered',  items:[{ productId:'P013', name:'Spinach', emoji:'🥬', qty:3, price:29 },{ productId:'P008', name:'Carrots', emoji:'🥕', qty:2, price:45 }],           total:177, address:'12 Lotus Colony, Bengaluru' },
            { id:'ORD-10035', userId:'U001', date:'2025-06-15', status:'out-for-delivery', items:[{ productId:'P019', name:'Avocado', emoji:'🥑', qty:2, price:149 }], total:298, address:'12 Lotus Colony, Bengaluru' },
            { id:'ORD-10040', userId:'U002', date:'2025-06-16', status:'processing', items:[{ productId:'P002', name:'Strawberries', emoji:'🍓', qty:1, price:149 },{ productId:'P012', name:'Garlic', emoji:'🧄', qty:2, price:99 }],       total:347, address:'45 Anna Nagar, Chennai' },
            { id:'ORD-10022', userId:'U002', date:'2025-06-08', status:'cancelled',  items:[{ productId:'P022', name:'Dragon Fruit', emoji:'🐉', qty:1, price:199 }], total:199, address:'45 Anna Nagar, Chennai' },
        ],
        reviews: []
    };
}

// ─── VegCartApp ───────────────────────────────────────────────────────────────
class VegCartApp {
    constructor() {
        this.api         = new MockAPI('vegcart_v2', getSeedData());
        this.cart        = JSON.parse(localStorage.getItem('vc_cart')    || '[]');
        this.wishlist    = JSON.parse(localStorage.getItem('vc_wishlist') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('vc_user')    || 'null');
        this.currentTab  = 'home';
        this.productFilters = { search:'', sort:'featured', category:'all' };
        this.chat = {
            messages: JSON.parse(localStorage.getItem('vc_chat_messages') || '[]'),
            isTyping: false,
            conversationId: localStorage.getItem('vc_chat_id') || this._generateId()
        };
        this.init();
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    init() {
        this.setupNavigation();
        this.updateCartBadge();
        this.updateWishlistBadge();
        this.updateSidebarUser();
        this.showTab('home');
        this.registerWebMCP();
        // global delegates
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeModal();
        });
        
        // Listen for storage changes from WebMCP background tabs (cross-tab)
        window.addEventListener('storage', e => {
            if (e.key === 'vc_cart') {
                this.cart = JSON.parse(e.newValue || '[]');
                this.updateCartBadge();
                if (this.currentTab === 'cart') this.renderCart();
            }
        });

        // Listen for BroadcastChannel signals from WebMCP sandboxed execute context
        this._webmcpChannel = new BroadcastChannel('vegcart_webmcp');
        this._webmcpChannel.onmessage = (e) => {
            if (e.data.type === 'cart_updated') {
                this.cart = JSON.parse(localStorage.getItem('vc_cart') || '[]');
                this.updateCartBadge();
                this.showTab('cart');
                this._toast('🛒 Cart updated by AI agent!', 'success');
            }
            if (e.data.type === 'search_updated') {
                this.quickSearch(e.data.query);
            }
            if (e.data.type === 'user_logout') {
                this.currentUser = null;
                this.updateSidebarUser();
                this.renderProfile();
                this.showTab('home');
                this._toast('👋 Logged out by AI agent!', 'info');
            }
            if (e.data.type === 'user_updated') {
                const userRaw = localStorage.getItem('vc_user');
                if (userRaw) {
                    this.currentUser = JSON.parse(userRaw);
                    this.updateSidebarUser();
                    this.renderProfile();
                    this._toast('👤 User profile updated by AI agent!', 'success');
                }
            }
            if (e.data.type === 'wishlist_updated') {
                this._loadWishlist();
                this.updateWishlistBadge();
                this.renderWishlist();
                this._toast('❤️ Wishlist updated by AI agent!', 'success');
            }
            if (e.data.type === 'navigate') {
                this.showTab(e.data.tab);
                this._toast(`🧭 Navigated to ${e.data.tab} by AI agent!`, 'info');
            }
            if (e.data.type === 'filter_category') {
                this.filterByCategory(e.data.category);
                this._toast(`🔍 Filtered by ${e.data.category} category!`, 'info');
            }
            if (e.data.type === 'chat_message') {
                // Handle chat messages from sandboxed tool context
                this._addChatMessage({
                    type: 'system',
                    content: e.data.message,
                    timestamp: Date.now()
                });
            }
        };

        // Listen for custom events dispatched by WebMCP execute functions
        window.addEventListener('agent-search', (e) => {
            const input = document.getElementById('header-search-input');
            if (input) input.value = e.detail.query;
            this.quickSearch(e.detail.query);
        });
        window.addEventListener('agent-cart-add', (e) => {
            this.cart = JSON.parse(localStorage.getItem('vc_cart') || '[]');
            this.updateCartBadge();
            this.showTab('cart');
            this._toast('\uD83D\uDED2 Cart updated by AI agent!', 'success');
        });
    }

    // ── WebMCP Integration ────────────────────────────────────────────────────
    registerWebMCP() {
        const mc = document.modelContext || navigator.modelContext;
        if (!mc) return;

        try {
            mc.registerTool({
                name: "get_product_list",
                description: "Returns a list of all available fruits and vegetables with prices"
            }, async () => {
                const products = this.api.get('products');
                return JSON.stringify({ success: true, count: products.length, products });
            });

            mc.registerTool({
                name: "search_products",
                description: "Search and filter the product grid by name. Updates the UI visually.",
                inputSchema: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Name of the vegetable or fruit to search for" }
                    },
                    required: ["query"]
                }
            }, async (args) => {
                const { query = "" } = JSON.parse(args || '{}');
                // Strategy 1: Direct DOM manipulation (same page context)
                const input = document.getElementById('header-search-input');
                if (input) {
                    input.value = query;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    window.dispatchEvent(new CustomEvent('agent-search', { detail: { query } }));
                    return JSON.stringify({ success: true, message: `Searching for '${query}'` });
                }
                // Strategy 2: BroadcastChannel (sandboxed context)
                new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'search_updated', query });
                return JSON.stringify({ success: true, message: `Search triggered for '${query}'` });
            });

            mc.registerTool({
                name: "add_item_to_cart",
                description: "Adds a specific quantity of a vegetable or fruit to the cart using its name",
                inputSchema: {
                    type: "object",
                    properties: {
                        itemName: { type: "string", description: "Product name (e.g., Tomato, Mango)" },
                        quantity: { type: "number", description: "How many items to add" }
                    },
                    required: ["itemName"]
                }
            }, async (args) => {
                console.log("WebMCP add_item_to_cart called with:", args);
                const parsedArgs = JSON.parse(args || '{}');
                const itemName = (parsedArgs.itemName || parsedArgs.name || parsedArgs.query || "").trim();
                const quantity = parseInt(parsedArgs.quantity || parsedArgs.qty, 10) || 1;

                if (!itemName) {
                    return JSON.stringify({ success: false, message: "itemName parameter is required and cannot be empty." });
                }

                // ── Strategy 1: Use 'this' directly (arrow fn captures VegCartApp instance) ──
                try {
                    const product = this.api.get('products').find(p =>
                        p.name.toLowerCase().includes(itemName.toLowerCase())
                    );
                    if (product) {
                        for (let i = 0; i < quantity; i++) this.addToCart(product.id);
                        window.dispatchEvent(new CustomEvent('agent-cart-add', { detail: { productId: product.id, quantity } }));
                        this.showTab('cart');
                        return JSON.stringify({ success: true, message: `Added ${quantity} ${product.name} to cart.` });
                    }
                    return JSON.stringify({ success: false, message: `Product '${itemName}' not found.` });
                } catch (e) {
                    // 'this' unavailable in sandboxed context — fall through to Strategy 2
                }

                // ── Strategy 2: localStorage + BroadcastChannel (works in sandboxed context) ──
                const dbRaw = localStorage.getItem('vegcart_v2');
                const products = dbRaw ? (JSON.parse(dbRaw).products || []) : [];
                const product = products.find(p =>
                    p.name.toLowerCase().includes(itemName.toLowerCase())
                );
                if (!product) {
                    return JSON.stringify({ success: false, message: `Product '${itemName}' not found.` });
                }
                const cart = JSON.parse(localStorage.getItem('vc_cart') || '[]');
                const existing = cart.find(i => i.productId === product.id);
                if (existing) {
                    existing.qty = Math.min(existing.qty + quantity, product.stock);
                } else {
                    cart.push({
                        productId: product.id, name: product.name, emoji: product.emoji,
                        price: product.price, unit: product.unit,
                        category: product.category, qty: quantity
                    });
                }
                localStorage.setItem('vc_cart', JSON.stringify(cart));
                // Signal the live page tab to refresh its UI
                new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'cart_updated' });
                return JSON.stringify({ success: true, message: `Added ${quantity} ${product.name} to cart. UI will update shortly.` });
            });

            // ══════════════════════════════════════════════════════════════════════
            // CART MANAGEMENT TOOLS
            // ══════════════════════════════════════════════════════════════════════

            mc.registerTool({
                name: "get_cart_contents",
                description: "Returns the current cart contents with items, quantities, and total price"
            }, async () => {
                try {
                    const cartSubtotal = this._cartSubtotal();
                    const delivery = cartSubtotal >= 500 ? 0 : 49;
                    const discount = cartSubtotal > 1000 ? Math.round(cartSubtotal * 0.05) : 0;
                    const total = cartSubtotal + delivery - discount;
                    return JSON.stringify({
                        success: true,
                        items: this.cart,
                        itemCount: this.cart.reduce((sum, item) => sum + item.qty, 0),
                        subtotal: cartSubtotal,
                        delivery: delivery,
                        discount: discount,
                        total: total
                    });
                } catch (e) {
                    // Fallback for sandboxed context
                    const cart = JSON.parse(localStorage.getItem('vc_cart') || '[]');
                    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                    const delivery = subtotal >= 500 ? 0 : 49;
                    const discount = subtotal > 1000 ? Math.round(subtotal * 0.05) : 0;
                    return JSON.stringify({
                        success: true,
                        items: cart,
                        itemCount: cart.reduce((sum, item) => sum + item.qty, 0),
                        subtotal: subtotal,
                        delivery: delivery,
                        discount: discount,
                        total: subtotal + delivery - discount
                    });
                }
            });

            mc.registerTool({
                name: "remove_from_cart",
                description: "Removes an item completely from the cart by product name",
                inputSchema: {
                    type: "object",
                    properties: {
                        itemName: { type: "string", description: "Product name to remove (e.g., Tomato, Mango)" }
                    },
                    required: ["itemName"]
                }
            }, async (args) => {
                const { itemName: rawName = "", name: rawName2 = "" } = JSON.parse(args || '{}');
                const itemName = (rawName || rawName2).trim();

                if (!itemName) {
                    return JSON.stringify({ success: false, message: "itemName parameter is required and cannot be empty." });
                }

                try {
                    const product = this.api.get('products').find(p =>
                        p.name.toLowerCase().includes(itemName.toLowerCase())
                    );
                    if (product) {
                        this.removeFromCart(product.id);
                        return JSON.stringify({ success: true, message: `Removed ${product.name} from cart.` });
                    }
                    return JSON.stringify({ success: false, message: `Product '${itemName}' not found in cart.` });
                } catch (e) {
                    // Fallback for sandboxed context
                    const dbRaw = localStorage.getItem('vegcart_v2');
                    const products = dbRaw ? (JSON.parse(dbRaw).products || []) : [];
                    const product = products.find(p =>
                        p.name.toLowerCase().includes(itemName.toLowerCase())
                    );
                    if (!product) {
                        return JSON.stringify({ success: false, message: `Product '${itemName}' not found.` });
                    }
                    let cart = JSON.parse(localStorage.getItem('vc_cart') || '[]');
                    cart = cart.filter(item => item.productId !== product.id);
                    localStorage.setItem('vc_cart', JSON.stringify(cart));
                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'cart_updated' });
                    return JSON.stringify({ success: true, message: `Removed ${product.name} from cart.` });
                }
            });

            mc.registerTool({
                name: "clear_cart",
                description: "Removes all items from the cart"
            }, async () => {
                try {
                    // Direct cart clearing for WebMCP (bypass UI confirmation)
                    this.cart = [];
                    this._saveCart();
                    this.updateCartBadge();
                    this.renderCart();
                    this._toast('Cart cleared by AI agent.', 'info');
                    return JSON.stringify({ success: true, message: "Cart cleared successfully." });
                } catch (e) {
                    // Fallback for sandboxed context
                    localStorage.setItem('vc_cart', JSON.stringify([]));
                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'cart_updated' });
                    return JSON.stringify({ success: true, message: "Cart cleared successfully." });
                }
            });

            // ══════════════════════════════════════════════════════════════════════
            // ORDER MANAGEMENT TOOLS
            // ══════════════════════════════════════════════════════════════════════

            mc.registerTool({
                name: "get_order_history",
                description: "Returns the order history for the current user",
                inputSchema: {
                    type: "object",
                    properties: {
                        status: { type: "string", description: "Filter by status: processing, shipped, delivered, cancelled, or 'all'" },
                        limit: { type: "number", description: "Maximum number of orders to return (default 10)" }
                    }
                }
            }, async (args) => {
                const { status = 'all', limit = 10 } = JSON.parse(args || '{}');

                try {
                    const userId = this.currentUser?.id || 'guest';
                    let orders = this.api.get('orders').filter(o => o.userId === userId);

                    if (status !== 'all') {
                        orders = orders.filter(o => o.status === status);
                    }

                    // Sort by date (newest first) and limit
                    orders = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

                    return JSON.stringify({
                        success: true,
                        count: orders.length,
                        orders: orders.map(o => ({
                            id: o.id,
                            date: o.date,
                            status: o.status,
                            total: o.total,
                            itemCount: o.items.length,
                            address: o.address
                        }))
                    });
                } catch (e) {
                    // Fallback for sandboxed context
                    const userRaw = localStorage.getItem('vc_user');
                    const userId = userRaw ? JSON.parse(userRaw).id : 'guest';
                    const dbRaw = localStorage.getItem('vegcart_v2');
                    let orders = dbRaw ? (JSON.parse(dbRaw).orders || []) : [];
                    orders = orders.filter(o => o.userId === userId);

                    if (status !== 'all') {
                        orders = orders.filter(o => o.status === status);
                    }

                    orders = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);

                    return JSON.stringify({
                        success: true,
                        count: orders.length,
                        orders: orders.map(o => ({
                            id: o.id,
                            date: o.date,
                            status: o.status,
                            total: o.total,
                            itemCount: o.items.length,
                            address: o.address
                        }))
                    });
                }
            });

            mc.registerTool({
                name: "place_order",
                description: "Places an order with the current cart contents and delivery details",
                inputSchema: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Delivery name" },
                        phone: { type: "string", description: "Delivery phone number" },
                        address: { type: "string", description: "Delivery street address" },
                        city: { type: "string", description: "Delivery city" },
                        pincode: { type: "string", description: "Delivery PIN code" }
                    },
                    required: ["name", "phone", "address", "city", "pincode"]
                }
            }, async (args) => {
                const { name, phone, address, city, pincode } = JSON.parse(args || '{}');

                if (!name || !phone || !address || !city || !pincode) {
                    return JSON.stringify({ success: false, message: `Missing required fields: name, phone, address, city, and pincode are required. Received: ${args}` });
                }

                try {
                    if (!this.cart.length) {
                        return JSON.stringify({ success: false, message: "Cart is empty! Add items before placing order." });
                    }

                    const subtotal = this._cartSubtotal();
                    const delivery = subtotal >= 500 ? 0 : 49;
                    const discount = subtotal > 1000 ? Math.round(subtotal * 0.05) : 0;
                    const total = subtotal + delivery - discount;

                    const order = this.api.add('orders', {
                        id: `ORD-${Date.now()}`,
                        userId: this.currentUser?.id || 'guest',
                        date: new Date().toISOString().split('T')[0],
                        status: 'processing',
                        items: this.cart.map(i => ({
                            productId: i.productId,
                            name: i.name,
                            emoji: i.emoji,
                            qty: i.qty,
                            price: i.price
                        })),
                        total,
                        address: `${address}, ${city} - ${pincode}`
                    });

                    // Direct clear — avoids UI confirm dialog that blocks automated flows
                    this.cart = [];
                    this._saveCart();
                    this.updateCartBadge();
                    this.renderCart();
                    this.showTab('orders');

                    return JSON.stringify({
                        success: true,
                        message: `Order ${order.id} placed successfully!`,
                        order: {
                            id: order.id,
                            total: order.total,
                            itemCount: order.items.length,
                            status: order.status
                        }
                    });
                } catch (e) {
                    return JSON.stringify({ success: false, message: "Failed to place order. Please try again." });
                }
            });

            // ══════════════════════════════════════════════════════════════════════ 
            // USER AUTHENTICATION TOOLS
            // ══════════════════════════════════════════════════════════════════════

            mc.registerTool({
                name: "get_user_info",
                description: "Returns current user information if logged in"
            }, async () => {
                try {
                    if (this.currentUser) {
                        return JSON.stringify({
                            success: true,
                            loggedIn: true,
                            user: {
                                id: this.currentUser.id,
                                name: this.currentUser.name,
                                email: this.currentUser.email,
                                phone: this.currentUser.phone,
                                avatar: this.currentUser.avatar
                            }
                        });
                    }
                    return JSON.stringify({ success: true, loggedIn: false, user: null });
                } catch (e) {
                    // Fallback for sandboxed context
                    const userRaw = localStorage.getItem('vc_user');
                    if (userRaw) {
                        const user = JSON.parse(userRaw);
                        return JSON.stringify({
                            success: true,
                            loggedIn: true,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                avatar: user.avatar
                            }
                        });
                    }
                    return JSON.stringify({ success: true, loggedIn: false, user: null });
                }
            });

            mc.registerTool({
                name: "user_logout",
                description: "Logs out the current user"
            }, async () => {
                try {
                    this.currentUser = null;
                    localStorage.removeItem('vc_user');
                    this.updateSidebarUser();
                    this.renderProfile();
                    this.showTab('home');
                    return JSON.stringify({ success: true, message: "Logged out successfully." });
                } catch (e) {
                    // Fallback for sandboxed context
                    localStorage.removeItem('vc_user');
                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'user_logout' });
                    return JSON.stringify({ success: true, message: "Logged out successfully." });
                }
            });

            mc.registerTool({
                name: "user_register",
                description: "Registers a new user account",
                inputSchema: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Full name" },
                        email: { type: "string", description: "Email address" },
                        password: { type: "string", description: "Password" },
                        phone: { type: "string", description: "Phone number (optional)" }
                    },
                    required: ["name", "email", "password"]
                }
            }, async (args) => {
                const { name, email, password, phone } = JSON.parse(args || '{}');

                if (!name || !email || !password) {
                    return JSON.stringify({ success: false, message: `Missing required params: name, email, and password are required. Received: ${args}` });
                }

                try {
                    // Check if email already exists
                    const existing = this.api.get('users').find(u => u.email === email);
                    if (existing) {
                        return JSON.stringify({ success: false, message: "Email already registered. Please use login instead." });
                    }

                    // Create new user
                    const user = this.api.add('users', {
                        name, email, password, phone: phone || '',
                        avatar: name.slice(0,2).toUpperCase(),
                        addresses: []
                    });

                    // Auto-login the new user
                    this.currentUser = user;
                    localStorage.setItem('vc_user', JSON.stringify(user));
                    this.updateSidebarUser();
                    this.renderProfile();

                    return JSON.stringify({
                        success: true,
                        message: `Account created! Welcome, ${name}!`,
                        user: { id: user.id, name: user.name, email: user.email }
                    });
                } catch (e) {
                    // Fallback for sandboxed context
                    const dbRaw = localStorage.getItem('vegcart_v2');
                    const users = dbRaw ? (JSON.parse(dbRaw).users || []) : [];

                    const existing = users.find(u => u.email === email);
                    if (existing) {
                        return JSON.stringify({ success: false, message: "Email already registered. Please use login instead." });
                    }

                    const newUser = {
                        id: 'US-' + Date.now(),
                        name, email, password, phone: phone || '',
                        avatar: name.slice(0,2).toUpperCase(),
                        addresses: []
                    };

                    users.push(newUser);
                    const data = JSON.parse(dbRaw || '{"users":[],"products":[],"orders":[]}');
                    data.users = users;
                    localStorage.setItem('vegcart_v2', JSON.stringify(data));
                    localStorage.setItem('vc_user', JSON.stringify(newUser));

                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'user_updated' });

                    return JSON.stringify({
                        success: true,
                        message: `Account created! Welcome, ${name}!`,
                        user: { id: newUser.id, name: newUser.name, email: newUser.email }
                    });
                }
            });

            mc.registerTool({
                name: "user_login",
                description: "Logs in an existing user",
                inputSchema: {
                    type: "object",
                    properties: {
                        email: { type: "string", description: "Email address" },
                        password: { type: "string", description: "Password" }
                    },
                    required: ["email", "password"]
                }
            }, async (args) => {
                const { email, password } = JSON.parse(args || '{}');

                if (!email || !password) {
                    return JSON.stringify({ success: false, message: `Missing required params: email and password are required. Received: ${args}` });
                }

                try {
                    const users = this.api.get('users');
                    const user = users.find(u => u.email === email && u.password === password);

                    if (user) {
                        this.currentUser = user;
                        localStorage.setItem('vc_user', JSON.stringify(user));
                        this.updateSidebarUser();
                        this.renderProfile();

                        return JSON.stringify({
                            success: true,
                            message: `Welcome back, ${user.name}!`,
                            user: { id: user.id, name: user.name, email: user.email }
                        });
                    }

                    return JSON.stringify({ success: false, message: "Invalid email or password." });
                } catch (e) {
                    // Fallback for sandboxed context
                    const dbRaw = localStorage.getItem('vegcart_v2');
                    const users = dbRaw ? (JSON.parse(dbRaw).users || []) : [];
                    const user = users.find(u => u.email === email && u.password === password);

                    if (user) {
                        localStorage.setItem('vc_user', JSON.stringify(user));
                        new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'user_updated' });

                        return JSON.stringify({
                            success: true,
                            message: `Welcome back, ${user.name}!`,
                            user: { id: user.id, name: user.name, email: user.email }
                        });
                    }

                    return JSON.stringify({ success: false, message: "Invalid email or password." });
                }
            });

            // ══════════════════════════════════════════════════════════════════════
            // WISHLIST TOOLS
            // ══════════════════════════════════════════════════════════════════════

            mc.registerTool({
                name: "get_wishlist",
                description: "Returns the current user's wishlist items"
            }, async () => {
                try {
                    const products = this.api.get('products');
                    const wishlistProducts = this.wishlist.map(productId =>
                        products.find(p => p.id === productId)
                    ).filter(Boolean);

                    return JSON.stringify({
                        success: true,
                        count: wishlistProducts.length,
                        items: wishlistProducts
                    });
                } catch (e) {
                    // Fallback for sandboxed context
                    const wishlist = JSON.parse(localStorage.getItem('vc_wishlist') || '[]');
                    const dbRaw = localStorage.getItem('vegcart_v2');
                    const products = dbRaw ? (JSON.parse(dbRaw).products || []) : [];
                    const wishlistProducts = wishlist.map(productId =>
                        products.find(p => p.id === productId)
                    ).filter(Boolean);

                    return JSON.stringify({
                        success: true,
                        count: wishlistProducts.length,
                        items: wishlistProducts
                    });
                }
            });

            mc.registerTool({
                name: "add_to_wishlist",
                description: "Adds an item to the wishlist by product name",
                inputSchema: {
                    type: "object",
                    properties: {
                        itemName: { type: "string", description: "Product name to add to wishlist (e.g., Tomato, Mango)" }
                    },
                    required: ["itemName"]
                }
            }, async (args) => {
                const { itemName: rawName = "", name: rawName2 = "" } = JSON.parse(args || '{}');
                const itemName = (rawName || rawName2).trim();

                if (!itemName) {
                    return JSON.stringify({ success: false, message: "itemName parameter is required and cannot be empty." });
                }

                try {
                    const product = this.api.get('products').find(p =>
                        p.name.toLowerCase().includes(itemName.toLowerCase())
                    );
                    if (product) {
                        this.toggleWishlist(product.id);
                        const isInWishlist = this.wishlist.includes(product.id);
                        return JSON.stringify({
                            success: true,
                            message: isInWishlist ? `Added ${product.name} to wishlist.` : `Removed ${product.name} from wishlist.`,
                            inWishlist: isInWishlist
                        });
                    }
                    return JSON.stringify({ success: false, message: `Product '${itemName}' not found.` });
                } catch (e) {
                    // Fallback for sandboxed context
                    const dbRaw = localStorage.getItem('vegcart_v2');
                    const products = dbRaw ? (JSON.parse(dbRaw).products || []) : [];
                    const product = products.find(p =>
                        p.name.toLowerCase().includes(itemName.toLowerCase())
                    );
                    if (!product) {
                        return JSON.stringify({ success: false, message: `Product '${itemName}' not found.` });
                    }
                    let wishlist = JSON.parse(localStorage.getItem('vc_wishlist') || '[]');
                    const idx = wishlist.indexOf(product.id);
                    if (idx === -1) {
                        wishlist.push(product.id);
                    } else {
                        wishlist.splice(idx, 1);
                    }
                    localStorage.setItem('vc_wishlist', JSON.stringify(wishlist));
                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'wishlist_updated' });
                    return JSON.stringify({
                        success: true,
                        message: idx === -1 ? `Added ${product.name} to wishlist.` : `Removed ${product.name} from wishlist.`,
                        inWishlist: idx === -1
                    });
                }
            });

            // ══════════════════════════════════════════════════════════════════════
            // NAVIGATION & UTILITY TOOLS
            // ══════════════════════════════════════════════════════════════════════

            mc.registerTool({
                name: "navigate_to_tab",
                description: "Navigate to a specific tab/section of the application",
                inputSchema: {
                    type: "object",
                    properties: {
                        tab: {
                            type: "string",
                            description: "Tab to navigate to",
                            enum: ["home", "products", "cart", "checkout", "orders", "profile", "wishlist", "support"]
                        }
                    },
                    required: ["tab"]
                }
            }, async (args) => {
                const { tab } = JSON.parse(args || '{}');

                try {
                    this.showTab(tab);
                    return JSON.stringify({ success: true, message: `Navigated to ${tab} tab.` });
                } catch (e) {
                    // Fallback for sandboxed context
                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'navigate', tab });
                    return JSON.stringify({ success: true, message: `Navigation to ${tab} tab requested.` });
                }
            });

            mc.registerTool({
                name: "filter_products_by_category",
                description: "Filter products by category and navigate to products tab",
                inputSchema: {
                    type: "object",
                    properties: {
                        category: {
                            type: "string",
                            description: "Category to filter by",
                            enum: ["fruits", "vegetables", "greens", "exotic", "all"]
                        }
                    },
                    required: ["category"]
                }
            }, async (args) => {
                const { category } = JSON.parse(args || '{}');

                try {
                    this.filterByCategory(category);
                    return JSON.stringify({ success: true, message: `Filtered products by category: ${category}` });
                } catch (e) {
                    // Fallback for sandboxed context
                    new BroadcastChannel('vegcart_webmcp').postMessage({ type: 'filter_category', category });
                    return JSON.stringify({ success: true, message: `Filter by category ${category} requested.` });
                }
            });
        } catch (e) {
            console.error("Failed to register WebMCP tools:", e);
        }
    }

    // ── Navigation ────────────────────────────────────────────────────────────
    setupNavigation() {
        document.querySelectorAll('.vc-nav-item[data-tab]').forEach(btn => {
            btn.addEventListener('click', () => this.showTab(btn.dataset.tab));
        });
    }

    showTab(tabId) {
        this.currentTab = tabId;
        // active nav
        document.querySelectorAll('.vc-nav-item[data-tab]').forEach(b =>
            b.classList.toggle('active', b.dataset.tab === tabId));
        // show tab
        document.querySelectorAll('.vc-tab').forEach(t =>
            t.classList.toggle('active', t.id === `tab-${tabId}`));
        // header title + icon
        const map = {
            home:'🏠 Home', products:'🛒 Products', cart:`🛒 Cart (${this._cartCount()})`,
            checkout:'💳 Checkout', orders:'📦 My Orders', profile:'👤 Profile',
            wishlist:`❤️ Wishlist (${this.wishlist.length})`, support:'💬 Support',
            chat:'🤖 Chat Assistant'
        };
        const hdr = document.getElementById('page-title');
        if (hdr) hdr.innerHTML = map[tabId] || tabId;
        // render
        const renders = {
            home:     () => this.renderHome(),
            products: () => this.renderProducts(),
            cart:     () => this.renderCart(),
            checkout: () => this.renderCheckout(),
            orders:   () => this.renderOrders(),
            profile:  () => this.renderProfile(),
            wishlist: () => this.renderWishlist(),
            support:  () => this.renderSupport(),
            chat:     () => this.renderChat(),
        };
        if (renders[tabId]) renders[tabId]();
        
        // Extra refresh for orders tab to ensure latest data  
        if (tabId === 'orders') {
            // Double refresh to ensure data consistency
            setTimeout(() => this.renderOrders(), 50);
            setTimeout(() => this.renderOrders(), 150);
        }
    }

    // ── Home ──────────────────────────────────────────────────────────────────
    renderHome() {
        const products   = this.api.get('products');
        const featured   = products.filter(p => p.rating >= 4.7).slice(0, 6);
        const container  = document.getElementById('featured-products');
        if (container) container.innerHTML = featured.map(p => this._productCard(p)).join('');
    }

    // ── Products ──────────────────────────────────────────────────────────────
    renderProducts() {
        let products = this.api.get('products');
        const { search, sort, category } = this.productFilters;

        if (category !== 'all') products = products.filter(p => p.category === category);
        if (search) {
            const q = search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) || p.category.includes(q));
        }
        const sortFns = {
            featured: (a,b) => b.rating - a.rating,
            'price-asc': (a,b) => a.price - b.price,
            'price-desc': (a,b) => b.price - a.price,
            name: (a,b) => a.name.localeCompare(b.name),
        };
        if (sortFns[sort]) products.sort(sortFns[sort]);

        const grid = document.getElementById('products-grid');
        if (!grid) return;

        const countEl = document.getElementById('products-count');
        if (countEl) countEl.textContent = `${products.length} products`;

        grid.innerHTML = products.length
            ? products.map(p => this._productCard(p)).join('')
            : `<div class="empty-state" style="grid-column:1/-1">
                 <i class="fas fa-search"></i>
                 <h3>No products found</h3>
                 <p>Try a different search or category filter.</p>
               </div>`;
    }

    applyFilters() {
        const search   = document.getElementById('product-search');
        const sort     = document.getElementById('sort-select');
        const category = document.getElementById('category-filter');
        if (search)   this.productFilters.search   = search.value.trim();
        if (sort)     this.productFilters.sort      = sort.value;
        if (category) this.productFilters.category  = category.value;
        this.renderProducts();
    }

    quickSearch(query) {
        this.productFilters.search = query;
        this.showTab('products');
        setTimeout(() => {
            const el = document.getElementById('product-search');
            if (el) el.value = query;
        }, 50);
    }

    filterByCategory(cat) {
        this.productFilters.category = cat;
        this.productFilters.search   = '';
        this.showTab('products');
        setTimeout(() => {
            const el = document.getElementById('category-filter');
            if (el) el.value = cat;
        }, 50);
    }

    // ── Cart ──────────────────────────────────────────────────────────────────
    addToCart(productId) {
        const product = this.api.getById('products', productId);
        if (!product) return;
        
        // Add visual feedback to the button
        const addButtons = document.querySelectorAll(`button[onclick="vegCartApp.addToCart('${productId}')"]`);
        addButtons.forEach(btn => {
            const originalText = btn.innerHTML;
            const originalColor = btn.style.backgroundColor;
            
            // Change button appearance temporarily
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.style.backgroundColor = '#059669';
            btn.disabled = true;
            
            // Restore original appearance after 1 second
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = originalColor;
                btn.disabled = false;
            }, 1000);
        });
        
        const existing = this.cart.find(i => i.productId === productId);
        if (existing) {
            existing.qty = Math.min(existing.qty + 1, product.stock);
        } else {
            this.cart.push({ productId, name: product.name, emoji: product.emoji,
                             price: product.price, unit: product.unit,
                             category: product.category, qty: 1 });
        }
        this._saveCart();
        this.updateCartBadge();
        this._toast(`${product.emoji} ${product.name} added to cart!`, 'success');
        if (this.currentTab === 'cart') this.renderCart();
        // Refresh product grids to show updated cart status
        if (this.currentTab === 'products') this.renderProducts();
        if (this.currentTab === 'home') this.renderHome();
    }

    // Add quantity controls for product cards
    increaseCartQtyFromCard(productId) {
        const product = this.api.getById('products', productId);
        const cartItem = this.cart.find(i => i.productId === productId);
        if (cartItem && product && cartItem.qty < product.stock) {
            cartItem.qty += 1;
            this._saveCart();
            this.updateCartBadge();
            // Refresh product grids
            if (this.currentTab === 'products') this.renderProducts();
            if (this.currentTab === 'home') this.renderHome();
        }
    }

    decreaseCartQtyFromCard(productId) {
        const cartItem = this.cart.find(i => i.productId === productId);
        if (cartItem) {
            if (cartItem.qty > 1) {
                cartItem.qty -= 1;
            } else {
                // Remove item if quantity becomes 0
                this.cart = this.cart.filter(i => i.productId !== productId);
            }
            this._saveCart();
            this.updateCartBadge();
            // Refresh product grids
            if (this.currentTab === 'products') this.renderProducts();
            if (this.currentTab === 'home') this.renderHome();
        }
    }

    removeFromCartCard(productId) {
        const product = this.api.getById('products', productId);
        this.cart = this.cart.filter(i => i.productId !== productId);
        this._saveCart();
        this.updateCartBadge();
        this._toast(`${product?.emoji} ${product?.name} removed from cart!`, 'info');
        // Refresh product grids
        if (this.currentTab === 'products') this.renderProducts();
        if (this.currentTab === 'home') this.renderHome();
        // Refresh product grids to show updated cart status
        if (this.currentTab === 'products') this.renderProducts();
        if (this.currentTab === 'home') this.renderHome();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(i => i.productId !== productId);
        this._saveCart();
        this.updateCartBadge();
        if (this.currentTab === 'cart') this.renderCart();
        // Refresh product grids to show updated cart status
        if (this.currentTab === 'products') this.renderProducts();
        if (this.currentTab === 'home') this.renderHome();
    }

    updateQty(productId, qty) {
        const item = this.cart.find(i => i.productId === productId);
        if (!item) return;
        const product = this.api.getById('products', productId);
        const newQty  = Math.max(1, Math.min(qty, product?.stock || 99));
        item.qty = newQty;
        this._saveCart();
        this.renderCart();
    }

    renderCart() {
        const container = document.getElementById('cart-items');
        const emptyEl   = document.getElementById('cart-empty');
        const fullEl    = document.getElementById('cart-full');
        if (!container) return;

        if (this.cart.length === 0) {
            if (emptyEl) emptyEl.style.display = '';
            if (fullEl)  fullEl.style.display  = 'none';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        if (fullEl)  fullEl.style.display  = '';

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item-row" data-product="${item.productId}">
                <div class="cart-item-emoji">${item.emoji}</div>
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-cat">${this._capFirst(item.category)}</div>
                    <div class="cart-item-unit">₹${item.price} / ${item.unit}</div>
                </div>
                <div class="qty-stepper">
                    <button class="qty-btn" onclick="vegCartApp.updateQty('${item.productId}', ${item.qty - 1})">−</button>
                    <input class="qty-input" type="number" value="${item.qty}" min="1"
                           onchange="vegCartApp.updateQty('${item.productId}', parseInt(this.value)||1)">
                    <button class="qty-btn" onclick="vegCartApp.updateQty('${item.productId}', ${item.qty + 1})">+</button>
                </div>
                <div class="cart-item-subtotal">₹${(item.price * item.qty).toLocaleString()}</div>
                <button class="btn-remove" onclick="vegCartApp.removeFromCart('${item.productId}')" title="Remove">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`).join('');

        this._renderCartSummary();
    }

    _renderCartSummary() {
        const subtotal  = this._cartSubtotal();
        const delivery  = subtotal >= 500 ? 0 : 49;
        const discount  = subtotal > 1000 ? Math.round(subtotal * 0.05) : 0;
        const total     = subtotal + delivery - discount;

        const tpl = `
            <div class="summary-row"><span>Subtotal (${this._cartCount()} items)</span><span>₹${subtotal.toLocaleString()}</span></div>
            <div class="summary-row"><span>Delivery</span><span class="${delivery===0?'summary-free':''}">${delivery===0?'FREE':'₹'+delivery}</span></div>
            ${discount ? `<div class="summary-row"><span>Discount (5%)</span><span class="summary-free">−₹${discount}</span></div>` : ''}
            <div class="summary-row total"><span>Total</span><span>₹${total.toLocaleString()}</span></div>`;

        const s1 = document.getElementById('cart-summary-lines');
        const s2 = document.getElementById('checkout-summary-lines');
        if (s1) s1.innerHTML = tpl;
        if (s2) s2.innerHTML = tpl;

        const totalEl = document.getElementById('cart-total');
        if (totalEl) totalEl.textContent = `₹${total.toLocaleString()}`;
    }

    clearCart() {
        if (!this.cart.length) return;
        this._confirm({
            icon: '🗑️',
            title: 'Clear Cart?',
            message: 'Remove all items from your cart? This cannot be undone.',
            okLabel: 'Clear Cart',
            onConfirm: () => {
                this.cart = [];
                this._saveCart();
                this.updateCartBadge();
                this.renderCart();
                this._toast('Cart cleared.', 'info');
            }
        });
    }

    // ── Checkout ──────────────────────────────────────────────────────────────
    renderCheckout() {
        this._renderCartSummary();
        const addr = document.getElementById('checkout-address');
        if (addr && this.currentUser) {
            const a = this.currentUser.addresses?.[0];
            if (a) {
                document.getElementById('checkout-name')  && (document.getElementById('checkout-name').value  = this.currentUser.name);
                document.getElementById('checkout-phone') && (document.getElementById('checkout-phone').value = this.currentUser.phone);
                document.getElementById('checkout-addr')  && (document.getElementById('checkout-addr').value  = a.line1);
                document.getElementById('checkout-city')  && (document.getElementById('checkout-city').value  = a.city);
                document.getElementById('checkout-state') && (document.getElementById('checkout-state').value = a.state);
                document.getElementById('checkout-pin')   && (document.getElementById('checkout-pin').value   = a.pin);
            }
        }
    }

    placeOrder() {
        if (!this.cart.length) { this._toast('Your cart is empty!', 'warning'); return; }
        
        // Prevent multiple clicks by disabling the button
        const placeOrderBtn = document.getElementById('btn-place-order');
        if (placeOrderBtn.disabled) return; // Already processing
        
        const name  = document.getElementById('checkout-name')?.value?.trim();
        const phone = document.getElementById('checkout-phone')?.value?.trim();
        const addr  = document.getElementById('checkout-addr')?.value?.trim();
        const city  = document.getElementById('checkout-city')?.value?.trim();
        const pin   = document.getElementById('checkout-pin')?.value?.trim();
        if (!name || !phone || !addr || !city || !pin) {
            this._toast('Please fill all delivery details.', 'warning'); return;
        }

        // Disable button and show processing state
        const originalBtnText = placeOrderBtn.innerHTML;
        placeOrderBtn.disabled = true;
        placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
        placeOrderBtn.style.backgroundColor = '#6b7280';

        // Small delay to show processing state
        setTimeout(() => {
            const subtotal  = this._cartSubtotal();
            const delivery  = subtotal >= 500 ? 0 : 49;
            const discount  = subtotal > 1000 ? Math.round(subtotal * 0.05) : 0;
            const total     = subtotal + delivery - discount;

            const order = this.api.add('orders', {
                id:      `ORD-${Date.now()}`,
                userId:  this.currentUser?.id || 'guest',
                date:    new Date().toISOString().split('T')[0],
                status:  'processing',
                items:   this.cart.map(i => ({ productId:i.productId, name:i.name, emoji:i.emoji, qty:i.qty, price:i.price })),
                total,
                address: `${addr}, ${city} - ${pin}`,
            });

            this.cart = [];
            this._saveCart();
            this.updateCartBadge();
            this._toast(`✅ Order ${order.id} placed successfully!`, 'success');
            
            // Reset button state
            placeOrderBtn.innerHTML = originalBtnText;
            placeOrderBtn.style.backgroundColor = '';
            placeOrderBtn.disabled = false;
            
            // Immediately refresh orders if user is on orders tab
            if (this.currentTab === 'orders') {
                this.renderOrders();
            }
            
            // Also force a refresh after a short delay to ensure data is updated
            setTimeout(() => this.forceRefreshOrders(), 200);
            
            this.showModal('order-success-modal');
            // Reduced delay and ensure orders refresh when switching
            setTimeout(() => { 
                this.closeModal(); 
                this.showTab('orders');
                // Force refresh orders when showing the tab
                this.renderOrders();
            }, 800);
        }, 500); // 500ms delay to show processing state
    }

    // ── Orders ────────────────────────────────────────────────────────────────
    renderOrders(filter = 'all', search = '') {
        let orders = this.api.get('orders');
        const uid  = this.currentUser?.id;
        
        // More inclusive filtering - show guest orders + user orders
        if (uid) {
            orders = orders.filter(o => o.userId === uid || o.userId === 'guest');
        } else {
            // If not logged in, show only guest orders
            orders = orders.filter(o => o.userId === 'guest');
        }
        
        if (filter !== 'all') orders = orders.filter(o => o.status === filter);
        if (search) {
            const q = search.toLowerCase();
            orders = orders.filter(o => o.id.toLowerCase().includes(q));
        }
        orders.sort((a,b) => {
            // Ensure proper date comparison - convert to timestamps if needed
            const dateA = new Date(a.date).getTime() || Date.parse(a.date) || 0;
            const dateB = new Date(b.date).getTime() || Date.parse(b.date) || 0;
            // If dates are same, sort by order ID (newer first)
            if (dateA === dateB) {
                return b.id.localeCompare(a.id);
            }
            return dateB - dateA;
        });

        const container = document.getElementById('orders-list');
        if (!container) return;

        container.innerHTML = orders.length
            ? orders.map(o => this._orderCard(o)).join('')
            : `<div class="empty-state">
                 <i class="fas fa-box-open"></i>
                 <h3>No orders found</h3>
                 <p>Your order history will appear here.</p>
                 <button class="btn btn-primary" onclick="vegCartApp.showTab('products')">
                     <i class="fas fa-shopping-basket"></i> Start Shopping
                 </button>
               </div>`;
    }

    // Force refresh orders - useful when external changes occur
    forceRefreshOrders() {
        if (this.currentTab === 'orders') {
            this.renderOrders();
        }
    }

    searchOrders() {
        const q = document.getElementById('order-search')?.value?.trim() || '';
        const f = document.getElementById('order-filter')?.value || 'all';
        this.renderOrders(f, q);
    }

    filterOrders() {
        const f = document.getElementById('order-filter')?.value || 'all';
        const q = document.getElementById('order-search')?.value?.trim() || '';
        this.renderOrders(f, q);
    }

    cancelOrder(orderId) {
        this._confirm({
            icon: '🚫',
            title: 'Cancel Order?',
            message: 'Are you sure you want to cancel this order? This action cannot be reversed.',
            okLabel: 'Cancel Order',
            onConfirm: () => {
                this.api.update('orders', orderId, { status: 'cancelled' });
                this._toast('Order cancelled.', 'info');
                setTimeout(() => this.renderOrders(), 50);
            }
        });
    }

    reorder(orderId) {
        const order = this.api.getById('orders', orderId);
        if (!order) return;
        order.items.forEach(item => this.addToCart(item.productId));
        this._toast('Items added to cart!', 'success');
        this.showTab('cart');
    }

    viewOrderDetails(orderId) {
        const order = this.api.getById('orders', orderId);
        if (!order) return;
        const tracker = this._trackerSteps(order.status);
        const body = `
            <div class="order-tracker">${tracker}</div>
            <table style="width:100%;font-size:.88rem;margin-top:1rem;border-collapse:collapse">
                <thead><tr style="background:#f3f4f6">
                    <th style="padding:.5rem .75rem;text-align:left">Item</th>
                    <th style="padding:.5rem .75rem;text-align:center">Qty</th>
                    <th style="padding:.5rem .75rem;text-align:right">Price</th>
                    <th style="padding:.5rem .75rem;text-align:right">Total</th>
                </tr></thead>
                <tbody>${order.items.map(i => `
                    <tr style="border-top:1px solid #f3f4f6">
                        <td style="padding:.5rem .75rem">${i.emoji} ${i.name}</td>
                        <td style="padding:.5rem .75rem;text-align:center">${i.qty}</td>
                        <td style="padding:.5rem .75rem;text-align:right">₹${i.price}</td>
                        <td style="padding:.5rem .75rem;text-align:right">₹${i.price*i.qty}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
            <div style="margin-top:1rem;font-size:.88rem;color:#6b7280">
                <b>Delivery To:</b> ${order.address}<br>
                <b>Order Date:</b> ${order.date}
            </div>`;
        const bodyEl = document.getElementById('order-detail-body');
        const titleEl = document.getElementById('order-detail-title');
        if (titleEl) titleEl.textContent = `Order ${order.id}`;
        if (bodyEl)  bodyEl.innerHTML = body;
        this.showModal('order-detail-modal');
    }

    // ── Profile & Auth ────────────────────────────────────────────────────────
    renderProfile() {
        const isLoggedIn = !!this.currentUser;
        const authSection = document.getElementById('profile-auth');
        const profileSection = document.getElementById('profile-panel');
        if (authSection)  authSection.style.display  = isLoggedIn ? 'none' : '';
        if (profileSection) profileSection.style.display = isLoggedIn ? '' : 'none';

        if (isLoggedIn) {
            const u = this.currentUser;
            this._setInner('profile-display-name', u.name);
            this._setInner('profile-display-email', u.email);
            this._setStatic('profile-avatar-name', u.avatar || u.name.slice(0,2).toUpperCase());
            this._setVal('profile-fullname', u.name);
            this._setVal('profile-email-field', u.email);
            this._setVal('profile-phone', u.phone || '');

            const orders = this.api.get('orders').filter(o => o.userId === u.id);
            this._setInner('profile-order-count',   String(orders.length));
            this._setInner('profile-wishlist-count', String(this.wishlist.length));
        }
    }

    handleLogin(event) {
        if (event) event.preventDefault();
        const email = document.getElementById('login-email')?.value?.trim();
        const pass  = document.getElementById('login-pass')?.value;
        const users = this.api.get('users');
        const user  = users.find(u => u.email === email && u.password === pass);
        if (!user) { this._toast('Invalid email or password.', 'error'); return; }
        this.currentUser = user;
        localStorage.setItem('vc_user', JSON.stringify(user));
        this.updateSidebarUser();
        this.renderProfile();
        this._toast(`Welcome back, ${user.name}! 👋`, 'success');
    }

    handleSignup(event) {
        if (event) event.preventDefault();
        const name  = document.getElementById('signup-name')?.value?.trim();
        const email = document.getElementById('signup-email')?.value?.trim();
        const pass  = document.getElementById('signup-pass')?.value;
        const phone = document.getElementById('signup-phone')?.value?.trim();
        if (!name || !email || !pass) { this._toast('Please fill all fields.', 'warning'); return; }
        const exists = this.api.get('users').find(u => u.email === email);
        if (exists) { this._toast('Email already registered. Please login.', 'warning'); return; }
        const user = this.api.add('users', {
            name, email, pass, phone,
            avatar: name.slice(0,2).toUpperCase(),
            addresses: []
        });
        this.currentUser = user;
        localStorage.setItem('vc_user', JSON.stringify(user));
        this.updateSidebarUser();
        this.renderProfile();
        this._toast(`Account created! Welcome, ${name}! 🎉`, 'success');
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('vc_user');
        this.updateSidebarUser();
        this.renderProfile();
        this._toast('Logged out successfully.', 'info');
    }

    saveProfile(event) {
        if (event) event.preventDefault();
        if (!this.currentUser) return;
        const name  = document.getElementById('profile-fullname')?.value?.trim();
        const phone = document.getElementById('profile-phone')?.value?.trim();
        const updated = this.api.update('users', this.currentUser.id, { name, phone });
        if (updated) {
            this.currentUser = { ...this.currentUser, name, phone };
            localStorage.setItem('vc_user', JSON.stringify(this.currentUser));
            this.updateSidebarUser();
            this.renderProfile();
            this._toast('Profile updated!', 'success');
        }
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.auth === tab));
        document.getElementById('login-form').style.display  = tab === 'login'  ? '' : 'none';
        document.getElementById('signup-form').style.display = tab === 'signup' ? '' : 'none';
    }

    // ── Wishlist ──────────────────────────────────────────────────────────────
    toggleWishlist(productId) {
        const idx = this.wishlist.indexOf(productId);
        if (idx === -1) {
            this.wishlist.push(productId);
            this._toast('Added to wishlist ❤️', 'success');
        } else {
            this.wishlist.splice(idx, 1);
            this._toast('Removed from wishlist', 'info');
        }
        localStorage.setItem('vc_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistBadge();
        // refresh heart icons on page
        document.querySelectorAll(`.product-wishlist-btn[data-pid="${productId}"]`).forEach(b => {
            b.classList.toggle('wishlisted', this.wishlist.includes(productId));
            b.querySelector('i').className = this.wishlist.includes(productId)
                ? 'fas fa-heart' : 'far fa-heart';
        });
        if (this.currentTab === 'wishlist') this.renderWishlist();
    }

    renderWishlist() {
        const grid = document.getElementById('wishlist-grid');
        const emptyEl = document.getElementById('wishlist-empty');
        if (!grid) return;

        const items = this.wishlist
            .map(id => this.api.getById('products', id))
            .filter(Boolean);

        if (items.length === 0) {
            grid.innerHTML = '';
            if (emptyEl) emptyEl.style.display = '';
            return;
        }
        if (emptyEl) emptyEl.style.display = 'none';
        grid.innerHTML = items.map(p => this._productCard(p)).join('');
    }

    // ── Support ───────────────────────────────────────────────────────────────
    renderSupport() { /* HTML is static, JS only manages FAQ */ }

    toggleFAQ(el) {
        const item = el.closest('.faq-item');
        const ans  = item.querySelector('.faq-a');
        const open = el.classList.contains('open');
        // close all
        document.querySelectorAll('.faq-q.open').forEach(q => {
            q.classList.remove('open');
            q.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
        });
        if (!open) { el.classList.add('open'); ans.classList.add('open'); }
    }

    submitContact(event) {
        if (event) event.preventDefault();
        this._toast('Your message has been sent! We\'ll respond within 24 hours.', 'success');
        event.target.reset();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // CHAT ASSISTANT FUNCTIONALITY
    // ══════════════════════════════════════════════════════════════════════════

    renderChat() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        // Add welcome message if no messages exist
        if (this.chat.messages.length === 0) {
            this._addChatMessage({
                type: 'agent',
                content: 'Hello! I\'m your VegCart shopping assistant. I can help you search for products, manage your cart, place orders, and more. What would you like to do today?',
                timestamp: Date.now()
            });
        }

        // Render existing messages
        messagesContainer.innerHTML = this.chat.messages
            .map(msg => this._renderChatMessage(msg))
            .join('');
        
        // Scroll to bottom
        this._scrollChatToBottom();
        
        // Setup input auto-resize
        this._setupChatInput();
    }

    _renderChatMessage(message) {
        const isUser = message.type === 'user';
        const isSystem = message.type === 'system';
        const timestamp = new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        let toolResultHtml = '';
        if (message.toolResult) {
            const resultClass = message.toolResult.success ? 'success' : 'error';
            toolResultHtml = `
                <div class="tool-result ${resultClass}">
                    <div class="tool-result-header">
                        <i class="fas fa-${message.toolResult.success ? 'check-circle' : 'exclamation-triangle'}"></i>
                        Tool: ${message.toolResult.toolName || 'Unknown'}
                    </div>
                    ${message.toolResult.data ? `<div class="tool-result-data">${JSON.stringify(message.toolResult.data, null, 2)}</div>` : ''}
                </div>
            `;
        }

        if (isSystem) {
            return `
                <div class="chat-message system">
                    <div class="chat-bubble system">
                        <i class="fas fa-info-circle"></i> ${message.content}
                    </div>
                </div>
            `;
        }

        return `
            <div class="chat-message ${isUser ? 'user' : 'agent'}">
                <div class="chat-avatar ${isUser ? 'user' : 'agent'}">
                    ${isUser ? (this.currentUser?.avatar || 'U') : '🤖'}
                </div>
                <div style="flex: 1;">
                    <div class="chat-bubble ${isUser ? 'user' : 'agent'}">
                        ${message.content}
                    </div>
                    ${toolResultHtml}
                    <div class="chat-timestamp">${timestamp}</div>
                </div>
            </div>
        `;
    }

    _setupChatInput() {
        const input = document.getElementById('chat-input');
        if (!input) return;

        // Auto-resize textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        });
    }

    handleChatKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendChatMessage();
        }
    }

    useSuggestion(text) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            input.focus();
        }
    }

    async sendChatMessage() {
        const input = document.getElementById('chat-input');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // Clear input and show typing
        input.value = '';
        input.style.height = 'auto';
        
        // Add user message
        this._addChatMessage({
            type: 'user',
            content: message,
            timestamp: Date.now()
        });

        // Show typing indicator
        this._showTyping();

        try {
            // Process the message and execute appropriate tools
            const response = await this._processConversationalMessage(message);
            
            // Hide typing and show response
            this._hideTyping();
            this._addChatMessage({
                type: 'agent',
                content: response.message,
                timestamp: Date.now(),
                toolResult: response.toolResult
            });

        } catch (error) {
            this._hideTyping();
            this._addChatMessage({
                type: 'agent',
                content: 'Sorry, I encountered an error processing your request. Please try again.',
                timestamp: Date.now()
            });
            console.error('Chat processing error:', error);
        }
    }

    async _processConversationalMessage(message) {
        const msgLower = message.toLowerCase();
        
        // Intent recognition patterns
        const patterns = {
            // Product search
            'search_products': /(?:search|find|show|look for)\s+(?:products?\s+)?(?:like\s+)?['"]?([^'"]+)['"]?/i,
            'get_products': /(?:what|list|show)\s+(?:products?|items?|vegetables?|fruits?)(?:\s+do\s+you\s+have)?/i,
            'category_filter': /(?:show|filter|find)\s+(?:all\s+)?(fruits?|vegetables?|greens?|exotic)/i,
            
            // Cart operations
            'add_to_cart': /(?:add|put)\s+(\d+)?\s*([^]+?)(?:\s+to\s+(?:my\s+)?cart)/i,
            'view_cart': /(?:what'?s|show|view)\s+(?:in\s+)?(?:my\s+)?cart|cart\s+contents?/i,
            'remove_from_cart': /(?:remove|delete|take\s+out)\s+([^]+?)(?:\s+from\s+(?:my\s+)?cart)/i,
            'clear_cart': /(?:clear|empty)\s+(?:my\s+)?cart/i,
            'update_quantity': /(?:change|update|set)\s+([^]+?)\s+(?:to|quantity\s+to)\s+(\d+)/i,
            
            // Orders
            'view_orders': /(?:show|view|list)\s+(?:my\s+)?(?:orders?|order\s+history)/i,
            'place_order': /(?:place|make|create)\s+(?:an\s+)?order|checkout/i,
            
            // Wishlist
            'view_wishlist': /(?:show|view)\s+(?:my\s+)?wishlist/i,
            'add_to_wishlist': /(?:add|save)\s+([^]+?)(?:\s+to\s+(?:my\s+)?wishlist)/i,
            
            // User info
            'user_info': /(?:who\s+am\s+i|my\s+(?:profile|info|account))/i,
            'logout': /(?:log\s*out|sign\s*out|logout)/i,
            
            // Navigation
            'navigate': /(?:go\s+to|show\s+me|navigate\s+to)\s+(home|products?|cart|checkout|orders?|profile|wishlist|support)/i
        };

        // Process each pattern
        for (const [intent, regex] of Object.entries(patterns)) {
            const match = message.match(regex);
            if (match) {
                return await this._executeIntentWithTool(intent, match, message);
            }
        }

        // Fallback for unrecognized intent
        return {
            message: "I'm not sure what you'd like me to do. Try asking me to:\n\n• Add items to cart: 'Add 2 tomatoes to my cart'\n• Search products: 'Show me all fruits'\n• View cart: 'What's in my cart?'\n• Place order: 'Place an order'\n• View orders: 'Show my orders'",
            toolResult: null
        };
    }

    async _executeIntentWithTool(intent, match, originalMessage) {
        const tools = navigator.modelContext || {};
        
        try {
            switch (intent) {
                case 'search_products': {
                    const query = match[1];
                    const tool = this._findTool('search_products');
                    if (tool) {
                        const result = await tool.execute({ query });
                        return {
                            message: `Searching for "${query}"... I found products matching your search!`,
                            toolResult: { success: true, toolName: 'search_products', data: result }
                        };
                    }
                    break;
                }
                
                case 'get_products': {
                    const tool = this._findTool('get_product_list');
                    if (tool) {
                        const result = await tool.execute();
                        return {
                            message: `I found ${result.products?.length || 0} fresh products! You can see them in the Products tab.`,
                            toolResult: { success: true, toolName: 'get_product_list', data: { count: result.products?.length } }
                        };
                    }
                    break;
                }
                
                case 'category_filter': {
                    const category = match[1].toLowerCase();
                    const tool = this._findTool('filter_products_by_category');
                    if (tool) {
                        const result = await tool.execute({ category });
                        return {
                            message: `Showing all ${category}! Check out the Products tab.`,
                            toolResult: { success: true, toolName: 'filter_products_by_category', data: result }
                        };
                    }
                    break;
                }
                
                case 'add_to_cart': {
                    const quantity = parseInt(match[1]) || 1;
                    const itemName = match[2].trim();
                    const tool = this._findTool('add_item_to_cart');
                    if (tool) {
                        const result = await tool.execute({ itemName, quantity });
                        return {
                            message: result.message || `Added ${quantity} ${itemName} to your cart!`,
                            toolResult: { success: result.success, toolName: 'add_item_to_cart', data: result }
                        };
                    }
                    break;
                }
                
                case 'view_cart': {
                    const tool = this._findTool('get_cart_contents');
                    if (tool) {
                        const result = await tool.execute();
                        const itemText = result.itemCount === 1 ? 'item' : 'items';
                        const message = result.itemCount === 0 
                            ? 'Your cart is empty. Add some fresh produce!'
                            : `Your cart has ${result.itemCount} ${itemText} totaling ₹${result.total}`;
                        return {
                            message,
                            toolResult: { success: true, toolName: 'get_cart_contents', data: result }
                        };
                    }
                    break;
                }
                
                case 'remove_from_cart': {
                    const itemName = match[1].trim();
                    const tool = this._findTool('remove_from_cart');
                    if (tool) {
                        const result = await tool.execute({ itemName });
                        return {
                            message: result.message || `Removed ${itemName} from your cart!`,
                            toolResult: { success: result.success, toolName: 'remove_from_cart', data: result }
                        };
                    }
                    break;
                }
                
                case 'clear_cart': {
                    const tool = this._findTool('clear_cart');
                    if (tool) {
                        const result = await tool.execute();
                        return {
                            message: result.message || 'Your cart has been cleared!',
                            toolResult: { success: result.success, toolName: 'clear_cart', data: result }
                        };
                    }
                    break;
                }
                
                case 'view_orders': {
                    const tool = this._findTool('get_order_history');
                    if (tool) {
                        const result = await tool.execute({ limit: 5 });
                        const message = result.count === 0 
                            ? "You haven't placed any orders yet. Start shopping!"
                            : `You have ${result.count} recent orders. Check the Orders tab for details.`;
                        return {
                            message,
                            toolResult: { success: true, toolName: 'get_order_history', data: result }
                        };
                    }
                    break;
                }
                
                case 'navigate': {
                    const tab = match[1].toLowerCase();
                    const tool = this._findTool('navigate_to_tab');
                    if (tool) {
                        const result = await tool.execute({ tab });
                        return {
                            message: `Taking you to the ${tab} section!`,
                            toolResult: { success: result.success, toolName: 'navigate_to_tab', data: result }
                        };
                    }
                    break;
                }
                
                case 'user_info': {
                    const tool = this._findTool('get_user_info');
                    if (tool) {
                        const result = await tool.execute();
                        const message = result.loggedIn 
                            ? `You're logged in as ${result.user.name} (${result.user.email})`
                            : "You're not logged in. Visit the Profile tab to sign in.";
                        return {
                            message,
                            toolResult: { success: true, toolName: 'get_user_info', data: result }
                        };
                    }
                    break;
                }
                
                case 'logout': {
                    const tool = this._findTool('user_logout');
                    if (tool) {
                        const result = await tool.execute();
                        return {
                            message: result.message || 'You have been logged out successfully!',
                            toolResult: { success: result.success, toolName: 'user_logout', data: result }
                        };
                    }
                    break;
                }
            }
        } catch (error) {
            console.error('Tool execution error:', error);
            return {
                message: `Sorry, I had trouble executing that request. Error: ${error.message}`,
                toolResult: { success: false, error: error.message }
            };
        }

        return {
            message: 'I understand what you want, but I encountered an issue processing it. Please try again!',
            toolResult: null
        };
    }

    _findTool(toolName) {
        // Try to find the tool from registered WebMCP tools
        if (navigator.modelContext && navigator.modelContext.tools) {
            return navigator.modelContext.tools.find(tool => tool.name === toolName);
        }
        
        // Fallback: create tool manually from our existing methods
        const toolMap = {
            'get_product_list': () => ({ 
                execute: async () => {
                    const products = this.api.get('products');
                    return { success: true, count: products.length, products };
                }
            }),
            'search_products': () => ({
                execute: async (args) => {
                    this.quickSearch(args.query || '');
                    return { success: true, message: `Searching for '${args.query}'` };
                }
            }),
            'add_item_to_cart': () => ({
                execute: async (args) => {
                    const product = this.api.get('products').find(p =>
                        p.name.toLowerCase().includes(args.itemName.toLowerCase())
                    );
                    if (product) {
                        for (let i = 0; i < (args.quantity || 1); i++) {
                            this.addToCart(product.id);
                        }
                        this.showTab('cart');
                        return { success: true, message: `Added ${args.quantity || 1} ${product.name} to cart.` };
                    }
                    return { success: false, message: `Product '${args.itemName}' not found.` };
                }
            }),
            'get_cart_contents': () => ({
                execute: async () => {
                    const cartSubtotal = this._cartSubtotal();
                    const delivery = cartSubtotal >= 500 ? 0 : 49;
                    const discount = cartSubtotal > 1000 ? Math.round(cartSubtotal * 0.05) : 0;
                    return {
                        success: true,
                        items: this.cart,
                        itemCount: this.cart.reduce((sum, item) => sum + item.qty, 0),
                        subtotal: cartSubtotal,
                        delivery: delivery,
                        discount: discount,
                        total: cartSubtotal + delivery - discount
                    };
                }
            }),
            'navigate_to_tab': () => ({
                execute: async (args) => {
                    this.showTab(args.tab);
                    return { success: true, message: `Navigated to ${args.tab} tab.` };
                }
            })
        };
        
        return toolMap[toolName] ? toolMap[toolName]() : null;
    }

    _addChatMessage(message) {
        this.chat.messages.push(message);
        this._saveChatState();
        
        // Re-render messages
        if (this.currentTab === 'chat') {
            this.renderChat();
        }
    }

    _showTyping() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        // Remove existing typing indicator
        const existing = messagesContainer.querySelector('.typing-indicator');
        if (existing) existing.remove();

        // Add typing indicator
        const typingHTML = `
            <div class="chat-message agent typing-indicator">
                <div class="chat-avatar agent">🤖</div>
                <div class="typing-indicator">
                    <span>Assistant is typing</span>
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this._scrollChatToBottom();
    }

    _hideTyping() {
        const existing = document.querySelector('.typing-indicator');
        if (existing) existing.remove();
    }

    _scrollChatToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    _saveChatState() {
        localStorage.setItem('vc_chat_messages', JSON.stringify(this.chat.messages));
        localStorage.setItem('vc_chat_id', this.chat.conversationId);
    }

    clearChat() {
        this._confirm({
            icon: '💬',
            title: 'Clear Chat History?',
            message: 'All chat messages will be permanently deleted.',
            okLabel: 'Clear Chat',
            onConfirm: () => {
                this.chat.messages = [];
                this._saveChatState();
                this._addChatMessage({
                    type: 'system',
                    content: 'Chat history cleared. How can I help you today?',
                    timestamp: Date.now()
                });
            }
        });
    }

    _generateId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ── Quick View Modal ──────────────────────────────────────────────────────
    quickView(productId) {
        const p = this.api.getById('products', productId);
        if (!p) return;
        const modal = document.getElementById('quick-view-modal');
        if (!modal) return;
        const wishlisted = this.wishlist.includes(productId);
        modal.querySelector('.modal-header h3').textContent = p.name;
        modal.querySelector('#qv-body').innerHTML = `
            <div class="qv-layout">
                <div class="qv-image">${p.emoji}</div>
                <div>
                    <span class="badge">${this._capFirst(p.category)}</span>
                    ${p.organic ? '<span class="status-badge status-delivered" style="margin-left:.5rem">🌿 Organic</span>' : ''}
                    <h2 style="margin:.75rem 0 .5rem;font-size:1.25rem">${p.name}</h2>
                    <div class="product-rating">${this._stars(p.rating)} <span>(${p.reviews} reviews)</span></div>
                    <div class="product-price" style="font-size:1.5rem;margin:.5rem 0">
                        ₹${p.price} <span class="product-unit">/ ${p.unit}</span>
                    </div>
                    <p style="font-size:.85rem;color:#6b7280;margin:.5rem 0">
                        ${p.stock > 10 ? `✅ In stock (${p.stock} available)` : p.stock > 0 ? `⚠️ Only ${p.stock} left!` : '❌ Out of stock'}
                    </p>
                    <div style="display:flex;gap:.75rem;margin-top:1rem">
                        <button class="btn btn-primary" onclick="vegCartApp.addToCart('${p.id}');vegCartApp.closeModal()" ${p.stock===0?'disabled':''}>
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary" onclick="vegCartApp.toggleWishlist('${p.id}')">
                            <i class="${wishlisted?'fas':'far'} fa-heart" style="color:${wishlisted?'var(--vc-pink)':''}"></i>
                            ${wishlisted ? 'Wishlisted' : 'Wishlist'}
                        </button>
                    </div>
                </div>
            </div>`;
        this.showModal('quick-view-modal');
    }

    // ── Badges & Sidebar ─────────────────────────────────────────────────────
    updateCartBadge() {
        const count = this._cartCount();
        document.querySelectorAll('.cart-badge-count').forEach(el => el.textContent = count);
        const badge = document.querySelector('[data-tab="cart"] .cart-badge');
        if (badge) badge.textContent = count;
    }

    updateWishlistBadge() {
        const count = this.wishlist.length;
        const badge = document.querySelector('[data-tab="wishlist"] .badge-pink');
        if (badge) badge.textContent = count;
    }

    updateSidebarUser() {
        const u = this.currentUser;
        const nameEl  = document.getElementById('sidebar-user-name');
        const roleEl  = document.getElementById('sidebar-user-role');
        const avatarEl = document.getElementById('sidebar-avatar');
        if (nameEl)  nameEl.textContent  = u ? u.name  : 'Guest';
        if (roleEl)  roleEl.textContent  = u ? 'Member' : 'Not signed in';
        if (avatarEl) avatarEl.textContent = u ? (u.avatar || u.name.slice(0,2).toUpperCase()) : 'G';
    }

    // ── Modal ────────────────────────────────────────────────────────────────
    showModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = '';
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.style.display = '';
    }

    closeModal() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    }

    // ── Private Helpers ───────────────────────────────────────────────────────
    _productCard(p) {
        const wishlisted = this.wishlist.includes(p.id);
        const inCart     = this.cart.find(i => i.productId === p.id);
        const badgeHtml  = p.badge ? `<span class="product-badge ${p.badge}">${p.badge}</span>` : '';
        
        // If item is in cart, show quantity controls
        const cartControls = inCart ? `
            <div class="cart-controls" style="background:#f0fdf4;border:1px solid #10b981;border-radius:8px;padding:0.5rem;margin-bottom:0.5rem;display:flex;align-items:center;justify-content:space-between;">
                <span style="font-size:0.75rem;color:#065f46;font-weight:600;">🛒 In Cart</span>
                <div style="display:flex;align-items:center;gap:0.4rem;">
                    <button onclick="vegCartApp.decreaseCartQtyFromCard('${p.id}')" 
                            style="width:24px;height:24px;border-radius:50%;border:1px solid #10b981;background:#fff;color:#10b981;font-size:14px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;" 
                            title="Decrease quantity">−</button>
                    <span style="font-weight:bold;color:#065f46;min-width:20px;text-align:center;">${inCart.qty}</span>
                    <button onclick="vegCartApp.increaseCartQtyFromCard('${p.id}')" 
                            style="width:24px;height:24px;border-radius:50%;border:1px solid #10b981;background:#10b981;color:#fff;font-size:14px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;" 
                            title="Increase quantity">+</button>
                    <button onclick="vegCartApp.removeFromCartCard('${p.id}')" 
                            style="width:24px;height:24px;border-radius:50%;border:1px solid #ef4444;background:#ef4444;color:#fff;font-size:12px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:0.2rem;" 
                            title="Remove from cart">×</button>
                </div>
            </div>
        ` : '';
        
        return `
        <div class="product-card" id="card-${p.id}">
            <div class="product-image">
                ${badgeHtml}
                <button class="product-wishlist-btn ${wishlisted?'wishlisted':''}"
                        data-pid="${p.id}" onclick="vegCartApp.toggleWishlist('${p.id}')" title="Wishlist">
                    <i class="${wishlisted?'fas':'far'} fa-heart"></i>
                </button>
                ${p.emoji}
            </div>
            <div class="product-info">
                <div class="product-category">${this._capFirst(p.category)}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-rating">${this._stars(p.rating)} <span>(${p.reviews})</span></div>
                <div class="product-price-row">
                    <span class="product-price">₹${p.price}</span>
                    <span class="product-unit">/ ${p.unit}</span>
                    ${p.organic ? '<span class="status-badge status-delivered" style="font-size:.6rem;padding:.1rem .4rem">🌿 Organic</span>' : ''}
                </div>
                ${cartControls}
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="vegCartApp.addToCart('${p.id}')" ${p.stock===0?'disabled':''}>
                        <i class="fas fa-cart-plus"></i> ${inCart ? 'Add More' : 'Add'}
                    </button>
                    <button class="btn-view" onclick="vegCartApp.quickView('${p.id}')" title="Quick view">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }

    _orderCard(o) {
        const statusClass = `status-${o.status}`;
        const statusLabel = this._formatStatus(o.status);
        const canCancel   = ['processing', 'confirmed'].includes(o.status);
        return `
        <div class="order-card" id="order-${o.id}">
            <div class="order-card-header">
                <div>
                    <div class="order-id">${o.id}</div>
                    <div class="order-date">${o.date}</div>
                </div>
                <span class="status-badge ${statusClass}">${statusLabel}</span>
            </div>
            <div class="order-card-items">
                ${o.items.map(i => `
                    <div class="order-item-chip">
                        ${i.emoji} ${i.name} × ${i.qty}
                    </div>`).join('')}
            </div>
            <div class="order-card-footer">
                <div class="order-total-label">Total: ₹${o.total.toLocaleString()}</div>
                <div class="order-actions">
                    <button class="btn btn-secondary btn-sm" onclick="vegCartApp.viewOrderDetails('${o.id}')">
                        <i class="fas fa-eye"></i> Details
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="vegCartApp.reorder('${o.id}')">
                        <i class="fas fa-redo"></i> Reorder
                    </button>
                    ${canCancel ? `
                    <button class="btn btn-danger btn-sm" onclick="vegCartApp.cancelOrder('${o.id}')">
                        <i class="fas fa-times"></i> Cancel
                    </button>` : ''}
                </div>
            </div>
        </div>`;
    }

    _trackerSteps(status) {
        const steps = [
            { key:'processing',        label:'Placed',    icon:'fa-check' },
            { key:'confirmed',         label:'Confirmed', icon:'fa-thumbs-up' },
            { key:'out-for-delivery',  label:'On the Way',icon:'fa-truck' },
            { key:'delivered',         label:'Delivered', icon:'fa-home' },
        ];
        const activeIdx = steps.findIndex(s => s.key === status);
        return steps.map((s, i) => {
            const done    = activeIdx === -1 ? false : i <= activeIdx;
            const current = i === activeIdx;
            return `
            <div class="tracker-step ${done?'done':''} ${current?'current':''}">
                <div class="tracker-icon"><i class="fas ${s.icon}"></i></div>
                <div>${s.label}</div>
            </div>`;
        }).join('');
    }

    _stars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let html = '';
        for (let i = 0; i < 5; i++) {
            if (i < full) html += '<i class="fas fa-star"></i>';
            else if (i === full && half) html += '<i class="fas fa-star-half-alt"></i>';
            else html += '<i class="far fa-star"></i>';
        }
        return html;
    }

    _cartSubtotal() { return this.cart.reduce((s, i) => s + i.price * i.qty, 0); }
    _cartCount()    { return this.cart.reduce((s, i) => s + i.qty, 0); }
    _saveCart()     { localStorage.setItem('vc_cart', JSON.stringify(this.cart)); }
    _capFirst(s)    { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
    _setInner(id, v){ const e = document.getElementById(id); if(e) e.textContent = v; }
    _setStatic(id,v){ const e = document.getElementById(id); if(e) e.textContent = v; }
    _setVal(id, v)  { const e = document.getElementById(id); if(e) e.value = v; }

    _formatStatus(s) {
        const m = { processing:'Processing', confirmed:'Confirmed', 'out-for-delivery':'Out for Delivery', delivered:'Delivered', cancelled:'Cancelled' };
        return m[s] || s;
    }

    _confirm({ icon = '⚠️', title = 'Are you sure?', message = '', okLabel = 'Confirm', okStyle = 'danger', onConfirm }) {
        const modal   = document.getElementById('vc-confirm-modal');
        const iconEl  = document.getElementById('vc-confirm-icon');
        const titleEl = document.getElementById('vc-confirm-title');
        const msgEl   = document.getElementById('vc-confirm-message');
        const okBtn   = document.getElementById('vc-confirm-ok');
        const cancelBtn = document.getElementById('vc-confirm-cancel');
        if (!modal) { onConfirm?.(); return; } // fallback if modal missing

        iconEl.textContent  = icon;
        titleEl.textContent = title;
        msgEl.textContent   = message;
        okBtn.textContent   = okLabel;

        // Reset button style
        okBtn.className = `btn btn-${okStyle}`;

        modal.style.display = '';

        const close = () => { modal.style.display = 'none'; okBtn.onclick = null; cancelBtn.onclick = null; };
        okBtn.onclick = () => { close(); onConfirm?.(); };
        cancelBtn.onclick = close;
    }

    _toast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const colors = { success:'#16a34a', error:'#dc2626', warning:'#d97706', info:'#0284c7' };
        const t = document.createElement('div');
        t.style.cssText = `background:${colors[type]||colors.info};color:white;padding:.65rem 1rem;
            border-radius:8px;font-size:.85rem;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.15);
            display:flex;align-items:center;gap:.5rem;min-width:250px;opacity:0;
            transform:translateX(20px);transition:all .25s`;
        t.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':type==='error'?'exclamation-circle':'info-circle'}"></i> ${message}`;
        container.appendChild(t);
        requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; });
        setTimeout(() => {
            t.style.opacity = '0'; t.style.transform = 'translateX(20px)';
            setTimeout(() => t.remove(), 300);
        }, 3000);
    }
}

// ── Boot ──────────────────────────────────────────────────────────────────────
window.vegCartApp = new VegCartApp();
