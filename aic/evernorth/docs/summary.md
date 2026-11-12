# EverNorth QE Training - Learning Summary & Recap

## 📚 Overview
This document provides a comprehensive recap of all concepts covered in the EverNorth QE Training program. Use this as a quick reference to refresh your knowledge and reinforce your learning. Each concept includes explanations and practical code examples.

---

## 1. JavaScript Fundamentals

### JavaScript Syntax
Understanding the basic structure of JavaScript code, including statements, comments, and code organization.

```javascript
// Single-line comment
/* Multi-line
   comment */

// Statement example
const message = "Hello, World!";
console.log(message); // Output: Hello, World!
```

### Variables & Data Types
JavaScript provides three ways to declare variables: `let`, `const`, and `var`. Modern JavaScript prefers `let` and `const`.

```javascript
// Variable declarations
let age = 25;           // Mutable variable
const name = "John";    // Immutable constant
var oldStyle = "avoid"; // Old style (function-scoped)

// Primitive data types
let str = "Hello";           // String
let num = 42;                // Number
let bool = true;             // Boolean
let nothing = null;          // Null
let notDefined = undefined;  // Undefined
let sym = Symbol("id");      // Symbol
let bigNum = 9007199254740991n; // BigInt
```

### Operators
Operators perform operations on variables and values.

```javascript
// Arithmetic operators
let sum = 10 + 5;        // 15
let diff = 10 - 5;       // 5
let product = 10 * 5;    // 50
let quotient = 10 / 5;   // 2
let remainder = 10 % 3;  // 1
let power = 2 ** 3;      // 8

// Comparison operators
console.log(5 == "5");   // true (loose equality)
console.log(5 === "5");  // false (strict equality)
console.log(10 > 5);     // true
console.log(10 <= 10);   // true

// Logical operators
console.log(true && false);  // false (AND)
console.log(true || false);  // true (OR)
console.log(!true);          // false (NOT)

// Ternary operator
let result = age >= 18 ? "Adult" : "Minor";
```

### Control Flow - Conditionals
Control the flow of execution based on conditions.

```javascript
// if-else statement
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B"); // This executes
} else {
    console.log("Grade: C");
}

// switch statement
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    default:
        console.log("Regular day");
}
```

### Control Flow - Loops
Iterate over data or repeat code execution.

```javascript
// for loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// while loop
let count = 0;
while (count < 3) {
    console.log(`Count: ${count}`);
    count++;
}

// for...of loop (arrays)
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in loop (objects)
const person = { name: "John", age: 30 };
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

### Arrays
Arrays store ordered collections of data with powerful manipulation methods.

```javascript
// Array creation and basic operations
const numbers = [1, 2, 3, 4, 5];
numbers.push(6);           // Add to end: [1,2,3,4,5,6]
numbers.pop();             // Remove from end: [1,2,3,4,5]
numbers.unshift(0);        // Add to start: [0,1,2,3,4,5]

// Array methods
const doubled = numbers.map(n => n * 2);        // [0,2,4,6,8,10]
const evens = numbers.filter(n => n % 2 === 0); // [0,2,4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
const found = numbers.find(n => n > 3);         // 4

numbers.forEach(n => console.log(n)); // Log each number
```

### Functions
Functions are reusable blocks of code that can accept inputs and return outputs.

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Default parameters
function welcome(name = "Guest") {
    return `Welcome, ${name}!`;
}

// Rest parameters
function sumAll(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(sumAll(1, 2, 3, 4)); // 10
```

### Objects
Objects store collections of key-value pairs.

```javascript
// Object literal
const user = {
    name: "Alice",
    age: 28,
    email: "alice@example.com",
    greet() {
        return `Hi, I'm ${this.name}`;
    }
};

// Accessing properties
console.log(user.name);        // "Alice"
console.log(user["email"]);    // "alice@example.com"

// Destructuring
const { name, age } = user;

// Spread operator
const updatedUser = { ...user, city: "New York" };

// Object methods
const keys = Object.keys(user);      // ["name", "age", "email", "greet"]
const values = Object.values(user);  // ["Alice", 28, "alice@example.com", f]
```

### Classes
ES6 classes provide a cleaner syntax for object-oriented programming.

```javascript
// Class definition
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return `I'm ${this.name}, ${this.age} years old`;
    }
    
    static species() {
        return "Homo sapiens";
    }
}

// Inheritance
class Employee extends Person {
    constructor(name, age, jobTitle) {
        super(name, age);
        this.jobTitle = jobTitle;
    }
    
    introduce() {
        return `${super.introduce()} and I work as a ${this.jobTitle}`;
    }
}

const emp = new Employee("Bob", 35, "QE Engineer");
console.log(emp.introduce());
```

### Asynchronous Programming
Handle operations that take time without blocking code execution.

```javascript
// Callbacks
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

fetchData(data => console.log(data));

// Promises
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise data");
        }, 1000);
    });
}

getData()
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => console.log("Complete"));

