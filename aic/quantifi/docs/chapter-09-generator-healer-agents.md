# Chapter 9 — Generator & Healer Agents

---

## What You Will Learn

- How generator agents create Playwright tests from user stories and page inspection
- How healer agents detect and fix broken locators automatically
- Why locators break and how to write resilient locators
- Strategies for making tests self-healing without external tools

---

## 9.1 What Is a Generator Agent?

A generator agent is an AI workflow that reads test requirements and produces complete, runnable Playwright test code. Unlike asking Copilot for a single test, a generator agent can use tools (like Playwright MCP) to inspect the live page, understand the DOM, and produce accurate locator-based tests.

```
Input  → User story / feature description
Output → Complete test file with imports, describe blocks, locators, assertions
```

---

## 9.2 Generating Tests from User Stories

A user story describes a feature from the user's perspective:

```
As an Admin, I want to add a new employee in the PIM module
so that the employee appears in the employee list.

Acceptance Criteria:
- Admin is logged in
- Navigate to PIM > Add Employee
- Fill in First Name, Last Name, Employee ID
- Click Save
- Employee appears in the employee list
```

Provide this to a generator agent (Copilot Chat or Cursor with MCP):

```
Convert this user story into a Playwright TypeScript test.
Use getByRole and getByPlaceholder for locators.
Target URL: https://opensource-demo.orangehrmlive.com
The app requires login with Admin / admin123 first.
```

### Reviewing Generated Output

The AI will produce something like:

```typescript
import { test, expect } from '@playwright/test';

test('Admin can add a new employee', async ({ page }) => {
    // Login
    await page.goto('/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard/index');

    // Navigate to PIM > Add Employee
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    // Fill the form
    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('Employee');
    await page.getByRole('textbox', { name: 'Employee Id' }).fill('EMP001');
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify
    await expect(page.getByText('Successfully Saved')).toBeVisible();
});
```

**Always run and verify this code.** Locator names must be confirmed against the actual page.

---

## 9.3 Generating Tests from Page Inspection (MCP)

When Playwright MCP is connected, you can ask the AI to inspect the real page:

```
Open https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee
after logging in.
Inspect the form and identify all input fields and their locators.
Generate a test that fills in the form and submits it.
```

The AI uses MCP to:
1. Navigate to the page
2. Read the accessibility tree
3. Find all interactive elements
4. Generate locators that actually match the real DOM

This produces far more accurate code than generating from a text description alone.

---

## 9.4 Why Locators Break

Locators break when the HTML structure of a page changes. Common causes:

| Change | Example | Impact |
|--------|---------|--------|
| ID renamed | `id="btn-login"` → `id="login-btn"` | CSS/XPath breaks |
| Class renamed | `.oxd-button` → `.btn-primary` | CSS breaks |
| Text changed | `"Save"` → `"Save Changes"` | `getByText` breaks |
| DOM restructured | Button moved inside a different container | Chained locators break |
| Label renamed | `"Username"` → `"User Name"` | `getByLabel` breaks |

The most resilient locators target stable semantic properties: ARIA roles, ARIA labels, and stable test IDs.

---

## 9.5 What Is a Healer Agent?

A healer agent monitors test runs and automatically fixes locators when they break. When a test fails with a "locator not found" error, the healer:

1. Opens the page at the point of failure
2. Inspects the live DOM
3. Finds a new locator that matches the same element
4. Updates the test (or page object) with the fixed locator

---

## 9.6 Simulating a Healer Workflow with AI

Without a dedicated healing tool, you can use AI Chat to simulate healing:

**Step 1:** A test fails:

```
Error: locator.click: Error: locator('button.login-btn') resolved to hidden
```

**Step 2:** Paste the error and ask AI to fix it:

```
This Playwright test is failing:

await page.locator('button.login-btn').click();

Error: locator.click: Error: locator('button.login-btn') resolved to hidden

I inspected the page and the login button is now:
<button type="submit" role="button" class="oxd-button oxd-button--main">Login</button>

Rewrite the locator using getByRole.
```

**Step 3:** AI suggests:

```typescript
await page.getByRole('button', { name: 'Login' }).click();
```

---

## 9.7 Locator Resilience Best Practices

Building resilient locators reduces how often healing is needed.

### Prefer Semantic Locators

```typescript
// Fragile — breaks when class changes
await page.locator('.oxd-button--main').click();

// Resilient — stable ARIA role
await page.getByRole('button', { name: 'Login' }).click();
```

