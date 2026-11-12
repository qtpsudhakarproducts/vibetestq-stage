# Assignment 05: Page Object Model (POM)

**Topics Covered:** Class-based POM, Modular Locators, Reusable Methods, Framework Maintenance
**Difficulty:** Intermediate  
**Estimated Time:** 2 hours  

---

## Instructions

- Refactor a basic test into a POM structure
- Separate locators from test logic
- Use TypeScript (recommended) or JavaScript classes

---

## Part A: POM Architecture (30 points)

### Exercise 1: Why POM? (10 points)
List three major benefits of using the Page Object Model in large-scale test automation. How does it improve "Maintenance"?

### Exercise 2: Class Structure (20 points)
Create a base structure for a `LoginPage` class. Define the constructor and the elements (locators) within the class property.
```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    // Add more...
  }
}
```

---

## Part B: Implementation (40 points)

### Exercise 3: Page Methods (20 points)
Add functional methods to your `LoginPage` class:
1. `goto()`: Navigates to the login page URL.
2. `login(user, pass)`: Fills in credentials and clicks submit.
3. `getErrorMessage()`: Returns the text of an error message if login fails.

### Exercise 4: Clean Test Implementation (20 points)
Write a test file `tests/login_pom.spec.js` that:
1. Imports the `LoginPage` class.
2. Initializes the page object.
3. Performs a successful login.
4. Asserts that the user is on the dashboard.

---

## Part C: Advanced POM Patterns (30 points)

### Exercise 5: Component-Based POM (15 points)
If a "Navigation Bar" or "Footer" is present on every page, should you define it in every page object? Create a `Navbar` component class and show how you would include it in a `DashboardPage`.

### Exercise 6: Chaining Methods (15 points)
Modify your methods so they return `this` or the next page object. Show how this allows for "Fluent API" style test writing:
`await loginPage.goto().login('user', 'pass').clickDashboard();`

---

## Bonus Challenge (10 points)

### Exercise 7: POM with Fixtures
Integrate your `LoginPage` into a custom Playwright fixture so that you can use it in your tests like this:
`test('login test', async ({ loginPage }) => { ... });`

---

## Submission Guidelines

1. Submit a folder named `page_objects` containing your classes
2. Submit a test file using these page objects
3. Ensure no hardcoded locators exist in the test file itself

## Grading Rubric

- **Class Design (30%)**: Proper implementation of classes and constructors
- **Encapsulation (30%)**: Keeping locators private/contained within the class
- **Method Logic (30%)**: Reusable and logical page methods
- **Test Integrity (10%)**: Clean, readable test files using the POM

---

**Total Points: 100 + 10 Bonus**