// Async/Await
async function fetchUserData() {
    try {
        const response = await fetch('https://api.example.com/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
```

### Scopes & Closures
Scope determines variable accessibility; closures allow functions to access outer scope variables.

```javascript
// Global scope
let globalVar = "I'm global";

function outerFunction() {
    // Function scope
    let outerVar = "I'm outer";
    
    function innerFunction() {
        // Closure: accessing outer variables
        let innerVar = "I'm inner";
        console.log(globalVar); // Accessible
        console.log(outerVar);  // Accessible (closure)
        console.log(innerVar);  // Accessible
    }
    
    return innerFunction;
}

// Block scope
if (true) {
    let blockVar = "I'm block-scoped";
    const blockConst = "Also block-scoped";
}
```

### Modules
Modules help organize code into separate files with import/export.

```javascript
// math.js - Named exports
export function add(a, b) {
    return a + b;
}

export const PI = 3.14159;

// calculator.js - Default export
export default class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

// main.js - Importing
import Calculator from './calculator.js';
import { add, PI } from './math.js';
import * as MathUtils from './math.js';

console.log(add(5, 3));           // 8
console.log(PI);                   // 3.14159
console.log(MathUtils.add(2, 2)); // 4
```

### Exception Handling
Handle errors gracefully to prevent application crashes.

```javascript
// try-catch-finally
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    } finally {
        console.log("Division operation attempted");
    }
}

// Custom error
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateAge(age) {
    if (age < 0 || age > 150) {
        throw new ValidationError("Invalid age");
    }
    return true;
}
```

### Debugging
Techniques and tools for finding and fixing bugs.

```javascript
// Console methods
console.log("Basic logging");
console.error("Error message");
console.warn("Warning message");
console.table([{name: "Alice", age: 25}, {name: "Bob", age: 30}]);

// Debugging with console
function complexCalculation(x) {
    console.log("Input:", x);
    const result = x * 2 + 10;
    console.log("Result:", result);
    return result;
}

// Performance timing
console.time("operation");
// ... some operations
console.timeEnd("operation");

// Breakpoint in code (debugger keyword)
function debugExample() {
    let x = 5;
    debugger; // Execution pauses here in dev tools
    return x * 2;
}

---

## 2. TypeScript & Modern Development

### Type Annotations and Type Inference
TypeScript adds static typing to JavaScript, catching errors at compile time.

```typescript
// Type annotations
let username: string = "john_doe";
let age: number = 30;
let isActive: boolean = true;
let data: any = "can be anything"; // Avoid when possible

// Type inference
let inferredString = "TypeScript infers this is a string";
let inferredNumber = 42; // Inferred as number

// Function with types
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

// Array types
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: Array<string> = ["apple", "banana"];
```

### Interfaces and Type Aliases
Define custom types for objects and complex structures.

```typescript
// Interface
interface User {
    id: number;
    name: string;
    email: string;
    isActive?: boolean; // Optional property
}

const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

// Type alias
type Point = {
    x: number;
    y: number;
};

type ID = string | number; // Union type

// Function type
type MathOperation = (a: number, b: number) => number;
const add: MathOperation = (a, b) => a + b;
```

### Union and Intersection Types
Combine types for flexible type definitions.

```typescript
// Union types (OR)
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";

function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value.toFixed(2);
}

// Intersection types (AND)
type Person = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: string;
    department: string;
};

type Staff = Person & Employee;

const employee: Staff = {
    name: "Bob",
    age: 28,
    employeeId: "E12345",
    department: "QA"
};
```

### Generics
Create reusable components that work with multiple types.

```typescript
// Generic function
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const firstNumber = getFirstElement<number>([1, 2, 3]); // number
const firstString = getFirstElement<string>(["a", "b"]); // string

// Generic interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

const userResponse: ApiResponse<User> = {
    data: { id: 1, name: "Alice", email: "alice@test.com" },
    status: 200,
    message: "Success"
};

// Generic class
class DataStore<T> {
    private data: T[] = [];
    
    add(item: T): void {
        this.data.push(item);
    }
    
    getAll(): T[] {
        return this.data;
    }
}
```

### Enums
Define a set of named constants.

```typescript
// Numeric enum
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

let move: Direction = Direction.Up;

// String enum
enum LogLevel {
    Info = "INFO",
    Warning = "WARNING",
    Error = "ERROR",
    Debug = "DEBUG"
}

function log(level: LogLevel, message: string): void {
    console.log(`[${level}] ${message}`);
}

log(LogLevel.Error, "Something went wrong");
```

### Type Guards
Narrow down types within conditional blocks.

```typescript
// typeof type guard
function processValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase()); // TypeScript knows it's a string
    } else {
        console.log(value.toFixed(2)); // TypeScript knows it's a number
    }
}

// instanceof type guard
class Dog {
    bark() { console.log("Woof!"); }
}

class Cat {
    meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}

// Custom type guard
interface Fish {
    swim: () => void;
}

interface Bird {
    fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
```

### Node.js & NPM
Package management and project configuration.

```bash
# Initialize a new project
npm init -y

# Install dependencies
npm install playwright @playwright/test
npm install --save-dev typescript @types/node

# Install specific version
npm install lodash@4.17.21

# Run scripts
npm run test
npm start
```

```json
// package.json example
{
  "name": "test-automation",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "report": "playwright show-report"
  },
  "dependencies": {
    "playwright": "^1.40.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "typescript": "^5.0.0"
  }
}
```

### CSS Selectors for Test Automation
Understanding CSS selectors for locating elements.

```css
/* Element selector */
button { }

/* Class selector */
.login-button { }

/* ID selector */
#submit-btn { }

/* Attribute selector */
[data-testid="username"] { }
[type="email"] { }

/* Descendant selector */
div .submit-button { }

/* Child selector */
form > button { }

/* Pseudo-classes */
button:first-child { }
input:nth-child(2) { }
a:hover { }
```

```javascript
// Using CSS selectors in tests
await page.click('.login-button');
await page.fill('#username', 'testuser');
await page.locator('[data-testid="submit"]').click();
```

### XPath for Test Automation
XPath expressions for complex element location.

```javascript
// Basic XPath
"//button"                          // All button elements
"//input[@type='text']"             // Input with type=text
"//div[@id='content']"              // Div with id=content

// Axes
"//button/following-sibling::input" // Next sibling input
"//td/ancestor::table"              // Parent table
"//div[@class='parent']/child::p"   // Direct child p

// Functions
"//button[contains(text(), 'Submit')]"      // Contains text
"//input[starts-with(@id, 'user')]"         // ID starts with
"//div[normalize-space()='Login']"          // Text equals (trimmed)

// Multiple conditions
"//button[@type='submit' and @class='primary']"
"//input[@type='text' or @type='email']"

// Using in tests
await page.locator("//button[contains(text(), 'Login')]").click();
await page.locator("//input[@id='username']").fill('testuser');
```

---

## 3. Data Handling & Test Utilities

### JSON Data Handling
Work with JSON for API testing and data management.

```javascript
// Reading JSON
const fs = require('fs');

// Parse JSON string
const jsonString = '{"name": "Alice", "age": 30}';
const user = JSON.parse(jsonString);
console.log(user.name); // "Alice"

// Stringify object
const person = { name: "Bob", age: 25 };
const jsonData = JSON.stringify(person, null, 2);
console.log(jsonData);

// Read from file
const testData = JSON.parse(fs.readFileSync('testdata.json', 'utf-8'));

// Write to file
const results = { passed: 10, failed: 2 };
fs.writeFileSync('results.json', JSON.stringify(results, null, 2));

// Working with nested JSON
const apiResponse = {
    status: "success",
    data: {
        users: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ]
    }
};

console.log(apiResponse.data.users[0].name); // "Alice"
```

### Excel Data Handling
Read and write Excel files for data-driven testing.

```javascript
const XLSX = require('xlsx');

// Read Excel file
const workbook = XLSX.readFile('testdata.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(data);
// [
//   { username: 'user1', password: 'pass1', expected: 'success' },
//   { username: 'user2', password: 'pass2', expected: 'success' }
// ]

// Write to Excel
const newData = [
    { TestCase: 'Login', Status: 'Pass', Duration: '2.5s' },
    { TestCase: 'Logout', Status: 'Pass', Duration: '1.2s' }
];

const newWorksheet = XLSX.utils.json_to_sheet(newData);
const newWorkbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Results');
XLSX.writeFile(newWorkbook, 'test-results.xlsx');

// Data-driven test example
data.forEach(testCase => {
    test(`Login with ${testCase.username}`, async ({ page }) => {
        await page.fill('#username', testCase.username);
        await page.fill('#password', testCase.password);
        await page.click('#login');
        // Assertions based on testCase.expected
    });
});
```

### Text File Operations
Read and write text files for test data and logs.

```javascript
const fs = require('fs');
const path = require('path');

// Read text file
const data = fs.readFileSync('test-data.txt', 'utf-8');
const lines = data.split('\n');

// Write to text file
fs.writeFileSync('test-log.txt', 'Test started\n');
fs.appendFileSync('test-log.txt', 'Test completed\n');

// Read file asynchronously
fs.readFile('config.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Check if file exists
if (fs.existsSync('testdata.txt')) {
    console.log('File exists');
}

// Create directory
if (!fs.existsSync('test-results')) {
    fs.mkdirSync('test-results', { recursive: true });
}

// List files in directory
const files = fs.readdirSync('./tests');
console.log(files);
```

### Database Operations
Connect to databases for data validation and setup.

```javascript
// MySQL example
const mysql = require('mysql2/promise');

async function queryDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'testuser',
        password: 'testpass',
        database: 'testdb'
    });
    
    // Query data
    const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        ['test@example.com']
    );
    
    console.log(rows);
    
    // Insert data
    await connection.execute(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        ['Test User', 'test@example.com']
    );
    
    // Update data
    await connection.execute(
        'UPDATE users SET status = ? WHERE id = ?',
        ['active', 1]
    );
    
    await connection.end();
}

// SQLite example (lightweight, file-based)
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./test.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)");
    db.run("INSERT INTO users VALUES (1, 'Alice')");
    
    db.each("SELECT id, name FROM users", (err, row) => {
        console.log(row.id + ": " + row.name);
    });
});

db.close();
```

### Base Request Class
Reusable API request utility for consistent API testing.

```javascript
// BaseRequest.js
const axios = require('axios');

class BaseRequest {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    async get(endpoint, params = {}) {
        try {
            const response = await this.client.get(endpoint, { params });
            return response;
        } catch (error) {
            console.error(`GET ${endpoint} failed:`, error.message);
            throw error;
        }
    }
    
    async post(endpoint, data) {
        try {
            const response = await this.client.post(endpoint, data);
            return response;
        } catch (error) {
            console.error(`POST ${endpoint} failed:`, error.message);
            throw error;
        }
    }
    
    async put(endpoint, data) {
        const response = await this.client.put(endpoint, data);
        return response;
    }
    
    async delete(endpoint) {
        const response = await this.client.delete(endpoint);
        return response;
    }
    
    setAuthToken(token) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

// Usage
const api = new BaseRequest('https://api.example.com');
api.setAuthToken('your-token-here');

const response = await api.get('/users/1');
console.log(response.data);
```

### Base Test Class
Common test setup and utilities for all tests.

```javascript
// BaseTest.js
import { test as base } from '@playwright/test';

export const test = base.extend({
    // Common setup for all tests
    page: async ({ page }, use) => {
        // Navigate to base URL
        await page.goto('https://example.com');
        
        // Set viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Use the page
        await use(page);
        
        // Cleanup after test
        await page.close();
    },
    
    // Authenticated context
    authenticatedPage: async ({ page }, use) => {
        await page.goto('/login');
        await page.fill('#username', 'testuser');
        await page.fill('#password', 'testpass');
        await page.click('#login-button');
        await page.waitForURL('/dashboard');
        
        await use(page);
    }
});

// Using in tests
test('should display user dashboard', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.locator('h1')).toContainText('Dashboard');
});
```

### Page Object Model (POM)
Organize page interactions separate from test logic.

```javascript
// pages/LoginPage.js
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('.error-message');
    }
    
    async navigate() {
        await this.page.goto('/login');
    }
    
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}

// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('validuser', 'validpass');
    await expect(page).toHaveURL('/dashboard');
});

test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('invalid', 'wrong');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
});
```

---

## 4. Playwright Testing Framework

### Test Setup and Configuration
Configure Playwright for your test automation needs.

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 2,
    workers: 4,
    reporter: [['html'], ['list']],
    use: {
        baseURL: 'https://example.com',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
});
```

```javascript
// Basic test structure
import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });
    
    test('should login with valid credentials', async ({ page }) => {
        await page.fill('#username', 'testuser');
        await page.fill('#password', 'testpass');
        await page.click('#login-button');
        await expect(page).toHaveURL('/dashboard');
    });
    
    test.afterEach(async ({ page }) => {
        await page.close();
    });
});
```

### Browser Context & Pages
Manage multiple browser contexts and pages for isolated testing.

```javascript
import { test } from '@playwright/test';

