# Chapter 10 — API Testing with Playwright

---

## What You Will Learn

- Why API testing matters and when to do it
- How to make GET, POST, PUT, and DELETE requests using Playwright
- How to authenticate API calls
- How to assert on API response status, headers, and body
- How to write hybrid tests that combine UI and API steps
- How to intercept and mock network requests with `page.route()`

---

## 10.1 Why API Testing?

API tests are faster and more reliable than UI tests. They bypass the browser entirely and test the business logic layer directly. A good test strategy uses both:

| Layer | Speed | Fragility | What it covers |
|-------|-------|-----------|----------------|
| Unit | Fastest | Least fragile | Individual functions |
| API | Fast | Low | Server logic, data contracts |
| UI (E2E) | Slow | More fragile | User workflows, visual layout |

The **test pyramid** recommends more unit and API tests than UI tests.

With Playwright, you can write both API tests and UI tests in the same framework, share authentication state, and combine them in hybrid tests.

---

## 10.2 The `request` Fixture

The `request` fixture provides a standalone HTTP client. It is available in any test and does not require a browser or page.

```typescript
import { test, expect } from '@playwright/test';

test('GET employees returns 200', async ({ request }) => {
    const response = await request.get('https://api.example.com/employees');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveLength(10);
});
```

---

## 10.3 Authentication for OrangeHRM API

OrangeHRM uses session-based authentication. The easiest way to call its API is to log in via API first and reuse the session token.

```typescript
test('get session token via API', async ({ request }) => {
    const response = await request.post(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
        {
            form: {
                _username: 'Admin',
                _password: 'admin123',
            }
        }
    );

    expect(response.ok()).toBeTruthy();
});
```

For REST APIs that use bearer tokens:

```typescript
const loginResponse = await request.post('/api/auth/login', {
    data: { username: 'admin', password: 'password123' }
});

const { token } = await loginResponse.json();

// Use the token in subsequent requests
const usersResponse = await request.get('/api/users', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

---

## 10.4 HTTP Methods

### GET — Reading Resources

```typescript
test('GET employee by ID', async ({ request }) => {
    const response = await request.get('/api/employees/1');

    expect(response.status()).toBe(200);
    const employee = await response.json();

    expect(employee).toMatchObject({
        id: 1,
        firstName: expect.any(String),
        lastName: expect.any(String)
    });
});
```

### POST — Creating Resources

```typescript
test('POST create employee', async ({ request }) => {
    const newEmployee = {
        firstName: 'Test',
        lastName: 'Employee',
        employeeId: 'E999'
    };

    const response = await request.post('/api/employees', {
        data: newEmployee
    });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created.firstName).toBe('Test');
    expect(created).toHaveProperty('id');
});
```

### PUT — Replacing a Resource

```typescript
test('PUT update employee', async ({ request }) => {
    const updated = {
        firstName: 'Updated',
        lastName: 'Name',
        employeeId: 'E999'
    };

    const response = await request.put('/api/employees/999', {
        data: updated
    });

    expect(response.status()).toBe(200);
});
```

### DELETE — Removing a Resource

```typescript
test('DELETE employee', async ({ request }) => {
    const response = await request.delete('/api/employees/999');

    expect(response.status()).toBe(204);
    expect(response.body()).resolves.toHaveLength(0);  // empty body
});
```

---

## 10.5 Asserting API Responses

```typescript
const response = await request.get('/api/employees');

// Status code
expect(response.status()).toBe(200);

// ok() — true for 2xx range
expect(response.ok()).toBeTruthy();

// Response headers
expect(response.headers()['content-type']).toContain('application/json');

// Response body as JSON
const body = await response.json();

// Body structure
expect(body).toHaveProperty('data');
expect(body.data).toBeInstanceOf(Array);
expect(body.data[0]).toMatchObject({
    id: expect.any(Number),
    firstName: expect.any(String)
});

