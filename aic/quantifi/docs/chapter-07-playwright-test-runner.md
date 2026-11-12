# Chapter 7 — Playwright Test Runner

---

## What You Will Learn

- How to structure tests with `test()` and `describe()` blocks
- How to use lifecycle hooks: `beforeAll`, `afterAll`, `beforeEach`, `afterEach`
- How to write assertions with `expect()`
- How to use soft assertions to collect multiple failures in one test
- How to use Playwright's built-in fixtures (`page`, `browser`, `browserContext`, `request`)
- How to create custom fixtures for shared setup

---

## 7.1 Test Structure

### Basic Test

```typescript
import { test, expect } from '@playwright/test';

test('should display OrangeHRM login page', async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
    await expect(page).toHaveTitle(/OrangeHRM/);
});
```

The function passed to `test()` is always `async`. The `{ page }` parameter is a **fixture** — Playwright injects it automatically.

### `describe` Blocks

`describe` groups related tests under a named block. Test output is grouped by the describe name.

```typescript
test.describe('OrangeHRM Login', () => {

    test('should show login form', async ({ page }) => {
        await page.goto('/web/index.php/auth/login');
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    test('should login successfully', async ({ page }) => {
        await page.goto('/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

});
```

---

## 7.2 Lifecycle Hooks

Hooks run code before or after tests. They share scope with their surrounding `describe` block.

```typescript
test.describe('PIM Module', () => {

    test.beforeAll(async () => {
        // Runs once before all tests in this describe block
        console.log('Setting up PIM tests...');
    });

    test.afterAll(async () => {
        // Runs once after all tests in this describe block
        console.log('Tearing down PIM tests...');
    });

    test.beforeEach(async ({ page }) => {
        // Runs before each individual test
        await page.goto('/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForURL('**/dashboard/index');
    });

    test.afterEach(async ({ page }) => {
        // Runs after each individual test
        await page.screenshot({ path: `screenshots/after-test-${Date.now()}.png` });
    });

    test('should navigate to PIM', async ({ page }) => {
        await page.getByRole('link', { name: 'PIM' }).click();
        await expect(page).toHaveURL(/pim/);
    });

    test('should search employees', async ({ page }) => {
        await page.getByRole('link', { name: 'PIM' }).click();
        await page.getByRole('textbox', { name: 'Employee Name' }).fill('John');
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(page.locator('.oxd-table-row')).toHaveCount(1);
    });

});
```

### Which Hook to Use

| Hook | When to use |
|------|-------------|
| `beforeAll` | One-time setup — seed database, create browser context |
| `afterAll` | One-time teardown — clean up test data |
| `beforeEach` | Setup before every test — navigate to page, login |
| `afterEach` | Cleanup after every test — log status, close dialogs |

### Nested `describe` Blocks

```typescript
test.describe('Admin Module', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto('/web/index.php/admin/viewSystemUsers');
    });

    test.describe('User Management', () => {

        test('should list users', async ({ page }) => {
            await expect(page.getByRole('row')).toHaveCount(5);
        });

        test('should search by username', async ({ page }) => {
            await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page.getByRole('row')).toHaveCount(2);  // header + 1 result
        });

    });

});
```

---

## 7.3 Assertions

Playwright's `expect()` provides web-aware assertions that automatically retry until the condition is met or the timeout is reached.

### Page Assertions

```typescript
// Title
await expect(page).toHaveTitle('OrangeHRM');
await expect(page).toHaveTitle(/OrangeHRM/);  // regex

// URL
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveURL(/dashboard/);  // regex
```

### Element Visibility and State

```typescript
const loginButton = page.getByRole('button', { name: 'Login' });

await expect(loginButton).toBeVisible();
await expect(loginButton).not.toBeVisible();
await expect(loginButton).toBeEnabled();
await expect(loginButton).toBeDisabled();
await expect(loginButton).toBeHidden();
```

### Text and Value Assertions

```typescript
// Exact text content
await expect(page.getByRole('heading', { name: 'Dashboard' })).toHaveText('Dashboard');

// Contains text
await expect(page.locator('.welcome-message')).toContainText('Welcome');

// Input value
await expect(page.getByPlaceholder('Username')).toHaveValue('Admin');
```

### List Assertions

```typescript
// Count elements
await expect(page.locator('.oxd-table-row')).toHaveCount(5);

// Has specific text values
await expect(page.locator('.employee-name')).toHaveText(['John Smith', 'Jane Doe']);
```

### Generic Value Assertions

```typescript
const count = await page.locator('.record').count();
expect(count).toBe(5);
expect(count).toBeGreaterThan(0);

const text = await page.locator('.title').textContent();
expect(text).toContain('Dashboard');
```

---

## 7.4 Soft Assertions

Normally, when an assertion fails, the test stops immediately. **Soft assertions** collect all failures and report them together at the end.

