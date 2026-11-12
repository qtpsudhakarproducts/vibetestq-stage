# Assignment 13: BDD with Cucumber

---

## Learning Objectives

- Write test scenarios in Gherkin syntax
- Set up Cucumber with Playwright
- Create step definitions that map to Playwright actions
- Use Data Tables and Scenario Outlines
- Integrate POM page objects inside step definitions

---

## Instructions

- Add Cucumber to your existing Playwright project:
  ```
  npm install -D @cucumber/cucumber @playwright/test
  npm install -D ts-node
  ```
- Create a `features/` folder for `.feature` files
- Create a `step-definitions/` folder for step definition files
- Target application: `https://opensource-demo.orangehrmlive.com`

---

## Part A: Gherkin Scenarios

### Exercise 1: Write Login Feature File

Create `features/login.feature`.

Write Gherkin scenarios for:

1. **Successful login** — Admin logs in with valid credentials and sees the Dashboard.
2. **Failed login** — User logs in with wrong password and sees an error message.
3. **Empty fields** — User submits the form without entering any credentials.

Use `Given`, `When`, `Then`, and `And` properly.

---

### Exercise 2: Write Employee Feature File

Create `features/employee.feature`.

Write Gherkin scenarios for:

1. **Add Employee** — Admin adds a new employee and the employee appears in the list.
2. **Search Employee** — Admin searches for an employee by name and the result displays.
3. **Edit Employee** — Admin opens an employee profile and updates the last name.

Each scenario should have at least 4 steps.

---

## Part B: Step Definitions

### Exercise 3: Login Step Definitions

Create `step-definitions/login.steps.ts`.

Implement step definitions for all steps in `login.feature`:

1. Map the `Given I am on the OrangeHRM login page` step to navigate to the login URL.
2. Map `When I enter username {string} and password {string}` to fill the fields.
3. Map `When I click the Login button` to click the button.
4. Map `Then I should see the Dashboard` to assert the URL and heading.
5. Map `Then I should see an error message {string}` to assert the error text.

Use your `LoginPage` POM class inside the step definitions.

---

### Exercise 4: Employee Step Definitions

Create `step-definitions/employee.steps.ts`.

Implement step definitions for `employee.feature`:

1. `Given I am logged in as Admin` — use your login helper from Assignment 12.
2. `When I navigate to PIM Employee List` — use `DashboardPage` navigation method.
3. `When I add an employee with first name {string} and last name {string}` — use `AddEmployeePage`.
4. `Then the employee {string} should appear in the list` — use `PIMPage` search.
5. `When I search for employee {string}` — use PIMPage search method.
6. `Then the search results should contain {string}` — assert the table.

---

## Part C: Data Tables & Scenario Outlines

### Exercise 5: Scenario Outline — Login with Multiple Users

In `features/login.feature`, add a **Scenario Outline** that tests login with multiple credentials:

Use an `Examples` table with at least 3 rows:
- Valid Admin credentials → expect Dashboard
- Invalid password → expect error
- Empty username → expect validation message

Write a single scenario that runs 3 times using the outline.

---

### Exercise 6: Data Table — Add Multiple Employees

In `features/employee.feature`, write a scenario that uses a **Data Table** to add multiple employees in one scenario:

The table should have columns: `First Name`, `Last Name`, `Employee ID`.

In the step definition, iterate over the data table rows.  
For each row, add the employee via UI and assert they appear in the list.

Then run the full feature file and verify all scenarios pass.
