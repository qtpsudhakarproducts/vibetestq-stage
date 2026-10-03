# Assignment 02: Advanced JavaScript

---

## Learning Objectives

- Work with arrays and objects effectively
- Use ES6+ features: destructuring, spread, template literals
- Write asynchronous code using Promises and async/await
- Handle errors with try/catch

---

## Instructions

- Create a folder `day02-advanced-js`
- Each exercise in its own `.js` file
- Run with `node filename.js`
- Do not use `var` — use `let` or `const`

---

## Part A: Arrays & Objects

### Exercise 1: Arrays

Create a file `arrays.js`.

You have a list of product prices in a store:
```javascript
const prices = [120, 450, 89, 300, 670, 150, 89, 420, 55, 300];
```

1. Use `.filter()` to get all prices above `200`. Print the result and count.
2. Use `.map()` to apply a `10%` discount to every price. Print the new prices.
3. Use `.find()` to get the first price above `400`.
4. Use `.findIndex()` to get the index of the first price equal to `89`.
5. Use `.every()` to check if all prices are above `50`.
6. Use `.some()` to check if any price is above `600`.
7. Use `.reduce()` to calculate the total cost of all items.
8. Sort the prices from lowest to highest using `.sort()` and print.

---

### Exercise 2: Objects

Create a file `objects.js`.

1. Create an object `student` with:
   - `id`, `firstName`, `lastName`, `course`, `grade`, `email`

2. Print the student's full name by combining `firstName` and `lastName`.

3. Add a new property `enrollmentYear` with value `2024`.

4. Delete the `email` property. Print the object before and after.

5. Use `Object.keys()` to print all property names.

6. Use `Object.values()` to print all values.

7. Use `Object.entries()` to print each key-value pair in the format:  
   `"course: JavaScript Advanced"`

---

## Part B: ES6+ Features

### Exercise 3: Destructuring

Create a file `destructuring.js`.

1. Destructure the `student` object from Exercise 2 to extract `firstName`, `lastName`, and `course` in one line. Print them.

2. Rename `firstName` to `first` while destructuring.

3. Create an array:  
   `['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']`  
   Destructure it to get `firstDay` and `lastDay` (skip middle items using commas). Print them.

4. Create a function `printStudent({ firstName, course, grade })` that takes a student object and prints:  
   `"[firstName] is enrolled in [course] with grade [grade]"`

---

### Exercise 4: Spread and Rest

Create a file `spread-rest.js`.

1. You have two shopping carts:
   - `cart1 = ['Apple', 'Bread', 'Milk']`
   - `cart2 = ['Eggs', 'Butter', 'Cheese']`
   
   Merge them into one `fullCart` array using the spread operator. Print it.

2. Clone the `student` object from Exercise 2 using spread. Change the `grade` in the clone to `"A+"`. Verify the original grade is unchanged.

3. Write a function `sumAll(...numbers)` that accepts any number of arguments and returns their total. Call it with `(10, 20, 30)`, then with `(5, 15, 25, 35, 45)`.

---

### Exercise 5: Template Literals and Shorthand

Create a file `es6-features.js`.

1. Use template literals to build a shopping receipt:
```
Receipt
-------
Item: Wireless Mouse
Quantity: 2
Unit Price: $25.00
Total: $50.00
Thank you for shopping!
```
All values must come from variables.

2. Create an object using shorthand property names:
   - You have variables `name`, `price`, `quantity`
   - Create an object `cartItem` without repeating the key names

3. Use optional chaining (`?.`) to safely access `student?.address?.city`. Print the result when `address` is `undefined` — it should not throw an error.

4. Use nullish coalescing (`??`) to print a default value `"Not Provided"` when a variable `phoneNumber` is `null`.

---

## Part C: Async JavaScript

### Exercise 6: Promises

Create a file `promises.js`.

1. Create a function `getProductDetails(productId)` that returns a **Promise**:
   - If `productId > 0`, resolve with a product object: `{ id: productId, name: 'Laptop', price: 999 }`
   - If `productId <= 0`, reject with `"Invalid product ID"`

2. Call the function with `productId = 5`. Handle it using `.then()` and `.catch()`. Print the product details.

3. Call the function again with `productId = -1`. Handle the rejection and print the error.

4. Chain a second `.then()` after success that calculates and prints the price with 18% tax.

---

### Exercise 7: Async/Await

Create a file `async-await.js`.

1. Rewrite `getProductDetails` from Exercise 6 using `async/await` inside a new function `fetchProduct()`. Use `try/catch` for error handling.

2. Create an `async` function `getStudentById(id)` that:
   - Simulates a delay using `new Promise(resolve => setTimeout(resolve, 1000))`
   - Returns a fake student object: `{ id, name: 'Alice', course: 'JavaScript' }`

3. Call `getStudentById(3)` and print the result. Measure the time before and after using `Date.now()`.

4. Create an `async` function `loadDashboard()` that calls `getProductDetails` and `getStudentById` **sequentially** using `await`. Print each result as it arrives.

---

## Part D: Error Handling (mandatory)

### Exercise 8: try/catch/finally

Create a file `error-handling.js`.

1. Write a function `divideAmount(total, parts)` that:
   - Throws a `new Error("Cannot divide by zero")` if `parts` is `0`
   - Otherwise returns `total / parts`

2. Call it with `(500, 0)` inside a `try/catch` block. Print the error message.

3. Add a `finally` block that always prints `"Division operation complete"`.

4. Create a function `parseUserData(jsonString)` that parses a JSON string.  
   - Call it with a broken JSON: `"{ name: Alice }"`  
   - Catch the error and print `"Data parsing failed: "` + the error message.
