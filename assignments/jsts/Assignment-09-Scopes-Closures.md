# Assignment: Scopes and Closures

**Topics Covered:** Scope, hoisting, closures, lexical environment  
**Difficulty:** Intermediate  
**Estimated Time:** 2-3 hours  
**Reference:** File 12 from documentation

---

## Instructions

- Use `let` and `const` appropriately
- Explain outputs using comments
- Avoid global variables unless required
- Test with multiple inputs

---

## Part A: Scope Types (25 points)

### Exercise 1: Global vs Local (10 points)
Create:
- One global variable
- One function with a local variable

Print both inside the function.  
Explain what happens if you try to print the local variable outside.

### Exercise 2: Block Scope (15 points)
Write a block with:
- `let` and `const` variables
- `var` variable

Print all three inside the block.  
Then try printing them outside and explain the results.

---

## Part B: Hoisting and TDZ (25 points)

### Exercise 3: Hoisting Behavior (12 points)
Predict the output, then run and verify:
```javascript
console.log(a);
var a = 5;

try {
  console.log(b);
  let b = 10;
} catch (err) {
  console.log("Error:", err.message);
}
```
Explain the result in comments.

### Exercise 4: Function Hoisting (13 points)
Create one function declaration and one function expression.
Call both before they are defined.  
Explain which one works and why.

---

## Part C: Closures (30 points)

### Exercise 5: Counter Factory (10 points)
Write a function `createCounter()` that returns an object with:
- `increment()`
- `decrement()`
- `getValue()`

The counter value must be private.

### Exercise 6: Once Function (10 points)
Write a function `once(fn)` that:
- Runs `fn` only the first time
- Returns the cached result on later calls

### Exercise 7: Closure in Loops (10 points)
Create a loop that schedules 3 `setTimeout` calls.
Ensure the output prints `1, 2, 3` with a 1-second delay each.

---

## Bonus Challenge (10 points)

### Exercise 8: Memoized Fibonacci
Create a memoized `fib(n)` using a closure.
Test with `fib(10)` and `fib(20)`.

---

## Submission Guidelines

1. Create a file named `assignment09_yourname.js`
2. Include comments explaining scope behavior
3. Demonstrate outputs with `console.log`
4. Ensure the code runs without errors

## Grading Rubric

- **Correctness (40%)**: Scope and closure logic works
- **Explanation (30%)**: Clear comments and reasoning
- **Code Quality (20%)**: Clean and readable
- **Completeness (10%)**: All tasks attempted

## Common Mistakes to Avoid

❌ Using `var` when `let` is required  
❌ Leaking variables into global scope  
❌ Misunderstanding TDZ errors  
❌ Ignoring closure behavior in loops

## Tips for Success

✅ Use strict block scoping  
✅ Test each snippet in isolation  
✅ Use IIFE or block scoping where needed  
✅ Keep state private inside closures

---

**Total Points: 90 + 10 Bonus**
