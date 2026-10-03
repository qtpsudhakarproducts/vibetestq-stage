# Assignment: Objects, Classes, and OOP

**Topics Covered:** Objects, Classes, Inheritance, Encapsulation  
**Difficulty:** Intermediate to Advanced  
**Estimated Time:** 3-4 hours  
**Reference:** Files 08, 10 from documentation

---

## Instructions

- Use object-oriented programming principles
- Implement proper encapsulation
- Follow naming conventions
- Test all methods thoroughly

---

## Part A: Object Basics (20 points)

### Exercise 1: Creating Objects (5 points)
Create objects for the following using object literal syntax:

1. **Book Object:**
   - title, author, year, pages, isRead

2. **Car Object:**
   - make, model, year, color, price

3. **Person Object:**
   - name, age, email, phone, address

Display all properties of each object.

### Exercise 2: Object Methods (8 points)
Create a `calculator` object with methods:
- `add(a, b)` - Returns sum
- `subtract(a, b)` - Returns difference
- `multiply(a, b)` - Returns product
- `divide(a, b)` - Returns quotient (handle division by zero)
- `power(base, exponent)` - Returns power
- `history` - Array to store last 5 operations

Test all methods and display operation history.

### Exercise 3: Working with `this` (7 points)
Create a `bankAccount` object:
```javascript
let bankAccount = {
    accountNumber: "123456",
    accountHolder: "John Doe",
    balance: 1000,
    // Add methods here
};
```

Add methods:
- `deposit(amount)` - Adds to balance
- `withdraw(amount)` - Subtracts from balance (check sufficient funds)
- `getBalance()` - Returns current balance
- `getAccountInfo()` - Returns all account details

Use `this` to reference object properties.

---

## Part B: Constructor Functions and Prototypes (20 points)

### Exercise 4: Constructor Functions (10 points)
Create constructor functions for:

1. **Student Constructor:**
```javascript
function Student(name, rollNumber, grade) {
    // Properties
    this.name = name;
    this.rollNumber = rollNumber;
    this.grade = grade;
    this.marks = [];
}
```

Add methods using prototype:
- `addMarks(subject, marks)`
- `getAverage()`
- `getGrade()` - Based on average (A: 90+, B: 80-89, etc.)
- `displayInfo()`

Create 3 student objects and test all methods.

2. **Product Constructor:**
Create products with: name, price, stock, category
Add prototype methods:
- `updatePrice(newPrice)`
- `updateStock(quantity)`
- `isInStock()`
- `getInfo()`

### Exercise 5: JSON Operations (10 points)
Given the student objects from Exercise 4:

1. Convert student objects to JSON strings
2. Store in an array
3. Save to a variable as if writing to a file
4. Parse the JSON back to objects
5. Verify all properties and methods work

Display before and after conversion.

---

## Part C: ES6 Classes (25 points)

### Exercise 6: Basic Class Creation (10 points)
Create a `Book` class:

```javascript
class Book {
    constructor(title, author, isbn, price) {
        // Initialize properties
    }
    
    // Add methods
}
```

Required methods:
- `getInfo()` - Returns formatted book info
- `applyDiscount(percentage)` - Reduces price
- `isBestSeller()` - Returns true if price > $20
- `comparePrice(otherBook)` - Compare with another book

Create a library array with 5 books and:
- Find the most expensive book
- Find books by a specific author
- Calculate total value of library
- Apply 10% discount to all books

### Exercise 7: Getters and Setters (8 points)
Create a `Employee` class with private fields:

```javascript
class Employee {
    #salary; // Private field
    
    constructor(name, position, salary) {
        this.name = name;
        this.position = position;
        this.#salary = salary;
    }
    
    // Add getters and setters
}
```

Implement:
- Getter for salary
- Setter for salary (validate: must be positive, not less than minimum wage)
- Getter for annual salary
- Method to give raise (percentage)
- Method to display employee details

### Exercise 8: Static Methods (7 points)
Add static methods to the Employee class:

```javascript
class Employee {
    static companyName = "Tech Corp";
    static minWage = 15000;
    static employees = [];
    
    static addEmployee(employee) {
        // Add to employees array
    }
    
    static getTotalEmployees() {
        // Return count
    }
    
    static getAverageSalary() {
        // Calculate average
    }
    
    static findHighestPaid() {
        // Return employee with highest salary
    }
}
```

Test by creating multiple employees and using static methods.

---

## Part D: Inheritance (20 points)

### Exercise 9: Single Inheritance (10 points)
Create a class hierarchy:

```javascript
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.speed = 0;
    }
    
    accelerate(amount) {
        this.speed += amount;
    }
    
    brake(amount) {
        this.speed -= amount;
        if (this.speed < 0) this.speed = 0;
    }
    
    getInfo() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year, doors, fuel) {
        super(make, model, year);
        this.doors = doors;
        this.fuel = fuel;
    }
    
    // Override and add methods
}

class Motorcycle extends Vehicle {
    constructor(make, model, year, type) {
        super(make, model, year);
        this.type = type; // Sport, Cruiser, etc.
    }
    
    // Override and add methods
}
```

Create instances and demonstrate:
- Inheritance of properties
- Method overriding
- Use of super keyword
- instanceof checking

### Exercise 10: Multi-level Inheritance (10 points)
Create a three-level hierarchy:

```javascript
class Animal {
    // Basic animal properties and methods
}

class Mammal extends Animal {
    // Mammal-specific features
}

class Dog extends Mammal {
    // Dog-specific features
}
```

Implement:
- At least 2 properties per class
- At least 2 methods per class
- Method overriding at each level
- Super calls to parent methods

