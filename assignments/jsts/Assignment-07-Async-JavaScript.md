# Assignment: Asynchronous JavaScript

**Topics Covered:** Callbacks, Promises, Async/Await, Error Handling  
**Difficulty:** Advanced  
**Estimated Time:** 3-4 hours  
**Reference:** Files 09, 13 from documentation

---

## Instructions

- Handle asynchronous operations properly
- Implement error handling
- Use modern async/await syntax
- Test with various scenarios

---

## Part A: Callbacks (20 points)

### Exercise 1: Basic Callbacks (5 points)
Create the following callback-based functions:

```javascript
function fetchUserData(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "John Doe",
            email: "john@example.com"
        };
        callback(user);
    }, 2000);
}

function fetchUserPosts(userId, callback) {
    setTimeout(() => {
        const posts = [
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ];
        callback(posts);
    }, 1500);
}
```

Chain these callbacks to:
1. Fetch user data
2. Then fetch user's posts
3. Display both

### Exercise 2: Callback Hell Example (7 points)
Create a nested callback scenario that demonstrates "callback hell":

Simulate these operations:
1. Get user ID (1 second delay)
2. Fetch user details (2 second delay)
3. Fetch user orders (1.5 second delay)
4. Fetch order details for first order (1 second delay)
5. Display final result

Show the pyramid structure and document why it's problematic.

### Exercise 3: Error Handling in Callbacks (8 points)
Rewrite Exercise 1 with error handling:

```javascript
function fetchUserData(userId, onSuccess, onError) {
    setTimeout(() => {
        if (userId <= 0) {
            onError(new Error("Invalid user ID"));
        } else {
            const user = { id: userId, name: "John" };
            onSuccess(user);
        }
    }, 1000);
}
```

Test with both valid and invalid user IDs.

---

## Part B: Promises (30 points)

### Exercise 4: Creating Promises (10 points)
Convert the callback functions from Part A to Promises:

```javascript
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error("Invalid user ID"));
            } else {
                const user = { id: userId, name: "John" };
                resolve(user);
            }
        }, 2000);
    });
}
```

Create promise-based functions for:
1. Fetching user data
2. Fetching user posts
3. Fetching user comments
4. Validating user email

### Exercise 5: Promise Chaining (10 points)
Chain the promises from Exercise 4:

```javascript
fetchUserData(1)
    .then(user => {
        console.log("User:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return fetchUserComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
```

Demonstrate:
- Sequential operations
- Passing data between promises
- Error handling with catch
- Finally block usage

### Exercise 6: Promise Utility Methods (10 points)
Create multiple promises with different timing:

```javascript
const promise1 = new Promise(resolve => setTimeout(() => resolve("First"), 3000));
const promise2 = new Promise(resolve => setTimeout(() => resolve("Second"), 1000));
const promise3 = new Promise(resolve => setTimeout(() => resolve("Third"), 2000));
```

Demonstrate:
1. **Promise.all()** - Wait for all to complete
2. **Promise.race()** - Get first completed
3. **Promise.allSettled()** - Get all results (success or failure)
4. **Promise.any()** - Get first successful

Include examples with rejections.

---

## Part C: Async/Await (30 points)

### Exercise 7: Basic Async/Await (10 points)
Rewrite Exercise 5 using async/await:

```javascript
async function getUserData() {
    try {
        const user = await fetchUserData(1);
        console.log("User:", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("Posts:", posts);
        
        const comments = await fetchUserComments(posts[0].id);
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Error:", error.message);
    }
}
```

### Exercise 8: Parallel Async Operations (10 points)
Demonstrate parallel execution:

```javascript
async function fetchAllData(userId) {
    try {
        // Sequential (slow)
        const user = await fetchUser(userId);
        const posts = await fetchPosts(userId);
        const comments = await fetchComments(userId);
        
        // Parallel (fast)
        const [user2, posts2, comments2] = await Promise.all([
            fetchUser(userId),
            fetchPosts(userId),
            fetchComments(userId)
        ]);
        
        // Compare execution times
    } catch (error) {
        console.error("Error:", error);
    }
}
```

Measure and compare execution times.

### Exercise 9: Error Handling Patterns (10 points)
Implement different error handling strategies:

```javascript
// Pattern 1: Try-catch per operation
async function pattern1() {
    try {
        const result1 = await operation1();
    } catch (e) {
        console.error("Op1 failed:", e);
    }
    
    try {
        const result2 = await operation2();
    } catch (e) {
        console.error("Op2 failed:", e);
    }
}

// Pattern 2: Global try-catch
async function pattern2() {
    try {
        const result1 = await operation1();
        const result2 = await operation2();
    } catch (e) {
        console.error("Operation failed:", e);
    }
}

// Pattern 3: Promise.allSettled
async function pattern3() {
    const results = await Promise.allSettled([
        operation1(),
        operation2(),
        operation3()
    ]);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Op ${index + 1} succeeded:`, result.value);
        } else {
            console.error(`Op ${index + 1} failed:`, result.reason);
        }
    });
}
```

Test all patterns with failing operations.

---

## Part D: Practical Applications (20 points)

### Exercise 10: API Simulation (10 points)
Create a mock API system:

```javascript
class MockAPI {
    constructor() {
        this.users = [
            { id: 1, name: "Alice", email: "alice@example.com" },
            { id: 2, name: "Bob", email: "bob@example.com" }
        ];
        this.posts = [
            { id: 1, userId: 1, title: "Post 1", body: "Content 1" },
            { id: 2, userId: 1, title: "Post 2", body: "Content 2" }
        ];
    }
    
