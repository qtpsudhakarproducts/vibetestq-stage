# Assignment 14: Working with Strings

## Learning Objectives
- Create and manipulate strings using various methods
- Use template literals for string interpolation
- Search, extract, and replace text within strings
- Apply string methods for test automation scenarios

---

## Part A: Conceptual Questions

**Q1:** What is the difference between single quotes, double quotes, and backticks for creating strings?

**Q2:** Why are strings called "immutable" in JavaScript? What happens when you call a method like `toUpperCase()` on a string?

**Q3:** What is string interpolation and how do you achieve it in JavaScript?

**Q4:** Explain the difference between `slice()` and `substring()` methods.

**Q5:** What does `indexOf()` return when the search string is not found?

---

## Part B: Coding Exercises

### Exercise 1: Basic String Operations
Create a file `strings-basics.js` and write functions to:

```javascript
// 1. Create a function that returns the length of a string
function getStringLength(str) {
    // Your code here
}

// 2. Create a function that returns the first and last character of a string
function getFirstAndLastChar(str) {
    // Return an object { first: 'x', last: 'y' }
}

// 3. Create a function that converts a string to uppercase and lowercase
function convertCase(str) {
    // Return an object { upper: 'HELLO', lower: 'hello' }
}

// Test your functions
console.log(getStringLength("Hello World")); // 11
console.log(getFirstAndLastChar("JavaScript")); // { first: 'J', last: 't' }
console.log(convertCase("Hello")); // { upper: 'HELLO', lower: 'hello' }
```

### Exercise 2: String Searching
Create a file `strings-search.js` and implement:

```javascript
// 1. Check if an email contains "@" symbol
function isValidEmailFormat(email) {
    // Return true if email contains "@"
}

// 2. Find the position of a word in a sentence
function findWordPosition(sentence, word) {
    // Return the index where word starts, or -1 if not found
}

// 3. Check if a URL starts with "https"
function isSecureUrl(url) {
    // Return true if URL starts with "https"
}

// 4. Check if a filename ends with ".js" or ".ts"
function isJavaScriptFile(filename) {
    // Return true if file ends with .js or .ts
}

// Test your functions
console.log(isValidEmailFormat("user@example.com")); // true
console.log(isValidEmailFormat("invalid-email")); // false
console.log(findWordPosition("The quick brown fox", "quick")); // 4
console.log(isSecureUrl("https://example.com")); // true
console.log(isJavaScriptFile("app.ts")); // true
```

### Exercise 3: String Extraction
Create a file `strings-extract.js` and implement:

```javascript
// 1. Extract the domain from an email address
function extractDomain(email) {
    // "user@example.com" -> "example.com"
}

// 2. Extract the file extension from a filename
function getFileExtension(filename) {
    // "document.pdf" -> "pdf"
}

// 3. Extract first N characters from a string (with ellipsis if truncated)
function truncateString(str, maxLength) {
    // "Hello World" with maxLength 8 -> "Hello..."
}

// 4. Extract text between two markers
function extractBetween(str, startMarker, endMarker) {
    // "Hello [World] Today" with markers "[" and "]" -> "World"
}

// Test your functions
console.log(extractDomain("admin@company.org")); // "company.org"
console.log(getFileExtension("report.pdf")); // "pdf"
console.log(truncateString("Hello World", 8)); // "Hello..."
console.log(extractBetween("Price: $100 USD", "$", " ")); // "100"
```

### Exercise 4: String Transformation
Create a file `strings-transform.js` and implement:

```javascript
// 1. Remove extra whitespace from a string
function normalizeWhitespace(str) {
    // "  Hello    World  " -> "Hello World"
}

// 2. Convert a string to title case
function toTitleCase(str) {
    // "hello world" -> "Hello World"
}

// 3. Reverse a string
function reverseString(str) {
    // "Hello" -> "olleH"
}

// 4. Convert camelCase to kebab-case
function camelToKebab(str) {
    // "backgroundColor" -> "background-color"
}

// 5. Pad a number with leading zeros
function padNumber(num, width) {
    // padNumber(42, 5) -> "00042"
}

// Test your functions
console.log(normalizeWhitespace("  Hello    World  ")); // "Hello World"
console.log(toTitleCase("the quick brown fox")); // "The Quick Brown Fox"
console.log(reverseString("JavaScript")); // "tpircSavaJ"
console.log(camelToKebab("backgroundColor")); // "background-color"
console.log(padNumber(7, 3)); // "007"
```

### Exercise 5: Template Literals
Create a file `strings-templates.js` and implement:

