# Assignment 06: Interactions, Actions & Navigation

---

## Learning Objectives

- Perform clicks, fills, selects, and checkboxes on OrangeHRM
- Use keyboard and mouse operations
- Navigate between pages and handle load states
- Handle alerts and take screenshots

---

## Instructions

- Continue using your Playwright project
- Target application: `https://opensource-demo.orangehrmlive.com`
- Log in before each test using `beforeEach`
- Create `tests/interactions.spec.ts` for all exercises

---

## Part A: Basic Interactions

### Exercise 1: Fill Forms

Navigate to **PIM > Add Employee**.

1. Fill in the **First Name** field.
2. Fill in the **Last Name** field.
3. Clear the First Name field and re-type a different name.
4. Verify the field contains the new value using an assertion.
5. Take a screenshot of the filled form before saving.

---

### Exercise 2: Click Operations

1. After filling the form in Exercise 1, click the **Save** button.
2. Verify the URL changes to the employee's profile page.
3. Navigate back to **PIM > Employee List** using the menu.
4. Click on the first employee in the list.
5. Use `page.goBack()` to return to the Employee List.

---

### Exercise 3: Select and Checkbox

Navigate to **My Info** after logging in.

1. Find and change the **Nationality** dropdown — select any country.
2. Find and change the **Marital Status** dropdown.
3. Verify the selected values using assertions.

Navigate to **Admin > User Management > Users > Add**:
1. Locate the **Status** dropdown in the Add User form and select `"Enabled"`.
2. If there are any checkboxes on any OrangeHRM page, check one and verify it is checked.

---

## Part B: Keyboard and Mouse

### Exercise 4: Keyboard Operations

Navigate to **PIM > Employee List**.

1. Click the **Search** input field and type a name using `page.keyboard.type()` instead of `.fill()`.
2. Press **Enter** using `page.keyboard.press('Enter')` to trigger search.
3. Verify results appear.

Navigate to the login page:
1. Use `Tab` key to move from the username field to the password field.  
   Confirm focus moved using `.isFocused()`.
2. Type a username, then use `Control+A` to select all, then type a new value.

---

### Exercise 5: Hover

1. After logging in, hover over the user profile icon in the top-right corner.
2. Assert that the dropdown menu becomes visible after hovering.
3. From the dropdown, click **"Logout"** and verify you are returned to the login page.

Navigate to **PIM > Employee List**:
1. Hover over an employee row and observe if any action button appears (edit/delete).
2. If a button appears on hover, click it.

---

## Part C: Navigation & Page States

### Exercise 6: Navigation

1. Navigate to the OrangeHRM login page directly using `page.goto()`.
2. Log in and verify the dashboard URL.
3. Use `page.goBack()` — where do you end up?
4. Use `page.goForward()` — do you return to the dashboard?
5. Use `page.reload()` on the Dashboard. Assert the Dashboard is still visible after reload.

---

### Exercise 7: Waiting for Load States

1. After clicking the Login button, use `page.waitForLoadState('networkidle')` before asserting the dashboard.
2. Navigate to **PIM > Employee List** and wait for the employee table to be visible before asserting the row count.
3. Explain the difference between `'load'`, `'domcontentloaded'`, and `'networkidle'`. Write your answer as a comment.

---

### Exercise 8: Screenshots

Write tests that capture:

1. A full-page screenshot of the OrangeHRM Dashboard. Save it as `screenshots/dashboard-full.png`.
2. A screenshot of just the left navigation menu element. Save it as `screenshots/nav-menu.png`.
3. A screenshot on test failure — add a step inside a `try/catch` that captures the page when an assertion fails.
