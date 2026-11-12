# Assignment 10: AI-Native Automation & Best Practices

**Topics Covered:** Prompt Engineering for QA, Visual Regression Testing, AI Agent Integration, Core Best Practices
**Difficulty:** Advanced (Mastery)  
**Estimated Time:** 2 hours  

---

## Instructions

- Use your coding assistant (Claude, Cursor, or GitHub Copilot) to help generate complex scenarios
- Implement high-level strategies for maintenance-free automation

---

## Part A: Visual Regression Testing (35 points)

### Exercise 1: Snapshot Testing (20 points)
Write a test that:
1. Navigates to a complex page (e.g., a dashboard with charts).
2. Uses `expect(page).toHaveScreenshot()` to verify the visual state.
3. Purposefully change something on the page (e.g., via `page.evaluate`) and run the test again to see it fail.
4. Record how you "update" the baseline screenshots.

### Exercise 2: Masking Dynamic Data (15 points)
Snapshots fail when names or dates change. Show how to "mask" specific elements (like a timestamp or user name) so they are ignored during visual comparison.

---

## Part B: AI-Assisted QA (35 points)

### Exercise 3: Prompt Engineering for Locators (20 points)
Copy the HTML of a complex, messy login form. Use an AI tool (like ChatGPT/Claude) to:
1. Generate the best Playwright locators for all fields.
2. Ask the AI to write a Page Object Model class for this form.
3. Compare the AI's output with your manual version. What did the AI do better? Where did it fail?

### Exercise 4: The "Healer" Concept (15 points)
Explain how an "AI Agent" like Playwright MCP (Model Context Protocol) can help when a test fails due to a locator change. How does this shift us from "Automated Testing" to "Autonomous Testing"?

---

## Part C: The Mastery Challenge (30 points)

### Exercise 5: The "Clean Code" Audit (30 points)
Take any test you wrote in the previous 9 assignments and perform an "Audit" based on these principles:
- **Flakiness**: Did you use `waitForTimeout`?
- **Isolation**: Does the test depend on the state of a previous test?
- **Readability**: Are you using custom `test.step()` to describe actions?
- **DRY**: Are you repeating locators, or are they in a POM?

Submit the "Before" and "After" versions of your code.

---

## Bonus Challenge (10 points)

### Exercise 6: Playwright Trace Viewer + AI
Generate a Trace file for a failing test. Use an AI assistant to analyze the trace (or explain the steps you would take to feed trace data to an AI) to identify the root cause of the failure.

---

## Submission Guidelines

1. Submit your "Audit" test (Before and After)
2. Submit your visual snapshot test file and the baseline images
3. Include a summary of your experience using AI to generate the POM class

## Grading Rubric

- **Visual Comparison Logic (35%)**: Correct snapshot implementation and masking
- **AI Integration (35%)**: Intelligent use of AI for generation and analysis
- **Best Practices (30%)**: Demonstrating mastery of clean, isolated, and reliable code

---

**Total Points: 100 + 10 Bonus**
