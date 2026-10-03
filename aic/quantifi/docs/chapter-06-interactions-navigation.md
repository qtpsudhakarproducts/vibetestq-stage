# Chapter 6 — Interactions, Actions & Navigation

---

## What You Will Learn

- How to fill forms and click elements
- How to work with dropdowns, checkboxes, and radio buttons
- How to simulate keyboard input
- How to hover over elements
- How to navigate between pages
- How to wait for page load states
- How to capture screenshots

---

## 6.1 Filling Forms

### `fill` vs `type`

```typescript
// fill — clears the field first, then sets the value instantly
await page.getByPlaceholder('Username').fill('Admin');

// type — simulates typing character by character (triggers keypress events)
await page.getByPlaceholder('Search').type('John');
```

Use `fill` for form inputs. Use `type` only when the page reacts to individual keystrokes (e.g., live search, autocomplete).

### Clearing an Input

```typescript
await page.getByPlaceholder('Username').clear();
```

### Focused Input and Keyboard Entry

```typescript
await page.getByLabel('First Name').focus();
await page.keyboard.type('Priya');
```

---

## 6.2 Click Operations

```typescript
// Standard click
await page.getByRole('button', { name: 'Login' }).click();

// Double-click
await page.locator('.record-row').dblclick();

// Right-click
await page.locator('.record-row').click({ button: 'right' });

// Click with modifier key held
await page.locator('.checkbox').click({ modifiers: ['Shift'] });

// Force click (bypasses actionability checks — use sparingly)
await page.locator('.hidden-button').click({ force: true });
```

---

## 6.3 Select Dropdowns

### HTML `<select>` Elements

```typescript
// Select by visible text
await page.getByLabel('Nationality').selectOption('Indian');

// Select by value attribute
await page.getByLabel('Country').selectOption({ value: 'IN' });

// Select by index (0-based)
await page.getByLabel('Country').selectOption({ index: 2 });
```

### Custom Dropdown (non-native)

Many modern frameworks use custom dropdown components (not `<select>`). Handle these by clicking the trigger, then selecting the option from the opened list.

```typescript
// Open the dropdown
await page.locator('.oxd-select-wrapper').click();

// Click the desired option
await page.getByRole('option', { name: 'Full Time' }).click();
```

---

## 6.4 Checkboxes and Radio Buttons

```typescript
// Check a checkbox
await page.getByLabel('Remember Me').check();

// Uncheck
await page.getByLabel('Remember Me').uncheck();

// Verify checked state
await expect(page.getByLabel('Remember Me')).toBeChecked();

// Radio button — same as checkbox
await page.getByLabel('Male').check();
await expect(page.getByLabel('Male')).toBeChecked();
```

---

## 6.5 Keyboard Operations

The `keyboard` object sends raw keyboard events.

```typescript
// Press a single key
await page.keyboard.press('Enter');
await page.keyboard.press('Tab');
await page.keyboard.press('Escape');

// Press with modifier
await page.keyboard.press('Control+A');  // Select All
await page.keyboard.press('Control+C');  // Copy

// Type text
await page.keyboard.type('Hello World');

// Practical use: submit a form by pressing Enter
await page.getByPlaceholder('Search').fill('Thomas');
await page.keyboard.press('Enter');
```

### Pressing Keys on Specific Elements

```typescript
await page.getByRole('textbox', { name: 'Search' }).press('Enter');
```

---

## 6.6 Hover

Some UI elements (tooltips, dropdown menus, submenus) only appear when you hover over a parent element.

```typescript
// Hover to reveal a submenu
await page.getByRole('menuitem', { name: 'Admin' }).hover();

// Now the submenu is visible — click the item
await page.getByRole('menuitem', { name: 'User Management' }).click();
```

---

## 6.7 Navigation

```typescript
// Navigate to a URL (absolute or relative if baseURL is set)
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
// or with baseURL configured:
await page.goto('/web/index.php/auth/login');

// Browser history navigation
await page.goBack();
await page.goForward();

// Reload the page
await page.reload();

// Navigate and wait for network to be idle
await page.goto('/web/index.php/dashboard/index', { waitUntil: 'networkidle' });
```

