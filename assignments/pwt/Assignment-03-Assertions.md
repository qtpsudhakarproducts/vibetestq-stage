# Assignment 03: Web-First Assertions

**Topics Covered:** Expect, Auto-waiting, Boolean vs. Web-First Assertions, Custom Timeouts
**Difficulty:** Beginner  
**Estimated Time:** 1 hour  

---

## Instructions

- Use `expect` from `@playwright/test`
- Avoid using `page.waitForTimeout()` (hard sleeps)
- Test your assertions against both passing and failing scenarios

---

## Part A: Understanding Web-First Assertions (30 points)

### Exercise 1: Why Web-First? (10 points)
Explain the concept of "Auto-waiting" in Playwright assertions. What is the default timeout for an `expect()` assertion?

### Exercise 2: Boolean vs. Web-First (20 points)
Rewrite the following "flaky" Selenium-style assertion into a "stable" Playwright Web-First assertion:
```javascript
// Flaky (Logic inside)
const isVisible = await page.locator('#status').isVisible();
expect(isVisible).toBe(true);

// Stable (Playwright Way)
// ???
```

---

## Part B: Common Assertions (40 points)

### Exercise 3: State Verification (20 points)
Navigate to a page and perform the following verifications:
1. Verify that a specific button is **enabled**.
2. Verify that a checkbox is **unchecked** initially.
3. Verify that a dropdown has a specific **value** selected.
4. Verify that a text input is **editable**.

### Exercise 4: Content Verification (20 points)
Check the text and appearance of elements:
1. Assert that a heading contains the exact text "Welcome to our Portal".
2. Assert that a URL contains the string "/dashboard".
3. Assert that an element has a specific **CSS class** (e.g., `active`).

---

## Part C: Advanced Assertions & Timeouts (30 points)

### Exercise 5: Negative Assertions (15 points)
Sometimes we need to verify that something is NOT there. Write assertions to:
1. Ensure a "Loading..." spinner is **hidden** or **detached** from the DOM.
2. Ensure an error message is **not visible**.

### Exercise 6: Custom Timeouts (15 points)
By default, assertions wait for 5 seconds. Write an assertion that waits for up to **10 seconds** for a specific text to appear.
```javascript
await expect(locator).toHaveText('Success', { timeout: ??? });
```

---

## Bonus Challenge (10 points)

### Exercise 7: Soft Assertions
Playwright allows "Soft Assertions" where the test continues even if the assertion fails. Write a test with three soft assertions and one regular assertion. Explain a use case where soft assertions are helpful.

---

## Submission Guidelines

1. Create a file `assignment03_assertions.spec.js`
2. Include at least 5 different types of assertions
3. Ensure no `waitForTimeout` is used in your code

## Grading Rubric

- **Assertion Choice (40%)**: Use of appropriate Web-First matchers
- **Auto-waiting Logic (30%)**: Avoiding manual sleeps and using built-in waiting
- **Negative Verification (20%)**: Correct handling of hidden/missing elements
- **Timeouts & Config (10%)**: Correct use of custom timeout options

---

**Total Points: 100 + 10 Bonus**
