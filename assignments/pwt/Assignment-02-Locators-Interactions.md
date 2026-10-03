# Assignment 02: Locators & Basic Interactions

**Topics Covered:** Locators (Role, Text, Label, CSS), Basic Actions (Click, Fill, Check)
**Difficulty:** Beginner  
**Estimated Time:** 1.5 hours  

---

## Instructions

- Use the default Playwright project structure from Assignment 01
- Use the website `https://vibe-test-app.vercel.app` (or any practice site like demoqa.com)
- Focus on using "User-Facing" locators (getByRole, getByLabel) over CSS selectors

---

## Part A: The Locator Strategy (30 points)

### Exercise 1: User-Facing Locators (15 points)
Given the following HTML snippet, write the Playwright locator using `getByRole`:
```html
<button id="submit-btn" type="submit">Order Now</button>
<input type="checkbox" id="terms" label="Accept Terms">
<nav>
  <a href="/login">Login Here</a>
</nav>
```
1. Locate the button by its role.
2. Locate the checkbox.
3. Locate the "Login Here" link.

### Exercise 2: CSS vs XPath (15 points)
Explain why Playwright recommends `page.getByRole()` over `page.locator('css=#btn')`. Mention at least two advantages related to test resilience.

---

## Part B: Basic Interactions (40 points)

### Exercise 3: Form Filling (20 points)
Navigate to a practice "Contact Us" or "Registration" page and perform the following:
1. Identify the Name, Email, and Message fields.
2. Fill them with valid data.
3. Clear the Email field and re-fill it with a different email.
4. Use `page.getByLabel()` or `page.getByPlaceholder()` where possible.

### Exercise 4: Buttons and Checkboxes (20 points)
Navigate to a practice page with checkboxes and radio buttons:
1. Select a radio button for "Gender" or "Preference".
2. Check two different checkboxes.
3. Uncheck one of the checkboxes.
4. Click a "Submit" or "Reset" button.
5. Use `.check()` and `.unclick()` where appropriate.

---

## Part C: Advanced Locating (30 points)

### Exercise 5: Filter and Chaining (15 points)
Imagine a table with multiple "Delete" buttons. Write a locator that finds the Delete button specifically for the row containing the text "Product ABC".
*Hint: Use `.filter({ hasText: '...' })`*

### Exercise 6: Playwright Selector Engine (15 points)
Playwright allows mixing selectors. Write a locator that uses CSS to find a `div` with class `container` and then uses `text` to find a span inside it.

---

## Bonus Challenge (10 points)

### Exercise 7: The "Hole" in the DOM
Write a script to interact with an element inside a **Shadow DOM**. Does Playwright require special commands to enter the Shadow DOM, or is it automatic? Demonstrate your answer with a small code snippet.

---

## Submission Guidelines

1. Create a file `assignment02_locators.spec.js`
2. Include comments for each exercise
3. Ensure the test navigates to the specific URLs used
4. Run your tests and ensure they pass

## Grading Rubric

- **Locator Selection (40%)**: Correct use of getByRole and other reliable locators
- **Action Accuracy (30%)**: Correct use of fill, click, check, etc.
- **Logic & Chaining (20%)**: Understanding of how to drill down into the DOM
- **Code Cleanliness (10%)**: Proper naming and structure

---

**Total Points: 100 + 10 Bonus**
