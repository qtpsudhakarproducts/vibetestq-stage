# Assignment 07: Files, Downloads & Advanced Scopes

**Topics Covered:** File Uploads, Handling Downloads, iFrames, Multiple Windows (Pages), Browser Dialogs
**Difficulty:** Intermediate  
**Estimated Time:** 2 hours  

---

## Instructions

- Use a practice site like `the-internet.herokuapp.com` or `demoqa.com`
- Handle asynchronous system-level events (downloads, dialogs)
- Navigate complex nested frame structures

---

## Part A: File Handling (40 points)

### Exercise 1: Single and Multi-File Upload (20 points)
Write a test to:
1. Navigate to a "File Upload" page.
2. Select a file from your `assets` folder.
3. Use `setInputFiles()` to upload it.
4. Bonus: Show how to upload **multiple** files at once.

### Exercise 2: Handling Downloads (20 points)
Downloads in Playwright are not saved to the project folder by default. Write a script to:
1. Trigger a download click.
2. Wait for the download to complete using `page.waitForEvent('download')`.
3. Save the downloaded file to a custom path named `./test-results/my_report.pdf`.

---

## Part B: iframes and Scopes (30 points)

### Exercise 3: Identifying Frames (15 points)
How do you identify an iframe in Playwright? Explain the difference between `page.frame()` and `page.frameLocator()`.

### Exercise 4: Interacting inside a Frame (15 points)
Navigate to a page with a "Rich Text Editor" (which is usually an iframe).
1. Locate the frame.
2. Type "Playwright is awesome!" inside the editor.
3. Click a button that is **outside** the frame to save the work.

---

## Part C: Windows and Dialogs (30 points)

### Exercise 5: Multiple Pages/Tabs (15 points)
Sometimes clicking a link opens a new tab. Write a test to:
1. Listen for the `popup` event.
2. Click a link that opens a new tab.
3. Switch to the new page, verify its title, and then close it.
4. Return to the original page and continue.

### Exercise 6: Alert, Confirm, and Prompt (15 points)
Playwright **auto-dismisses** dialogs by default. Write a test to:
1. Accept an alert dialog and verify its message.
2. Decline (Cancel) a confirmation dialog.
3. Fill text into a prompt dialog and then accept it.

---

## Bonus Challenge (10 points)

### Exercise 7: Handling "Flaky" Popups
Write a logic that checks if a "Subscribe to Newsletter" modal appears within 5 seconds. If it does, close it. If it doesn't, continue with your test without failing.

---

## Submission Guidelines

1. Submit a test file `assignment07_complex_ui.spec.js`
2. Include the file you used for the upload exercise
3. Use comments to explain the event listener logic

## Grading Rubric

- **File Management (40%)**: Correct upload and download handling
- **Frame Navigation (30%)**: Correct use of frameLocator
- **Window Management (20%)**: Switching and handling multiple contexts/pages
- **Dialog Interaction (10%)**: Proper usage of dialog event listeners

---

**Total Points: 100 + 10 Bonus**
