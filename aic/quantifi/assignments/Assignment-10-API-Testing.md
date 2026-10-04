# Assignment 10: API Testing with Playwright

---

## Learning Objectives

- Use `APIRequestContext` to make HTTP requests
- Test OrangeHRM REST API endpoints
- Validate API responses (status, body, headers)
- Combine UI login with API calls (hybrid testing)
- Intercept and mock network requests

---

## Instructions

- Continue using your Playwright project
- OrangeHRM API base URL: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2`
- You will need a session cookie — obtain it by logging in through the UI first
- Create `tests/api-tests.spec.ts` for all exercises

---

## Part A: Basic API Calls

### Exercise 1: GET Request — Fetch Employees

Use `request` fixture in your test:

1. Write a test that sends a `GET` request to `/pim/employees`.
2. Assert the response status is `200`.
3. Print the first 5 employee names from the response body.
4. Assert that the response body contains a `data` array.
5. Assert the `total` field in the response is greater than `0`.

> **Hint:** You will need to authenticate first. Use the `storageState` approach or pass session cookies from a UI login.

---

### Exercise 2: Authentication via API

1. Write a test that logs in via the UI (using the `page` fixture).
2. After the UI login, use `page.context().request` to make an API call without re-entering credentials — the session cookie is shared.
3. Make a `GET` request to `/employees/count` or `/pim/employees?limit=1`.
4. Assert it returns a `200` status.
5. Print the employee count from the response.

---

## Part B: HTTP Methods and Validation

### Exercise 3: POST Request — Create Employee

1. Write a test that sends a `POST` request to create a new employee.
   - Endpoint: `/pim/employees`
   - Body: `{ firstName: "Test", lastName: "User", employeeId: "AUTO001" }`

2. Assert the response status is `200` (or `201` — check what OrangeHRM returns).
3. Assert the response body contains the employee's first name.
4. Store the new employee's `empNumber` from the response — you will use it in the next exercise.

---

### Exercise 4: PUT and DELETE Requests

Using the `empNumber` from Exercise 3:

1. Send a `PUT` request to update the employee's last name.
   - Endpoint: `/pim/employees/{empNumber}/personal-details`
   - Update `lastName` to a new value.
2. Assert the response status is `200`.
3. Assert the response body reflects the updated name.
4. Send a `DELETE` request to remove the employee.
   - Endpoint: `/pim/employees`
   - Pass the `empNumber` in the request body.
5. Assert the delete response status is `200`.
6. Make a `GET` request for that employee and verify it no longer exists.

---

## Part C: Hybrid Testing and Mocking

### Exercise 5: Hybrid UI + API Test

Write a test that combines UI and API:

1. Use the API to **create** an employee (POST request).
2. Use the **UI** (Playwright page) to search for that employee in PIM > Employee List.
3. Assert the employee appears in the UI table.
4. Use the API to **delete** the employee.
5. Reload the page and assert the employee is gone.

This is hybrid testing — set up and tear down via API, verify via UI.

---

### Exercise 6: Network Interception

Use `page.route()` to intercept network requests:

1. Navigate to PIM > Employee List.
2. Before the page loads, intercept the API call that fetches employees.
3. Return a **mock response** with only 2 fake employees using `route.fulfill()`.
4. Assert that only those 2 mock employees appear in the table.

Then:
5. Abort the request for the OrangeHRM logo using `route.abort()`.
6. Observe what happens to the logo on the page — take a screenshot.
