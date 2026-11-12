# Assignment: JavaScript Syntax

**Topics Covered:** Syntax, literals, statements, expressions  
**Difficulty:** Beginner  
**Estimated Time:** 1-2 hours  
**Reference:** File 01 from documentation

---

## Instructions

- Follow JavaScript syntax rules carefully
- Use consistent formatting and indentation
- Print results with clear labels
- Avoid using `var`

---

## Part A: Statements and Expressions (20 points)

### Exercise 1: Spot the Difference (10 points)
For each line, label it as a **statement** or an **expression** and explain why.
1. `let total = price * qty;`
2. `price * qty`
3. `if (qty > 0) { total = price * qty; }`
4. `qty > 0`
5. `console.log("Ready");`

Write your answers as comments.

### Exercise 2: Valid vs Invalid (10 points)
Identify which lines are invalid. Fix the invalid lines.
```javascript
let 1name = "Alex";
const total-cost = 99;
let score = 10
score += 5
if (score > 10) console.log("High");
```

---

## Part B: Literals and Templates (25 points)

### Exercise 3: Literals Practice (10 points)
Create variables using:
- String literal
- Number literal
- Boolean literal
- Array literal
- Object literal

Print each value and its type.

### Exercise 4: Template Strings (15 points)
Use template literals to generate this output:
```
User Priya has 3 tasks.
Completed: true
```
Use variables for the name, task count, and completion status.

---

## Part C: Blocks and Control Syntax (30 points)

### Exercise 5: Block Scope (10 points)
Create a `for` loop with `let i` inside a block:
- Print `i` inside the loop
- Try to print `i` outside and handle the error with `try/catch`

### Exercise 6: Switch Statement (10 points)
Create a `switch` statement for a `day` variable (1-7).
Print the weekday name and a default message for invalid input.

### Exercise 7: Nested Blocks (10 points)
Create a nested `if` block using two variables:
- `isLoggedIn`
- `isAdmin`
Print different messages for each combination.

---

## Part D: Function Syntax (15 points)

### Exercise 8: Function Forms (15 points)
Write the same function in three ways:
1. Function declaration
2. Function expression
3. Arrow function

The function should take two numbers and return the larger one.

---

## Bonus Challenge (10 points)

### Exercise 9: Syntax Cleanup
Refactor the following to improve readability and add missing semicolons:
```javascript
const users=["a","b","c"]
for(let i=0;i<users.length;i++){
console.log(users[i])
}
```

---

## Submission Guidelines

1. Create a file named `assignment01_yourname.js`
2. Include answers as comments and console output
3. Keep the code style consistent
4. Ensure the file runs without errors

## Grading Rubric

- **Correctness (40%)**: Syntax and control flow are correct
- **Clarity (30%)**: Readable output and comments
- **Code Quality (20%)**: Clean structure and consistent style
- **Completeness (10%)**: All exercises attempted

## Common Mistakes to Avoid

❌ Invalid identifiers  
❌ Missing braces or parentheses  
❌ Mixing statements and expressions incorrectly  
❌ Forgetting `break` in `switch`

## Tips for Success

✅ Format with consistent indentation  
✅ Use `const` by default  
✅ Keep functions small and focused  
✅ Test each exercise separately

---

**Total Points: 90 + 10 Bonus**
