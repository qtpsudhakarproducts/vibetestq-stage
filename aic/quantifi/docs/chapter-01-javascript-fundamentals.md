# Chapter 1 — JavaScript Fundamentals

---

## What You Will Learn

- How to set up a Node.js project from scratch
- How to declare variables using `var`, `let`, and `const`
- The different data types in JavaScript
- How to use operators (arithmetic, comparison, logical)
- How to control program flow with `if-else` and `switch`
- How to repeat actions with `for`, `while`, and `for...of` loops
- How to build strings dynamically using template literals

---

## 1.1 Setting Up a Node.js Project

Every JavaScript project starts with a `package.json` file. This file records the project name, version, and dependencies.

```bash
mkdir day01-fundamentals
cd day01-fundamentals
npm init -y
```

The `-y` flag accepts all default values. This creates `package.json` in your folder.

To run a JavaScript file with Node.js:

```bash
node filename.js
```

You do not need a browser. Node.js runs JavaScript directly on your machine.

---

## 1.2 Variables and Data Types

JavaScript has three ways to declare variables.

```javascript
var city = "Chennai";     // function-scoped, avoid in modern code
let age = 25;             // block-scoped, value can change
const PI = 3.14159;       // block-scoped, value cannot change
```

**Rule of thumb:** Use `const` by default. Switch to `let` only when you need to reassign the variable. Never use `var`.

### Primitive Data Types

| Type | Example | Notes |
|------|---------|-------|
| `string` | `"Hello"` | Text, single or double quotes |
| `number` | `42`, `3.14` | All numbers, integers and decimals |
| `boolean` | `true`, `false` | Only two values |
| `null` | `null` | Intentional absence of a value |
| `undefined` | `undefined` | Variable declared but not assigned |

### Checking Types

```javascript
const name = "Priya";
const score = 95;
const passed = true;

console.log(typeof name);    // string
console.log(typeof score);   // number
console.log(typeof passed);  // boolean
```

---

## 1.3 Operators

### Arithmetic Operators

```javascript
const price = 500;
const discount = 50;

console.log(price + discount);   // 550
console.log(price - discount);   // 450
console.log(price * 2);          // 1000
console.log(price / 4);          // 125
console.log(price % 3);          // 2  (remainder)
console.log(price ** 2);         // 250000 (exponent)
```

### Comparison Operators

```javascript
console.log(5 == "5");   // true  — loose equality (converts type)
console.log(5 === "5");  // false — strict equality (checks type too)
console.log(5 !== 6);    // true
console.log(10 > 8);     // true
console.log(10 <= 10);   // true
```

**Always use `===` and `!==`** in your code. Loose equality (`==`) causes bugs because it converts types before comparing.

### Logical Operators

```javascript
const isLoggedIn = true;
const hasPermission = false;

console.log(isLoggedIn && hasPermission);  // false — both must be true
console.log(isLoggedIn || hasPermission);  // true  — at least one true
console.log(!isLoggedIn);                  // false — inverts the value
```

---

## 1.4 Conditional Statements

### if-else

```javascript
const temperature = 38;

if (temperature > 40) {
    console.log("Very hot");
} else if (temperature > 35) {
    console.log("Hot day");
} else if (temperature > 25) {
    console.log("Warm");
} else {
    console.log("Cool");
}
// Output: Hot day
```

### switch

Use `switch` when you are comparing a variable against many fixed values.

```javascript
const day = "Monday";

switch (day) {
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("End of work week");
        break;
    default:
        console.log("Midweek");
}
// Output: Start of work week
```

The `break` statement is required after each case. Without it, JavaScript falls through to the next case.

### Ternary Operator

A shorthand for simple `if-else` with one outcome each side.

```javascript
const marks = 72;
const result = marks >= 50 ? "Pass" : "Fail";
console.log(result);  // Pass
```

---

## 1.5 Loops

### for Loop

Best when you know exactly how many times to repeat.

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(`Count: ${i}`);
}
```

### while Loop

Best when you repeat until a condition becomes false.

```javascript
let balance = 1000;

while (balance > 0) {
    balance -= 250;
    console.log(`Balance: ${balance}`);
}
// 750, 500, 250, 0
```

### for...of Loop

Best for iterating over arrays without needing an index.

```javascript
const fruits = ["mango", "banana", "apple"];

for (const fruit of fruits) {
    console.log(fruit);
}
```

### Nested Loops

A loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop.

```javascript
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}
```

---

## 1.6 Template Literals

Template literals use backticks (`` ` ``) instead of quotes. They allow embedded expressions and multi-line strings.

```javascript
const productName = "Laptop";
const price = 45000;
const discount = 5000;

const receipt = `
Product : ${productName}
Price   : ₹${price}
Discount: ₹${discount}
Total   : ₹${price - discount}
`;

console.log(receipt);
```

Any valid JavaScript expression can go inside `${}`:

```javascript
const a = 10;
const b = 20;
console.log(`Sum of ${a} and ${b} is ${a + b}`);
```

---

## Review Questions

**Q1. What is the difference between `let`, `const`, and `var`?**

`var` is function-scoped and can be re-declared, which causes bugs. `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned after declaration. Modern JavaScript code should only use `let` and `const`.

**Q2. What is the difference between `==` and `===`?**

`==` is loose equality — it converts both values to the same type before comparing. `===` is strict equality — it checks both the value and the type without any conversion. For example, `5 == "5"` is `true` but `5 === "5"` is `false`.

**Q3. What are the primitive data types in JavaScript?**

`string`, `number`, `boolean`, `null`, `undefined`, `bigint`, and `symbol`. The most commonly used are string, number, and boolean.

**Q4. When would you use a `while` loop instead of a `for` loop?**

Use `while` when you do not know in advance how many times the loop will run — for example, waiting for a condition to become true. Use `for` when you know the exact number of iterations.

**Q5. What is a template literal and why is it better than string concatenation?**

A template literal is a string wrapped in backticks that allows embedded JavaScript expressions using `${}`. It is more readable and avoids mistakes from forgetting `+` signs or spaces. It also supports multi-line strings without `\n`.

**Q6. What does `typeof` return for `null`?**

`typeof null` returns `"object"`. This is a known bug in JavaScript that was never fixed to preserve backward compatibility. To check for `null`, use `value === null`.

**Q7. Explain what happens in this code: `let x; console.log(x);`**

`x` is declared but never assigned a value, so it holds `undefined`. Printing `undefined` is not an error — it is JavaScript's way of saying "this variable exists but has no value yet."

**Q8. What is the output of `console.log(10 % 3)`?**

`1`. The `%` operator returns the remainder after division. `10 / 3 = 3` remainder `1`.

**Q9. Can you reassign a `const` that holds an object?**

You cannot reassign the variable itself (e.g., `const obj = {}; obj = {}` throws an error). But you can modify properties of the object (`obj.name = "Alice"` works). `const` prevents reassignment of the binding, not mutation of the value.

**Q10. What is the difference between `for...of` and `for...in`?**

`for...of` iterates over the values of an iterable (array, string). `for...in` iterates over the enumerable property keys of an object. Use `for...of` for arrays and `for...in` for objects.
