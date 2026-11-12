# Chapter 14 — Reporting & CI/CD with AWS CodeBuild

---

## What You Will Learn

- How to configure Playwright's built-in reporters (HTML, JSON, list)
- How to set up Allure Reporter for rich test reports
- How to run tests in parallel and configure workers
- How to retry failed tests automatically
- What CI/CD is and how it relates to automated testing
- How to configure AWS CodeBuild to run Playwright tests

---

## 14.1 Why Reporting Matters

A test report is the output that your team, manager, and client see. A good report shows:

- Which tests passed, failed, and were skipped
- How long each test took
- Screenshots and videos of failing tests
- A trend over time (are things improving?)

---

## 14.2 Built-in Playwright Reporters

Configure reporters in `playwright.config.ts`:

```typescript
export default defineConfig({
    reporter: [
        ['list'],           // prints to terminal as tests run
        ['html'],           // generates HTML report in playwright-report/
        ['json', { outputFile: 'test-results/results.json' }],
    ],
});
```

### HTML Reporter

The default HTML report is generated after every run:

```bash
npx playwright test
npx playwright show-report        # opens the HTML report in browser
```

The report shows:
- Test names grouped by file
- Pass/Fail/Skip status with duration
- Attached screenshots and videos for failures
- Full error messages with stack traces

### List Reporter

Prints each test result to the console as it completes:

```
  ✓  login.spec.ts  should login successfully  (1.2s)
  ✗  login.spec.ts  should fail with wrong password  (2.1s)
```

### JSON Reporter

Produces a machine-readable file useful for integrating with dashboards and CI tools:

```json
{
  "suites": [
    {
      "title": "login.spec.ts",
      "specs": [
        {
          "title": "should login successfully",
          "ok": true,
          "tests": [{ "status": "passed", "duration": 1234 }]
        }
      ]
    }
  ]
}
```

---

## 14.3 Allure Reporter

Allure produces a detailed, interactive HTML report with test history, categories, and trend charts.

### Installation

```bash
npm install -D allure-playwright allure-commandline
```

### Configuration

```typescript
reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
],
```

### Generate and Open Report

```bash
npx playwright test
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report
```

### Adding Metadata to Tests

```typescript
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('login test', async ({ page }) => {
    allure.label('feature', 'Authentication');
    allure.label('severity', 'critical');
    allure.description('Verifies that Admin can log into OrangeHRM');

    await page.goto('/web/index.php/auth/login');
    // ...
});
```

---

## 14.4 Parallel Execution

By default, Playwright runs test files in parallel across workers. Within a file, tests run sequentially.

```typescript
export default defineConfig({
    fullyParallel: true,   // all tests, across all files, in parallel
    workers: 4,            // 4 parallel workers (default: number of CPU cores / 2)
});
```

### Running in Parallel from CLI

```bash
npx playwright test --workers=4
```

### Limiting Parallelism for Specific Tests

Some tests share state (like creating and deleting the same employee). Mark files that must run sequentially:

```typescript
// At the top of a spec file
test.describe.configure({ mode: 'serial' });
```

---

## 14.5 Retries on Failure

Flaky tests occasionally fail due to timing issues. Configure retries to re-run failed tests automatically.

```typescript
export default defineConfig({
    retries: 2,   // retry up to 2 times before marking as failed
});
```

Run with retries from CLI:

```bash
npx playwright test --retries=2
```

### Retry-Only Logic

Run code only on retry attempts:

```typescript
test('flaky test', async ({ page }) => {
    if (test.info().retry > 0) {
        console.log(`Retry attempt ${test.info().retry}`);
    }
    // test steps...
});
```

---

## 14.6 What Is CI/CD?

**CI (Continuous Integration)** — developers merge code changes frequently, and an automated pipeline runs tests on every merge.

**CD (Continuous Deployment/Delivery)** — after tests pass, code is automatically deployed to staging or production.

```
Developer pushes code
  → CI/CD pipeline starts
    → Install dependencies
    → Run linting
    → Run unit tests
    → Run Playwright tests
    → (if all pass) Deploy to staging
```

Benefits for testers:
- Tests run automatically on every code change
- Failures are caught early, not days later
- Test results are attached to every build

---

## 14.7 AWS CodeBuild

AWS CodeBuild is a fully managed CI service that builds and tests code in the cloud. You do not manage servers.

### How It Works

1. Code is pushed to a repository (GitHub, AWS CodeCommit)
2. CodeBuild detects the change via a webhook
3. CodeBuild spins up a container using a specified Docker image
4. It runs commands defined in `buildspec.yml`
5. Test results and artifacts are uploaded to S3

---

