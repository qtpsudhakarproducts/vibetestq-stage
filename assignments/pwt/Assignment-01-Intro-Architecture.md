# Assignment 01: Introduction, Installation & Architecture

**Topics Covered:** Prerequisites, Playwright Installation, Browser Engines, Architecture, Manual Launch  
**Difficulty:** Beginner  
**Estimated Time:** 1 hour  

---

## Instructions

- Ensure Node.js is installed on your system
- Create a new project folder for your Playwright assignments
- Use VS Code as your primary editor
- Document your steps and take screenshots of successful commands

---

## Part A: Environment Setup (20 points)

### Exercise 1: Prerequisites Check (5 points)
Verify that your system meets the requirements for Playwright. Run the following commands and record the versions:
- `node -v`
- `npm -v`

### Exercise 2: Project Initialization (10 points)
Create a directory named `pw-assignment-01` and initialize a new Playwright project using the command line. Choose the following options when prompted:
- TypeScript/JavaScript (Your choice)
- Name of your tests folder: `tests`
- Add a GitHub Actions workflow: `No`
- Install Playwright browsers: `Yes`

List the files and folders created by this command.

### Exercise 3: Version Verification (5 points)
Check the installed version of Playwright using `npx playwright --version`.

---

## Part B: Understanding Architecture (30 points)

### Exercise 4: Browser Engines vs Browsers (10 points)
Playwright supports Chromium, Firefox, and WebKit. Explain the difference between "Chromium" and "Google Chrome". Which browser engine does Safari use?

### Exercise 5: Headless vs Headed Mode (10 points)
By default, how does Playwright run tests? Explain the benefits of "Headless" mode for CI/CD and the benefits of "Headed" mode for local development.

### Exercise 6: The CDP Protocol (10 points)
Playwright communicates with browsers using a specific protocol. What is the name of this protocol for Chromium, and how does it differ from the Selenium WebDriver approach?

---

## Part C: Manual Launch & Basic Script (30 points)

### Exercise 7: The "Manual" Playwright Script (20 points)
Create a file named `manual_launch.js` (or `.ts`) and write a script that does the following without using the Playwright Test Runner:
1. Launch Chromium in **headed** mode.
2. Create a new browser context.
3. Open a new page.
4. Navigate to `https://playwright.dev`.
5. Print the page title to the console.
6. Close the browser.

### Exercise 8: Cross-Browser Manual Launch (10 points)
Modify the script from Exercise 7 to run the same steps in **Firefox**. Record any differences in launch time you observe.

---

## Part D: First Test Case (20 points)

### Exercise 9: Writing a `test()` block (15 points)
Create a test file `tests/first_test.spec.js` and write a basic test using the `@playwright/test` library:
- Go to `https://www.google.com`
- Assert that the title contains "Google"
- Use `page.goto()` and `expect(page).toHaveTitle()`

### Exercise 10: Running the Test (5 points)
Run your test using `npx playwright test`. How many browsers did it run on by default?

---

## Bonus Challenge (10 points)

### Exercise 11: Inspector Mode
Launch your test in debug mode using `npx playwright test --debug`. Record what happens when the Playwright Inspector opens. Walk through the code one line at a time.

---

## Submission Guidelines

1. Create a folder `submission_01`
2. Include your `manual_launch.js` and `first_test.spec.js`
3. Include a `README.md` with your answers to the theoretical questions
4. Zip the folder and submit

## Grading Rubric

- **Environment Setup (20%)**: Correct installation and initialization
- **Architectural Knowledge (30%)**: Correct answers to conceptual questions
- **Scripting Accuracy (30%)**: Working manual launch scripts
- **Test Runner Usage (20%)**: Successfully running a test with the runner

---

**Total Points: 100 + 10 Bonus**