```javascript
// 1. Create a greeting message with name and time of day
function createGreeting(name, timeOfDay) {
    // Return "Good morning, John!" or similar
}

// 2. Generate an HTML element string
function createHtmlElement(tag, content, className) {
    // Return '<div class="container">Hello</div>'
}

// 3. Create a multi-line address format
function formatAddress(address) {
    // address = { street: '123 Main St', city: 'New York', zip: '10001' }
    // Return formatted multi-line string
}

// 4. Build a test assertion message
function buildAssertionMessage(expected, actual, field) {
    // Return "Expected field 'username' to be 'admin' but got 'user'"
}

// Test your functions
console.log(createGreeting("Alice", "evening"));
console.log(createHtmlElement("button", "Click Me", "btn-primary"));
console.log(formatAddress({ street: "123 Main St", city: "New York", zip: "10001" }));
console.log(buildAssertionMessage("admin", "user", "username"));
```

### Exercise 6: Test Automation Scenarios
Create a file `strings-automation.js` and implement:

```javascript
// 1. Build a dynamic CSS selector
function buildSelector(elementType, attribute, value) {
    // Return something like 'button[data-testid="submit"]'
}

// 2. Extract test ID from an element's attribute string
function extractTestId(attributeString) {
    // 'class="btn" data-testid="login-btn" disabled' -> "login-btn"
}

// 3. Generate a unique test identifier
function generateTestId(prefix) {
    // Return something like "test-user-1234567890"
}

// 4. Compare two strings ignoring case and whitespace
function compareNormalized(str1, str2) {
    // Return true if strings match after normalization
}

// 5. Mask sensitive data in a string
function maskSensitiveData(str, pattern, maskChar) {
    // maskSensitiveData("Card: 1234-5678-9012", "\\d{4}", "****")
    // -> "Card: ****-****-****"
}

// Test your functions
console.log(buildSelector("button", "data-testid", "submit"));
console.log(extractTestId('class="btn" data-testid="login-btn" disabled'));
console.log(generateTestId("test-user"));
console.log(compareNormalized("Hello World", "  hello   world  ")); // true
```

---

## Part C: Challenge Problems

### Challenge 1: Password Strength Checker
Create a function that checks password strength based on:
- At least 8 characters
- Contains uppercase letter
- Contains lowercase letter
- Contains number
- Contains special character

```javascript
function checkPasswordStrength(password) {
    // Return { isValid: true/false, score: 0-5, feedback: [...] }
}

console.log(checkPasswordStrength("weak"));
console.log(checkPasswordStrength("StrongP@ss1"));
```

### Challenge 2: URL Parser
Create a function that parses a URL into its components:

```javascript
function parseUrl(url) {
    // Return { protocol, domain, port, path, query, fragment }
}

console.log(parseUrl("https://example.com:8080/api/users?page=1#section"));
// { protocol: 'https', domain: 'example.com', port: '8080',
//   path: '/api/users', query: 'page=1', fragment: 'section' }
```

### Challenge 3: Log Parser
Create a function that extracts information from log entries:

```javascript
function parseLogEntry(logLine) {
    // "[2024-01-15 10:30:45] ERROR - User login failed: invalid credentials"
    // Return { timestamp, level, message }
}

const log = "[2024-01-15 10:30:45] ERROR - User login failed";
console.log(parseLogEntry(log));
// { timestamp: '2024-01-15 10:30:45', level: 'ERROR', message: 'User login failed' }
```

---

## Answers and Solutions

### Part A: Conceptual Answers

**A1:** Single quotes and double quotes work identically in JavaScript for creating strings. Backticks (template literals) allow string interpolation with `${expression}` syntax and multi-line strings without escape characters.

**A2:** Strings are immutable because once created, the characters within a string cannot be changed. When you call methods like `toUpperCase()`, a new string is created and returned; the original string remains unchanged.

**A3:** String interpolation is the ability to embed expressions directly within strings. In JavaScript, this is achieved using template literals with the `${expression}` syntax inside backticks.

**A4:** `slice()` accepts negative indices (counting from the end) and doesn't swap arguments. `substring()` doesn't accept negative indices (treats them as 0) and swaps start/end if start > end.

**A5:** `indexOf()` returns `-1` when the search string is not found in the string.

### Part B: Coding Solutions

#### Exercise 1: Basic String Operations
```javascript
function getStringLength(str) {
    return str.length;
}

function getFirstAndLastChar(str) {
    return {
        first: str.charAt(0),
        last: str.charAt(str.length - 1)
    };
}

function convertCase(str) {
    return {
        upper: str.toUpperCase(),
        lower: str.toLowerCase()
    };
}
```

#### Exercise 2: String Searching
```javascript
function isValidEmailFormat(email) {
    return email.includes("@");
}

function findWordPosition(sentence, word) {
    return sentence.indexOf(word);
}

function isSecureUrl(url) {
    return url.startsWith("https");
}

function isJavaScriptFile(filename) {
    return filename.endsWith(".js") || filename.endsWith(".ts");
}
```