### `waitUntil` Options

| Value | Waits until... |
|-------|----------------|
| `'load'` | The `load` event fires (default) |
| `'domcontentloaded'` | The DOM is parsed, scripts not yet run |
| `'networkidle'` | No network requests for 500ms |
| `'commit'` | Navigation is committed (initial HTML received) |

---

## 6.8 Waiting for Load States

After an action that triggers navigation or loading, wait for a stable page state.

```typescript
// Wait for page to finish loading after a click
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForLoadState('networkidle');

// Wait for a specific URL pattern
await page.waitForURL('**/dashboard/index');

// Wait for an element to become visible
await page.waitForSelector('.oxd-topbar-header');
```

Playwright's auto-waiting handles most cases. Use explicit waits only when the page has complex async loading.

---

## 6.9 Screenshots

```typescript
// Full page screenshot
await page.screenshot({ path: 'screenshots/dashboard.png', fullPage: true });

// Screenshot of a specific element only
await page.locator('.oxd-topbar-header').screenshot({ path: 'screenshots/header.png' });
```

Screenshots are automatically saved if you configure `screenshot: 'only-on-failure'` or `screenshot: 'on'` in `playwright.config.ts`.

---

## Review Questions

**Q1. What is the difference between `fill` and `type`?**

`fill` clears the field and sets the value instantly — it is fast and bypasses low-level key events. `type` simulates typing character by character, triggering individual keydown/keypress/keyup events. Use `fill` for standard form inputs and `type` when the page uses JavaScript key event listeners (like autocomplete search boxes).

**Q2. How does Playwright handle `<select>` dropdowns?**

Use `selectOption()` on the `<select>` element. You can select by visible text, by the `value` attribute, or by index. For custom dropdown components (non-native), you typically click the trigger element and then click the option item from the opened list.

**Q3. How do you interact with checkboxes in Playwright?**

Use `.check()` to check and `.uncheck()` to uncheck. After the action, verify the state with `expect(locator).toBeChecked()` or `expect(locator).not.toBeChecked()`.

**Q4. What is the difference between `page.goto()` and `page.waitForURL()`?**

`page.goto()` navigates to a URL and waits for the page to load. `page.waitForURL()` waits for the current URL to match a pattern without navigating. Use `waitForURL` after a click that triggers navigation and you want to confirm you arrived at the right page.

**Q5. What are the `waitUntil` options for `page.goto()`?**

`load` (default) waits for the `load` event. `domcontentloaded` waits for the HTML to parse. `networkidle` waits until there are no network requests for 500ms. `commit` waits only for the initial response to be received. `networkidle` is the most thorough but slowest.

**Q6. When should you use explicit waits like `waitForLoadState`?**

Playwright's auto-waiting handles most cases. Use explicit waits when: (1) an action does not directly interact with an element (like a background data fetch), (2) a page has complex async rendering that does not trigger predictable DOM changes, or (3) you need to confirm the page is stable before taking a screenshot.

**Q7. How do you simulate pressing Enter after typing in a search field?**

```typescript
await page.getByRole('textbox', { name: 'Search' }).fill('Thomas');
await page.keyboard.press('Enter');
// or directly on the element:
await page.getByRole('textbox', { name: 'Search' }).press('Enter');
```

**Q8. What is the `force: true` option in `click()`?**

`force: true` bypasses Playwright's actionability checks (visibility, stability, enabled state). Use it sparingly — only when you are sure the element is there but Playwright's auto-detection fails (e.g., elements hidden behind a CSS layer that still accept clicks). Overusing it masks real problems.

**Q9. How do you interact with a hover-reveal submenu?**

First hover over the parent using `.hover()`. This triggers the CSS `:hover` state which reveals the child menu. Then click the desired item in the submenu. Playwright will auto-wait for the item to be stable before clicking.

**Q10. Where are screenshots saved when configured with `screenshot: 'only-on-failure'`?**

Playwright saves them inside the `test-results` folder alongside other test artifacts (video, trace). Each test gets its own subfolder named after the test. You can configure the output directory with `outputDir` in the config.
