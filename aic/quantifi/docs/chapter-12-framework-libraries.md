# Chapter 12 — Test Automation Framework Libraries

---

## What You Will Learn

- How to set up a production-ready framework folder structure
- How to manage test data using JSON files
- How to write data-driven tests
- How to create helper functions for login and waiting
- How to use `storageState` to skip login in every test
- How to organise utilities and constants

---

## 12.1 Why Framework Structure Matters

A single test file is fine for learning. A real project has hundreds of tests across multiple modules. Without structure:

- Files get duplicated
- Helpers are rewritten in multiple places
- Configuration is scattered
- New team members struggle to find things

A standard folder structure solves this by putting every concern in a predictable place.

---

## 12.2 Recommended Folder Structure

```
project/
├── tests/
│   ├── auth/
│   │   └── login.spec.ts
│   ├── pim/
│   │   ├── add-employee.spec.ts
│   │   └── search-employee.spec.ts
│   └── admin/
│       └── user-management.spec.ts
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   └── PIMPage.ts
│   ├── helpers/
│   │   ├── loginHelper.ts
│   │   └── waitHelper.ts
│   ├── data/
│   │   ├── users.json
│   │   └── employees.json
│   └── fixtures/
│       └── index.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## 12.3 Test Data with JSON Files

Separate data from code. Store test data in JSON files.

**`src/data/users.json`**:

```json
{
  "admin": {
    "username": "Admin",
    "password": "admin123"
  },
  "invalidUser": {
    "username": "wronguser",
    "password": "wrongpass"
  }
}
```

**`src/data/employees.json`**:

```json
[
  {
    "firstName": "Priya",
    "lastName": "Sharma",
    "employeeId": "EMP-001",
    "jobTitle": "Software Engineer",
    "department": "Engineering"
  },
  {
    "firstName": "Arjun",
    "lastName": "Kumar",
    "employeeId": "EMP-002",
    "jobTitle": "QA Engineer",
    "department": "Quality Assurance"
  }
]
```

Importing JSON in TypeScript:

```typescript
import users from '../data/users.json';
import employees from '../data/employees.json';

// TypeScript knows the shape of the data
const adminUser = users.admin;
console.log(adminUser.username);  // Admin
```

Add `"resolveJsonModule": true` to `tsconfig.json` to enable JSON imports.

---

## 12.4 Data-Driven Tests

Data-driven testing runs the same test logic with different data sets.

```typescript
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

const invalidLogins = [
    { username: 'Admin', password: 'WrongPass', description: 'wrong password' },
    { username: 'nonexistent', password: 'admin123', description: 'wrong username' },
    { username: '', password: 'admin123', description: 'empty username' },
    { username: 'Admin', password: '', description: 'empty password' },
];

