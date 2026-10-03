# Assignment 04: Playwright Introduction & Configuration

---

## Learning Objectives

- Install Playwright and set up a project
- Understand `playwright.config.ts` and key settings
- Launch a browser and navigate to OrangeHRM
- Write and run your first Playwright test
- Understand Browser, BrowserContext, and Page

---

## Instructions

- Create a new folder `day04-playwright-intro`
- Use TypeScript throughout
- Target application: `https://opensource-demo.orangehrmlive.com`
- Login credentials: `Admin` / `admin123`
- Run tests with `npx playwright test`

---

## Part A: Installation and Setup

### Exercise 1: Create Playwright Project

1. Inside `day04-playwright-intro`, run:
   ```
   npm init -y
   npm init playwright@latest
   ```
   Choose TypeScript, set tests folder to `tests`, skip GitHub Actions, install browsers.

2. List all the files and folders created. What is the purpose of each?

3. Open `playwright.config.ts`. Find and explain these settings:
   - `baseURL`
   - `testDir`
   - `timeout`
   - `use.headless`
   - `projects`

---

### Exercise 2: Configure for OrangeHRM

Update `playwright.config.ts`:

1. Set `baseURL` to `https://opensource-demo.orangehrmlive.com`
2. Set `timeout` to `30000`
3. Set `use.headless` to `false` (headed mode so you can watch)
4. Set `use.screenshot` to `'only-on-failure'`
5. Keep only **one project**: `chromium`

Verify the config file looks correct before moving on.

---

## Part B: First Test — OrangeHRM Login

### Exercise 3: Navigate and Verify

Create `tests/orangehrm-basics.spec.ts`.

Write a test named `'navigate to OrangeHRM login page'` that:
1. Navigates to the OrangeHRM base URL
2. Asserts the page title contains `"OrangeHRM"`
3. Asserts the URL contains `/auth/login`
4. Takes a screenshot named `login-page.png`

Run it with `npx playwright test` and verify it passes.

---

### Exercise 4: Login Test

In the same spec file, write a test named `'should log in successfully'` that:
1. Goes to the login page
2. Fills in the username field with `Admin`
3. Fills in the password field with `admin123`
4. Clicks the Login button
5. Asserts that the URL changes to contain `/dashboard`
6. Asserts that the page contains text `"Dashboard"`

---

### Exercise 5: Failed Login Test

Write a test named `'should show error on wrong password'` that:
1. Goes to the login page
2. Enters username `Admin` and password `wrongpass`
3. Clicks Login
4. Asserts that an error message is visible
5. Asserts the error message contains the text `"Invalid credentials"`

---

## Part C: Browser, Context, and Page

### Exercise 6: Headed vs Headless

1. Run your tests in headed mode (already configured). Observe what you see.
2. Change `headless` to `true` in the config. Run again.
3. What is the difference? When would you use each mode?

Write your observations in a comment at the top of your config file.

---

### Exercise 7: Multiple Browsers

In `playwright.config.ts`, add `firefox` as a second project.

1. Run the login test on both browsers: `npx playwright test`
2. Observe how Playwright runs both in parallel
3. Remove `firefox` after the exercise and keep only `chromium`

---

### Exercise 8: Running Specific Tests

Practice these CLI commands and note what each does:

1. `npx playwright test --headed` — run in headed mode
2. `npx playwright test tests/orangehrm-basics.spec.ts` — run a specific file
3. `npx playwright test --grep "login"` — run tests matching a name pattern
4. `npx playwright test --project=chromium` — run a specific browser only
5. `npx playwright show-report` — open the HTML report after running tests
