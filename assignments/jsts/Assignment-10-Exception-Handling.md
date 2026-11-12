# Assignment: Exception Handling

**Topics Covered:** try/catch/finally, throw, custom errors  
**Difficulty:** Intermediate  
**Estimated Time:** 2-3 hours  
**Reference:** File 13 from documentation

---

## Instructions

- Use `try/catch` where errors can occur
- Throw meaningful error messages
- Keep error handling consistent
- Test both success and failure paths

---

## Part A: Fundamentals (25 points)

### Exercise 1: Safe Division (10 points)
Write a function `safeDivide(a, b)` that:
- Throws an error if `b` is 0
- Returns the division result otherwise

Handle errors with `try/catch` and print friendly messages.

### Exercise 2: Finally Block (15 points)
Create a function that:
- Tries to parse JSON
- Logs a message in `finally` that always runs

Test with both valid and invalid JSON strings.

---

## Part B: Custom Errors (30 points)

### Exercise 3: Validation Error (15 points)
Create a `ValidationError` class extending `Error`.
Use it in a function `validateUser(user)` that checks:
- `name` is a non-empty string
- `age` is a number >= 18

Throw `ValidationError` with a specific message for each failure.

### Exercise 4: Error Mapping (15 points)
Create a function that maps error codes to user-friendly messages:
- "E_AUTH" -> "Authentication failed"
- "E_TIMEOUT" -> "Request timed out"
- "E_NOT_FOUND" -> "Resource not found"

Throw an error for unknown codes.

---

## Part C: Async Error Handling (25 points)

### Exercise 5: Promise Rejection (10 points)
Create a function that returns a Promise and rejects if input is invalid.
Use `.catch()` to handle the error.

### Exercise 6: Async/Await Try-Catch (15 points)
Wrap an `await` call in `try/catch` and:
- Log success output
- Log error message on failure

---

## Bonus Challenge (10 points)

### Exercise 7: Safe JSON Parse
Create `safeJsonParse(str)` that:
- Returns `{ ok: true, value }` for valid JSON
- Returns `{ ok: false, error }` for invalid JSON

---

## Submission Guidelines

1. Create a file named `assignment10_yourname.js`
2. Include both passing and failing test cases
3. Print clear error messages
4. Ensure code runs without uncaught errors

## Grading Rubric

- **Correctness (40%)**: Errors handled properly
- **Clarity (30%)**: Clean messages and output
- **Code Quality (20%)**: Readable and organized
- **Completeness (10%)**: All tasks attempted

## Common Mistakes to Avoid

❌ Catching errors but not logging them  
❌ Throwing strings instead of `Error` objects  
❌ Ignoring async rejection handling  
❌ Missing tests for failure cases

## Tips for Success

✅ Use `Error` subclasses for clarity  
✅ Keep error messages short and specific  
✅ Always test both success and failure paths  
✅ Use `finally` for cleanup steps

---

**Total Points: 90 + 10 Bonus**
