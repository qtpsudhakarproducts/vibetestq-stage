# Chapter 5 — Locators & Element Selection

---

## What You Will Learn

- What a locator is and how Playwright uses them
- How to locate elements by role, text, label, and placeholder
- How to write CSS selectors and XPath expressions
- How to chain and filter locators for precise targeting
- How to work with lists of elements
- How to use Playwright Inspector and Codegen to discover locators

---

## 5.1 What Is a Locator?

A locator is an object that describes how to find one or more elements on the page. Playwright locators are **lazy** — they do not actually search the DOM until you perform an action or assertion on them. Each action re-queries the DOM, which means locators handle dynamic pages gracefully.

```typescript
// This does NOT search the DOM yet
const loginButton = page.getByRole('button', { name: 'Login' });

// The DOM is searched HERE
await loginButton.click();
```

---

## 5.2 Role-Based Locators (Preferred)

`getByRole` targets elements by their **ARIA role** — semantic information about what the element does. This is the most resilient locator strategy because it reflects how users and assistive technology interact with the page.

```typescript
// Buttons
await page.getByRole('button', { name: 'Login' }).click();
await page.getByRole('button', { name: 'Save' }).click();

// Links
await page.getByRole('link', { name: 'Forgot Password?' }).click();

// Text inputs (by aria label or associated label)
await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

// Headings
await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

// List items
const menuItems = page.getByRole('menuitem');
await expect(menuItems).toHaveCount(5);
```

Common ARIA roles in web apps: `button`, `link`, `textbox`, `heading`, `img`, `checkbox`, `radio`, `combobox`, `listitem`, `menuitem`, `dialog`, `alert`.

---

## 5.3 Text and Label Locators

### `getByText`

Matches any element containing the given text.

```typescript
await page.getByText('Welcome to OrangeHRM').click();
await expect(page.getByText('Invalid credentials')).toBeVisible();
```

For exact text match:

```typescript
await page.getByText('Login', { exact: true }).click();
```

### `getByLabel`

Matches a form field associated with a `<label>` element.

```typescript
await page.getByLabel('Username').fill('Admin');
await page.getByLabel('Password').fill('admin123');
```

### `getByPlaceholder`

Matches a form field by its `placeholder` attribute.

```typescript
await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');
```

### `getByAltText`

Matches an `<img>` by its `alt` attribute.

```typescript
const logo = page.getByAltText('OrangeHRM');
await expect(logo).toBeVisible();
```

---

## 5.4 CSS Selectors

CSS selectors are powerful for when semantic locators are not available. Playwright uses them with `page.locator('css-selector')`.

```typescript
// By class
await page.locator('.oxd-button').click();

// By id
await page.locator('#usernameInput').fill('Admin');

// By attribute
await page.locator('[name="username"]').fill('Admin');
await page.locator('[type="submit"]').click();

// By tag + class combination
await page.locator('button.oxd-button--main').click();

// Descendant selector
await page.locator('.oxd-form .oxd-button').click();

// :has-text pseudo-class (Playwright extension)
await page.locator('button:has-text("Login")').click();
```

---

## 5.5 XPath Selectors

XPath is an older selector language. Use it only when CSS selectors cannot target the element.

```typescript
// By text content
await page.locator('//button[text()="Login"]').click();

// By attribute
await page.locator('//input[@placeholder="Username"]').fill('Admin');

// Parent to child navigation
await page.locator('//div[@class="oxd-form"]//button').click();

// Sibling element
await page.locator('//label[text()="Username"]/following-sibling::div//input').fill('Admin');
```

XPath is often longer and harder to read. Prefer `getByRole`, `getByLabel`, or `getByPlaceholder` over XPath wherever possible.

---

## 5.6 Chaining Locators

Chain locators to narrow down to elements within a specific container.

```typescript
// Find a button inside a specific form
const loginForm = page.locator('.oxd-form');
await loginForm.getByRole('button', { name: 'Login' }).click();

// Find an input inside a specific panel
const sidebar = page.locator('.oxd-sidepanel');
await sidebar.getByRole('link', { name: 'PIM' }).click();
```

---

## 5.7 Filtering Locators

When multiple elements match a locator, use `.filter()` to narrow by an additional condition.

```typescript
// All rows in a table
const rows = page.locator('.oxd-table-row');

// Only the row that contains "John Smith"
const johnRow = rows.filter({ hasText: 'John Smith' });
await johnRow.getByRole('button', { name: 'Delete' }).click();

// Filter by child element presence
const activeRows = rows.filter({
    has: page.locator('.badge-success')
});
```