for (const loginData of invalidLogins) {
    test(`should fail login with ${loginData.description}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(loginData.username, loginData.password);
        await loginPage.verifyInvalidCredentialsError();
    });
}
```

Each iteration generates a separate test with a descriptive name. All are visible as individual rows in the HTML report.

---

## 12.5 Login Helper

A login helper function encapsulates the login steps so they can be reused without a full page object.

```typescript
// src/helpers/loginHelper.ts
import { Page } from '@playwright/test';

export async function loginAsAdmin(page: Page): Promise<void> {
    await page.goto('/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/index');
}

export async function loginAs(page: Page, username: string, password: string): Promise<void> {
    await page.goto('/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/index');
}
```

Using it in a test:

```typescript
import { loginAsAdmin } from '../../src/helpers/loginHelper';

test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
});
```

---

## 12.6 Wait Helper

A wait helper provides reusable waiting patterns.

```typescript
// src/helpers/waitHelper.ts
import { Page, Locator } from '@playwright/test';

export async function waitForToast(page: Page, message: string): Promise<void> {
    await page.getByText(message).waitFor({ state: 'visible' });
}

export async function waitForTableToLoad(page: Page): Promise<void> {
    await page.locator('.oxd-table-body').waitFor({ state: 'visible' });
    await page.waitForLoadState('networkidle');
}

export async function waitForModalToClose(page: Page): Promise<void> {
    await page.locator('.oxd-dialog-container').waitFor({ state: 'hidden' });
}
```

---

## 12.7 `storageState` for Login Performance

Running a login sequence before every test is slow. `storageState` saves the browser's session (cookies, localStorage) to a file and restores it at the start of each test, skipping the login UI entirely.

### Step 1: Create a global setup file

```typescript
// src/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/index');

    // Save the session to a file
    await page.context().storageState({ path: 'auth/admin.json' });
    await browser.close();
}

export default globalSetup;
```

### Step 2: Reference it in `playwright.config.ts`

```typescript
export default defineConfig({
    globalSetup: './src/global-setup.ts',

    use: {
        storageState: 'auth/admin.json',   // applied to every test
    },
    // ...
});
```

### Step 3: Tests skip login automatically

```typescript
test('verifies dashboard loads', async ({ page }) => {
    // Already authenticated — no login needed
    await page.goto('/web/index.php/dashboard/index');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

---

## 12.8 Environment Configuration

Different environments (local, staging, production) need different URLs and credentials. Load them from environment variables.

**`.env`** (never commit this):

```
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
```

**`playwright.config.ts`**:

```typescript
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    use: {
        baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    },
});
```

Install dotenv: `npm install dotenv`

---

## Review Questions

**Q1. Why should test data be stored in JSON files rather than hardcoded in tests?**

JSON files separate data from logic. When data changes (a user's password, an employee's name), you update one file instead of every test. Multiple tests can import the same data. It also enables data-driven testing by looping over JSON arrays.

**Q2. What is data-driven testing?**

Running the same test logic with multiple sets of inputs, where each set is a separate test case. In Playwright, this is done by looping over a data array and calling `test()` inside the loop, creating one test per data row. Each test has a unique name and appears independently in reports.

**Q3. What is `storageState` in Playwright?**

`storageState` is a file that captures the browser's session state: cookies, localStorage, and sessionStorage. When restored at the start of a test, the browser appears already authenticated. This avoids repeating the login UI sequence for every test, significantly speeding up the suite.

**Q4. What is the difference between a helper function and a page object?**

A helper function is a standalone utility function that performs a task. It does not model a page — it just encapsulates reusable logic. A page object is a class that represents a specific page in the application, with locator properties and interaction methods. Helpers are simpler; page objects provide more structure.

**Q5. What is `globalSetup` in Playwright?**

`globalSetup` is a function that runs once before the entire test suite starts. It is used for one-time setup tasks like creating authentication state files, seeding a database, or starting a service. It corresponds to `globalTeardown` which runs once after all tests finish.

**Q6. What is the purpose of `.env` files and why should they not be committed to git?**

`.env` files store environment-specific configuration like URLs, credentials, and API keys. They must not be committed because they contain sensitive information and differ between environments. Add `.env` to `.gitignore`. Use `.env.example` to show which variables are needed without revealing values.

**Q7. How does `for...of` loop over JSON array test data differ from `test.each`?**

Playwright does not have a built-in `test.each` like Jest. The `for...of` pattern achieves the same result — looping over data and calling `test()` for each item. The test name is constructed using template literals to make each test uniquely identifiable in reports.

**Q8. What does `resolveJsonModule` in `tsconfig.json` enable?**

It enables importing JSON files with `import data from './file.json'`. Without this option, TypeScript does not know how to handle `.json` imports and raises a compilation error.

**Q9. How do you organise tests in a large project?**

Organise by feature module, mirroring the application's navigation structure. A folder per module (`auth/`, `pim/`, `admin/`) with test files for each feature within the module. This makes it easy to run all tests for a feature and to locate tests when something fails.

**Q10. What is `dotenv` and why is it used with Playwright?**

`dotenv` is a Node.js library that reads a `.env` file and loads its key-value pairs into `process.env`. Playwright configuration (and tests) then read these values as environment variables. This allows the same code to work in different environments by simply changing the `.env` file.
