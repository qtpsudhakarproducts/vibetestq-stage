# Assignment 08: AI IDEs, MCP & Planner Agents

---

## Learning Objectives

- Use GitHub Copilot or Cursor to assist in writing Playwright tests
- Understand what MCP (Model Context Protocol) is
- Set up MCP for Playwright in VS Code
- Use a Planner Agent to generate a test strategy for OrangeHRM

---

## Instructions

- You need VS Code with the GitHub Copilot extension installed, **or** Cursor IDE
- Target application: `https://opensource-demo.orangehrmlive.com`
- All tasks are recorded — share your screen with the trainer
- For each exercise, note down the AI suggestion and what you accepted or changed

---

## Part A: AI IDE Setup and Usage

### Exercise 1: GitHub Copilot / Cursor Setup

1. Confirm GitHub Copilot is active in VS Code (look for the Copilot icon in the status bar).  
   **OR** open Cursor IDE.

2. Open an empty file `tests/ai-assisted.spec.ts`.

3. Type a comment:  
   `// Test: Login to OrangeHRM with valid credentials`  
   Wait for Copilot to suggest code. Accept the suggestion.

4. Add another comment:  
   `// Test: Login with invalid credentials should show error`  
   Accept the suggestion.

5. Run both generated tests. Did they work out of the box? What did you have to fix?

---

### Exercise 2: Improve AI Suggestions

1. Open the Copilot Chat panel (Ctrl+Shift+I in VS Code or the Chat in Cursor).

2. Type this prompt:
   ```
   Write a Playwright TypeScript test for OrangeHRM that:
   - Logs in with Admin/admin123
   - Navigates to PIM > Employee List
   - Asserts that at least one employee is visible in the table
   ```

3. Review the generated code. Check:
   - Are the locators correct for OrangeHRM?
   - Does it use `beforeEach` properly?
   - Are assertions present?

4. Fix any issues and run the test.

---

### Exercise 3: Ask AI for Locators

1. Open OrangeHRM in your browser. Inspect the login form and copy the page HTML (or just the form part).

2. Paste the HTML into Copilot Chat and ask:
   ```
   Given this HTML, what Playwright locators would you use for the username field, password field, and login button?
   ```

3. Compare the AI suggestions with what you wrote in previous assignments.

4. Ask a follow-up: `"Which locator is most reliable and why?"`

---

## Part B: MCP for Playwright

### Exercise 4: Understand MCP

Answer these questions in a comment block in a file `notes/mcp-notes.ts`:

1. What does MCP stand for and what problem does it solve for AI tools?
2. How is MCP different from just using Copilot inline suggestions?
3. What is a "tool" in the context of MCP?
4. Why would an AI agent benefit from having direct access to a browser through MCP?

---

### Exercise 5: Set Up Playwright MCP

1. Install the Playwright MCP server:
   ```
   npm install -g @playwright/mcp
   ```
   Or check the official docs for the current install method.

2. Configure MCP in VS Code:
   - Open VS Code settings (`.vscode/mcp.json` or user settings)
   - Add the Playwright MCP server configuration
   - Verify it appears as an available tool in Copilot Chat

3. In Copilot Chat, use the MCP tool to:
   - Open a browser pointed at `https://opensource-demo.orangehrmlive.com`
   - Ask the AI: `"What elements are on this login page?"`
   - Ask: `"Generate a locator for the username input"`

4. Screenshot: Take a screenshot showing MCP is connected and responding in the Chat panel.

---

## Part C: Planner Agents

### Exercise 6: Test Planning with AI

Open Copilot Chat (or Cursor's Agent mode). Use this prompt:

```
I am testing OrangeHRM (https://opensource-demo.orangehrmlive.com).
Act as a test planning agent and generate a complete test strategy for:
- Login and Authentication
- Employee Management (Add, Search, Edit)
- User Management

For each area, list: test scenarios, the locators I'll need, test data to prepare, and risks to watch for.
```

1. Review the plan. Is it practical?
2. Pick **one scenario** from the plan and ask the AI to write the full Playwright test.
3. Run the generated test and note what needed fixing.

---

### Exercise 7: Iterate with AI

Take a test you wrote in a previous assignment that is currently failing or incomplete.

1. Paste the code into Copilot Chat and ask: `"Why is this test failing? How can I fix it?"`
2. Apply the suggestion and re-run.
3. Then ask: `"How can I make this test more robust?"`
4. Apply the improvement.

Document: what question you asked, what the AI answered, and what you changed.
