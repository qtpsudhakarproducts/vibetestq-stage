# Chapter 13 — BDD with Cucumber

---

## What You Will Learn

- What Behaviour-Driven Development (BDD) is and when to use it
- How to write Gherkin feature files (`Feature`, `Scenario`, `Given/When/Then`)
- How to set up `@cucumber/cucumber` with Playwright
- How to write step definitions that map Gherkin to Playwright code
- How to use `Scenario Outline` with `Examples` for data-driven BDD
- How to use `Data Table` for structured data in steps

---

## 13.1 What Is BDD?

Behaviour-Driven Development is a process where tests are written as plain-language specifications that non-technical stakeholders (product managers, business analysts, clients) can read and understand.

The specification language is **Gherkin** — a structured plain-English syntax.

```
Without BDD:
test('login with valid credentials should redirect to dashboard')

With BDD:
Scenario: Successful login
    Given the user is on the login page
    When they enter "Admin" and "admin123"
    Then they should be on the Dashboard
```

**When to use BDD:**
- The team includes non-technical members who review or write acceptance criteria
- Tests serve as living documentation for business requirements

**When NOT to use BDD:**
- Pure technical team — POM with Playwright is simpler and faster to write

---

## 13.2 Project Setup

```bash
npm install -D @cucumber/cucumber ts-node @types/node
```

Create `cucumber.json` at the project root:

```json
{
  "default": {
    "require": ["src/step-definitions/**/*.ts"],
    "requireModule": ["ts-node/register"],
    "paths": ["tests/features/**/*.feature"],
    "format": ["progress-bar", "html:reports/cucumber.html"]
  }
}
```

Add a Playwright browser management helper:

```typescript
// src/support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class PlaywrightWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(PlaywrightWorld);
```

---

## 13.3 Feature Files (Gherkin)

Feature files describe a feature and its scenarios in plain language. They live in `tests/features/`.

**`tests/features/login.feature`**:

```gherkin
Feature: OrangeHRM Login

  Background:
    Given the user is on the OrangeHRM login page

  Scenario: Successful login with valid credentials
    When the user enters username "Admin" and password "admin123"
    And the user clicks the Login button
    Then the user should be redirected to the Dashboard

  Scenario: Failed login with invalid credentials
    When the user enters username "wrong" and password "wrong"
    And the user clicks the Login button
    Then an error message "Invalid credentials" should be displayed
```

**`tests/features/employee.feature`**:

```gherkin
Feature: Employee Management

  Background:
    Given the Admin is logged into OrangeHRM

  Scenario: Add a new employee
    When the Admin navigates to PIM module
    And clicks Add Employee
    And fills First Name "Test" and Last Name "Employee"
    And clicks Save
    Then a success message should be displayed

  Scenario: Search for an employee
    When the Admin navigates to PIM module
    And searches for employee named "John"
    Then the employee list should contain "John"
```

### Gherkin Keywords

| Keyword | Purpose |
|---------|---------|
| `Feature` | Names and describes the feature being tested |
| `Scenario` | A single test case |
| `Background` | Steps that run before every Scenario in the Feature |
| `Given` | Sets up the precondition (context) |
| `When` | Describes the action being taken |
| `Then` | States the expected outcome |
| `And` | Continues the previous Given/When/Then |

---

## 13.4 Step Definitions

Step definitions are TypeScript functions that map to Gherkin steps. Each `Given`, `When`, `Then` in the feature file must have a matching function in a step definition file.

**`src/step-definitions/login.steps.ts`**:

```typescript
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';

Before(async function (this: PlaywrightWorld) {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
});

After(async function (this: PlaywrightWorld) {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});

Given('the user is on the OrangeHRM login page', async function (this: PlaywrightWorld) {
    await this.page.goto('/web/index.php/auth/login');
});

When('the user enters username {string} and password {string}', async function (
    this: PlaywrightWorld,
    username: string,
    password: string
) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
});

When('the user clicks the Login button', async function (this: PlaywrightWorld) {
    await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('the user should be redirected to the Dashboard', async function (this: PlaywrightWorld) {
    await this.page.waitForURL('**/dashboard/index');
});

Then('an error message {string} should be displayed', async function (
    this: PlaywrightWorld,
    errorText: string
) {
    const errorLocator = this.page.getByText(errorText);
    const isVisible = await errorLocator.isVisible();
    if (!isVisible) {
        throw new Error(`Expected error message "${errorText}" to be visible`);
    }
});
```

**Parameter types in step definitions:**

| Pattern | Matches | TypeScript type |
|---------|---------|----------------|
| `{string}` | Text in double quotes | `string` |
| `{int}` | Integer number | `number` |
| `{float}` | Decimal number | `number` |
| `{word}` | Single word | `string` |

---

## 13.5 Scenario Outline with Examples

`Scenario Outline` defines a template. `Examples` provides the data rows. One test is generated per row.