### Picking Specific Items from a List

```typescript
// First element
await page.locator('.menu-item').first().click();

// Last element
await page.locator('.menu-item').last().click();

// By index (0-based)
await page.locator('.menu-item').nth(2).click();
```

---

## 5.8 Handling Lists

When working with a list of similar elements:

```typescript
// Get all employee names from a table
const nameLocator = page.locator('.oxd-table-cell .employee-name');
const count = await nameLocator.count();

for (let i = 0; i < count; i++) {
    const name = await nameLocator.nth(i).textContent();
    console.log(name);
}

// Using allTextContents()
const allNames = await nameLocator.allTextContents();
console.log(allNames);  // ['John Smith', 'Jane Doe', ...]
```

---

## 5.9 Playwright Inspector

The Playwright Inspector is a GUI debugging tool. Launch it with:

```bash
PWDEBUG=1 npx playwright test tests/login.spec.ts
# On Windows (PowerShell):
$env:PWDEBUG=1; npx playwright test tests/login.spec.ts
```

The Inspector opens alongside the browser. You can:
- Step through test commands one at a time
- Hover over elements to see their locators highlighted
- Pick locators using the "Pick Locator" button in the toolbar

---

## 5.10 Playwright Codegen

Codegen records your browser interactions and generates Playwright code automatically.

```bash
npx playwright codegen https://opensource-demo.orangehrmlive.com
```

As you click, type, and interact with the page, the terminal displays the generated code. Copy the interactions you need into your test file.

Use Codegen as a **starting point**, then refine the generated locators to prefer role-based selectors over CSS selectors.

---

## Review Questions

**Q1. What is a Playwright locator and how is it different from `page.$` or Selenium's `findElement`?**

A Playwright locator is a lazy descriptor of elements. It does not query the DOM when created — it queries on each action or assertion. This means it automatically retries when elements are not yet available, making tests more resilient. Selenium's `findElement` immediately searches and throws if not found.

**Q2. Why is `getByRole` the recommended locator strategy?**

`getByRole` targets elements by ARIA semantic role, which is stable and meaningful. Roles rarely change when developers reorganise HTML or update CSS class names. It also reflects how users with assistive technology interact with the page, encouraging accessible UI design.

**Q3. What is the difference between `getByText` and `getByRole`?**

`getByText` matches any element containing the given text, regardless of its type. `getByRole` matches elements with a specific ARIA role (button, link, heading, etc.) and optionally a name. `getByRole('button', { name: 'Login' })` is more specific and less likely to match unexpected elements.

**Q4. When should you use CSS selectors?**

Use CSS selectors when semantic locators (`getByRole`, `getByLabel`, etc.) are not possible — for example, when the element has no accessible name or label. They are also useful for targeting by specific CSS classes when working with well-named, stable class names.

**Q5. What is the difference between `.first()`, `.last()`, and `.nth(index)`?**

All three select a specific element from a matched set. `.first()` returns the first, `.last()` returns the last, and `.nth(n)` returns the element at zero-based index `n`. These are needed when multiple elements match the locator.

**Q6. How does `.filter()` work on locators?**

`.filter()` narrows a set of matching elements to those that satisfy an additional condition — either `hasText` (contains a string) or `has` (contains a child element matching another locator). It does not reduce performance; filtering happens at query time.

**Q7. What does Playwright Codegen do?**

Codegen opens a browser and records user interactions (clicks, fills, navigations) as Playwright code. It is a productivity tool for quickly discovering locators and generating boilerplate test steps. The generated code should be reviewed and refined — role-based locators are preferred over generated CSS selectors.

**Q8. What is the difference between `page.locator()` and `page.getByRole()`?**

`page.locator()` accepts any CSS selector, XPath, or text selector. `page.getByRole()` is a purpose-built method that constructs the locator from ARIA role and name. Both return a `Locator` object. `getByRole` is preferred for accessibility and stability.

**Q9. What does `allTextContents()` do?**

`allTextContents()` returns a `Promise<string[]>` with the text content of all elements in the matched set. It is useful for verifying all items in a list or extracting all cell values from a table column.

**Q10. How do you locate an element inside a specific container?**

Chain locators. First locate the container, then call another locator method on it: `page.locator('.oxd-form').getByRole('button', { name: 'Login' })`. Playwright scopes the second query to the elements within the first match.