Test with multiple instances.

---

## Part E: Advanced OOP Concepts (15 points)

### Exercise 11: Encapsulation (8 points)
Create a `BankAccount` class with full encapsulation:

```javascript
class BankAccount {
    #accountNumber;
    #balance;
    #pin;
    #transactionHistory;
    
    constructor(accountNumber, initialDeposit, pin) {
        // Initialize private fields
    }
    
    // Public methods only
}
```

Implement:
- `deposit(amount, pin)` - Requires PIN
- `withdraw(amount, pin)` - Requires PIN, check balance
- `getBalance(pin)` - Requires PIN
- `changePin(oldPin, newPin)` - Validate old PIN
- `getTransactionHistory(pin)` - Last 10 transactions
- Private method: `#validatePin(pin)`
- Private method: `#addTransaction(type, amount)`

### Exercise 12: Object Composition (7 points)
Instead of inheritance, use composition:

```javascript
class Engine {
    constructor(type, horsepower) {
        this.type = type;
        this.horsepower = horsepower;
    }
    start() { }
    stop() { }
}

class GPS {
    constructor() {
        this.location = { lat: 0, lng: 0 };
    }
    navigate(destination) { }
}

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.engine = new Engine("V6", 300);
        this.gps = new GPS();
    }
}
```

Create a complete car system with:
- Engine component
- GPS component
- Sound system component
- Methods that use all components

---

## Bonus Challenges (30 points)

### Exercise 13: Design Patterns (10 points)
Implement the Singleton pattern:

```javascript
class Database {
    static #instance;
    
    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        Database.#instance = this;
        this.connection = "Connected";
    }
    
    query(sql) {
        return `Executing: ${sql}`;
    }
}

// Test that only one instance is created
```

### Exercise 14: Method Chaining (10 points)
Create a `QueryBuilder` class that supports method chaining:

```javascript
class QueryBuilder {
    select(fields) {
        // Store fields
        return this; // Return this for chaining
    }
    
    from(table) {
        return this;
    }
    
    where(condition) {
        return this;
    }
    
    orderBy(field) {
        return this;
    }
    
    build() {
        // Return SQL string
    }
}

// Usage:
let query = new QueryBuilder()
    .select(['name', 'age'])
    .from('users')
    .where('age > 18')
    .orderBy('name')
    .build();
```

### Exercise 15: Factory Pattern (10 points)
Create a shape factory:

```javascript
class ShapeFactory {
    static createShape(type, ...args) {
        switch(type) {
            case 'circle':
                return new Circle(...args);
            case 'rectangle':
                return new Rectangle(...args);
            case 'triangle':
                return new Triangle(...args);
        }
    }
}

// Each shape class implements:
// - getArea()
// - getPerimeter()
// - draw()
```

---

## Final Project (50 points extra)

### Exercise 16: Library Management System
Create a complete OOP system:

**Classes Required:**

1. **Book Class:**
   - Properties: isbn, title, author, category, available
   - Methods: checkout, return, getInfo

2. **Member Class:**
   - Properties: memberId, name, email, borrowedBooks
   - Methods: borrowBook, returnBook, getBorrowedBooks

3. **Library Class:**
   - Properties: name, books, members
   - Methods:
     - addBook(book)
     - removeBook(isbn)
     - registerMember(member)
     - removeMember(memberId)
     - searchBooks(query)
     - checkoutBook(memberId, isbn)
     - returnBook(memberId, isbn)
     - getAvailableBooks()
     - getMemberHistory(memberId)
     - generateReport()

4. **Transaction Class:**
   - Properties: memberId, isbn, type (checkout/return), date
   - Methods: getDetails()

**Features:**
- Full encapsulation using private fields
- Input validation
- Error handling
- Transaction history
- Member borrowing limits (max 3 books)
- Book due dates (14 days)
- Late fee calculation
- Statistics and reports

---

## Submission Guidelines

1. Create file `assignment06_yourname.js`
2. Organize code with clear class sections
3. Include comprehensive tests
4. Document using JSDoc
5. Demonstrate all OOP principles

**JSDoc for Classes:**
```javascript
/**
 * Represents a book in the library
 * @class
 */
class Book {
    /**
     * Create a book
     * @param {string} title - The book title
     * @param {string} author - The book author
     */
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
```

## Grading Rubric

- **OOP Principles (30%)**: Proper use of classes, inheritance
- **Encapsulation (25%)**: Private fields, getters/setters
- **Code Quality (20%)**: Clean, organized, documented
- **Functionality (15%)**: All features work correctly
- **Testing (10%)**: Comprehensive test cases

## Common Mistakes to Avoid

❌ Exposing private data directly
❌ Not using `super()` in child constructors
❌ Forgetting `this` keyword
❌ Not validating inputs
❌ Creating God classes (too much responsibility)
❌ Tight coupling between classes

## Tips for Success

✅ Use private fields (#) for sensitive data
✅ Implement getters/setters for controlled access
✅ Keep classes focused (Single Responsibility)
✅ Use inheritance when appropriate
✅ Consider composition over inheritance
✅ Validate all inputs
✅ Test edge cases
✅ Document public interfaces

---

## OOP Principles Checklist

- [ ] **Encapsulation**: Private data, controlled access
- [ ] **Abstraction**: Hide complexity, expose only necessary
- [ ] **Inheritance**: Reuse code through parent classes
- [ ] **Polymorphism**: Override methods in child classes

---

**Total Points: 100 + 80 Bonus**

Master OOP and build scalable applications! 🏗️
