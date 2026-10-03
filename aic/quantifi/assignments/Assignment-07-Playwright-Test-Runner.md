# Assignment 07: Playwright Test Runner

---

## Learning Objectives

- Organize tests using `describe`, `beforeEach`, `afterEach`, `beforeAll`, `afterAll`
- Write assertions using `expect` for different types of verification
- Use built-in fixtures (`page`, `browser`, `context`)
- Create a custom fixture for OrangeHRM login
- Run tests in parallel and use `--debug`

---

## Instructions

- Continue using your Playwright project
- Target application: `https://opensource-demo.orangehrmlive.com`
- Create `tests/test-framework.spec.ts` for this assignment
- Use TypeScript strict typing

---

## Part A: Test Structure & Lifecycle Hooks

### Exercise 1: Describe Blocks and Hooks

Organize your tests using `describe` blocks:

1. Create a `describe` block called `"OrangeHRM Login Tests"` with:
   - A `beforeAll` hook that prints `"Starting Login Test Suite"` to the console
   - A `beforeEach` hook that navigates to the login page
   - An `afterEach` hook that takes a screenshot named after the test
   - An `afterAll` hook that prints `"Login Test Suite Complete"`

2. Inside this describe block, write three tests:
   - `'should load login page'` — assert title and URL
   - `'should login successfully'` — login and assert dashboard
   - `'should show error for wrong password'` — assert error message

3. Observe the order the hooks and tests execute in the terminal output.

---

### Exercise 2: Nested Describe Blocks

Inside a parent `describe("OrangeHRM")`, create two nested `describe` blocks:
- `"Authentication"` — with 2 login-related tests
- `"Navigation"` — with 2 tests that navigate to different menus after login

Run the tests. Observe how they appear as a hierarchy in the report.

---

## Part B: Assertions

### Exercise 3: Page and URL Assertions

Write tests that use:

1. `expect(page).toHaveTitle(...)` — assert the page title on the login page
2. `expect(page).toHaveURL(...)` — assert the URL after login
3. `expect(page).toHaveURL(/dashboard/)` — use a regex to match the URL pattern

---

### Exercise 4: Element Assertions

After logging in to OrangeHRM, write assertions for:

1. `toBeVisible()` — assert the Dashboard heading is visible
2. `toBeHidden()` — assert the loading spinner is not visible
3. `toHaveText()` — assert a specific menu item has exact text
4. `toContainText()` — assert the page body contains the word "Dashboard"
5. `toHaveValue()` — assert a form field has a specific value
6. `toBeEnabled()` / `toBeDisabled()` — find a button and assert its state
7. `toHaveCount()` — assert there is at least 1 employee in the PIM list

---

### Exercise 5: Soft Assertions

1. Write a test that performs these checks on the OrangeHRM Dashboard **without stopping on the first failure**:
   - The title contains "OrangeHRM"
   - The URL contains "dashboard"
   - The "Time at Work" widget is visible
   - The user avatar icon is visible

   Use `expect.soft()` for all assertions.

2. Deliberately break one assertion (change expected text). Run the test and observe — does it stop immediately or run all assertions first?

---

## Part C: Fixtures

### Exercise 6: Using Built-in Fixtures

1. Write a test that uses the `page` fixture directly in the test function signature.
2. Write a test that uses the `browser` fixture to manually create a new context:
   - Create a context using `browser.newContext()`
   - Create a page from the context
   - Navigate to OrangeHRM
   - Close the context at the end

---

### Exercise 7: Create a Custom Login Fixture

Create a file `tests/fixtures.ts`.

1. Define a custom fixture called `loggedInPage` that:
   - Creates a page
   - Navigates to the OrangeHRM login URL
   - Fills in `Admin` / `admin123` and clicks Login
   - Waits for the Dashboard to load
   - Provides the logged-in page to the test

2. Export a custom `test` using `base.extend()` with this fixture.

3. Create `tests/with-fixture.spec.ts` that imports your custom `test`.
   - Write two tests that use `loggedInPage` directly — no login steps in the test body
   - One test navigates to PIM, the other navigates to Admin
   - Each test asserts it reached the right page

4. Observe that the login happens automatically — the test body only contains navigation and assertions.
