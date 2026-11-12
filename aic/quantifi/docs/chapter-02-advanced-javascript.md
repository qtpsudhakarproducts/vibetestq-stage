# Chapter 2 — Advanced JavaScript

---

## What You Will Learn

- How to manipulate arrays with higher-order methods (`filter`, `map`, `reduce`, `find`)
- How to create and work with objects
- How to use destructuring to extract values cleanly
- How to use the spread (`...`) and rest (`...`) operators
- How to write Promises and use `async/await`
- How to handle errors with `try/catch`

---

## 2.1 Arrays

An array is an ordered list of values. Arrays in JavaScript are zero-indexed  — the first item is at index `0`.

```javascript
const prices = [120, 450, 89, 300, 670, 150, 89, 420, 55, 300];

console.log(prices[0]);         // 120
console.log(prices.length);     // 10
console.log(prices[prices.length - 1]);  // 300 (last item)
```

### Higher-Order Array Methods

These methods take a **function as an argument** and apply it to each element.

#### `filter` — keep elements that match a condition

```javascript
const expensive = prices.filter(p => p > 200);
console.log(expensive);  // [450, 300, 670, 420, 300]
```

#### `map` — transform every element into something new

```javascript
const discounted = prices.map(p => p * 0.9);  // 10% off
console.log(discounted);  // [108, 405, 80.1, ...]
```

#### `reduce` — combine all elements into a single value

```javascript
const total = prices.reduce((sum, p) => sum + p, 0);
console.log(total);  // 2643
```

The second argument to `reduce` (`0`) is the initial value for `sum`.

#### `find` — return the first element that matches

```javascript
const firstCheap = prices.find(p => p < 100);
console.log(firstCheap);  // 89
```

#### `some` and `every`

```javascript
console.log(prices.some(p => p > 600));    // true  — at least one
console.log(prices.every(p => p > 50));    // true  — all match
```

### Sorting Arrays

```javascript
const sorted = [...prices].sort((a, b) => a - b);  // ascending
console.log(sorted);  // [55, 89, 89, 120, 150, 300, 300, 420, 450, 670]
```

Always use a comparator function `(a, b) => a - b` for number sorting. Without it, `.sort()` converts numbers to strings and sorts alphabetically.

---

## 2.2 Objects

An object is a collection of **key-value pairs**. Keys are strings (called properties). Values can be any data type.

```javascript
const student = {
    id: 1,
    firstName: "Arjun",
    lastName: "Sharma",
    course: "Playwright Automation",
    grade: "A",
    email: "arjun@example.com"
};

console.log(student.firstName);       // Arjun
console.log(student["course"]);       // Playwright Automation
```

### Adding and Modifying Properties

```javascript
student.phone = "9876543210";      // add new property
student.grade = "A+";              // modify existing property
```

### Object Methods

An object property whose value is a function is called a **method**.

```javascript
const product = {
    name: "Keyboard",
    price: 1500,
    getLabel() {
        return `${this.name} — ₹${this.price}`;
    }
};

console.log(product.getLabel());  // Keyboard — ₹1500
```

`this` refers to the object the method belongs to.

---

## 2.3 Destructuring

Destructuring extracts values from arrays or properties from objects into individual variables.

### Array Destructuring

```javascript
const scores = [92, 85, 78, 90];
const [first, second, , fourth] = scores;

console.log(first);   // 92
console.log(fourth);  // 90
```

Skipping elements: leave an empty slot with a comma.

### Object Destructuring

```javascript
const student = {
    id: 1,
    firstName: "Priya",
    course: "Automation"
};

const { firstName, course } = student;
console.log(firstName);  // Priya
console.log(course);     // Automation
```

### Renaming During Destructuring

```javascript
const { firstName: name, course: subject } = student;
console.log(name);     // Priya
console.log(subject);  // Automation
```

### Default Values

```javascript
const { firstName, grade = "B" } = student;
console.log(grade);  // B — because student has no grade property
```

---

## 2.4 Spread and Rest Operators

Both use the `...` syntax, but in opposite contexts.

### Spread — expand an array or object

```javascript
const cart1 = ["pen", "notebook"];
const cart2 = ["ruler", "eraser"];

const combined = [...cart1, ...cart2];
console.log(combined);  // ["pen", "notebook", "ruler", "eraser"]
```

Copying an array (avoids mutating the original):

```javascript
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);

console.log(original);  // [1, 2, 3] — unchanged
console.log(copy);      // [1, 2, 3, 4]
```

Merging objects:

```javascript
const defaults = { theme: "dark", language: "en" };
const userPrefs = { language: "hi", fontSize: 16 };

const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", language: "hi", fontSize: 16 }
```

User preferences overwrite defaults because `userPrefs` comes second.

### Rest — collect remaining arguments into an array