test('multiple contexts', async ({ browser }) => {
    // Create first context (user1)
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto('/');
    await page1.fill('#username', 'user1');
    await page1.click('#login');
    
    // Create second context (user2)
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('/');
    await page2.fill('#username', 'user2');
    await page2.click('#login');
    
    // Both sessions are isolated
    await page1.goto('/profile');
    await page2.goto('/profile');
    
    await context1.close();
    await context2.close();
});

test('multiple pages in same context', async ({ page }) => {
    // Open new page/tab
    const page2 = await page.context().newPage();
    
    await page.goto('/page1');
    await page2.goto('/page2');
    
    // Switch between pages
    await page.bringToFront();
    await page2.bringToFront();
});
```

### Locators and Best Practices
Modern, reliable ways to locate elements.

```javascript
import { test, expect } from '@playwright/test';

test('locator strategies', async ({ page }) => {
    await page.goto('/');
    
    // Role-based (recommended)
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('test');
    
    // Text content
    await page.getByText('Login').click();
    await page.getByText(/sign in/i).click(); // case-insensitive
    
    // Label
    await page.getByLabel('Email address').fill('test@example.com');
    
    // Placeholder
    await page.getByPlaceholder('Enter your name').fill('John');
    
    // Test ID (data-testid attribute)
    await page.getByTestId('submit-button').click();
    
    // CSS selector
    await page.locator('.login-button').click();
    await page.locator('#username').fill('test');
    
    // XPath
    await page.locator('//button[contains(text(), "Submit")]').click();
    
    // Chaining locators
    await page
        .locator('.form-container')
        .locator('input[type="email"]')
        .fill('test@example.com');
});
```

### Alerts & Dialogs
Handle JavaScript dialogs (alert, confirm, prompt).

```javascript
import { test, expect } from '@playwright/test';

