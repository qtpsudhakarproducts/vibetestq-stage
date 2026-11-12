# Chapter 15 — Capstone Project

---

## What You Will Learn

- How to bring together all 14 days of learning into a complete framework
- What a production-quality test automation project looks like
- How to review your work against quality criteria

---

## 15.1 Project Goal

Build a complete, production-ready Playwright TypeScript automation framework for OrangeHRM that covers all major modules using Page Object Model, fixtures, API testing, reporting, and CI/CD configuration.

**Application:** `https://opensource-demo.orangehrmlive.com`  
**Login:** Admin / admin123

---

## 15.2 Required Folder Structure

```
orangehrm-automation/
├── tests/
│   ├── auth/
│   │   └── login.spec.ts
│   ├── pim/
│   │   ├── add-employee.spec.ts
│   │   └── search-employee.spec.ts
│   └── admin/
│       └── user-management.spec.ts
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── PIMPage.ts
│   │   └── AdminPage.ts
│   ├── helpers/
│   │   ├── loginHelper.ts
│   │   └── waitHelper.ts
│   ├── data/
│   │   ├── users.json
│   │   └── employees.json
│   └── fixtures/
│       └── index.ts
├── auth/
│   └── admin.json              ← storageState (generated, not committed)
├── playwright.config.ts
├── buildspec.yml
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## 15.3 Module Coverage

### Module 1: Authentication (Login)

**File:** `tests/auth/login.spec.ts`

| # | Test | Type |
|---|------|------|
| 1 | Login page loads correctly | Smoke |
| 2 | Login with valid credentials redirects to dashboard | Happy path |
| 3 | Login with wrong password shows error | Negative |
| 4 | Login with wrong username shows error | Negative |
| 5 | Login with empty username shows validation | Edge case |
| 6 | Login with empty password shows validation | Edge case |
| 7 | Logout redirects to login page | Happy path |

### Module 2: PIM — Employee Management

**Files:** `tests/pim/add-employee.spec.ts`, `tests/pim/search-employee.spec.ts`

| # | Test | Type |
|---|------|------|
| 1 | Navigate to PIM module | Smoke |
| 2 | Add a new employee with required fields | Happy path |
| 3 | Employee appears in list after adding | Verification |
| 4 | Search by full employee name | Happy path |
| 5 | Search with partial name returns matches | Happy path |
| 6 | Search with non-existent name shows no records | Negative |
| 7 | Search with empty fields returns all employees | Edge case |

### Module 3: Admin — User Management

**File:** `tests/admin/user-management.spec.ts`

| # | Test | Type |
|---|------|------|
| 1 | Navigate to Admin module | Smoke |
| 2 | System Users list is visible | Smoke |
| 3 | Search users by username | Happy path |
| 4 | Search with non-existent username shows no records | Negative |

### Module 4: API Tests

**File:** `tests/api/employees.spec.ts`

| # | Test | Type |
|---|------|------|
| 1 | API endpoint returns 200 for employee list | API |
| 2 | Hybrid: create via API, verify in UI | Hybrid |

---

## 15.4 Quality Checklist

Use this checklist to evaluate your capstone project before submitting:

### Structure

- [ ] Folder structure matches the recommended layout
- [ ] Page objects are in `src/pages/`
- [ ] Tests are in `tests/` organised by module
- [ ] Helper functions are in `src/helpers/`
- [ ] JSON test data is in `src/data/`
- [ ] `playwright.config.ts` has `baseURL`, reporters, and timeout values

### Code Quality

- [ ] No locators directly in test files — all locator interactions go through page objects
- [ ] All variables and function parameters have TypeScript types
- [ ] No `any` types used
- [ ] `storageState` is used to skip login for tests that do not test authentication
- [ ] `beforeEach` or fixtures used for shared setup — no duplicated setup code

### Test Quality

- [ ] Every action is followed by a verification (assertion)
- [ ] Both happy path and negative scenarios are covered
- [ ] Tests are independent — each test can run in isolation
- [ ] Test names clearly state what is being tested
- [ ] Data-driven test used for at least one scenario

### Reporting and CI

- [ ] HTML reporter configured
- [ ] `buildspec.yml` file present with correct install and test commands
- [ ] `.gitignore` includes `node_modules/`, `playwright-report/`, `auth/`, `.env`

---

## 15.5 Architecture Review

Review this diagram before your final submission:

```
playwright.config.ts
    └── baseURL, storageState, reporters, projects

