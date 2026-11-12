# Assignment 01: JavaScript Fundamentals

---

## Learning Objectives

- Set up Node.js and run JavaScript files
- Declare variables using `let` and `const`
- Work with different data types and operators
- Write control flow statements and loops
- Create and call functions

---

## Instructions

- Use VS Code to write all code
- Create a folder named `day01-js-fundamentals`
- Each exercise goes in its own `.js` file
- Run files using `node filename.js`
- Use `console.log()` to print results with clear labels

---

## Part A: Setup & Variables

### Exercise 1: Node.js Setup

Run the following commands and note down the output:
- `node -v`
- `npm -v`

Create a file `hello.js` that prints: `Hello, Quantifi! JavaScript is running.`  
Run it with `node hello.js`.

---

### Exercise 2: Variables and Data Types

Create a file `variables.js`.

1. Declare variables for a product in an online store:
   - `productName` — a string: name of any product
   - `price` — a number: price of the product
   - `inStock` — a boolean: whether it is available
   - `categories` — an array: three category names it belongs to
   - `productInfo` — an object with `id`, `brand`, and `rating`

2. Print each variable using `console.log()` with a label.

3. Print the **type** of each variable using `typeof`.

---

### Exercise 3: Operators

Create a file `operators.js`.

1. A product costs `850`. It has a `15%` discount. Calculate and print:
   - Discount amount
   - Final price after discount
   - Whether the final price is under `750` (true/false)

2. Use string concatenation to print:  
   `"Product: Laptop | Brand: Dell | Price: $722.50"`

3. Use a ternary operator to print `"Affordable"` if final price < 750, otherwise `"Expensive"`.

---

## Part B: Control Flow

### Exercise 4: if-else Conditions

Create a file `conditions.js`.

1. Create a variable `age` with value `17`.
   - If age >= 18: print `"Eligible to vote"`
   - If age is between 13 and 17: print `"Minor — not eligible"`
   - If age < 13: print `"Child"`

2. Create a variable `dayNumber` with value `3`.
   - Use `if/else if/else` to print the day name (1 = Monday ... 7 = Sunday).
   - Print `"Invalid day"` for anything outside 1–7.

3. Create a variable `score` set to `75`.
   - Use a `switch` statement to print the grade:
     - 90–100: `"A"`
     - 80–89: `"B"`
     - 70–79: `"C"`
     - 60–69: `"D"`
     - Below 60: `"F"`

---

### Exercise 5: Loops

Create a file `loops.js`.

1. Use a `for` loop to print the multiplication table of 7 (7×1 to 7×10).

2. Create an array of 5 city names.  
   Use a `for...of` loop to print each city with its position number.  
   Example: `"1. Mumbai"`

3. You have a bank balance of `1000`. Each day you spend `150`.  
   Use a `while` loop to print the balance each day until it drops below `200`.

4. Use a `for` loop to print numbers 1 to 20, but:
   - Skip even numbers using `continue`
   - Stop when you reach 15 using `break`

---

### Exercise 6: Nested Conditions

Create a file `nested.js`.

A cinema ticket pricing system:
- Variables: `isMember` (boolean) and `age` (number)

Write nested `if` statements to print the ticket price:
- Member AND age < 18: `"Ticket price: $5"`
- Member AND age >= 18: `"Ticket price: $8"`
- Not a member AND age < 18: `"Ticket price: $7"`
- Not a member AND age >= 18: `"Ticket price: $12"`

Test all four combinations.

---

## Part C: Functions

### Exercise 7: Basic Functions

Create a file `functions.js`.

1. Write a function `greet(name, city)` that returns:  
   `"Hello, [name]! Welcome from [city]."`  
   Call it with two different names and print the result.

2. Write a function `calculateArea(length, width)` that returns the area of a rectangle.  
   Call it with `(5, 8)` and `(12, 3)` and print both results.

3. Write a function `getGrade(score)` that returns:
   - `"A"` if score >= 90
   - `"B"` if score >= 80
   - `"C"` if score >= 70
   - `"F"` if below 70  
   Call it with scores `95`, `82`, `71`, `55` and print each grade.

---

### Exercise 8: Arrow Functions and Scope

Create a file `arrow-functions.js`.

1. Rewrite `calculateArea` from Exercise 7 as an arrow function.

2. Create an arrow function `isEven(number)` that returns `true` if the number is even, `false` if odd.  
   Test it with `4`, `7`, `12`, and `19`.

3. Create an arrow function `celsiusToFahrenheit(c)` that converts temperature.  
   Formula: `(c × 9/5) + 32`. Test with `0`, `100`, and `37`.

4. Create a variable `storeName` outside all functions.  
   Write a function `printReceipt(itemName, price)` that uses `storeName` inside it and prints:  
   `"[storeName] — [itemName]: $[price]"`  
   Demonstrate that the function can read `storeName` from the outer scope.