// Specific values
expect(body.total).toBeGreaterThan(0);
expect(body.data).toHaveLength(10);
```

---

## 10.6 Hybrid UI + API Tests

A hybrid test combines UI and API steps in the same test. A common pattern: create test data via API (fast), then verify it appeared correctly in the UI.

```typescript
test('employee created via API appears in PIM list', async ({ page, request }) => {
    // Step 1: Create employee via API (fast)
    const response = await request.post('/api/employees', {
        data: {
            firstName: 'Hybrid',
            lastName: 'TestUser',
            employeeId: 'HYB001'
        },
        headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.status()).toBe(201);
    const employee = await response.json();

    // Step 2: Verify in UI
    await page.goto('/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('textbox', { name: 'Employee Name' }).fill('Hybrid TestUser');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Hybrid TestUser')).toBeVisible();
});
```

---

## 10.7 Network Interception with `page.route()`

`page.route()` intercepts outgoing network requests and allows you to modify them, mock responses, or block them entirely.

### Mocking a Response

```typescript
test('shows fallback when API fails', async ({ page }) => {
    // Intercept the API call and return a mock error
    await page.route('**/api/employees**', async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal Server Error' })
        });
    });

    await page.goto('/employees');
    await expect(page.getByText('Something went wrong')).toBeVisible();
});
```

### Modifying a Real Response

```typescript
test('shows correct count with injected data', async ({ page }) => {
    await page.route('**/api/employees', async (route) => {
        const response = await route.fetch();   // get real response
        const body = await response.json();

        // Inject extra employee
        body.data.push({ id: 999, firstName: 'Injected', lastName: 'User' });

        await route.fulfill({
            response,
            body: JSON.stringify(body)
        });
    });

    await page.goto('/employees');
    await expect(page.locator('.employee-row')).toHaveCount(body.data.length);
});
```

### Blocking Requests

```typescript
test('page loads without analytics', async ({ page }) => {
    // Block all calls to tracking services
    await page.route('**google-analytics**', route => route.abort());
    await page.route('**hotjar**', route => route.abort());

    await page.goto('/');
    await expect(page).toHaveTitle('OrangeHRM');
});
```

---

## Review Questions

**Q1. What is the difference between `page.request` and the `request` fixture?**

Both provide the same API for making HTTP requests. `request` (available as a fixture in test functions) is a standalone context that does not share cookies with any browser page. `page.request` shares the session cookies of the browser page. Use `page.request` when you need to make API calls as the authenticated browser user.

**Q2. What does `response.ok()` return?**

`ok()` returns `true` if the HTTP status code is in the 200-299 range. It is a convenience check equivalent to `status >= 200 && status < 300`.

**Q3. What is the difference between PUT and PATCH?**

PUT replaces the entire resource — you must send all fields. PATCH updates only the specified fields. Sending a PATCH with `{ firstName: "New" }` changes only the first name; everything else stays the same. Sending a PUT with only `{ firstName: "New" }` may clear all other fields.

**Q4. What is a hybrid test?**

A hybrid test uses both API and UI layers in the same test. A typical pattern: create or delete test data via API (fast and reliable), then verify the result through the UI. This is faster than setting up through the UI and avoids flakiness in setup steps.

**Q5. What is `page.route()` used for?**

`page.route()` intercepts network requests matching a URL pattern. You can mock responses (return fake data), modify real responses, or block requests entirely. It is used for testing error states, reducing test dependencies on external APIs, and simulating edge cases.

**Q6. What is the difference between `route.fulfill()` and `route.abort()`?**

`route.fulfill()` returns a custom response to the browser (can be a mock body, status code, and headers). `route.abort()` cancels the request entirely — the browser receives a network error for that request. `route.continue()` forwards the request to the real server unchanged.

**Q7. How do you assert that a response body contains a specific field?**

```typescript
const body = await response.json();
expect(body).toHaveProperty('id');
expect(body.id).toBe(1);
```
`toHaveProperty` checks that the key exists. Access it directly for value checks.

**Q8. What is `toMatchObject` and how does it differ from `toEqual`?**

`toMatchObject` checks that the actual object contains the expected properties (subsets are allowed — extra properties are ignored). `toEqual` checks that objects are deeply equal — all properties must match exactly. Use `toMatchObject` when you do not want to enumerate every field.

**Q9. How do you pass headers to an API request?**

```typescript
const response = await request.get('/api/employees', {
    headers: {
        Authorization: 'Bearer my-token',
        'Content-Type': 'application/json'
    }
});
```

**Q10. Why is API testing generally faster and less fragile than UI testing?**

API tests do not launch a browser, load CSS, execute JavaScript rendering, or wait for visual elements. They send an HTTP request and check the response — milliseconds vs seconds. There is no DOM, no layout engine, and no visual timing issues. The test surface is a data contract, which is more stable than a visual interface.