test('handle alert dialog', async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Welcome!');
        await dialog.accept();
    });
    
    await page.goto('/');
    await page.click('#show-alert');
});

test('handle confirm dialog', async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept(); // or dialog.dismiss()
    });
    
    await page.click('#delete-button');
});

test('handle prompt dialog', async ({ page }) => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        await dialog.accept('My Input');
    });
    
    await page.click('#prompt-button');
});
```

### Cookies Management
Set, get, and clear cookies for session management.

```javascript
import { test, expect } from '@playwright/test';

test('cookie operations', async ({ page, context }) => {
    await page.goto('/');
    
    // Set cookies
    await context.addCookies([
        {
            name: 'session_id',
            value: 'abc123',
            domain: 'example.com',
            path: '/',
            expires: Date.now() / 1000 + 3600 // 1 hour
        }
    ]);
    
    // Get cookies
    const cookies = await context.cookies();
    console.log(cookies);
    
    // Get specific cookie
    const sessionCookies = await context.cookies('https://example.com');
    const sessionCookie = sessionCookies.find(c => c.name === 'session_id');
    expect(sessionCookie.value).toBe('abc123');
    
    // Clear cookies
    await context.clearCookies();
    
    // Clear specific cookie
    await context.clearCookies({ name: 'session_id' });
});
```

### Frames & iFrames
Interact with content inside frames.

```javascript
import { test, expect } from '@playwright/test';

test('work with iframes', async ({ page }) => {
    await page.goto('/page-with-iframe');
    
    // Get frame by name or URL
    const frame = page.frame({ name: 'myframe' });
    await frame.locator('#button-in-iframe').click();
    
    // Get frame by selector
    const frameElement = page.frameLocator('#my-iframe');
    await frameElement.locator('#input').fill('text');
    
    // Multiple nested frames
    const childFrame = frame.childFrames()[0];
    await childFrame.locator('#nested-element').click();
});
```

### Drag & Drop
Simulate drag and drop operations.

```javascript
import { test } from '@playwright/test';

test('drag and drop', async ({ page }) => {
    await page.goto('/drag-drop');
    
    // Method 1: Using dragTo
    await page.locator('#draggable').dragTo(page.locator('#droppable'));
    
    // Method 2: Using mouse events
    const source = page.locator('#draggable');
    const target = page.locator('#droppable');
    
    await source.hover();
    await page.mouse.down();
    await target.hover();
    await page.mouse.up();
    
    // Method 3: Using bounding box
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
    
    await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2);
    await page.mouse.up();
});
```

### API Testing with Playwright
Test REST APIs using Playwright's request context.

```javascript
import { test, expect } from '@playwright/test';

