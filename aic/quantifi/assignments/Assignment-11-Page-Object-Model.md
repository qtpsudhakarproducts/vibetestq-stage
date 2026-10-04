# Assignment 11: Page Object Model (POM)

---

## Learning Objectives

- Understand why POM separates locators from tests
- Create page classes for OrangeHRM screens
- Build a Base Page with shared utilities
- Use inheritance for pages that extend the base
- Write tests using page objects only — no locators in tests

---

## Instructions

- Continue using your Playwright project
- Create a `pages/` folder inside your project
- All locators live in page classes — **never** write a locator directly in a test
- Tests should only call page methods
- Target application: `https://opensource-demo.orangehrmlive.com`

---

## Part A: Base Page and Login Page

### Exercise 1: BasePage Class

Create `pages/BasePage.ts`.

This class should receive the `page` object in its constructor and provide shared methods:
- `navigate(path: string)` — go to a URL path
- `getTitle()` — return the page title
- `takeScreenshot(name: string)` — save a screenshot

All other page classes will extend this one.

---

### Exercise 2: LoginPage Class

Create `pages/LoginPage.ts` extending `BasePage`.

Define locators for:
- Username field
- Password field
- Login button
- Error message

Define methods:
- `goToLoginPage()` — navigate to the login URL
- `login(username, password)` — fill and submit the form
- `getErrorMessage()` — return the error text
- `isErrorVisible()` — return true/false

Write a test in `tests/pom-login.spec.ts` that:
1. Uses `LoginPage` to log in with valid credentials
2. Asserts the URL contains `dashboard`
3. Uses `LoginPage` to log in with invalid credentials
4. Asserts the error message using `getErrorMessage()`

**The test file must have zero locators.**

---

## Part B: Feature Page Classes

### Exercise 3: DashboardPage Class

Create `pages/DashboardPage.ts` extending `BasePage`.

Define:
- Locator for the main heading
- Locator for the side navigation menu
- Method `isLoaded()` — returns true if Dashboard heading is visible
- Method `navigateTo(menuItem: string)` — clicks a menu item by name

---

### Exercise 4: PIMPage Class

Create `pages/PIMPage.ts` extending `BasePage`.

Define locators for the Employee List page:
- Employee search input
- Search button
- Employee table rows
- Add Employee button

Define methods:
- `searchEmployee(name: string)` — fills and submits the search
- `getEmployeeCount()` — returns number of rows
- `clickAddEmployee()` — navigates to Add Employee form

Create `pages/AddEmployeePage.ts`:
- Locators for First Name, Last Name, Employee ID fields
- Locators for Save button
- `fillEmployeeDetails(firstName, lastName)` — fills the form
- `saveEmployee()` — clicks Save

Write a test in `tests/pom-employee.spec.ts` using these page objects to:
1. Log in
2. Navigate to PIM
3. Add a new employee
4. Search for the employee
5. Assert they appear in the results

---

### Exercise 5: AdminPage Class

Create `pages/AdminPage.ts`.

Define:
- Locator for the Users table
- Locator for Add User button
- Method `getUserCount()` — returns the number of rows in the Users table
- Method `clickAddUser()` — clicks the Add button

Write a test that logs in, navigates to Admin > User Management, and asserts the user count is greater than 0. Use only page methods in the test.

---

## Part C: POM Review

### Exercise 6: Refactor Old Tests

Go back to the tests you wrote in Assignments 05 and 06.

Pick **3 tests** that contain locators directly in the test body.

1. For each test, identify which page it belongs to.
2. Move all locators from the test into the appropriate page class as private locators.
3. Create a method in the page class that performs the action the test needs.
4. Rewrite the test to call only page methods.

After refactoring:
- The test should have **no `page.locator()`**, **no `getByRole()`**, **no `page.fill()`** etc.
- All interactions go through page class methods

Show the before and after version of one test as a comment block at the top of the file.
