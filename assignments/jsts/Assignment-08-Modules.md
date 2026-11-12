# Assignment: JavaScript Modules

**Topics Covered:** CommonJS, ES6 Modules, Import/Export, Named vs Default Exports, Dynamic Imports  
**Difficulty:** Intermediate  
**Estimated Time:** 2-3 hours  
**Reference:** File 11 from documentation

---

## Instructions

- Create separate files for modules as requested
- Use requested module system (CommonJS or ES6)
- Test your modules by importing them in a main file
- Ensure Node.js is configured correctly for ES6 modules (`"type": "module"` in package.json) where applicable

---

## Part A: CommonJS Modules (20 points)

**Note:** For this part, you might need to remove `"type": "module"` from `package.json` effectively or use `.cjs` extension if your project is set to ES6 modules by default.

### Exercise 1: Math Module (10 points)
Create a file named `mathConfig.js` (or `.cjs`) using CommonJS syntax that exports:
1. `add(a, b)` - Adds two numbers
2. `subtract(a, b)` - Subtracts two numbers
3. `MAX_VALUE` - A constant set to 100

Create a `main.js` (or `.cjs`) to:
- Import the module using `require`
- Log the result of adding 5 and 10
- Log the result of subtracting 10 from 20
- Log the value of `MAX_VALUE`

### Exercise 2: User Module (10 points)
Create `userSystem.js` exporting an object directly using `module.exports`:
```javascript
module.exports = {
    users: [],
    addUser(name) { ... },
    getUserCount() { ... }
};
```
Test this module in your main file by adding users and counting them.

---

## Part B: ES6 Modules - Named Exports (25 points)

**Note:** Ensure your `package.json` has `"type": "module"` or use `.mjs` extension.

### Exercise 3: String Utilities (10 points)
Create `stringUtils.js` with **named exports**:
1. `toUpperCase(str)`
2. `toLowerCase(str)`
3. `capitalize(str)` - First letter uppercase, rest lowercase
4. `reverseString(str)`

### Exercise 4: Importing Named Exports (15 points)
Create `app.js` that:
1. Imports `toUpperCase` and `reverseString` specifically using destructured import syntax.
2. Imports **everything** from `stringUtils.js` as an object alias `StrLib`.

Test both import styles:
```javascript
// Style 1
console.log(toUpperCase("hello")); 

// Style 2
console.log(StrLib.capitalize("world"));
```

---

## Part C: ES6 Modules - Default Exports (20 points)

### Exercise 5: Logger Class (10 points)
Create `Logger.js` that has a **default export** of a class `Logger`:
- Methods: `log(msg)`, `info(msg)`, `error(msg)`
- Each method should print with a timestamp.

### Exercise 6: Using Default Exports (10 points)
Create a consumer file that imports the default export:
1. Import it as `Logger`
2. Import it as `MySystemLogger` (demonstrating you can name it anything)

Instantiate and test methods for both imports.

---

## Part D: Advanced Module Patterns (20 points)

### Exercise 7: Mixed Exports (10 points)
Create `apiConfig.js`:
- **Named export:** `API_KEY` = "SECRET_KEY"
- **Named export:** `TIMEOUT` = 5000
- **Default export:** A function `fetchData(url)` that returns a simulated Promise resolving after `TIMEOUT`.

Import all of these in `dataService.js` and use them.

### Exercise 8: Re-exporting / Aggregating (10 points)
Create a folder structure:
- `components/Button.js` (default export specific string "Button Component")
- `components/Header.js` (default export specific string "Header Component")
- `components/index.js`

In `components/index.js`, re-export the default exports from Button and Header so they can be imported like this:
```javascript
import { Button, Header } from './components/index.js'; // or just './components'
```

---

## Part E: Practical Refactoring (15 points)

### Exercise 9: Modularize Monolith
Refactor the following code into 3 files: `constants.js`, `calculations.js`, and `program.js`.

**Original Code:**
```javascript
const TAX_RATE = 0.1;
const SHIPPING_COST = 15;

function calculateTotal(price) {
    return price + (price * TAX_RATE) + SHIPPING_COST;
}

function printInvoice(price) {
    console.log(`Item Price: ${price}`);
    console.log(`Total (w/ Tax & Shipping): ${calculateTotal(price)}`);
}

printInvoice(100);
```

---

## Bonus Challenge (20 points)

### Exercise 10: Dynamic Imports
Create a script that:
1. Has a variable `language` (e.g., 'en' or 'es').
2. Based on the language, **dynamically imports** a greeting module (`messages/en.js` or `messages/es.js`) using `import()`.
3. Prints the greeting from the loaded module.
4. Handle errors if the module doesn't exist.

---

## Submission Guidelines

1. Organize your `assignment08` folder with clear subfolders if needed (e.g., `partA`, `partB`).
2. Include a `README.md` if you have specific instructions on how to run your files (especially regarding `.mjs` vs `.js` configuration).
3. Ensure all code runs without errors.

## Grading Rubric
- **Module Implementation (40%)**: Correct syntax for CJS and ES6
- **Import/Export Usage (30%)**: Correct usage of named, default, and mixed exports
- **Code Organization (20%)**: Logical file separation
- **Bonus (10%)**: Successful implementation of dynamic imports

## Common Mistakes
❌ Mixing `require` and `import` in the same file without proper configuration
❌ Forgetting file extensions (`.js`) in ES6 imports
❌ Confusing default export imports (no braces) with named imports (braces)
