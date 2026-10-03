# Assignment: Page Object Model (POM) Patterns

**Topics Covered:** OOPS (Classes/Inheritance), ES6 Modules, Factory Pattern, Functional Composition  
**Difficulty:** Advanced  
**Estimated Time:** 4-5 hours  
**Reference:** Document 10 & 11 from documentation

---

## Introduction

**Context:** This assignment is a **prerequisite** for the Playwright automation module. Before you write a single line of actual Playwright code, you must master the *architecture* of automation frameworks. Playwright relies heavily on JavaScript Objects, Classes, and Modules. If you understand these structures now, learning the Playwright tool itself will be easy.

In this assignment, you will simulate the **Page Object Model (POM)** using two architectural styles. We will use **Playwright terminology** (like `page`, `goto`, `fill`) so you get used to the vocabulary.

1.  **OOPS with POM**: The standard Class-based approach.
2.  **Modules with POM**: A functional approach using exported functions.

**Constraint:** **Do NOT install Playwright yet.** Do not use actual `page.locator()` calls. You are purely building the *skeleton* and logic of the framework using standard JavaScript `console.log` and `async/await` to simulate the browser.

---

## Part A: Project Setup (5 points)

Create two separate folders for this assignment to keep the implementations distinct:
```text
/pom-assignment
  ├── /oops-style      # For Part B
  └── /module-style    # For Part C
```

---

## Part B: OOPS with POM (45 points)

In this section, practice **Object-Oriented Programming** principles. This mimics the official Playwright documentation style for POM.

### Exercise 1: The BasePage Class
Create `oops-style/pages/BasePage.js`.
- **Concept:** Inheritance.
- **Task:** Create a class with common methods:
    - `constructor(page)`: Store the page fixture.
    - `goto(url)`: Log "Navigating to [url]..."
    - `click(selector)`: Log "Clicking [selector]..."
    - `fill(selector, text)`: Log "Typing [text] into [selector]..."

```javascript
export default class BasePage {
    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        console.log(`[Page: ${this.page.name}] Navigating to ${url}`);
    }
    // Implement click and fill...
}
```

### Exercise 2: Components (Composition)
Create `oops-style/components/Header.js`.
- **Concept:** Composition. Pages *have* a Header component.
- **Task:** Create a class `Header`.
    - `constructor(page)`: Accepts the page object.
    - `search(query)`
    - `logout()`

### Exercise 3: Page Implementation
Create `oops-style/pages/LoginPage.js` and `oops-style/pages/DashboardPage.js`.
- **LoginPage**: Extends `BasePage`.
    - Methods: `login(user, pass)` (uses `this.fill` and `this.click`).
- **DashboardPage**: Extends `BasePage`.
    - Has a property `this.header = new Header(page)`.
    - Methods: `getWelcomeMessage()`.

### Exercise 4: Test Execution (OOPS)
Create `oops-style/test.js`.
- Create a mock page object: `const mockPage = { name: 'Chromium' };`
- Instantiate `LoginPage`.
- Perform Login.
- Instantiate `DashboardPage`.
- Use the header component: `dashboard.header.search(...)`.

---

## Part C: Modules with POM (45 points)

In this section, practice the **Functional / Module-based** pattern. This is less common in Playwright but valid for simple projects or utility libraries.

### Exercise 5: Shared Actions Module
Create `module-style/utils/actions.js`.
- **Concept:** Pure functions.
- **Task:** Export functions that accept a `page` as the first argument.
```javascript
export async function goto(page, url) { ... }
export async function click(page, selector) { ... }
export async function fill(page, selector, text) { ... }
```

### Exercise 6: Page Modules
Create `module-style/pages/loginPage.js`.
- **Concept:** The file *is* the page object container.
- **Task:**
```javascript
import * as actions from '../utils/actions.js';

// Notice 'page' is passed to every function
export async function login(page, username, password) {
    await actions.fill(page, 'UsernameField', username);
    await actions.fill(page, 'PasswordField', password);
    await actions.click(page, 'LoginBtn');
}
```

Create `module-style/pages/dashboardPage.js`.
- **Task:** Export `verifyLoaded(page)` and specific dashboard actions.
- **Note:** Comparing to OOPS, you don't 'own' the `page` object in a class state; you pass it around.

### Exercise 7: Test Execution (Modules)
Create `module-style/test.js`.
- Import the functions: `import { login } from './pages/loginPage.js'`.
- Pass the state (mockPage) explicitly.
```javascript
const mockPage = { name: 'Firefox' };
await login(mockPage, 'admin', '1234');
// await dashboard.search(mockPage, 'playwright strategies');
```

---

## Part D: Comparison & Analysis (5 points)

Create a file `COMPARISON.md` and answer:
1. In Playwright, `test` fixtures provide a fresh `page` object for every test. Which pattern (Class vs Module) fits this model more naturally?
2. How does "Dependency Injection" (passing `page` in constructor vs argument) change how you write tests?

---

## Submission

1. Submit the full `pom-assignment` folder.
2. Ensure both test scripts run successfully with `node`.

## Grading Rubric
- **OOPS Implementation (40%)**: Correct structure (Classes, `this.page`).
- **Module Implementation (40%)**: Correct structure (Functions, `page` arg).
- **Playwright Naming (10%)**: Using `goto`, `fill`, `click` terminology.
- **Analysis (10%)**: Thoughtful comparison.

## Common Mistakes
❌ Using `driver` instead of `page`.
❌ Using `type` (Selenium) instead of `fill` (Playwright).
❌ Mixing state: Storing `page` in a global variable instead of passing it.