test('API GET request', async ({ request }) => {
    const response = await request.get('https://api.example.com/users/1');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.id).toBe(1);
    expect(data.name).toBeTruthy();
});

test('API POST request', async ({ request }) => {
    const response = await request.post('https://api.example.com/users', {
        data: {
            name: 'John Doe',
            email: 'john@example.com'
        }
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.name).toBe('John Doe');
});

test('API with authentication', async ({ request }) => {
    const response = await request.get('https://api.example.com/protected', {
        headers: {
            'Authorization': 'Bearer your-token-here'
        }
    });
    
    expect(response.status()).toBe(200);
});

test('API testing with beforeAll setup', async ({ request }) => {
    // Create test data
    const createResponse = await request.post('https://api.example.com/users', {
        data: { name: 'Test User' }
    });
    const userId = (await createResponse.json()).id;
    
    // Test the created resource
    const getResponse = await request.get(`https://api.example.com/users/${userId}`);
    expect(getResponse.ok()).toBeTruthy();
    
    // Cleanup
    await request.delete(`https://api.example.com/users/${userId}`);
});
```

### Data-Driven Testing
Run tests with multiple data sets.

```javascript
import { test, expect } from '@playwright/test';

// Using test.describe.parallel with for loop
const testData = [
    { username: 'user1', password: 'pass1', expected: 'success' },
    { username: 'user2', password: 'pass2', expected: 'success' },
    { username: 'invalid', password: 'wrong', expected: 'failure' }
];

test.describe.parallel('Login Tests', () => {
    testData.forEach(({ username, password, expected }) => {
        test(`Login with ${username}`, async ({ page }) => {
            await page.goto('/login');
            await page.fill('#username', username);
            await page.fill('#password', password);
            await page.click('#login-button');
            
            if (expected === 'success') {
                await expect(page).toHaveURL('/dashboard');
            } else {
                await expect(page.locator('.error')).toBeVisible();
            }
        });
    });
});

// Reading from JSON file
import testData from './test-data.json';

testData.users.forEach(user => {
    test(`Test user ${user.name}`, async ({ page }) => {
        // Test logic
    });
});
```

---

## 5. Cypress Testing Framework

### Basic Cypress Commands
Core commands for interacting with elements.

```javascript
describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('/login');
    });
    
    it('should login successfully', () => {
        // Type text
        cy.get('#username').type('testuser');
        cy.get('#password').type('testpass');
        
        // Click button
        cy.get('#login-button').click();
        
        // Verify URL
        cy.url().should('include', '/dashboard');
        
        // Select dropdown
        cy.get('select').select('option2');
        
        // Check checkbox
        cy.get('#terms').check();
        cy.get('#terms').should('be.checked');
        
        // Uncheck
        cy.get('#newsletter').uncheck();
    });
});
```

### Assertions
Validate expected outcomes using Chai assertions.

```javascript
describe('Assertions', () => {
    it('demonstrates various assertions', () => {
        cy.visit('/');
        
        // Visibility assertions
        cy.get('.header').should('be.visible');
        cy.get('.hidden-element').should('not.be.visible');
        
        // Text assertions
        cy.get('h1').should('have.text', 'Welcome');
        cy.get('.message').should('contain', 'Success');
        
        // Attribute assertions
        cy.get('input').should('have.attr', 'type', 'text');
        cy.get('button').should('have.class', 'btn-primary');
        
        // Value assertions
        cy.get('#username').should('have.value', 'testuser');
        
        // Length assertions
        cy.get('.list-item').should('have.length', 5);
        cy.get('.list-item').should('have.length.greaterThan', 3);
        
        // Chaining assertions
        cy.get('button')
            .should('be.visible')
            .and('have.text', 'Submit')
            .and('not.be.disabled');
    });
});
```

### Querying and Traversal
Navigate the DOM to find elements.

```javascript
describe('Querying', () => {
    it('finds elements using various methods', () => {
        // Basic querying
        cy.get('.my-class');
        cy.get('#my-id');
        cy.get('[data-testid="submit"]');
        
        // Contains text
        cy.contains('Submit');
        cy.contains('button', 'Submit');
        
        // Within a scope
        cy.get('.form').within(() => {
            cy.get('input').type('text');
            cy.get('button').click();
        });
        
        // First, last, nth
        cy.get('li').first();
        cy.get('li').last();
        cy.get('li').eq(2); // 3rd element
        
        // Parent, children, siblings
        cy.get('.child').parent();
        cy.get('.parent').children();
        cy.get('.element').siblings();
        
        // Next, prev
        cy.get('.active').next();
        cy.get('.active').prev();
        
        // Closest
        cy.get('button').closest('form');
        
        // Find
        cy.get('.container').find('.item');
        
        // Filter
        cy.get('button').filter('.active');
    });
});
```

### Aliasing
Store references to reuse later.

```javascript
describe('Aliasing', () => {
    it('uses aliases for elements', () => {
        // Alias an element
        cy.get('.username-input').as('usernameField');
        cy.get('@usernameField').type('testuser');
        cy.get('@usernameField').should('have.value', 'testuser');
        
        // Alias a route
        cy.intercept('GET', '/api/users').as('getUsers');
        cy.visit('/users');
        cy.wait('@getUsers');
        cy.wait('@getUsers').its('response.statusCode').should('eq', 200);
    });
    
    it('uses aliases in hooks', function() {
        cy.get('.button').as('submitBtn');
    });
    
    it('accesses aliased element', function() {
        cy.get('@submitBtn').click();
    });
});
```

### Network Requests (Intercept)
Intercept and stub network requests.

```javascript
describe('Network Requests', () => {
    it('waits for API call', () => {
        cy.intercept('GET', '/api/users').as('getUsers');
        cy.visit('/users');
        cy.wait('@getUsers');
    });
    
    it('stubs API response', () => {
        cy.intercept('GET', '/api/users', {
            statusCode: 200,
            body: [
                { id: 1, name: 'John' },
                { id: 2, name: 'Jane' }
            ]
        }).as('getUsers');
        
        cy.visit('/users');
        cy.wait('@getUsers');
        cy.contains('John').should('be.visible');
    });
    
    it('modifies request', () => {
        cy.intercept('POST', '/api/users', (req) => {
            req.body.modified = true;
        }).as('createUser');
        
        cy.get('#create-user').click();
        cy.wait('@createUser');
    });
    
    it('simulates network error', () => {
        cy.intercept('GET', '/api/data', {
            statusCode: 500,
            body: { error: 'Server Error' }
        });
        
        cy.visit('/page');
        cy.contains('Error').should('be.visible');
    });
});
```

### Cookies & Local Storage
Manage browser storage.

```javascript
describe('Cookies and Storage', () => {
    it('works with cookies', () => {
        // Set cookie
        cy.setCookie('session_id', 'abc123');
        
        // Get cookie
        cy.getCookie('session_id')
            .should('have.property', 'value', 'abc123');
        
        // Get all cookies
        cy.getCookies().should('have.length', 1);
        
        // Clear cookie
        cy.clearCookie('session_id');
        
        // Clear all cookies
        cy.clearCookies();
    });
    
    it('works with local storage', () => {
        cy.visit('/');
        
        // Set local storage
        cy.window().then((win) => {
            win.localStorage.setItem('token', 'xyz789');
        });
        
        // Get local storage
        cy.window().its('localStorage.token').should('eq', 'xyz789');
        
        // Clear local storage
        cy.clearLocalStorage();
    });
});
```

### Custom Commands
Create reusable commands.

```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('logout', () => {
    cy.get('#logout-button').click();
    cy.url().should('include', '/login');
});

