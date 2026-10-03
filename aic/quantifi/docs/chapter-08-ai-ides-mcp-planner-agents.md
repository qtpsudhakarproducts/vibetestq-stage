# Chapter 8 — AI IDEs, MCP & Planner Agents

---

## What You Will Learn

- How to use AI-powered IDEs (GitHub Copilot, Cursor) to accelerate test writing
- How to write better prompts for generating Playwright code
- What the Model Context Protocol (MCP) is and why it matters
- How to set up and use Playwright MCP
- How AI planner agents help with test planning and coverage analysis

---

## 8.1 AI-Powered IDEs for Test Automation

AI IDEs embed large language models into your editor. They read your code and context, then suggest completions, generate entire functions, and answer questions inline. The two most widely used tools are:

**GitHub Copilot** — Microsoft/GitHub's AI pair programmer. Integrates into VS Code. Subscription required.

**Cursor** — An AI-first code editor built on VS Code. Free tier available. Supports Claude, GPT-4, and custom models.

### What AI IDEs Do Well in Testing

- Generate boilerplate test structure (`test.describe`, hooks, assertions)
- Suggest locators when you describe which element you want
- Explain what a piece of code does
- Refactor tests to use page objects
- Convert manual test cases into Playwright code

### What AI IDEs Do Not Do Well

- Generate accurate locators for pages they have never seen
- Guarantee the tests will work without you running them
- Understand your application's business logic

**Rule:** Always run AI-generated code before trusting it.

---

## 8.2 Writing Effective Prompts for Playwright

The quality of AI output depends heavily on the quality of your prompt. Vague prompts produce vague code.

### Bad Prompt

```
write a test for login
```

### Better Prompt

```
Write a Playwright TypeScript test for OrangeHRM login.
URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Steps:
1. Fill Username field (placeholder: "Username") with "Admin"
2. Fill Password field (placeholder: "Password") with "admin123"
3. Click the Login button (role: button, name: "Login")
4. Verify the URL contains "/dashboard/index"

Use getByPlaceholder for inputs and getByRole for the button.
Use async/await. Import test and expect from @playwright/test.
```

### Prompt Patterns That Work

| Goal | Prompt Strategy |
|------|----------------|
| Generate a test | Describe each step, specify locators to use |
| Generate a page object | Paste the test and ask to convert it to a class |
| Fix a broken test | Paste the error message alongside the code |
| Improve locators | Ask to replace CSS selectors with role-based locators |
| Add assertions | Ask to "add verification steps after each action" |

---

## 8.3 GitHub Copilot in VS Code

### Setup

1. Install the **GitHub Copilot** extension from VS Code Marketplace
2. Sign in with your GitHub account
3. Open any `.ts` test file

### Inline Suggestions

When you start typing, Copilot suggests completions. Press **Tab** to accept, **Escape** to dismiss.

```typescript
test('should search employee by name', async ({ page }) => {
    // After typing the comment or partial code, Copilot suggests the rest
```

### Copilot Chat

Open Copilot Chat with `Ctrl+Alt+I`. Ask questions or paste code for review:

- "What does this assertion do?"
- "Rewrite this test using a page object"
- "Why is this locator fragile?"

### Copilot Edits

Use **Copilot Edits** (`Ctrl+Shift+I`) for making changes across multiple files at once — useful when updating page objects and tests together.

---

## 8.4 What Is MCP (Model Context Protocol)?

MCP is an open standard created by Anthropic that defines how AI models communicate with tools and data sources. Instead of the AI guessing based on training data, MCP lets the AI directly control live tools — including browsers.

```
Without MCP:
User prompt → AI generates code → User runs code → User shows AI the result

With MCP:
User prompt → AI sends command to MCP server → Server controls browser → AI sees result
```

The AI becomes an active participant in the automation loop, not just a code generator.

---

## 8.5 Playwright MCP

Playwright MCP is a server that exposes browser control to AI models through the MCP protocol.

### Installation

```bash
npm install -D @playwright/mcp
```

### Configuration in VS Code (Cursor or Copilot)