tests/
    └── *.spec.ts
        ├── Import page objects from src/pages/
        ├── Import helpers from src/helpers/
        ├── Import data from src/data/ (JSON)
        └── Use fixtures from src/fixtures/

src/pages/
    └── BasePage ← LoginPage, DashboardPage, PIMPage, AdminPage

src/fixtures/
    └── Custom fixture (loggedInPage) → wraps LoginPage login flow
```

---

## 15.6 Common Mistakes to Avoid

| Mistake | Problem | Fix |
|---------|---------|-----|
| Locators in test files | One locator change breaks many tests | Move all locators to page objects |
| No assertions after actions | Test passes even when action failed | Add `expect()` after every action |
| Hardcoded credentials in code | Security risk in version control | Use `src/data/users.json` and env vars |
| Login in every test | Slow test suite | Use `storageState` |
| All tests in one file | Hard to maintain | Organise by module in subdirectories |
| `// TODO` assertions left in | Gives false confidence | Every test must have real assertions |
| Tests depend on other tests | One failure cascades | Each test must set up its own state |

---

## 15.7 Presentation Guide

Your capstone will be reviewed by the trainer. Prepare to:

1. **Run the full test suite** — demonstrate `npx playwright test` running all tests
2. **Show the HTML report** — open the report and walk through pass/fail results
3. **Explain one page object** — open a page object file and explain each method
4. **Explain one test file** — open a spec file and explain how it calls page objects
5. **Show the `playwright.config.ts`** — explain `baseURL`, reporters, and `storageState`
6. **Answer interview questions** — be prepared for questions from any chapter

---

## Review Questions

**Q1. What have you implemented that demonstrates the Page Object Model?**

Describe your `LoginPage`, `DashboardPage`, and `PIMPage` classes. Explain that locators are properties in the class and interactions are methods. Show that no locator appears in a test file.

**Q2. How does `storageState` improve your test suite?**

Global setup logs in once and saves the session to `auth/admin.json`. All tests restore this state instead of running the login UI. This removes login steps from every test that is not specifically testing authentication, making the suite significantly faster.

**Q3. What is the benefit of keeping test data in JSON files?**

Separating data from code means changing a test user's password or employee name requires editing one JSON file, not searching through all test files. It also makes data-driven testing straightforward — loop over the JSON array to create one test per data row.

**Q4. How have you structured your tests to ensure independence?**

Each test either (1) uses `storageState` to start in an authenticated state, or (2) logs in explicitly in `beforeEach`. No test reads state left behind by a previous test. Data created in one test is either scoped to that test or cleaned up in `afterEach`.

**Q5. What would you add to this framework given more time?**

Possible answers: API-layer test data setup/teardown (create and delete employees via API rather than UI), visual regression testing with screenshots, full Allure integration with labels and descriptions, GitHub Actions instead of AWS CodeBuild, or BDD Cucumber feature files for the PIM module.

**Q6. What is a fixture and how did you use one?**

A fixture is a reusable setup/teardown block defined with `test.extend()`. A custom login fixture logs in before the test and logs out in the cleanup phase (after `await use(page)`). Tests that use the fixture automatically get a logged-in page without repeating the login code.

**Q7. How do you ensure your tests are not flaky?**

By relying on Playwright's auto-waiting, using `waitForURL` and `waitForLoadState` after navigation-triggering actions, avoiding hardcoded `sleep/wait` delays, using `storageState` to avoid the unstable login sequence in every test, and verifying element state before acting on it.

**Q8. Explain your `buildspec.yml` and what each phase does.**

`install` phase: runs `npm ci` to install packages and `npx playwright install` to download browsers. `pre_build` phase: validates that Node and NPM are available. `build` phase: runs `npx playwright test`. `post_build` phase: logs the result. `artifacts` section: uploads the `playwright-report/` to S3.
