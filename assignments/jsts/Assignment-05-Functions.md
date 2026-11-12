# Assignment: Functions and Functional Programming

**Topics Covered:** Functions, Arrow Functions, Callbacks, Higher-Order Functions  
**Difficulty:** Intermediate to Advanced  
**Estimated Time:** 3-4 hours  
**Reference:** Files 07, 12 from documentation

---

## Instructions

- Write reusable, modular functions
- Use appropriate function types
- Implement error handling
- Follow functional programming principles

---

## Part A: Function Basics (20 points)

### Exercise 1: Function Declaration (5 points)
Create the following functions using function declaration:

1. `greetUser(name)` - Returns greeting message
2. `addNumbers(a, b)` - Returns sum of two numbers
3. `isEven(number)` - Returns true if even, false if odd
4. `getFullName(firstName, lastName)` - Returns full name
5. `calculateArea(length, width)` - Returns area of rectangle

Test each function with appropriate inputs.

### Exercise 2: Function Expression (5 points)
Rewrite Exercise 1 functions using function expressions.

Compare and document the differences between:
- Function declaration
- Function expression
- When to use each

### Exercise 3: Arrow Functions (5 points)
Convert the following to arrow functions with shortest syntax:

```javascript
function square(x) {
    return x * x;
}

function isPositive(num) {
    return num > 0;
}

function getLength(str) {
    return str.length;
}
```

Create arrow functions for:
- Double a number
- Check if string is empty
- Get first character of string

### Exercise 4: Default Parameters (5 points)
Create functions with default parameters:

1. `createUser(name, role = "user", status = "active")`
2. `calculatePrice(price, tax = 0.08, discount = 0)`
3. `greet(name, greeting = "Hello", punctuation = "!")`

Test with various combinations of arguments.

---

## Part B: Advanced Parameters (20 points)

### Exercise 5: Rest Parameters (10 points)
Create the following functions using rest parameters:

1. `sum(...numbers)` - Sum all numbers
2. `multiply(...numbers)` - Multiply all numbers
3. `findMax(...numbers)` - Find maximum number
4. `concatenate(...strings)` - Join all strings with space
5. `average(...scores)` - Calculate average

**Example:**
```javascript
sum(1, 2, 3, 4, 5); // 15
multiply(2, 3, 4); // 24
findMax(10, 5, 20, 15); // 20
```

### Exercise 6: Spread Operator (10 points)
Given arrays:
```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let numbers = [10, 20, 30, 40, 50];
```

Use spread operator to:
- Combine arr1 and arr2
- Find max value in numbers using Math.max()
- Copy an array
- Add elements at specific positions
- Merge multiple arrays

---

## Part C: Callback Functions (20 points)

### Exercise 7: Basic Callbacks (10 points)
Create a `calculator` function that accepts two numbers and a callback:

```javascript
function calculator(a, b, operation) {
    return operation(a, b);
}
```

Create callback functions for:
- Addition
- Subtraction
- Multiplication
- Division
- Power (a^b)

Test the calculator with all operations.

### Exercise 8: Array Processing with Callbacks (10 points)
Create a function `processArray(array, callback)` that:
- Takes an array and a callback function
- Applies callback to each element
- Returns a new array with results

Test with callbacks that:
- Double each number
- Square each number
- Convert to strings
- Add 10 to each number

**Example:**
```javascript
processArray([1, 2, 3, 4], x => x * 2); // [2, 4, 6, 8]
```

---

## Part D: Higher-Order Functions (25 points)

### Exercise 9: Function Factories (10 points)
Create the following function factories:

1. **createMultiplier(factor)** - Returns a function that multiplies by factor
```javascript
let double = createMultiplier(2);
let triple = createMultiplier(3);
double(5); // 10
triple(5); // 15
```

2. **createGreeting(greeting)** - Returns a function that greets with prefix
```javascript
let sayHello = createGreeting("Hello");
let sayHi = createGreeting("Hi");
sayHello("John"); // "Hello, John!"
```

3. **createCounter(start)** - Returns a counter function
```javascript
let counter = createCounter(0);
counter(); // 1
counter(); // 2
counter(); // 3
```

### Exercise 10: Custom Array Methods (15 points)
Implement your own versions of array methods:

1. `myMap(array, callback)` - Like Array.map()
2. `myFilter(array, callback)` - Like Array.filter()
3. `myReduce(array, callback, initial)` - Like Array.reduce()

Test with the same inputs as the built-in methods to verify correctness.

**Example:**
```javascript
myMap([1, 2, 3], x => x * 2); // [2, 4, 6]
myFilter([1, 2, 3, 4], x => x % 2 === 0); // [2, 4]
myReduce([1, 2, 3, 4], (acc, x) => acc + x, 0); // 10
```

---

## Part E: Practical Applications (15 points)

### Exercise 11: Data Transformation (8 points)
Given student data:
```javascript
let students = [
    { name: "Alice", score: 85 },
    { name: "Bob", score: 92 },
    { name: "Charlie", score: 78 }
];
```