// Using custom commands
describe('Dashboard Tests', () => {
    beforeEach(() => {
        cy.login('testuser', 'testpass');
    });
    
    it('should display user info', () => {
        cy.contains('Welcome, testuser').should('be.visible');
    });
    
    afterEach(() => {
        cy.logout();
    });
});
```

### Fixtures
Manage test data in JSON files.

```javascript
// cypress/fixtures/users.json
{
    "validUser": {
        "username": "testuser",
        "password": "testpass"
    },
    "adminUser": {
        "username": "admin",
        "password": "adminpass"
    }
}

// Using fixtures
describe('Login with Fixtures', () => {
    it('logs in with valid user', () => {
        cy.fixture('users').then((users) => {
            cy.visit('/login');
            cy.get('#username').type(users.validUser.username);
            cy.get('#password').type(users.validUser.password);
            cy.get('#login-button').click();
        });
    });
    
    it('uses fixture in beforeEach', function() {
        cy.fixture('users').as('userData');
    });
    
    it('accesses fixture data', function() {
        cy.visit('/login');
        cy.get('#username').type(this.userData.adminUser.username);
        cy.get('#password').type(this.userData.adminUser.password);
        cy.get('#login-button').click();
    });
});
```

---

## 6. Mobile Testing with Appium & WebDriver IO

### Android Studio & Emulator Setup
Configure Android development environment for mobile testing.

```bash
# Install Android Studio
# Download from: https://developer.android.com/studio

# Set environment variables
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Create AVD (Android Virtual Device)
avdmanager create avd -n Pixel_5_API_30 -k "system-images;android-30;google_apis;x86_64"

# List available emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_5_API_30

# Check connected devices
adb devices
```

### Installing Apps on Emulator
Install and manage applications on Android devices.

```bash
# Install APK
adb install path/to/app.apk

# Uninstall app
adb uninstall com.example.app

# Reinstall app (keep data)
adb install -r path/to/app.apk

# List installed packages
adb shell pm list packages

# Get app info
adb shell pm dump com.example.app

# Clear app data
adb shell pm clear com.example.app

# Take screenshot
adb shell screencap /sdcard/screen.png
adb pull /sdcard/screen.png

# Record video
adb shell screenrecord /sdcard/demo.mp4
```

### Appium Configuration
Set up Appium server for mobile automation.

```javascript
// Appium desired capabilities
const capabilities = {
    platformName: 'Android',
    'appium:platformVersion': '11.0',
    'appium:deviceName': 'Pixel_5_API_30',
    'appium:app': '/path/to/app.apk',
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'com.example.app',
    'appium:appActivity': '.MainActivity',
    'appium:noReset': true,
    'appium:fullReset': false
};

// Start Appium programmatically
const { remote } = require('webdriverio');

const driver = await remote({
    hostname: 'localhost',
    port: 4723,
    path: '/wd/hub',
    capabilities: capabilities
});
```

### Appium Inspector
Use Appium Inspector to identify mobile element locators.

```bash
# Launch Appium Inspector
# Connect to session with capabilities

# Example capabilities in Inspector:
{
  "platformName": "Android",
  "appium:app": "/path/to/app.apk",
  "appium:automationName": "UiAutomator2"
}
```

### Mobile Locator Strategies
Different ways to locate mobile elements.

```javascript
// Accessibility ID
await driver.$('~login-button').click();

