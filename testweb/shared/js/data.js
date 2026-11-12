const MOCK_DATA = {
    users: [
        {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'user'
        },
        {
            id: 2,
            username: 'admin',
            email: 'admin@tamash.test',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
        }
    ],

    products: [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 99.99,
            originalPrice: 129.99,
            category: 'electronics',
            rating: 4.5,
            reviews: 128,
            image: '🎧',
            description: 'High-quality wireless headphones with noise cancellation',
            inStock: true,
            featured: true,
            tags: ['wireless', 'bluetooth', 'audio']
        },
        {
            id: 2,
            name: 'Smart Watch Series X',
            price: 299.99,
            category: 'electronics',
            rating: 4.8,
            reviews: 256,
            image: '⌚',
            description: 'Advanced smartwatch with health monitoring features',
            inStock: true,
            featured: true,
            tags: ['smartwatch', 'fitness', 'health']
        },
        {
            id: 3,
            name: 'Cotton T-Shirt',
            price: 19.99,
            category: 'clothing',
            rating: 4.2,
            reviews: 89,
            image: '👕',
            description: 'Comfortable 100% cotton t-shirt in various colors',
            inStock: true,
            featured: false,
            tags: ['cotton', 'casual', 'comfortable']
        },
        {
            id: 4,
            name: 'JavaScript: The Good Parts',
            price: 29.99,
            category: 'books',
            rating: 4.7,
            reviews: 342,
            image: '📚',
            description: 'A guide to the best features of JavaScript',
            inStock: true,
            featured: true,
            tags: ['javascript', 'programming', 'book']
        },
        {
            id: 5,
            name: 'Garden Hose 50ft',
            price: 34.99,
            category: 'home',
            rating: 4.0,
            reviews: 67,
            image: '🌿',
            description: 'Durable garden hose for outdoor watering',
            inStock: true,
            featured: false,
            tags: ['garden', 'outdoor', 'watering']
        },
        {
            id: 6,
            name: 'Laptop Stand',
            price: 49.99,
            originalPrice: 59.99,
            category: 'electronics',
            rating: 4.3,
            reviews: 94,
            image: '💻',
            description: 'Adjustable laptop stand for better ergonomics',
            inStock: true,
            featured: false,
            tags: ['laptop', 'ergonomic', 'stand']
        },
        {
            id: 7,
            name: 'Yoga Mat',
            price: 39.99,
            category: 'home',
            rating: 4.6,
            reviews: 156,
            image: '🧘',
            description: 'Non-slip yoga mat for home workouts',
            inStock: true,
            featured: true,
            tags: ['yoga', 'fitness', 'exercise']
        },
        {
            id: 8,
            name: 'Coffee Maker',
            price: 79.99,
            category: 'home',
            rating: 4.4,
            reviews: 203,
            image: '☕',
            description: 'Programmable coffee maker with thermal carafe',
            inStock: false,
            featured: false,
            tags: ['coffee', 'kitchen', 'appliance']
        }
    ],

    categories: [
        { id: 'electronics', name: 'Electronics', count: 150 },
        { id: 'clothing', name: 'Clothing', count: 200 },
        { id: 'books', name: 'Books', count: 500 },
        { id: 'home', name: 'Home & Garden', count: 300 }
    ],

    cart: [],

    orders: [
        {
            id: 1001,
            userId: 1,
            customerName: 'Test User',
            customerEmail: 'test@example.com',
            items: [
                { productId: 1, name: 'Wireless Bluetooth Headphones', quantity: 1, price: 99.99 },
                { productId: 2, name: 'Smart Watch Series X', quantity: 1, price: 299.99 }
            ],
            total: 399.98,
            status: 'completed',
            orderDate: '2024-01-15T10:30:00Z',
            shippingAddress: '123 Test St, Test City, TC 12345'
        },
        {
            id: 1002,
            userId: 2,
            customerName: 'Admin User',
            customerEmail: 'admin@tamash.test',
            items: [
                { productId: 3, name: 'Gaming Laptop Pro', quantity: 1, price: 1299.99 }
            ],
            total: 1299.99,
            status: 'pending',
            orderDate: '2024-01-14T14:20:00Z',
            shippingAddress: '456 Admin Ave, Admin City, AC 67890'
        },
        {
            id: 1003,
            userId: 1,
            customerName: 'Test User',
            customerEmail: 'test@example.com',
            items: [
                { productId: 4, name: 'Designer Sunglasses', quantity: 2, price: 149.99 },
                { productId: 5, name: 'Leather Wallet', quantity: 1, price: 79.99 }
            ],
            total: 379.97,
            status: 'shipped',
            orderDate: '2024-01-13T09:15:00Z',
            shippingAddress: '123 Test St, Test City, TC 12345'
        },
        {
            id: 1004,
            userId: 3,
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            items: [
                { productId: 6, name: 'Coffee Maker Deluxe', quantity: 1, price: 89.99 },
                { productId: 7, name: 'Stainless Steel Water Bottle', quantity: 3, price: 24.99 }
            ],
            total: 164.96,
            status: 'completed',
            orderDate: '2024-01-12T16:45:00Z',
            shippingAddress: '789 User Rd, User Town, UT 54321'
        }
    ],

    notifications: [
        {
            id: 1,
            type: 'info',
            message: 'Welcome to Tamash Practice Site!',
            timestamp: new Date().toISOString()
        }
    ]
};

// Make MOCK_DATA globally accessible
window.MOCK_DATA = MOCK_DATA;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MOCK_DATA;
}