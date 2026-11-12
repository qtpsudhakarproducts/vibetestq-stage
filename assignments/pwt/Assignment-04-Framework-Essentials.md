# Assignment 04: Framework Essentials

**Topics Covered:** Test Hooks (beforeEach, afterAll), Fixtures, Configuration, Projects, Reporters
**Difficulty:** Intermediate  
**Estimated Time:** 1.5 hours  

---

## Instructions

- Work with the `playwright.config.js` file
- Implement setup and teardown logic
- Use built-in fixtures like `page` and custom ones

---

## Part A: Test Hooks (30 points)

### Exercise 1: Setup and Teardown (15 points)
Create a test file where you use `beforeEach` to navigate to a login page before every test. Use `afterEach` to take a screenshot if a test fails.

### Exercise 2: Global Setup (15 points)
Explain the difference between `beforeAll` and `beforeEach`. When would you use `beforeAll` instead of `beforeEach`?

---

## Part B: Configuration (40 points)

### Exercise 3: Project Configuration (20 points)
Modify your `playwright.config.js` to:
1. Define two projects: "Desktop Chrome" and "Mobile Safari".
2. Set the `viewport` for Mobile Safari to a standard iPhone size.
3. Configure the `baseURL` so your tests can use relative paths like `await page.goto('/login')`.

### Exercise 4: Retries and Timeouts (20 points)
In the config file:
1. Set the global `timeout` for each test to 60 seconds.
2. Configure `retries` to 2 for CI and 0 for local development.
3. Enable `trace: 'on-first-retry'`. What does this do?

---

## Part C: The Power of Fixtures (30 points)

### Exercise 5: Built-in Fixtures (10 points)
Playwright provides `page`, `browser`, and `context` as fixtures. Explain what a "Browser Context" is and why it's better than launching a fresh browser for every test.

### Exercise 6: Custom Fixtures (20 points)
Create a simple custom fixture named `authenticatedPage` that automatically logs in a user and provides the state to the test. This demonstrates "Setup once, use everywhere".

---

## Bonus Challenge (10 points)

### Exercise 7: Scripting the Runner
Add custom scripts to your `package.json` to:
1. Run only tests with a specific tag (e.g., `@smoke`).
2. Run tests in headed mode with a slow-mo of 500ms.
3. Run tests and generate an Allure report (if library installed).

---

## Submission Guidelines

1. Submit your `playwright.config.js`
2. Submit a test file demonstrating hooks and custom fixtures
3. List the commands you added to `package.json`

## Grading Rubric

- **Hooks Implementation (30%)**: Correct use of setup/teardown
- **Config Mastery (30%)**: Proper configuration of projects and settings
- **Fixture Understanding (30%)**: Correct explanation and implementation of fixtures
- **CLI Usage (10%)**: Efficient use of the test runner command line

---

**Total Points: 100 + 10 Bonus**