// ID (resource-id)
await driver.$('android=new UiSelector().resourceId("com.example:id/username")').setValue('testuser');

// Class name
await driver.$('android.widget.EditText').setValue('value');

// XPath
await driver.$('//android.widget.Button[@text="Login"]').click();
await driver.$('//android.widget.EditText[@resource-id="username"]').setValue('test');

// Text
await driver.$('android=new UiSelector().text("Submit")').click();

// Contains text
await driver.$('android=new UiSelector().textContains("Login")').click();

// UiAutomator selector
await driver.$('android=new UiSelector().className("android.widget.EditText").instance(0)').setValue('test');

// Chain selectors
await driver
    .$('android=new UiSelector().resourceId("form")')
    .$('android.widget.Button')
    .click();

// iOS locators
await driver.$('-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]').click();
await driver.$('-ios predicate string:label == "Login"').click();
```

### WebDriver IO Configuration
Configure WebDriver IO for mobile testing.

```javascript
// wdio.conf.js
exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Pixel_5_API_30',
        'appium:platformVersion': '11.0',
        'appium:app': './app/android.apk',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
```

### Writing Mobile Tests
Create automated mobile tests with WebDriver IO.

```javascript
// test/specs/login.spec.js
describe('Mobile App Login', () => {
    it('should login successfully', async () => {
        // Wait for element
        const usernameField = await $('~username-input');
        await usernameField.waitForDisplayed({ timeout: 5000 });
        
        // Enter credentials
        await usernameField.setValue('testuser');
        await $('~password-input').setValue('testpass');
        
        // Click login
        await $('~login-button').click();
        
        // Verify success
        const welcomeText = await $('~welcome-message');
        await welcomeText.waitForDisplayed();
        const text = await welcomeText.getText();
        expect(text).toBe('Welcome, testuser!');
    });
    
    it('should handle touch gestures', async () => {
        // Scroll
        await driver.execute('mobile: scroll', {
            direction: 'down',
            percent: 0.5
        });
        
        // Swipe
        await driver.execute('mobile: swipe', {
            direction: 'left',
            percent: 0.75
        });
        
        // Tap at coordinates
        await driver.touchAction({
            action: 'tap',
            x: 200,
            y: 300
        });
        
        // Long press
        await driver.touchAction([
            { action: 'press', x: 200, y: 300 },
            { action: 'wait', ms: 2000 },
            { action: 'release' }
        ]);
    });
    
    it('should work with native context', async () => {
        // Get current context
        const context = await driver.getContext();
        console.log('Current context:', context);
        
        // List all contexts
        const contexts = await driver.getContexts();
        console.log('Available contexts:', contexts);
        
        // Switch to webview
        await driver.switchContext('WEBVIEW_com.example.app');
        
        // Web interactions
        await $('input[name="search"]').setValue('query');
        
        // Switch back to native
        await driver.switchContext('NATIVE_APP');
    });
    
    it('should handle app lifecycle', async () => {
        // Background app for 3 seconds
        await driver.background(3);
        
        // Close app
        await driver.closeApp();
        
        // Launch app
        await driver.launchApp();
        
        // Reset app
        await driver.reset();
        
        // Check if app is installed
        const isInstalled = await driver.isAppInstalled('com.example.app');
        expect(isInstalled).toBe(true);
    });
});
```

### BrowserStack Configuration
Run mobile tests on real devices via BrowserStack.

```javascript
// wdio.browserstack.conf.js
exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',
    
    capabilities: [{
        'bstack:options': {
            deviceName: 'Samsung Galaxy S21',
            platformVersion: '11.0',
            platformName: 'Android',
            buildName: 'Mobile Test Build',
            projectName: 'Mobile Testing',
            sessionName: 'Android Test',
            debug: true,
            networkLogs: true
        },
        'appium:app': 'bs://<app_id>', // Upload app to BrowserStack
        'appium:automationName': 'UiAutomator2'
    }],
    
    specs: ['./test/specs/**/*.js'],
    maxInstances: 5,
    
    commonCapabilities: {
        'bstack:options': {
            buildName: 'Mobile Test Suite',
            projectName: 'EverNorth QE'
        }
    }
};

// Upload app to BrowserStack
const request = require('request');

const options = {
    url: 'https://api-cloud.browserstack.com/app-automate/upload',
    auth: {
        user: 'USERNAME',
        pass: 'ACCESS_KEY'
    },
    formData: {
        file: require('fs').createReadStream('./app/android.apk')
    }
};

request.post(options, (err, resp, body) => {
    console.log('App URL:', JSON.parse(body).app_url);
});
```

```javascript
// Running parallel tests
describe('Parallel Mobile Tests', () => {
    const devices = [
        { device: 'Samsung Galaxy S21', os: '11.0' },
        { device: 'Google Pixel 5', os: '12.0' },
        { device: 'iPhone 13', os: '15.0' }
    ];
    
    devices.forEach(({ device, os }) => {
        it(`should work on ${device}`, async () => {
            // Test logic
        });
    });
});
```

---

## 7. Test Execution & Reporting

### Understanding Test Results
Interpret test execution outcomes and metrics.

```javascript
// Playwright test results
// ✓ - Test passed
// ✗ - Test failed
// ⊘ - Test skipped
// ⊗ - Test timed out

// Test summary
// Tests: 50
// Passed: 45 (90%)
// Failed: 3 (6%)
// Skipped: 2 (4%)
// Duration: 2m 30s
```

### Playwright HTML Report
Generate and analyze comprehensive HTML test reports.

```javascript
// playwright.config.js
export default defineConfig({
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results.json' }],
        ['junit', { outputFile: 'results.xml' }]
    ]
});
```

```bash
# Run tests and generate report
npx playwright test