### Use `data-testid` Attributes for Stability

```html
<button data-testid="login-button" class="btn btn-primary">Login</button>
```

```typescript
await page.getByTestId('login-button').click();
```

Test IDs are added by developers specifically for testing and are never changed for visual reasons.

### Avoid Positional Selectors

```typescript
// Fragile — position can change if new rows are added
await page.locator('tr:nth-child(2) td:nth-child(1)').click();

// Better — use text or semantic role
await page.locator('.oxd-table-row').filter({ hasText: 'John Smith' }).click();
```

### Avoid Long XPath Chains

```typescript
// Fragile — breaks if any parent changes
//div[@class="container"]//div[@class="panel"]//form//button[1]

// Better
await page.getByRole('button', { name: 'Submit' }).click();
```

### Verify Locator Coverage Regularly

After UI changes, run your full test suite. Failures are localised — if locators live in page objects, you fix them in one place.

---

## 9.8 Locator Review: Good vs Bad

| Locator | Type | Resilience | Comment |
|---------|------|----------|---------|
| `getByRole('button', { name: 'Login' })` | Role | High | Best option |
| `getByLabel('Username')` | Label | High | Relies on label text |
| `getByPlaceholder('Username')` | Placeholder | High | Relies on placeholder |
| `getByTestId('login-btn')` | Test ID | Very High | Needs developer cooperation |
| `locator('.oxd-input')` | CSS class | Medium | Stable class names OK |
| `locator('#username')` | ID | Medium | IDs can change |
| `locator('input[type="text"]')` | Attribute | Low | Too generic |
| `locator('//div/form/input[1]')` | XPath position | Very Low | Breaks on restructure |

---

## Review Questions

**Q1. What is a generator agent in the context of test automation?**

A generator agent is an AI workflow (often using a chat model with MCP) that takes test requirements such as user stories, feature specs, or plain descriptions and produces complete runnable Playwright test code. It can optionally use tools to inspect the live page for accurate locators.

**Q2. Why do locators break?**

Locators break when the underlying HTML changes. The most common causes are: developers renaming CSS classes, changing element IDs, rewording button/label text, or restructuring the DOM layout. Positional locators (nth-child, first sibling) are the most fragile.

**Q3. What is a healer agent?**

A healer agent detects failed locators after a test run and automatically repairs them. It opens the page at the point of failure, inspects the DOM to find the same element by alternative means, and updates the code with the new locator. This reduces maintenance burden after UI changes.

**Q4. What is the most resilient type of locator?**

`data-testid` attributes are the most resilient because they are added explicitly for testing and are never changed for styling or business reasons. Among semantic locators, `getByRole` is the most resilient because ARIA roles reflect stable user-facing behaviour.

**Q5. What is the difference between generating tests from a user story vs using MCP?**

Generating from a user story produces code based on text descriptions — locators are guesses. Generating with MCP means the AI actually opens the browser, inspects the live accessibility tree, and generates locators from what it sees. MCP-based generation is significantly more accurate.

**Q6. How do you fix a broken locator for a class renamed from `.old-btn` to `.new-btn`?**

The simplest fix is to use a semantic locator that does not depend on the class. For example, replace `page.locator('.old-btn')` with `page.getByRole('button', { name: 'Save' })`. This targets the button by role and accessible name, which tend to be stable.

**Q7. Why should you avoid XPath position selectors like `//div[1]/button`?**

Position selectors break if a new element is inserted before the targeted element, shifting positions. They are also hard to read and maintain. Semantic and attribute-based locators are much more stable and expressive.

**Q8. What is `data-testid` and who is responsible for adding it?**

`data-testid` is a custom HTML attribute added by developers to mark elements specifically for automated testing. Developers agree not to change these IDs when doing visual redesigns. Test engineers and developers must coordinate on a naming convention and which elements to tag.

**Q9. How can you use AI to "heal" a broken locator manually?**

Paste the failing line and error message into Copilot Chat or Cursor. Add the relevant HTML from DevTools showing the current state of the element. Ask the AI to suggest a corrected, resilient locator. This simulates what an automated healer does, but manually.

**Q10. What is the benefit of placing locators in page objects when it comes to healing?**

If locators live in page object classes rather than directly in test files, a broken locator needs to be fixed in only one place (the page object method). All tests that use that method benefit from the fix automatically. This dramatically reduces the effort of healing after UI changes.