## 14.8 `buildspec.yml`

This file tells CodeBuild what to do. Place it at the project root.

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - echo Installing dependencies...
      - npm ci
      - npx playwright install --with-deps chromium

  pre_build:
    commands:
      - echo Pre-build phase started
      - echo "Node version: $(node --version)"
      - echo "NPM version: $(npm --version)"

  build:
    commands:
      - echo Running Playwright tests...
      - npx playwright test --reporter=list,html,json

  post_build:
    commands:
      - echo Tests complete. Exit code: $CODEBUILD_BUILD_SUCCEEDING

artifacts:
  files:
    - playwright-report/**/*
    - test-results/**/*
  name: playwright-test-results
```

### Key Sections

| Section | Purpose |
|---------|---------|
| `install` | Set up NodeJS, install packages, download browsers |
| `pre_build` | Print versions, validate environment |
| `build` | Run the tests |
| `post_build` | Log completion status |
| `artifacts` | Upload test result files to S3 |

### Docker Image for Playwright

Use the official Playwright Docker image to avoid browser installation issues:

```yaml
phases:
  install:
    commands:
      - npm ci
      # browsers are already installed in the Docker image
```

Specify the image in CodeBuild project settings:
`mcr.microsoft.com/playwright:v1.40.0-jammy`

---

## 14.9 Environment Variables in CodeBuild

Never hardcode credentials. Store them in AWS Systems Manager Parameter Store or CodeBuild environment variables.

In `buildspec.yml`:

```yaml
env:
  parameter-store:
    BASE_URL: /playwright/base-url
    ADMIN_PASSWORD: /playwright/admin-password
```

In `playwright.config.ts`:

```typescript
use: {
    baseURL: process.env.BASE_URL,
},
```

---

## Review Questions

**Q1. What is the `html` reporter in Playwright?**

The HTML reporter generates a self-contained website in the `playwright-report/` folder after every test run. It shows all tests grouped by file, their status, duration, error messages, and attached screenshots and videos for failures. View it with `npx playwright show-report`.

**Q2. What is the difference between `workers` and `fullyParallel`?**

`workers` sets the number of parallel processes that run simultaneously. `fullyParallel` controls whether all tests (including tests within the same file) run in parallel or just files run in parallel while tests within a file remain sequential.

**Q3. When should you use retries?**

Use retries for genuinely flaky tests — tests that fail occasionally due to timing issues, network latency, or test environment instability. Do not use retries to mask bugs. If a test consistently fails, it should be fixed. The recommended setting is `retries: 2` in CI and `retries: 0` locally.

**Q4. What is Allure and why is it used over the built-in HTML reporter?**

Allure Reporter generates a richer report with trend charts, test categorisation (broken vs failed vs passed), history across builds, severity labels, and detailed test metadata. It is often preferred by teams that need to present test results to stakeholders or track quality over time.

**Q5. What is `buildspec.yml` in AWS CodeBuild?**

`buildspec.yml` is the build specification file that tells CodeBuild what commands to run at each phase of the build. It defines install, pre_build, build, and post_build phases, plus which files to save as artifacts. Without this file, CodeBuild does not know what to do.

**Q6. What is the difference between CI and CD?**

CI (Continuous Integration) is the practice of automatically building and testing code whenever a developer pushes a change. CD (Continuous Delivery/Deployment) extends this by automatically deploying the application if all tests pass. CI ensures code quality; CD ensures release speed.

**Q7. Why should credentials not be hardcoded in `buildspec.yml`?**

Because `buildspec.yml` is committed to version control and visible to anyone with repository access. Credentials in the file expose them to all contributors and are permanently stored in git history. Use AWS Parameter Store, Secrets Manager, or CodeBuild environment variables instead.

**Q8. What does `test.describe.configure({ mode: 'serial' })` do?**

It forces all tests in the file to run sequentially (one after another) in the same worker, even when `fullyParallel: true` is set globally. Use it for tests that share state and cannot safely run in parallel — for example, tests that create and then delete the same record.

**Q9. What is the purpose of `npm ci` vs `npm install` in CI?**

`npm ci` (clean install) installs exact versions from `package-lock.json` and fails if the lock file is out of sync. It is faster and deterministic. `npm install` may update `package-lock.json` and install slightly different versions. Always use `npm ci` in CI pipelines.

**Q10. How are test artifacts stored when using AWS CodeBuild?**

After the build, files listed in the `artifacts` section of `buildspec.yml` are uploaded to an S3 bucket. Playwright's `playwright-report/` and `test-results/` folders contain the HTML report, screenshots, videos, and traces. Team members can download them from S3 to inspect failures.