    async getUser(id) {
        // Simulate network delay
        await this.delay(1000);
        
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new Error(`User ${id} not found`);
        }
        return user;
    }
    
    async getPosts(userId) {
        await this.delay(1500);
        return this.posts.filter(p => p.userId === userId);
    }
    
    async createPost(userId, post) {
        await this.delay(800);
        const newPost = {
            id: this.posts.length + 1,
            userId,
            ...post
        };
        this.posts.push(newPost);
        return newPost;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

Use this API to:
1. Fetch user and their posts
2. Create a new post
3. Handle errors gracefully
4. Show loading states

### Exercise 11: Data Processing Pipeline (10 points)
Create an async data processing pipeline:

```javascript
async function processUserData(userId) {
    // Step 1: Fetch user
    const user = await fetchUser(userId);
    
    // Step 2: Validate user data
    const validated = await validateUser(user);
    
    // Step 3: Enrich with additional data
    const enriched = await enrichUserData(validated);
    
    // Step 4: Transform for display
    const transformed = await transformData(enriched);
    
    // Step 5: Save to cache
    await saveToCache(transformed);
    
    return transformed;
}
```

Implement all steps with proper error handling and logging.

---

## Bonus Challenges (30 points)

### Exercise 12: Retry Logic (10 points)
Implement retry mechanism for failed operations:

```javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            console.log(`Attempt ${attempt} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Usage:
const result = await retry(() => fetchData(userId), 3, 1000);
```

Test with operations that fail intermittently.

### Exercise 13: Rate Limiting (10 points)
Implement a rate limiter for API calls:

```javascript
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }
    
    async execute(fn) {
        // Wait if rate limit exceeded
        // Execute function
        // Track request time
    }
}

// Usage: Maximum 5 requests per 10 seconds
const limiter = new RateLimiter(5, 10000);
await limiter.execute(() => apiCall());
```

### Exercise 14: Promise Pool (10 points)
Create a promise pool for concurrent execution control:

```javascript
async function promisePool(tasks, concurrency) {
    // Execute max 'concurrency' promises at a time
    // Return all results when complete
}

// Usage:
const tasks = [
    () => fetchData(1),
    () => fetchData(2),
    () => fetchData(3),
    () => fetchData(4),
    () => fetchData(5)
];

const results = await promisePool(tasks, 2); // Max 2 concurrent
```

---

## Final Project (50 points extra)

### Exercise 15: Complete Async Application
Create a weather dashboard application:

**Requirements:**

1. **Data Fetching:**
   - Fetch weather data (mock API)
   - Fetch forecast data (mock API)
   - Fetch air quality data (mock API)

2. **Features:**
   - Parallel data fetching
   - Retry failed requests
   - Cache responses (5 minutes)
   - Loading states
   - Error handling with user-friendly messages

3. **Cache System:**
```javascript
class Cache {
    constructor(ttl = 300000) { // 5 minutes
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    async get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }
    
    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}
```

4. **Example Structure:**
```javascript
class WeatherDashboard {
    constructor() {
        this.cache = new Cache(300000);
        this.limiter = new RateLimiter(10, 60000);
    }
    
    async getWeatherData(city) {
        // Check cache
        // Fetch from API with rate limiting
        // Retry on failure
        // Update cache
        // Return result
    }
    
    async refreshDashboard(city) {
        // Fetch all data in parallel
        // Handle individual failures
        // Update display
    }
}
```

---

## Submission Guidelines

1. Create file `assignment07_yourname.js`
2. Include all async/await patterns
3. Implement proper error handling
4. Add timing logs to show async behavior
5. Test with various scenarios

## Grading Rubric

- **Async Implementation (30%)**: Correct use of async/await
- **Error Handling (25%)**: Comprehensive error management
- **Code Quality (20%)**: Clean, maintainable code
- **Performance (15%)**: Efficient async operations
- **Testing (10%)**: Edge cases covered

## Common Mistakes to Avoid

❌ Not handling promise rejections
❌ Using async/await in non-async functions
❌ Forgetting try-catch blocks
❌ Not using Promise.all for parallel operations
❌ Blocking code with unnecessary await
❌ Not understanding promise chaining

## Tips for Success

✅ Always use try-catch with async/await
✅ Use Promise.all for independent operations
✅ Implement retry logic for network calls
✅ Cache results when appropriate
✅ Show loading states to users
✅ Provide meaningful error messages
✅ Test with both success and failure scenarios
✅ Use async/await over .then() chains

---

## Async Patterns Quick Reference

| Pattern | Use Case | Example |
|---------|----------|---------|
| Sequential | Dependent operations | `await a(); await b();` |
| Parallel | Independent operations | `Promise.all([a(), b()])` |
| Race | First completed | `Promise.race([a(), b()])` |
| Retry | Network failures | Implement retry loop |
| Timeout | Prevent hanging | `Promise.race([fn(), timeout()])` |

---

**Total Points: 100 + 80 Bonus**

Master async JavaScript and build responsive applications! ⚡
