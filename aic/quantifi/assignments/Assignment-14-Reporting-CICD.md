# Assignment 14: Reporting & CI/CD with AWS CodeBuild

---

## Learning Objectives

- Configure built-in Playwright HTML and JSON reporters
- Run tests in parallel with multiple workers
- Set up retry for flaky tests
- Understand an AWS CodeBuild pipeline for Playwright
- Create a `buildspec.yml` for running tests in CI

---

## Instructions

- Continue using your existing Playwright project
- All config changes go in `playwright.config.ts`
- Target application: `https://opensource-demo.orangehrmlive.com`
- You do not need to deploy to AWS — understand the config and pipeline setup

---

## Part A: Test Reporters

### Exercise 1: HTML Report

1. Update `playwright.config.ts` to use the `html` reporter:
   - Set `reporter` to `[['html', { open: 'never' }]]`
2. Run your full test suite.
3. Open the report with `npx playwright show-report`.
4. Explore the report:
   - Find a passed test and a failed test
   - Click on a test to see its steps and screenshots
   - Note the test duration for each test
5. Take a screenshot of the HTML report to share with the trainer.

---

### Exercise 2: Multiple Reporters

Configure Playwright to use **two reporters at once**:
- `html` — for visual report
- `dot` — for console progress dots while running

1. Update the `reporter` setting to use an array.
2. Run the tests and observe both outputs.
3. Add `json` as a third reporter and set the output file to `results/test-results.json`.
4. Open the JSON file and find the total pass count and fail count.

---

### Exercise 3: Allure Reporter

1. Install: `npm install -D allure-playwright`
2. Add `allure-playwright` to your reporters list with output folder `allure-results`.
3. Run tests.
4. Generate the report: `npx allure generate allure-results --clean -o allure-report`
5. Open it: `npx allure open allure-report`
6. Explore the categories, timelines, and test details.

---

## Part B: Parallelization and Retries

### Exercise 4: Parallel Execution

1. In `playwright.config.ts`, set `workers: 4`.
2. Run your tests and observe the parallel execution in the terminal.
3. Check the HTML report — how does it show parallel runs?
4. Now set `workers: 1` and run again. Measure the total time difference.
5. Which tests are safe to run in parallel? Which ones might conflict (e.g., two tests both adding the same employee)?

Write your answer in a comment in the config file.

---

### Exercise 5: Retry on Failure

1. Set `retries: 2` in `playwright.config.ts`.
2. Deliberately make one test fail (e.g., assert the wrong text).
3. Run the tests. Observe how Playwright retries the failing test 2 times before marking it failed.
4. Look in the HTML report — it shows the retry attempts separately.
5. Set `retries: 0` after the exercise.

---

## Part C: AWS CodeBuild Configuration

### Exercise 6: Understand the CI Pipeline

You do not need an AWS account for this exercise.

Read through the following `buildspec.yml` and answer the questions below it:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm ci
      - npx playwright install --with-deps

  pre_build:
    commands:
      - echo "Starting test run at $(date)"

  build:
    commands:
      - npx playwright test --reporter=html,json

  post_build:
    commands:
      - echo "Tests complete"

artifacts:
  files:
    - playwright-report/**/*
    - results/**/*
  base-directory: .
```

Answer these questions in a comment file `notes/cicd-notes.ts`:

1. Which phase installs Node.js dependencies?
2. What does `npx playwright install --with-deps` do?
3. Where are test reports stored after the build?
4. What would you change to run only tests tagged `@smoke`?

---

### Exercise 7: Create Your buildspec.yml

1. Create `buildspec.yml` in your project root.

2. Write a complete buildspec that:
   - Uses Node.js 20
   - Runs `npm ci` to install dependencies
   - Installs Playwright browsers
   - Runs tests with both `html` and `json` reporters
   - Saves the `playwright-report/` folder as a build artifact

3. Add a `smoke` tag to 2 of your OrangeHRM tests using `test.slow()` or the `@smoke` tag pattern.

4. Modify the `build` phase in your `buildspec.yml` to run only tagged smoke tests.

5. Add a condition to the `post_build` phase that prints `"All smoke tests passed"` or `"Some tests failed"` based on the exit code.
