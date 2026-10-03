# Assignment: BrowserStack Integration

**Topics Covered:** BrowserStack Setup, Cloud Testing, Cross-Browser Testing, Parallel Execution, Test Reporting, CI/CD Integration  
**Difficulty:** Intermediate  
**Estimated Time:** 4-5 hours  
**Reference:** `Week3-Day11-BrowserStack-Integration.md`  

---

## 📋 Learning Objectives

- ✅ Set up BrowserStack for cloud testing
- ✅ Configure cross-browser test execution
- ✅ Implement parallel test execution
- ✅ Integrate with CI/CD pipelines
- ✅ Analyze BrowserStack reports
- ✅ Optimize cloud testing costs

---

## Part A: BrowserStack Setup (25 points)

### Exercise 1: Configuration (25 points)

**playwright.config.ts with BrowserStack:**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    connectOptions: {
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
        'browser': 'chrome',
        'browser_version': 'latest',
        'os': 'Windows',
        'os_version': '11',
        'name': 'Playwright Test',
        'build': 'playwright-build-1',
        'browserstack.username': process.env.BROWSERSTACK_USERNAME,
        'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY
      }))}`
    }
  }
});
```

---

## Part B: Cross-Browser Testing (25 points)

### Exercise 2: Multi-Browser Configuration (25 points)

**Implementation:**
```typescript
const browsers = [
  { browser: 'chrome', os: 'Windows', os_version: '11' },
  { browser: 'firefox', os: 'Windows', os_version: '11' },
  { browser: 'safari', os: 'OS X', os_version: 'Monterey' },
  { browser: 'edge', os: 'Windows', os_version: '11' }
];

test.describe('Cross-Browser Tests', () => {
  for (const config of browsers) {
    test(`should work on ${config.browser}`, async ({ page }) => {
      // Test implementation
    });
  }
});
```

---

## Part C: CI/CD Integration (25 points)

### Exercise 3: GitHub Actions Integration (25 points)

**.github/workflows/browserstack.yml:**
```yaml
name: BrowserStack Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npx playwright test
        env:
          BROWSERSTACK_USERNAME: ${{ secrets.BROWSERSTACK_USERNAME }}
          BROWSERSTACK_ACCESS_KEY: ${{ secrets.BROWSERSTACK_ACCESS_KEY }}
```

---

## Part D: Reporting & Optimization (25 points)

### Exercise 4: Test Reporting (25 points)

**Implementation:**
```typescript
// BrowserStack automatically provides reports
// Access at: https://automate.browserstack.com/dashboard
```

---

## Bonus Challenges (30 points)

### Exercise 5: Advanced BrowserStack Features (30 points)
Implement local testing, network throttling, and geolocation testing.

---

**Total Points: 100 + 30 Bonus = 130 points**

Master cloud testing with BrowserStack! ☁️
