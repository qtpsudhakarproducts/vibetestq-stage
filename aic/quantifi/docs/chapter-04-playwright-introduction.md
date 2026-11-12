# Chapter 4 — Playwright Introduction & Configuration

---

## What You Will Learn

- What Playwright is and why it is better than older automation tools
- How to install and scaffold a Playwright project
- How `playwright.config.ts` is structured and what each option does
- The relationship between Browser, BrowserContext, and Page
- How to write and run a first test against OrangeHRM
- How to run tests in headed and headless modes across multiple browsers

---

## 4.1 What Is Playwright?

Playwright is an open-source browser automation framework built by Microsoft. It supports Chromium, Firefox, and WebKit (Safari's engine) from a single API.

Compared to older tools:

| Feature | Selenium | Playwright |
|---------|----------|------------|
| Language | Java, Python, JS, C# | JS/TS, Python, Java, C# |
| Architecture | WebDriver protocol | CDP + native browser APIs |
| Speed | Slower | Faster |
| Auto-wait | Manual waits required | Built-in auto-waiting |
| Network Interception | Limited | Full support |
| Multiple tabs/windows | Complex | First-class support |
| Mobile Emulation | Limited | Built-in |

Playwright's most important feature: **auto-waiting**. Before performing any action (click, fill, etc.), Playwright automatically waits for the element to be visible, enabled, and stable. This eliminates most flaky tests.

---

## 4.2 Installing Playwright

```bash
npm init playwright@latest
```

The installer asks:
- TypeScript or JavaScript → choose **TypeScript**
- Where to put tests → `tests`
- Add GitHub Actions? → **No** (for now)
- Install browsers? → **Yes**

Generated project structure:

```
playwright-project/
├── playwright.config.ts     ← main configuration
├── tests/
│   └── example.spec.ts      ← sample test
├── tests-examples/
│   └── demo-todo-app.spec.ts
├── package.json
└── node_modules/
```

---

## 4.3 Understanding playwright.config.ts

This is the heart of your Playwright setup. Every aspect of test execution is configured here.

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    retries: 0,
    workers: undefined,
    reporter: 'html',

    use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
```

### Key Configuration Options

| Option | Description |
|--------|-------------|
| `testDir` | The folder where Playwright looks for test files |
| `timeout` | Maximum time (ms) for each test to complete |
| `expect.timeout` | Maximum time (ms) for `expect()` assertions to pass |
| `fullyParallel` | Run all tests in all files in parallel |
| `retries` | How many times to retry a failed test |
| `workers` | Number of parallel test processes (`undefined` = auto) |
| `reporter` | Which report format(s) to generate |
| `baseURL` | Prepended to relative URLs in `page.goto('/path')` |
| `headless` | Run browser without visible window |
| `screenshot` | When to capture screenshots |
| `trace` | When to capture traces for debugging |

---

## 4.4 Browser, BrowserContext, and Page

Playwright has three levels of abstraction:

```
Browser
└── BrowserContext (isolated session)
    └── Page (a single browser tab)
```

**Browser** — the browser instance (Chromium, Firefox, WebKit). One per test worker by default.

**BrowserContext** — a sandboxed session. Each context has its own cookies, localStorage, and authentication state. Like an incognito window. One per test by default.

**Page** — a single browser tab. Multiple pages can exist within one context.

In practice, when you use the `page` fixture in a test, Playwright automatically creates a new context and page for you, and tears them down after the test.

```typescript
test('example', async ({ page }) => {
    // 'page' is a fresh page in a fresh context
    await page.goto('/web/index.php/auth/login');
});
```

For multi-tab scenarios, you explicitly create pages:

```typescript
test('multi-tab', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    // ...
});
```

---

## 4.5 First Test — OrangeHRM Login

Create `tests/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login', () => {

    test('should display login page', async ({ page }) => {
        await page.goto('/web/index.php/auth/login');
        await expect(page).toHaveTitle(/OrangeHRM/);
    });

    test('should login with valid credentials', async ({ page }) => {
        await page.goto('/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/dashboard/);
    });

    test('should show error with wrong credentials', async ({ page }) => {
        await page.goto('/web/index.php/auth/login');
        await page.getByPlaceholder('Username').fill('wronguser');
        await page.getByPlaceholder('Password').fill('wrongpass');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });

});
```

Run the tests:

```bash
npx playwright test
```

Run a specific file:

```bash
npx playwright test tests/login.spec.ts
```

---

## 4.6 Headed vs Headless Mode

**Headless** (default): browser runs without a UI window. Faster, uses less memory. Use in CI/CD.

**Headed**: browser window is visible. Use when developing or debugging tests.

Run in headed mode:

```bash
npx playwright test --headed
```

Or set in config:

```typescript
use: {
    headless: false
}
```

Run on a specific browser:

```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run on all browsers:

```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```

---

## Review Questions

**Q1. What is Playwright and who built it?**

Playwright is an open-source end-to-end browser automation framework built by Microsoft. It supports testing web applications on Chromium, Firefox, and WebKit from a single API. It is available for JavaScript/TypeScript, Python, Java, and C#.

**Q2. What is auto-waiting and why is it important?**

Auto-waiting means Playwright automatically waits for elements to be actionable before performing actions. Before a `click()`, for example, Playwright waits for the element to be visible, attached, enabled, and stable. This eliminates the need for manual `waitFor` calls and reduces test flakiness.

**Q3. What is the difference between Browser, BrowserContext, and Page?**

Browser is the browser instance. BrowserContext is an isolated session (like incognito) with its own cookies and storage. Page is a single tab within a context. One browser has many contexts; one context has many pages. Playwright creates a new context and page per test by default, ensuring test isolation.

**Q4. What does `baseURL` in the config do?**

When `baseURL` is set, you can use relative paths in `page.goto()`. For example, `page.goto('/web/index.php/auth/login')` automatically becomes the full URL. This makes tests portable across environments by changing only the config.

**Q5. What is the purpose of `playwright.config.ts`?**

It is the central configuration file for the entire test suite. It defines test location, timeout values, browser projects, parallelism, retries, reporters, and shared `use` options like `baseURL` and `headless`. Changes here apply to all tests.

**Q6. What is the difference between `timeout` and `expect.timeout` in the config?**

`timeout` is the maximum time the entire test function can run. `expect.timeout` is the maximum time an individual `expect()` assertion will wait for its condition to become true before failing. They serve different purposes — one is for the test, one is for assertions.

**Q7. How do you run tests on multiple browsers?**

Define multiple objects in the `projects` array in `playwright.config.ts`, each with `use: { ...devices['Desktop Browser'] }`. Run all with `npx playwright test` or select one with `--project=chromium`.

**Q8. What does `fullyParallel: true` mean?**

By default, Playwright runs test files in parallel but tests within a file sequentially. `fullyParallel: true` enables all tests across all files to run in parallel, maximising speed. Be careful — tests must be fully independent for this to work correctly.

**Q9. What is `trace: 'on-first-retry'` used for?**

Traces are recordings of test execution including DOM snapshots, network logs, and screenshots. `on-first-retry` captures a trace only when a test is retried (the first time it fails). You can then open the trace with `npx playwright show-trace trace.zip` to debug the failure.

**Q10. What command generates a new Playwright project?**

`npm init playwright@latest` — it runs an interactive installer that sets up the folder structure, installs dependencies, downloads browsers, and creates a sample test file and configuration.