```javascript
function sum(first, ...others) {
    return others.reduce((total, n) => total + n, first);
}

console.log(sum(1, 2, 3, 4, 5));  // 15
```

The rest parameter `...others` collects all extra arguments after `first` into an array.

---

## 2.5 Promises and Async/Await

Many operations — reading files, calling APIs, querying databases — take time. JavaScript handles these using **asynchronous** programming.

### Callback (old way)

```javascript
function fetchUser(id, callback) {
    setTimeout(() => {
        callback({ id, name: "Ravi" });
    }, 500);
}

fetchUser(1, (user) => {
    console.log(user.name);  // Ravi
});
```

The problem with callbacks is nesting — "callback hell."

### Promise

A Promise represents a value that will be available in the future. It has three states: **pending**, **fulfilled**, and **rejected**.

```javascript
function getProductDetails(productId) {
    return new Promise((resolve, reject) => {
        if (productId > 0) {
            resolve({ id: productId, name: "Laptop", price: 45000 });
        } else {
            reject(new Error("Invalid product ID"));
        }
    });
}

getProductDetails(1)
    .then(product => console.log(product.name))  // Laptop
    .catch(err => console.error(err.message));
```

### async/await

`async/await` is syntactic sugar over Promises. It makes asynchronous code look synchronous and is easier to read.

```javascript
async function getStudentById(id) {
    // simulating an API call
    return await Promise.resolve({ id, name: "Meena", grade: "A" });
}

async function main() {
    const student = await getStudentById(5);
    console.log(student.name);  // Meena
}

main();
```

Rules:
- A function must have `async` keyword to use `await` inside it
- `await` can only be used inside an `async` function
- `await` pauses execution until the Promise resolves

---

## 2.6 Error Handling

Use `try/catch` to handle errors gracefully instead of letting the program crash.

```javascript
function divideAmount(total, count) {
    if (count === 0) {
        throw new Error("Cannot divide by zero");
    }
    return total / count;
}

try {
    console.log(divideAmount(100, 4));   // 25
    console.log(divideAmount(100, 0));   // throws error
} catch (error) {
    console.error("Error:", error.message);  // Error: Cannot divide by zero
} finally {
    console.log("Division attempted");  // always runs
}
```

`finally` always runs, whether an error occurred or not. Use it for cleanup.

### Error Handling with async/await

```javascript
async function fetchProduct(id) {
    try {
        const product = await getProductDetails(id);
        return product;
    } catch (error) {
        console.error("Failed to fetch product:", error.message);
        return null;
    }
}
```

---

## Review Questions

**Q1. What is the difference between `map` and `filter`?**

`map` transforms every element and returns a new array of the same length. `filter` returns a new array containing only the elements that pass a condition — the length can be shorter than the original. Neither method modifies the original array.

**Q2. What does `reduce` do and what is the initial value?**

`reduce` processes each element in an array and accumulates them into a single value (total, string, object). The second argument to `reduce` is the initial value — the starting value for the accumulator. Without an initial value, `reduce` uses the first element as the starting value and begins from the second.

**Q3. What is the difference between spread `...` and rest `...`?**

They use the same syntax but in different contexts. Spread is used in a call or literal to expand an array or object into individual elements. Rest is used in a function parameter or destructuring to collect multiple values into an array. Spread expands; rest collects.

**Q4. What is a Promise?**

A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It has three states: pending (waiting), fulfilled (succeeded), and rejected (failed). You handle the result with `.then()` and errors with `.catch()`.

**Q5. What does `async/await` do?**

`async` marks a function as asynchronous, meaning it returns a Promise. `await` pauses the execution inside that function until the awaited Promise settles, making the code look synchronous. It is cleaner than chaining `.then()` calls.

**Q6. What is destructuring in JavaScript?**

Destructuring is a syntax that extracts values from arrays or properties from objects into individual variables in a single statement. `const { name, age } = person` extracts `name` and `age` from the `person` object.

**Q7. What is the difference between `find` and `filter`?**

`filter` returns all elements that match the condition as an array. `find` returns only the first matching element (not an array). If no element is found, `find` returns `undefined` while `filter` returns an empty array.

**Q8. Why does `[...original]` create a shallow copy?**

The spread operator copies the top-level references. For primitive values (numbers, strings), the values are fully copied. For nested objects or arrays, only the reference is copied — so modifying a nested object in the copy also affects the original.

**Q9. What happens if you `await` something that is not a Promise?**

It simply returns the value as-is. `await 42` returns `42`. `await` wraps non-Promise values in `Promise.resolve()` automatically.

**Q10. What is the purpose of `finally` in try/catch?**

`finally` runs its block of code regardless of whether an error was thrown or not. It is useful for cleanup operations like closing database connections, releasing resources, or logging that an operation was attempted.