Add to your MCP configuration file (`mcp.json` or `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### What Playwright MCP Enables

Once configured, you can ask the AI (in chat):

- "Navigate to the OrangeHRM login page and take a screenshot"
- "Find the locator for the Username field on this page"
- "Click Login and verify I reach the dashboard"

The AI uses MCP to actually open a browser and perform these steps. It can then inspect the DOM and generate accurate locators based on what it sees.

### The Snapshot Mode

Playwright MCP operates in "snapshot mode" by default. The AI receives the accessibility tree (ARIA tree) of the page, not screenshots. This makes it fast and models do not need vision capabilities.

---

## 8.6 Planner Agents for Test Planning

A planner agent is a LLM session (in Copilot Chat or Cursor) where the AI is given a feature specification and asked to produce a comprehensive test plan.

### Input to a Planner Agent

```
Feature: Employee Search in PIM module
Given: User is logged into OrangeHRM as Admin
The PIM module has a search form with fields: Employee Name, Employee Id, 
Employment Status, Supervisor Name, Job Title, Sub Unit, Include Employees

Generate a comprehensive test plan with:
- Happy path test cases
- Negative test cases  
- Edge cases
- Boundary values
Format each as: Test ID | Description | Steps | Expected Result
```

### Output (example excerpt)

```
TC-PIM-001 | Search by full name
Steps: Enter "John Smith" in Employee Name, click Search
Expected: Only employees named John Smith appear in results

TC-PIM-002 | Search with partial name
Steps: Enter "Jo" in Employee Name, click Search
Expected: All employees whose name contains "Jo" appear

TC-PIM-003 | Search with non-existent name
Steps: Enter "XXXNOONE" in Employee Name, click Search
Expected: Table shows "No Records Found"

TC-PIM-004 | Search with empty fields
Steps: Click Search without entering any value
Expected: All employees are listed
```

Use this plan as input to a generator agent (Day 9) to produce the actual Playwright tests.

---

## Review Questions

**Q1. What is an AI IDE and how does it differ from a regular code editor?**

An AI IDE (like GitHub Copilot or Cursor) integrates a large language model directly into the editor. It reads your code context and suggests completions, generates functions, explains code, and answers questions in a chat panel. A regular editor like plain VS Code does not have this — it may have syntax highlighting and IntelliSense, but no AI inference.

**Q2. What makes a good prompt for AI test generation?**

A good prompt is specific: it names the application URL, describes each action step by step, specifies which type of locator to use (role-based vs CSS), and states what to verify. Vague prompts like "write a login test" produce generic code that often does not match the actual application.

**Q3. What is MCP and who created it?**

MCP (Model Context Protocol) is an open standard created by Anthropic. It defines how AI models communicate with external tools and data sources through a server/client protocol. It allows AI to directly use live tools — browsers, databases, APIs — instead of just generating text.

**Q4. What is Playwright MCP specifically?**

Playwright MCP is a server that implements the MCP protocol and exposes Playwright browser control as tools that AI models can call. When configured, an AI can navigate pages, click elements, fill forms, and read the DOM — all in response to natural language instructions.

**Q5. What advantages does Playwright MCP give over just asking AI to write code?**

With plain code generation, the AI guesses locators from descriptions or its training data. With Playwright MCP, the AI actively opens the browser, inspects the accessibility tree of the real page, and generates accurate locators based on what it actually sees. This dramatically improves locator accuracy.

**Q6. What is snapshot mode in Playwright MCP?**

Snapshot mode means the AI receives the accessibility tree (ARIA tree) of the page rather than a screenshot image. This is faster and does not require the AI model to have vision capabilities. The ARIA tree contains all interactive elements, their roles, names, and states.

**Q7. What is a planner agent?**

A planner agent is an AI conversation session where you provide a feature specification and ask the AI to generate a test plan — a list of test cases covering happy paths, negative scenarios, edge cases, and boundary values. The output can then be used as input for a generator agent that writes the actual Playwright code.

**Q8. What are the limitations of AI-generated tests?**

AI-generated tests may: (1) use incorrect locators if the AI has not seen the page, (2) miss business logic or application-specific constraints, (3) generate tests that compile but fail at runtime, (4) duplicate coverage or miss important edge cases. Always review, run, and refine AI-generated tests.

**Q9. How does GitHub Copilot Chat differ from inline suggestions?**

Inline suggestions appear as grey text while you type and are accepted with Tab. Copilot Chat is a conversational panel where you ask questions, paste code, and get detailed responses. Chat is better for explaining code, generating entire functions from a description, or asking architectural questions.

**Q10. Why should you not blindly trust AI-generated locators?**

AI models are trained on general web code patterns and may not know your application's specific DOM structure. Locators must be validated against the live application. An AI-generated `page.locator('#username')` may fail if the actual field uses `[name="username"]` or a Playwright-recommended `getByPlaceholder('Username')`.
