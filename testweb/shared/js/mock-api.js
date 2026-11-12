/**
 * Mock API Service
 * Simulates real-world backend interactions with artificial latency.
 * Essential for practicing async automation (Waiting for elements/data).
 */

class MockAPI {
    constructor(storageKey, defaultData) {
        this.storageKey = storageKey;
        this.latency = 800; // Simulated ms delay

        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(defaultData));
        }
    }

    async _getRaw() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    async _saveRaw(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    /**
     * Simulate a GET request
     */
    async get(collection) {
        return new Promise(resolve => {
            setTimeout(async () => {
                const data = await this._getRaw();
                resolve(data[collection] || []);
            }, this.latency);
        });
    }

    /**
     * Simulate a POST request (Create)
     */
    async post(collection, item) {
        return new Promise(resolve => {
            setTimeout(async () => {
                const data = await this._getRaw();
                if (!data[collection]) data[collection] = [];

                const newItem = {
                    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                    ...item,
                    createdAt: new Date().toISOString()
                };

                data[collection].unshift(newItem);
                await this._saveRaw(data);
                resolve(newItem);
            }, this.latency);
        });
    }

    /**
     * Simulate a PUT request (Update)
     */
    async put(collection, id, updates) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const data = await this._getRaw();
                const index = data[collection].findIndex(i => i.id === id);

                if (index !== -1) {
                    data[collection][index] = { ...data[collection][index], ...updates };
                    await this._saveRaw(data);
                    resolve(data[collection][index]);
                } else {
                    reject(new Error('Item not found'));
                }
            }, this.latency);
        });
    }

    /**
     * Simulate a DELETE request
     */
    async delete(collection, id) {
        return new Promise(resolve => {
            setTimeout(async () => {
                const data = await this._getRaw();
                data[collection] = data[collection].filter(i => i.id !== id);
                await this._saveRaw(data);
                resolve({ success: true, id });
            }, this.latency);
        });
    }

    /**
     * Alias for get() — retrieve all records from a collection
     */
    async getAll(collection) {
        return this.get(collection);
    }

    /**
     * Retrieve a single record by id
     */
    async getById(collection, id) {
        const items = await this.get(collection);
        return items.find(i => i.id === id) || null;
    }

    /**
     * Alias for post() — create a new record
     */
    async create(collection, item) {
        return this.post(collection, item);
    }

    /**
     * Alias for put() — update an existing record
     */
    async update(collection, id, updates) {
        return this.put(collection, id, updates);
    }
}

// Global Export
window.MockAPI = MockAPI;
