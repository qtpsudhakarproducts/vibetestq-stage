# Chapter 11 — Page Object Model (POM)

---

## What You Will Learn

- What the Page Object Model pattern is and why it exists
- How to create a `BasePage` class with shared utilities
- How to build `LoginPage`, `DashboardPage`, `PIMPage`, and `AdminPage` classes
- How to use inheritance to share common behaviour
- How to refactor raw test code into POM-based tests

---

## 11.1 Why Page Object Model?

Without POM, locators and interactions are scattered across test files:

```typescript
// test-a.spec.ts
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();

// test-b.spec.ts
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();
```

When the button text changes from "Login" to "Sign In", you must update every test file. With POM, you update one method in one class.

**POM separates concerns:**

| Concern | Lives in |
|---------|---------|
| How to interact with a page | Page Object class |
| What to test | Test file |

---

## 11.2 BasePage

`BasePage` is the parent class that all page objects inherit from. It holds the `page` reference and shared utility methods.

```typescript
// src/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }
}
```

`protected page` means it is accessible to subclasses but not from outside the class hierarchy.

---

## 11.3 LoginPage

```typescript
// src/pages/LoginPage.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private usernameInput = this.page.getByPlaceholder('Username');
    private passwordInput = this.page.getByPlaceholder('Password');
    private loginButton = this.page.getByRole('button', { name: 'Login' });
    private errorMessage = this.page.getByText('Invalid credentials');

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await this.navigate('/web/index.php/auth/login');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginPageVisible(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
    }

    async verifyInvalidCredentialsError(): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
    }
}
```

**Key rule:** Locators (like `this.page.getByPlaceholder(...)`) live in the page object. Test files only call methods like `loginPage.login(...)`.

---

## 11.4 DashboardPage

```typescript
// src/pages/DashboardPage.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    private dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
    private timeAtWorkWidget = this.page.getByText('Time at Work');
    private myActionsWidget = this.page.getByText('My Actions');
    private quickLaunchWidget = this.page.getByText('Quick Launch');

    constructor(page: Page) {
        super(page);
    }

    async verifyDashboardLoaded(): Promise<void> {
        await expect(this.dashboardHeader).toBeVisible();
    }

    async verifyWidgetsVisible(): Promise<void> {
        await expect(this.timeAtWorkWidget).toBeVisible();
        await expect(this.myActionsWidget).toBeVisible();
        await expect(this.quickLaunchWidget).toBeVisible();
    }

    async navigateToPIM(): Promise<void> {
        await this.page.getByRole('link', { name: 'PIM' }).click();
    }

    async navigateToAdmin(): Promise<void> {
        await this.page.getByRole('link', { name: 'Admin' }).click();
    }
}
```

---

## 11.5 PIMPage

```typescript
// src/pages/PIMPage.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PIMPage extends BasePage {
    private addEmployeeButton = this.page.getByRole('button', { name: 'Add' });
    private searchButton = this.page.getByRole('button', { name: 'Search' });
    private employeeNameInput = this.page.getByRole('textbox', { name: 'Employee Name' });
    private tableRows = this.page.locator('.oxd-table-row').filter({ hasNot: this.page.locator('.oxd-table-header-row') });
    private noRecordsMessage = this.page.getByText('No Records Found');

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await this.navigate('/web/index.php/pim/viewEmployeeList');
    }

    async clickAddEmployee(): Promise<void> {
        await this.addEmployeeButton.click();
    }

    async searchByName(name: string): Promise<void> {
        await this.employeeNameInput.fill(name);
        await this.searchButton.click();
    }

    async verifyEmployeeCount(count: number): Promise<void> {
        await expect(this.tableRows).toHaveCount(count);
    }

    async verifyEmployeeVisible(name: string): Promise<void> {
        await expect(this.tableRows.filter({ hasText: name })).toBeVisible();
    }

    async verifyNoRecordsFound(): Promise<void> {
        await expect(this.noRecordsMessage).toBeVisible();
    }
}
```

