# Assignment 05: Locators & Element Selection

---

## Learning Objectives

- Use all major locator strategies on OrangeHRM
- Choose the right locator based on the situation
- Use locator chaining and filtering
- Use Playwright Inspector and Codegen

---

## Instructions

- Continue using your `day04-playwright-intro` project
- Target application: `https://opensource-demo.orangehrmlive.com`
- Always log in before performing any action (use `beforeEach`)
- Run with `npx playwright test --headed` so you can see interactions

---

## Part A: Basic Locator Strategies

### Exercise 1: Role-Based Locators

Create `tests/locators.spec.ts`.

Log in to OrangeHRM in `beforeEach`. Then write tests that use `getByRole()`:

1. Locate the **Login button** on the login page using its role and name.
2. Locate the **Username input** using its label.
3. After login, locate the **"Dashboard"** heading by role.
4. Locate the **"Admin"** menu item in the top navigation using its role.

Print a message confirming each element was found.

---

### Exercise 2: Text and Label Locators

Write tests that use `getByText()`, `getByLabel()`, and `getByPlaceholder()`:

1. On the login page, locate the element with text `"Forgot your password?"`.
2. Locate the Username field using `getByLabel('Username')`.
3. Locate the Password field using `getByPlaceholder('Password')`.
4. After login, locate the `"Time at Work"` widget title using `getByText()`.

---

### Exercise 3: CSS and XPath Locators

Write tests using `page.locator()` with CSS and XPath selectors:

1. Use a CSS class selector to locate the login form.
2. Use an `input[type="text"]` CSS selector to locate the username field.
3. Use a CSS attribute selector to locate the login button.
4. Use an XPath expression to locate the main logo on the login page.
5. Inspect any element on OrangeHRM using browser DevTools. Write its CSS selector manually.

---

## Part B: Chaining and Filtering

### Exercise 4: Locator Chaining

After logging in, navigate to **Admin > User Management > Users**.

1. Locate the data table using a CSS selector.
2. Within the table, locate the first row using `.first()`.
3. Within the first row, locate the **username cell** using `.nth()` or a text locator.
4. Within the first row, locate the **Edit button**.

Each step should narrow down from the parent to the child element.

---

### Exercise 5: Locator Filtering

Still on the **User Management** page:

1. There are multiple rows in the table. Use `.filter({ hasText: 'Admin' })` to find the row containing the username `Admin`.

2. There are multiple action buttons (Edit, Delete). Use `.filter()` to get only the Edit button within a specific row.

3. Locate all rows in the table. Use `.count()` to print how many rows are visible.

4. Use `.nth(0)`, `.nth(1)` to access the first and second rows separately.

---

### Exercise 6: Handling Lists

Navigate to **PIM > Employee List**.

1. Locate all employee rows in the table.
2. Print the count.
3. Get the text of the first employee's name.
4. Locate the last row using `.last()`.
5. Use a `for` loop (with `.count()` and `.nth(i)`) to print the name of each employee.

---

## Part C: Playwright Inspector and Codegen

### Exercise 7: Use the Inspector

Run the following command:
```
npx playwright test tests/locators.spec.ts --debug
```

1. The Inspector will open. Step through your test one action at a time.
2. Hover over elements in the Inspector's browser window to see what locator Playwright suggests.
3. Note the difference between the suggested locator and the one you wrote.

---

### Exercise 8: Use Codegen

Run:
```
npx playwright codegen https://opensource-demo.orangehrmlive.com
```

1. Perform the following actions manually in the Codegen browser:
   - Log in with `Admin` / `admin123`
   - Navigate to **PIM > Employee List**
   - Click on any employee name

2. Look at the generated code in the Codegen window.

3. Copy the generated code into a new file `tests/codegen-generated.spec.ts`.

4. Run it. Does it pass? If not, what needs to be fixed?

5. Answer: What locator strategies did Codegen choose? Were they role-based, CSS, or XPath? Would you keep them as-is in a real project?