```gherkin
Feature: Login Validation

  Scenario Outline: Login attempt with different credentials
    Given the user is on the OrangeHRM login page
    When the user enters username "<username>" and password "<password>"
    And the user clicks the Login button
    Then the outcome should be "<outcome>"

    Examples:
      | username | password | outcome   |
      | Admin    | admin123 | dashboard |
      | Admin    | wrong    | error     |
      | wrong    | admin123 | error     |
      | Admin    |          | error     |
```

The step definition handles the `<outcome>` parameter:

```typescript
Then('the outcome should be {string}', async function (this: PlaywrightWorld, outcome: string) {
    if (outcome === 'dashboard') {
        await this.page.waitForURL('**/dashboard/index');
    } else {
        const error = this.page.getByText('Invalid credentials');
        await error.waitFor({ state: 'visible' });
    }
});
```

---

## 13.6 Data Tables

A Data Table passes structured data to a step, useful for form-filling with multiple fields.

```gherkin
Scenario: Add multiple employees
  Given the Admin is logged into OrangeHRM
  When the Admin adds the following employees:
    | firstName | lastName | employeeId |
    | Priya     | Sharma   | EMP-101    |
    | Arjun     | Kumar    | EMP-102    |
    | Meena     | Reddy    | EMP-103    |
  Then all employees should appear in the PIM list
```

Step definition to handle a data table:

```typescript
When('the Admin adds the following employees:', async function (
    this: PlaywrightWorld,
    dataTable: any
) {
    const employees = dataTable.hashes();
    // hashes() converts the table to an array of objects:
    // [{ firstName: 'Priya', lastName: 'Sharma', employeeId: 'EMP-101' }, ...]

    for (const emp of employees) {
        await this.page.getByRole('link', { name: 'Add Employee' }).click();
        await this.page.getByPlaceholder('First Name').fill(emp.firstName);
        await this.page.getByPlaceholder('Last Name').fill(emp.lastName);
        await this.page.getByRole('textbox', { name: 'Employee Id' }).fill(emp.employeeId);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForURL('**/pim/viewEmployeeList');
    }
});
```

### Data Table Methods

| Method | Returns |
|--------|---------|
| `.hashes()` | Array of objects (header row = keys) |
| `.rows()` | Array of arrays (excluding header) |
| `.raw()` | Array of arrays (including header) |

---

## Review Questions

**Q1. What is BDD and what language is used for it?**

Behaviour-Driven Development (BDD) is a testing approach where test scenarios are written as plain-language specifications that business stakeholders can read. The language is Gherkin — it uses keywords like `Given`, `When`, `Then`, `Feature`, and `Scenario` to structure specifications.

**Q2. What is the purpose of `Given`, `When`, and `Then`?**

`Given` sets up the precondition — the starting state. `When` describes the user action. `Then` states the expected outcome. Together they form a complete behaviour specification: context → action → result.

**Q3. What is a step definition?**

A step definition is a TypeScript function that maps to a Gherkin step. It contains the actual Playwright automation code. When Cucumber encounters a `Given/When/Then` step in a feature file, it searches step definitions for a matching pattern and executes its function.

**Q4. What is a `Background` section?**

`Background` contains steps that run before every `Scenario` in the same `Feature` file. It is the Gherkin equivalent of `beforeEach`. Use it for common setup like navigating to the page or logging in.

**Q5. What is the difference between `Scenario` and `Scenario Outline`?**

`Scenario` runs once with fixed, hard-coded values. `Scenario Outline` is a template that runs once for each row in the `Examples` table. Placeholders in angle brackets (`<field>`) are replaced with data values from each row.

**Q6. What does `dataTable.hashes()` return?**

It returns an array of plain objects. The first row of the table is treated as property names (keys), and subsequent rows are treated as values. Each row becomes one object in the array. This is the most convenient format for iterating over form data.

**Q7. What is the `{string}` parameter type in a step definition?**

`{string}` matches text enclosed in double quotes in a Gherkin step and injects it as a `string` parameter into the step definition function. For example, the step `I search for "John"` would match a step defined as `When('I search for {string}', ...)` and pass `"John"` as the argument.

**Q8. How is Cucumber different from plain Playwright tests?**

Plain Playwright tests are TypeScript files that run directly. Cucumber adds a Gherkin layer — feature files describe behaviour in plain language, and step definitions connect them to Playwright code. Cucumber adds setup complexity but produces human-readable documentation alongside the tests.

**Q9. When should you choose BDD over plain Playwright POM tests?**

Choose BDD when non-technical team members need to write, read, or review test scenarios — such as product owners or business analysts who define acceptance criteria. Avoid it if the whole team is technical, as it adds ceremony (feature files + step definitions) without benefit.

**Q10. What is the `Before` and `After` hook in Cucumber?**

`Before` runs before each scenario. `After` runs after each scenario. They are used for browser lifecycle management (launching, closing). Unlike Playwright's `beforeEach`, Cucumber's `Before/After` must explicitly launch and close the browser because Cucumber does not manage fixtures automatically.
