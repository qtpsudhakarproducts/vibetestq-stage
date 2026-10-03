# Assignment 12: Test Automation Framework Libraries

---

## Learning Objectives

- Organize a scalable folder structure for a test framework
- Manage test data using JSON and TypeScript
- Implement data-driven tests using the OrangeHRM application
- Create utility helpers (login, config, wait utilities)
- Use environment variables for configuration

---

## Instructions

- Continue using your Playwright + POM project from Assignment 11
- Add the new structure on top of what you already have
- Target application: `https://opensource-demo.orangehrmlive.com`
- Use TypeScript across all new files

---

## Part A: Framework Structure

### Exercise 1: Set Up Folder Structure

Create the following structure inside your project:

```
├── config/
│   └── env.config.ts
├── data/
│   ├── employees.json
│   └── users.json
├── helpers/
│   ├── login.helper.ts
│   └── wait.helper.ts
├── pages/        ← already exists from Assignment 11
├── tests/
└── playwright.config.ts
```

1. Create each folder and add a placeholder file with a comment describing its purpose.
2. In `config/env.config.ts`, export these constants:
   - `BASE_URL`
   - `ADMIN_USER` and `ADMIN_PASSWORD`
   - `DEFAULT_TIMEOUT`

3. Update `playwright.config.ts` to import `BASE_URL` from `env.config.ts` instead of having it hardcoded.

---

## Part B: Test Data Management

### Exercise 2: JSON Test Data

Create `data/employees.json` with an array of 3 employee objects.  
Each object should have: `firstName`, `lastName`, and `employeeId`.

Use real-looking test data — not generic "test1", "test2" values.

Then create `data/users.json` with at least 2 users:
- One `Admin` role user
- One `ESS` role user

Each user should have: `username`, `password`, `role`, `status`.

---

### Exercise 3: Data-Driven Tests

Create `tests/data-driven.spec.ts`.

1. Import the `employees.json` data.
2. Use a `for...of` loop or `.forEach()` to iterate over the employees array.
3. For each employee, write a test that:
   - Logs in as Admin
   - Adds the employee via **API** (use the API approach from Assignment 10) or via the UI Add Employee form
   - Asserts the employee appears in the PIM Employee List

This should result in **3 test iterations** — one per employee in the JSON file.

4. Now import `users.json`.
5. Write a data-driven login test that:
   - Tries logging in with each user
   - Asserts the correct dashboard loads (Admin and ESS dashboards may differ)

---

## Part C: Helpers and Utilities

### Exercise 4: Login Helper

Create `helpers/login.helper.ts`.

Export a function `loginAs(page, username, password)` that:
- Navigates to the login URL
- Fills credentials
- Clicks the Login button
- Waits for the dashboard to load
- Returns the page (so you can chain calls)

Update **all existing tests** to use `loginAs()` instead of repeating login steps.  
Verify all tests still pass after the refactor.

---

### Exercise 5: Wait Helper

Create `helpers/wait.helper.ts`.

Export these utility functions:
- `waitForTable(page)` — waits for any visible `<table>` or table-like element to appear
- `waitForToast(page)` — waits for a success/notification message to appear
- `waitForUrl(page, pattern)` — waits until the URL matches a string or regex

Use `waitForToast` in your Add Employee test to confirm the save was successful.

---

### Exercise 6: storageState for Login Performance

When every test logs in through the UI, it adds time.

1. Create `global-setup.ts` at the project root.
2. In global-setup, log in as Admin and save the session to `storageState.json` using:
   ```
   await page.context().storageState({ path: 'storageState.json' })
   ```
3. Add `globalSetup` and `storageState` to `playwright.config.ts`.
4. Run your full test suite. Confirm tests skip the login UI step.
5. Measure the time difference between running with and without `storageState`.