---

## 11.6 Using Page Objects in Tests

Tests now read as high-level business steps:

```typescript
// tests/pim.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { PIMPage } from '../src/pages/PIMPage';

test.describe('PIM Module', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let pimPage: PIMPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        pimPage = new PIMPage(page);

        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
        await dashboardPage.verifyDashboardLoaded();
    });

    test('should search for employee by name', async () => {
        await dashboardPage.navigateToPIM();
        await pimPage.searchByName('John');
        await pimPage.verifyEmployeeVisible('John');
    });

    test('should show no records for unknown name', async () => {
        await dashboardPage.navigateToPIM();
        await pimPage.searchByName('XXXXXXNOONE');
        await pimPage.verifyNoRecordsFound();
    });

});
```

Notice: **no locators in the test file**. All `getByRole`, `getByPlaceholder`, and `locator()` calls live in the page objects.

---

## 11.7 Folder Structure

```
project/
├── tests/
│   ├── login.spec.ts
│   ├── pim.spec.ts
│   └── admin.spec.ts
├── src/
│   └── pages/
│       ├── BasePage.ts
│       ├── LoginPage.ts
│       ├── DashboardPage.ts
│       ├── PIMPage.ts
│       └── AdminPage.ts
├── playwright.config.ts
└── package.json
```

---

## Review Questions

**Q1. What problem does the Page Object Model solve?**

POM solves the maintenance problem caused by duplicated locators and interactions across test files. When a page changes, you update one page object class instead of every test that touches that page. It also improves readability — tests express business intent, not HTML details.

**Q2. What is a `BasePage` class?**

`BasePage` is a parent class that all page objects inherit from. It holds the `page` reference (passed via the constructor) and provides shared utility methods like `navigate()`, `waitForPageLoad()`, and `takeScreenshot()` that all pages can use without rewriting.

**Q3. What is the difference between `private` and `protected` in TypeScript classes?**

`private` members are accessible only inside the class they are defined in. `protected` members are accessible inside the class and in any subclass. In POM, the `page` property in `BasePage` is `protected` so that `LoginPage`, `DashboardPage`, etc. can access `this.page` to create locators.

**Q4. Why should locators NOT be in test files?**

Locators are implementation details of how to find elements. Tests should express what to verify (business logic), not how to find elements (HTML structure). If the page changes, only the page object needs updating — tests stay unchanged.

**Q5. How do you instantiate a page object in a test?**

Pass the `page` fixture to the constructor: `const loginPage = new LoginPage(page)`. This is done in `beforeEach` so each test gets a fresh instance.

**Q6. What should a page object method return?**

Most action methods return `Promise<void>` — they perform an action with no meaningful return value. Getter methods may return `Promise<string>` (text content) or `Promise<number>` (count). Methods that navigate should return `Promise<void>` and optionally verify the destination loaded.

**Q7. How do you handle locators that depend on dynamic data?**

Make the locator part of the method parameter rather than a class-level property: `async verifyEmployeeVisible(name: string)` creates the locator inside the method using the parameter. This keeps the method reusable for any data value.

**Q8. What does `this.page.locator('.row').filter({ hasText: name })` do?**

It finds all elements matching `.row`, then filters to only those containing the given text. This is the POM-friendly way to target a specific row in a dynamic table without using positional selectors.

**Q9. Can a page object extend another page object?**

Yes. For example, a `BaseAuthenticatedPage extends BasePage` could add a `logout()` method. Then `DashboardPage extends BaseAuthenticatedPage` inherits both `navigate()` and `logout()`. This creates a clean inheritance hierarchy.

**Q10. Why is POM particularly important in large test suites?**

In a large suite with many test files, the same page is touched by many tests. Without POM, a single locator change requires updating every test. With POM, you update one method in one file. The savings compound with scale — the larger the suite, the more POM pays off.