Create functions to:
- Get all student names
- Get all scores
- Find students above 80
- Add 5 bonus points to all scores
- Calculate average score

Use arrow functions and array methods.

### Exercise 12: Validation Functions (7 points)
Create validation functions:

1. `isValidEmail(email)` - Check email format
2. `isValidPassword(password)` - Check: length >= 8, has uppercase, has number
3. `isValidPhone(phone)` - Check 10 digits
4. `isValidAge(age)` - Check age between 0-120
5. `isValidUsername(username)` - Check 3-20 chars, alphanumeric

Test each with valid and invalid inputs.

---

## Bonus Challenges (30 points)

### Exercise 13: Function Composition (10 points)
Create a `compose` function that combines multiple functions:

```javascript
function compose(...functions) {
    // Your implementation
}

const add10 = x => x + 10;
const multiply2 = x => x * 2;
const subtract5 = x => x - 5;

const combined = compose(subtract5, multiply2, add10);
combined(5); // (5 + 10) * 2 - 5 = 25
```

Test with at least 3 different function combinations.

### Exercise 14: Memoization (10 points)
Create a `memoize` function that caches function results:

```javascript
function memoize(fn) {
    // Your implementation
}

function expensiveOperation(n) {
    console.log(`Computing for ${n}...`);
    return n * n;
}

const memoized = memoize(expensiveOperation);
memoized(5); // Computes: "Computing for 5..." returns 25
memoized(5); // From cache: returns 25 (no console log)
```

### Exercise 15: Currying (10 points)
Create curried versions of functions:

```javascript
// Regular function
function add(a, b, c) {
    return a + b + c;
}

// Curried version
const curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6
curriedAdd(1)(2, 3); // 6
```

Implement the `curry` function and test with various scenarios.

---

## Programming Project (50 points extra)

### Exercise 16: Task Management System
Create a complete task management system using functions:

**Required Functions:**

1. **Task Operations:**
   - `createTask(title, priority)` - Create task object
   - `addTask(tasks, task)` - Add task to list
   - `removeTask(tasks, id)` - Remove task by ID
   - `updateTask(tasks, id, updates)` - Update task
   - `completeTask(tasks, id)` - Mark as complete

2. **Query Functions:**
   - `getAllTasks(tasks)` - Get all tasks
   - `getTasksByPriority(tasks, priority)` - Filter by priority
   - `getCompletedTasks(tasks)` - Get completed tasks
   - `getPendingTasks(tasks)` - Get pending tasks
   - `searchTasks(tasks, keyword)` - Search in titles

3. **Statistics Functions:**
   - `countTasks(tasks)` - Total tasks
   - `countCompleted(tasks)` - Completed tasks
   - `countByPriority(tasks, priority)` - Tasks by priority
   - `getCompletionRate(tasks)` - % completion

4. **Utility Functions:**
   - `sortTasksByPriority(tasks)` - Sort by priority
   - `sortTasksByDate(tasks)` - Sort by creation date
   - `exportTasks(tasks)` - Export as JSON string
   - `importTasks(jsonString)` - Import from JSON

**Task Object Structure:**
```javascript
{
    id: 1,
    title: "Complete assignment",
    priority: "high", // high, medium, low
    completed: false,
    createdAt: Date
}
```

**Features:**
- Use higher-order functions
- Implement pure functions (no side effects)
- Use arrow functions where appropriate
- Include error handling
- Provide comprehensive tests

---

## Submission Guidelines

1. Create file `assignment05_yourname.js`
2. Organize functions logically with comments
3. Include test cases for each function
4. Document function parameters and returns
5. Use JSDoc style comments

**JSDoc Example:**
```javascript
/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
    return a + b;
}
```

## Grading Rubric

- **Function Implementation (35%)**: Correct logic
- **Code Quality (25%)**: Clean, modular code
- **Functional Programming (20%)**: Proper use of FP concepts
- **Documentation (10%)**: Clear comments and JSDoc
- **Testing (10%)**: Comprehensive test cases

## Common Mistakes to Avoid

❌ Not using arrow functions when appropriate
❌ Mutating parameters inside functions
❌ Not handling edge cases
❌ Creating functions that do too many things
❌ Not testing functions thoroughly

## Tips for Success

✅ Keep functions small and focused
✅ Use descriptive function names
✅ Avoid side effects (pure functions)
✅ Use arrow functions for callbacks
✅ Test edge cases (null, undefined, empty)
✅ Document complex functions
✅ Return early for invalid inputs

---

## Function Types Quick Reference

| Type | Syntax | Use Case |
|------|--------|----------|
| Declaration | `function name() {}` | Hoisted, named |
| Expression | `let fn = function() {}` | Not hoisted |
| Arrow | `let fn = () => {}` | Concise, no this binding |
| IIFE | `(() => {})()` | Execute immediately |
| Generator | `function* name() {}` | Advanced iteration |

---

**Total Points: 100 + 80 Bonus**

Build modular, reusable code! 🚀
