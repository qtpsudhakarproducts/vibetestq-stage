# Assignment 09: Media & Emulation

**Topics Covered:** Screenshots, Video Recording, Storage State (Auth Persistence), GeoLocation, Device Emulation, Timezones
**Difficulty:** Advanced  
**Estimated Time:** 1.5 hours  

---

## Instructions

- Use your `playwright.config.js` to set up different mobile and localized projects
- Practice bypassing login screens using saved states

---

## Part A: Visual Evidence (30 points)

### Exercise 1: Capturing the Moment (15 points)
Configure your tests to:
1. Take a full-page screenshot only when a test fails.
2. Record a video of every test run.
3. Save these to a `test-results` folder.

### Exercise 2: Element Screenshots (15 points)
Sometimes a full-page screenshot is too much. Write a line of code to take a screenshot of only the "Login Button" or a specific "Chart" element.

---

## Part B: Authentication Persistence (40 points)

### Exercise 3: Storage State (20 points)
Login once, test many times.
1. Write a setup test that logs into an application and saves the `storageState` to a JSON file (e.g., `auth.json`).
2. Create a second test that uses this `auth.json` in its configuration to start as an already logged-in user.

### Exercise 4: Multi-User Scenarios (20 points)
Show how you would handle a scenario involving an "Admin" and a "Regular User" in the same test suite using different storage states.

---

## Part C: Emulation & Location (30 points)

### Exercise 5: Mobile Emulation (15 points)
Configure a project in your config file to emulate an **iPhone 13** with **dark mode** enabled and a specific **pixel ratio**.

### Exercise 6: Geographical Testing (15 points)
We need to test how our app handles different locations.
1. Use `geolocation` to set your coordinates to Paris, France (Latitude: 48.8584, Longitude: 2.2945).
2. Set the `timezoneId` to `Europe/Paris`.
3. Verify that the UI displays localized content (if applicable) or that the system clock reflects Paris time.

---

## Bonus Challenge (10 points)

### Exercise 7: Permissions
Some sites require "Location" or "Camera" permissions. Show how to grant `geolocation` permissions automatically in your browser context so the user doesn't see a browser popup.

---

## Submission Guidelines

1. Submit your `playwright.config.js` showing emulation settings
2. Submit your auth setup script and two tests using the saved state
3. Include one screenshot taken during the emulation exercise

## Grading Rubric

- **Evidence Collection (30%)**: Correct configuration of screenshots and videos
- **Auth Strategy (40%)**: Mastering Storage State for efficient testing
- **Emulation Accuracy (30%)**: Correct implementation of Geo and Device settings

---

**Total Points: 100 + 10 Bonus**
