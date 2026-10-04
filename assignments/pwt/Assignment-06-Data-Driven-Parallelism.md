# Assignment 06: Data-Driven Testing & Parallelism

**Topics Covered:** Parameterization, JSON Data, CSV Data, Environment Variables, Parallel Workers, Sharding
**Difficulty:** Intermediate  
**Estimated Time:** 2 hours  

---

## Instructions

- Use external data files to drive your tests
- Configure parallel execution in `playwright.config.js`
- Use `.env` files for sensitive data

---

## Part A: Parameterization (40 points)

### Exercise 1: Looping Through Data (20 points)
Create a JSON file `users.json` with an array of user objects (name, email, role). Write a test that loops through this array and performs a registration or login for each user.
*Hint: Use `for (const user of users) { test(...) }`*

### Exercise 2: `test.describe` Parameterization (20 points)
Show how to use `test.describe` or `test.step` to clearly separate the data-driven iterations in your test report.

---

## Part B: Environment Configuration (30 points)

### Exercise 3: Using `.env` Files (15 points)
1. Install `dotenv` if needed (or use Playwright's built-in support).
2. Create a `.env` file with `BASE_URL` and `ADMIN_PASSWORD`.
3. Update your test to use `process.env.BASE_URL`. Explain why we never commit `.env` files to Git.

### Exercise 4: Dynamic Base URLs (15 points)
Configure your `playwright.config.js` to switch the `baseURL` based on an environment variable (e.g., `STAGING` vs `PRODUCTION`).

---

## Part C: Parallelism and Scaling (30 points)

### Exercise 5: Worker Configuration (15 points)
1. By default, how many workers does Playwright use?
2. Configure your project to use exactly **4 workers** for local runs.
3. What is "Test Isolation"? Why does Playwright run each test in its own worker process?

### Exercise 6: Fully Parallel vs. Serial (15 points)
Explain when you should use `test.describe.configure({ mode: 'parallel' })` and when you should use `mode: 'serial'`. Give a specific example of an "interdependent" test suite that requires serial mode.

---

## Bonus Challenge (10 points)

### Exercise 7: Sharding
Simulate a CI environment locally by running only the first half of your tests using the `--shard=1/2` command. How does sharding differ from regular parallelism?

---

## Submission Guidelines

1. Submit your `users.json` and `.env.example`
2. Submit a test file demonstrating data-driven loops
3. Submit your updated `playwright.config.js` showing worker settings

## Grading Rubric

- **Data Integration (40%)**: Correct reading and looping of external data
- **Security (20%)**: Proper use of environment variables
- **Scaling Knowledge (30%)**: Correct configuration of workers and parallel modes
- **Reporting Clarity (10%)**: Using test steps to make results readable

---

**Total Points: 100 + 10 Bonus**
