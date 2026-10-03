# Assignment: Mobile Testing with WebDriverIO

**Topics Covered:** WebDriverIO Setup, Appium, Mobile Gestures, Native vs Hybrid Apps, Device Capabilities, Mobile-Specific Testing  
**Difficulty:** Intermediate to Advanced  
**Estimated Time:** 5-6 hours  
**Reference:** `Week3-Day10-Mobile-Testing-WebDriverIO.md`  

---

## 📋 Learning Objectives

- ✅ Set up WebDriverIO for mobile testing
- ✅ Configure Appium for iOS and Android
- ✅ Implement mobile gestures (swipe, tap, scroll)
- ✅ Test native and hybrid applications
- ✅ Handle mobile-specific scenarios
- ✅ Implement cross-platform mobile tests

---

## Part A: WebDriverIO Setup (25 points)

### Exercise 1: Project Configuration (25 points)

**wdio.conf.ts:**
```typescript
export const config: WebdriverIO.Config = {
  runner: 'local',
  port: 4723,
  specs: ['./test/specs/**/*.ts'],
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Android Emulator',
    'appium:app': './app/android/app-debug.apk',
    'appium:automationName': 'UiAutomator2'
  }],
  framework: 'mocha',
  mochaOpts: {
    timeout: 60000
  }
};
```

**First Mobile Test:**
```typescript
describe('Mobile App Tests', () => {
  it('should launch app', async () => {
    const appTitle = await $('~app-title');
    await expect(appTitle).toBeDisplayed();
  });

  it('should perform tap gesture', async () => {
    const button = await $('~submit-button');
    await button.click();
  });

  it('should perform swipe gesture', async () => {
    await driver.execute('mobile: swipe', {
      direction: 'up',
      percent: 0.5
    });
  });
});
```

---

## Part B: Mobile Gestures (25 points)

### Exercise 2: Gesture Implementation (25 points)

**Implementation:**
```typescript
class MobileGestures {
  async swipeUp() {
    await driver.execute('mobile: swipe', {
      direction: 'up'
    });
  }

  async swipeDown() {
    await driver.execute('mobile: swipe', {
      direction: 'down'
    });
  }

  async scrollToElement(element: WebdriverIO.Element) {
    await element.scrollIntoView();
  }

  async longPress(element: WebdriverIO.Element) {
    await driver.touchAction([
      { action: 'press', element },
      { action: 'wait', ms: 1000 },
      { action: 'release' }
    ]);
  }
}
```

---

## Part C: Cross-Platform Testing (25 points)

### Exercise 3: iOS & Android Tests (25 points)

**Implementation:**
```typescript
describe('Cross-Platform Tests', () => {
  it('should work on both platforms', async () => {
    const isAndroid = driver.isAndroid;
    const isIOS = driver.isIOS;

    if (isAndroid) {
      // Android-specific code
      await $('android=new UiSelector().text("Submit")').click();
    } else if (isIOS) {
      // iOS-specific code
      await $('~submit-button').click();
    }
  });
});
```

---

## Part D: Advanced Mobile Testing (25 points)

### Exercise 4: Device Capabilities & Testing (25 points)

**Implementation:**
```typescript
describe('Advanced Mobile Tests', () => {
  it('should test on different screen sizes', async () => {
    await driver.setWindowRect(0, 0, 375, 667); // iPhone SE
    // Test responsive behavior
  });

  it('should handle app state', async () => {
    await driver.background(5); // Background for 5 seconds
    await driver.activateApp('com.example.app');
  });
});
```

---

## Bonus Challenges (30 points)

### Exercise 5: Complete Mobile Test Framework (30 points)
Build comprehensive mobile testing framework with page objects and utilities.

---

## Grading Rubric

- **Setup & Configuration (25%)**: Proper WebDriverIO and Appium setup
- **Gestures (25%)**: Mobile gesture implementation
- **Cross-Platform (25%)**: iOS and Android support
- **Advanced Features (25%)**: Device capabilities, app state

---

**Total Points: 100 + 30 Bonus = 130 points**

Master mobile testing with WebDriverIO! 📱
