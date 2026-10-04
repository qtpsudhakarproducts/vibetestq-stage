# Assignment 09: Generator & Healer Agents

---

## Learning Objectives

- Use AI to automatically generate Playwright tests from descriptions
- Understand how self-healing locators work
- Deliberately break a locator and use AI to fix it
- Explore AI-powered locator maintenance strategies

---

## Instructions

- Continue using your Playwright project with MCP configured
- Target application: `https://opensource-demo.orangehrmlive.com`
- Use Copilot Chat, Cursor Agent, or another GenAI tool
- Record every prompt you give and what the AI generated

---

## Part A: Generator Agents

### Exercise 1: Generate Tests from User Stories

Use Copilot Chat (or Cursor Agent) with this prompt:

```
Generate Playwright TypeScript tests for the following user stories on OrangeHRM:

1. As an Admin, I want to add a new employee so that they appear in the employee list.
2. As an Admin, I want to search for an employee by name so that I can find them quickly.
3. As an Admin, I want to reset an employee's login password.

Use https://opensource-demo.orangehrmlive.com. Login: Admin/admin123.
Use getByRole and getByLabel locators where possible. Include beforeEach for login.
```

1. Save the generated code to `tests/generated-tests.spec.ts`.
2. Run it. How many tests pass without any fixes?
3. Fix any failing tests. What were the issues?
4. Add assertions to any test that does not have them.

---

### Exercise 2: Generate from Page Inspection

1. Open OrangeHRM and navigate to **Leave > Apply**.
2. Use the MCP browser tool (or paste the form HTML into Copilot Chat) and ask:
   ```
   Generate a Playwright test for this "Apply Leave" form. Fill in all visible fields and click Apply.
   ```

3. Save the test to `tests/generated-leave.spec.ts`.
4. Run and fix it.
5. Answer: Did the AI get the correct locators for dropdown fields? What needed manual correction?

---

## Part B: Healer Agents

### Exercise 3: Break a Locator Intentionally

Take the Login test from Assignment 04 or 07.

1. Change the username field locator from the correct one to a **wrong CSS class** that no longer exists.
   - Example: Change `getByLabel('Username')` to `page.locator('.wrongInput')`

2. Run the test. Confirm it fails.

3. Paste the failing test + error message into Copilot Chat:
   ```
   This Playwright test is failing with the error below.
   Can you identify why the locator is wrong and suggest a fix?
   [paste your test code]
   [paste the error message]
   ```

4. Apply the fix and verify the test passes again.

---

### Exercise 4: Simulate a Locator Change

This simulates what happens when developers change the UI.

1. Take your OrangeHRM Add Employee test.
2. Identify the locator used for the **First Name** field.
3. Pretend the developer changed the input's `id` attribute. Update your locator to use a **different, wrong attribute** so the test breaks.
4. Run it — it should fail.
5. Use this prompt in Copilot Chat:
   ```
   My Playwright test for adding an employee in OrangeHRM is now failing. 
   The page structure may have changed. 
   Given this OrangeHRM page URL and this test code, suggest a more resilient locator that won't break.
   ```
6. Apply a more resilient locator (preferably `getByLabel`, `getByRole`, or `getByPlaceholder`).
7. Run and verify it passes.

---

## Part C: Best Practices

### Exercise 5: Locator Resilience Review

Go through all tests you have written so far.

1. Make a list of every locator you used:
   - Mark `✅` if it uses `getByRole`, `getByLabel`, `getByText`, or `getByPlaceholder`
   - Mark `⚠️` if it uses a CSS class (e.g., `.orangehrm-card`)
   - Mark `❌` if it uses an `id` that looks auto-generated or might change

2. For every `⚠️` and `❌` locator, ask Copilot Chat: `"Is there a more resilient Playwright locator for this element?"`

3. Update at least **3 locators** to more resilient alternatives and verify tests still pass.

4. Write a short comment block in your test file explaining:  
   *"What makes a locator resilient in Playwright and why role-based locators are preferred?"*