```typescript
test('verify dashboard elements', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');

    // These will NOT stop the test on failure
    await expect.soft(page.getByText('Time at Work')).toBeVisible();
    await expect.soft(page.getByText('My Actions')).toBeVisible();
    await expect.soft(page.getByText('Quick Launch')).toBeVisible();
    await expect.soft(page.getByText('Buzz Latest Posts')).toBeVisible();

    // This WILL stop on failure (regular assertion)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

Use soft assertions when verifying multiple elements on a page where you want to see all failures at once.

---

## 7.5 Built-in Fixtures

Playwright provides several fixtures automatically. Destructure them from the test function parameter.

```typescript
test('fixture examples', async ({ page, browser, browserName, context, request }) => {
    console.log(browserName);  // 'chromium', 'firefox', or 'webkit'

    // page — current tab
    await page.goto('/');

    // context — the browser context (isolated session)
    const newPage = await context.newPage();

    // browser — the browser instance
    const version = browser.version();

    // request — for API calls without a browser page
    const response = await request.get('https://api.example.com/users');
});
```

| Fixture | Type | Description |
|---------|------|-------------|
| `page` | `Page` | A fresh browser tab. New for each test. |
| `context` | `BrowserContext` | The isolated session. New for each test. |
| `browser` | `Browser` | The browser instance. Shared across a worker. |
| `browserName` | `string` | The browser project name being run. |
| `request` | `APIRequestContext` | Standalone API request context. |

---

## 7.6 Custom Fixtures

Custom fixtures encapsulate setup that is shared across multiple tests. They are defined with `test.extend()`.

```typescript
import { test as base, expect } from '@playwright/test';

// Define fixture types
type MyFixtures = {
    loggedInPage: any;
};

// Create extended test with custom fixtures
export const test = base.extend<MyFixtures>({

    loggedInPage: async ({ page }, use) => {
        // Setup: navigate and login
        await page.goto('/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForURL('**/dashboard/index');

        // Yield the page to the test
        await use(page);

        // Teardown: logout (runs after the test)
        await page.goto('/web/index.php/auth/logout');
    },

});

export { expect };
```

Using the fixture:

```typescript
import { test, expect } from './fixtures';  // import from your file

test('should access PIM after login', async ({ loggedInPage }) => {
    // loggedInPage is already logged in
    await loggedInPage.getByRole('link', { name: 'PIM' }).click();
    await expect(loggedInPage).toHaveURL(/pim/);
});
```

---

## Review Questions

**Q1. What is the difference between `beforeAll` and `beforeEach`?**

`beforeAll` runs once before all tests in a describe block. `beforeEach` runs before every individual test. Use `beforeAll` for expensive one-time setup (creating resources, seeding data). Use `beforeEach` for per-test setup (navigating to a page, resetting state).

**Q2. Why are Playwright assertions called "web-aware"?**

Because they automatically retry until the condition is met or the timeout expires. Unlike plain assertion libraries that check the condition once and fail immediately, Playwright's `expect()` polls the assertion repeatedly. This accounts for async rendering and avoids flaky tests.

**Q3. What is the difference between `toHaveText` and `toContainText`?**

`toHaveText` checks that the element's text content matches exactly (after normalising whitespace). `toContainText` checks that the text contains a substring. `expect(el).toHaveText('Login')` fails if the element has `"Login Now"`. `toContainText('Login')` would pass.

**Q4. What is a soft assertion?**

`expect.soft()` records a failure but does not stop the test. The test continues running remaining steps. At the end, if any soft assertion failed, the test is marked as failed and all failures are reported. Use it when you want to check multiple UI elements in a single test run.

**Q5. What is a Playwright fixture?**

A fixture is a value or object that is automatically created and injected into a test by Playwright before the test runs and cleaned up after. Built-in fixtures include `page`, `context`, `browser`, `request`, and `browserName`. Custom fixtures extend this system with your own setup/teardown logic.

**Q6. How does a custom fixture differ from a `beforeEach` hook?**

A `beforeEach` hook runs in-file and applies to all tests in its `describe` block. A fixture is composable — you can import and use it across any file, combine multiple fixtures, and chain fixture dependencies. Fixtures also have a built-in teardown mechanism (code after `await use()`).

**Q7. What happens if a `beforeEach` hook fails?**

The test is marked as failed with a setup error, and the test body does not run. The `afterEach` hook still runs if it is defined, to allow cleanup.

**Q8. Can a test have multiple describe blocks?**

Yes. A test file can have multiple `describe` blocks at the top level — each is independent. `describe` blocks can also be nested. Each level can have its own hooks.

**Q9. What is the `request` fixture used for?**

The `request` fixture provides an `APIRequestContext` — a standalone HTTP client. Unlike `page.request`, it is not tied to a browser page. It is useful for API-only tests or for making setup API calls (like creating test data) before the UI portion of a test.

**Q10. How do you run a single test without running the whole suite?**

Use `test.only()` to mark tests you want to run exclusively. Only tests marked with `.only` will run; all others are skipped. Alternatively, use the `--grep` flag from the CLI: `npx playwright test --grep "should login"`.
