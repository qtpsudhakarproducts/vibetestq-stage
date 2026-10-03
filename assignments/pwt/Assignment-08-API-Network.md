# Assignment 08: API Testing & Network Mocking

**Topics Covered:** APIRequestContext, request.post/get, JSON Assertions, Route Interception, HAR Files
**Difficulty:** Intermediate / Advanced  
**Estimated Time:** 2 hours  

---

## Instructions

- Use a free API like `https://jsonplaceholder.typicode.com` or `https://reqres.in`
- Combine API setup with UI testing where possible
- Mock network responses to test edge cases

---

## Part A: Pure API Testing (40 points)

### Exercise 1: GET and POST (20 points)
Use `request` fixture to:
1. Fetch a list of "posts". Assert that the status is 200 and the response is an array.
2. Create a new post using a POST request. Assert that the response contains the data you sent and has a status of 201.

### Exercise 2: API Assertions (20 points)
Write a test that:
- Calls an API endpoint.
- Verifies the JSON scheme or at least 3 specific properties in the response.
- Verifies that the response headers contain `content-type: application/json`.

---

## Part B: Network Interception (40 points)

### Exercise 3: Mocking a Response (20 points)
Sometimes a real API is slow or unavailable.
1. Use `page.route()` to intercept a specific API call.
2. Fulfill the request with your own custom JSON data.
3. Verify that the **UI** displays your mocked data instead of the real data.

### Exercise 4: Simulating Server Errors (20 points)
Test your application's error handling:
1. Intercept an API call and fulfill it with a **500 Internal Server Error**.
2. Assert that a "Something went wrong" alert appears in the UI.

---

## Part C: The Hybrid Move (20 points)

### Exercise 5: API for Speed (20 points)
Instead of using the UI to create a "User" for every test:
1. Write a `beforeEach` hook that uses an API request to create a user and get a token.
2. Use that token/state to navigate directly to the logged-in area.
3. Explain why this is faster than UI-based setup.

---

## Bonus Challenge (10 points)

### Exercise 6: Recording Traffic (HAR)
Show how to record all network traffic into a `.har` file during a test run. Explain one scenario where replayable HAR files are useful for debugging.

---

## Submission Guidelines

1. Submit a test file demonstrating both `request` and `page.route()`
2. Include a screenshot of your UI showing the "Mocked" data
3. Include the HAR file if you attempted the bonus

## Grading Rubric

- **API Logic (40%)**: Correct use of the request fixture and status checks
- **Mocking Mastery (40%)**: Successfully intercepting and fulfilling routes
- **Hybrid Strategy (10%)**: Implementing API-based setup for UI tests
- **Assertion Depth (10%)**: Going beyond status codes to check JSON content

---

**Total Points: 100 + 10 Bonus**