# Open HTML report
npx playwright show-report

# Report includes:
# - Test execution timeline
# - Screenshots on failure
# - Video recordings
# - Trace files for debugging
# - Step-by-step execution logs
```

### Playwright Trace Viewer
Debug failed tests with trace viewer.

```javascript
// playwright.config.js
export default defineConfig({
    use: {
        trace: 'on-first-retry', // or 'on', 'off', 'retain-on-failure'
    }
});
```

```bash
# View trace
npx playwright show-trace trace.zip

# Trace includes:
# - DOM snapshots
# - Network requests
# - Console logs
# - Actions timeline
# - Screenshots
```

### Cypress Screenshots and Videos
Automatic failure reporting with visual evidence.

```javascript
// cypress.config.js
module.exports = defineConfig({
    e2e: {
        screenshotOnRunFailure: true,
        video: true,
        videosFolder: 'cypress/videos',
        screenshotsFolder: 'cypress/screenshots',
        videoCompression: 32
    }
});

// Manual screenshots
cy.screenshot('my-screenshot');
cy.get('.element').screenshot();
```

### Custom Reporting
Create custom reporters for specific needs.

```javascript
// custom-reporter.js
class CustomReporter {
    onBegin(config, suite) {
        console.log(`Starting test run with ${suite.allTests().length} tests`);
    }
    
    onTestEnd(test, result) {
        console.log(`Finished ${test.title}: ${result.status}`);
        
        if (result.status === 'failed') {
            console.log(`Error: ${result.error.message}`);
        }
    }
    
    onEnd(result) {
        console.log(`Test run finished. Total: ${result.allTests().length}`);
        console.log(`Passed: ${result.passed.length}`);
        console.log(`Failed: ${result.failed.length}`);
    }
}

module.exports = CustomReporter;
```

### CI/CD Integration
Integrate tests into continuous integration pipelines.

```yaml
# .github/workflows/tests.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run tests
        run: npx playwright test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
      
      - name: Upload test videos
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: test-videos
          path: test-results/
```

```groovy
// Jenkins Pipeline
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/tests.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
        
        stage('Publish Reports') {
            steps {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Test Report'
                ])
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
```

---

## 🎯 Key Takeaways

### Best Practices Learned

1. **Code Organization**: Use Page Object Model (POM) to separate test logic from page interactions, making tests more maintainable and reusable.

2. **Data Management**: Keep test data separate from test code using JSON files, Excel sheets, or databases. This enables data-driven testing and easier maintenance.

3. **Wait Strategies**: Always use smart waits (waitForSelector, waitForLoadState) instead of hard-coded sleeps. This makes tests more reliable and faster.

4. **Assertions**: Write clear, specific assertions that provide meaningful feedback when tests fail. Use descriptive error messages.

5. **Error Handling**: Implement try-catch blocks in critical sections and handle errors gracefully to avoid test disruptions.

6. **Reusability**: Create reusable functions, classes, and utilities (base classes, helper functions) to reduce code duplication.

7. **Maintainability**: Follow coding standards, use meaningful variable names, add comments for complex logic, and keep functions small and focused.

### Tools Mastered

- **Playwright**: Modern, fast, and reliable web automation framework with built-in waiting and powerful API
- **Cypress**: Developer-friendly E2E testing with real-time reload and excellent debugging
- **Appium**: Industry-standard mobile automation supporting iOS and Android
- **WebDriver IO**: Comprehensive test automation framework for web and mobile
- **TypeScript**: Type-safe development catching errors at compile time
- **Node.js**: JavaScript runtime enabling server-side test execution

### Testing Approaches

- **Functional Testing**: Validates that features work according to requirements
- **API Testing**: Backend service validation ensuring data integrity and correct responses
- **Mobile Testing**: Cross-platform mobile app testing on emulators and real devices
- **Data-Driven Testing**: Running same tests with multiple data sets for comprehensive coverage
- **Cross-Browser Testing**: Ensuring application works across different browsers and versions
- **Visual Regression Testing**: Detecting unintended visual changes
- **Performance Testing**: Measuring response times and identifying bottlenecks

---

## 📖 Additional Resources

- **Documentation**: [https://vibetestq.com/aic/evernorth/docs/](https://vibetestq.com/aic/evernorth/docs/)
- **Assignments**: [https://vibetestq.com/aic/evernorth/assignments/](https://vibetestq.com/aic/evernorth/assignments/)

### Official Documentation Links
- Playwright: https://playwright.dev
- Cypress: https://docs.cypress.io  
- Appium: https://appium.io/docs
- TypeScript: https://www.typescriptlang.org/docs
- WebDriver IO: https://webdriver.io/docs

---

## 🚀 Next Steps

1. **Review and Practice**: Go through assignments again, try variations of the problems
2. **Build Projects**: Create personal test automation projects using learned concepts
3. **Open Source**: Contribute to open-source testing frameworks and projects
4. **Stay Updated**: Follow testing blogs, attend webinars, join testing communities
5. **Certifications**: Consider certifications like ISTQB, Selenium, or framework-specific ones
6. **Mentor Others**: Teaching others reinforces your own understanding
7. **Continuous Learning**: Explore AI in testing, performance testing, security testing

---

**Remember**: Test automation is a journey, not a destination. Keep practicing, stay curious, and always strive for quality. The skills you've learned here form a solid foundation for a successful career in QA automation!

*Last Updated: February 9, 2026*