#### Exercise 3: String Extraction
```javascript
function extractDomain(email) {
    const atIndex = email.indexOf("@");
    return email.slice(atIndex + 1);
}

function getFileExtension(filename) {
    const dotIndex = filename.lastIndexOf(".");
    return dotIndex !== -1 ? filename.slice(dotIndex + 1) : "";
}

function truncateString(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - 3) + "...";
}

function extractBetween(str, startMarker, endMarker) {
    const startIndex = str.indexOf(startMarker) + startMarker.length;
    const endIndex = str.indexOf(endMarker, startIndex);
    return str.slice(startIndex, endIndex);
}
```

#### Exercise 4: String Transformation
```javascript
function normalizeWhitespace(str) {
    return str.trim().replace(/\s+/g, " ");
}

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function padNumber(num, width) {
    return String(num).padStart(width, "0");
}
```

#### Exercise 5: Template Literals
```javascript
function createGreeting(name, timeOfDay) {
    return `Good ${timeOfDay}, ${name}!`;
}

function createHtmlElement(tag, content, className) {
    return `<${tag} class="${className}">${content}</${tag}>`;
}

function formatAddress(address) {
    return `${address.street}
${address.city}, ${address.zip}`;
}

function buildAssertionMessage(expected, actual, field) {
    return `Expected field '${field}' to be '${expected}' but got '${actual}'`;
}
```

#### Exercise 6: Test Automation Scenarios
```javascript
function buildSelector(elementType, attribute, value) {
    return `${elementType}[${attribute}="${value}"]`;
}

function extractTestId(attributeString) {
    const match = attributeString.match(/data-testid="([^"]+)"/);
    return match ? match[1] : null;
}

function generateTestId(prefix) {
    return `${prefix}-${Date.now()}`;
}

function compareNormalized(str1, str2) {
    const normalize = (s) => s.toLowerCase().trim().replace(/\s+/g, " ");
    return normalize(str1) === normalize(str2);
}

function maskSensitiveData(str, pattern, maskChar) {
    const regex = new RegExp(pattern, "g");
    return str.replace(regex, maskChar);
}
```

### Part C: Challenge Solutions

#### Challenge 1: Password Strength Checker
```javascript
function checkPasswordStrength(password) {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const feedback = [];
    if (!checks.length) feedback.push("At least 8 characters required");
    if (!checks.uppercase) feedback.push("Add an uppercase letter");
    if (!checks.lowercase) feedback.push("Add a lowercase letter");
    if (!checks.number) feedback.push("Add a number");
    if (!checks.special) feedback.push("Add a special character");

    const score = Object.values(checks).filter(Boolean).length;

    return {
        isValid: score >= 4,
        score,
        feedback
    };
}
```

#### Challenge 2: URL Parser
```javascript
function parseUrl(url) {
    const result = {
        protocol: "",
        domain: "",
        port: "",
        path: "",
        query: "",
        fragment: ""
    };

    // Extract fragment
    const fragmentIndex = url.indexOf("#");
    if (fragmentIndex !== -1) {
        result.fragment = url.slice(fragmentIndex + 1);
        url = url.slice(0, fragmentIndex);
    }

    // Extract query
    const queryIndex = url.indexOf("?");
    if (queryIndex !== -1) {
        result.query = url.slice(queryIndex + 1);
        url = url.slice(0, queryIndex);
    }

    // Extract protocol
    const protocolEnd = url.indexOf("://");
    if (protocolEnd !== -1) {
        result.protocol = url.slice(0, protocolEnd);
        url = url.slice(protocolEnd + 3);
    }

    // Extract path
    const pathIndex = url.indexOf("/");
    if (pathIndex !== -1) {
        result.path = url.slice(pathIndex);
        url = url.slice(0, pathIndex);
    }

    // Extract port
    const portIndex = url.indexOf(":");
    if (portIndex !== -1) {
        result.port = url.slice(portIndex + 1);
        result.domain = url.slice(0, portIndex);
    } else {
        result.domain = url;
    }

    return result;
}
```

#### Challenge 3: Log Parser
```javascript
function parseLogEntry(logLine) {
    const timestampMatch = logLine.match(/\[(.*?)\]/);
    const levelMatch = logLine.match(/\]\s*(\w+)\s*-/);
    const messageMatch = logLine.match(/-\s*(.*)$/);

    return {
        timestamp: timestampMatch ? timestampMatch[1] : "",
        level: levelMatch ? levelMatch[1] : "",
        message: messageMatch ? messageMatch[1] : ""
    };
}
```

---

## Summary

In this assignment, you learned:
- Creating strings using different quote styles
- Using template literals for dynamic string construction
- Searching within strings using indexOf, includes, startsWith, endsWith
- Extracting substrings with slice and substring
- Transforming strings with various methods
- Applying string manipulation in test automation contexts

**Next:** Move on to Assignment 15 to learn about Regular Expressions for advanced pattern matching.
