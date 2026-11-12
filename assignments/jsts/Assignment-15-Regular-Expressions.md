# Assignment 15: Regular Expressions

## Learning Objectives
- Create and use regular expressions for pattern matching
- Understand regex syntax including character classes, quantifiers, and anchors
- Use regex methods: test(), match(), exec(), replace(), split()
- Apply regular expressions in test automation scenarios

---

## Part A: Conceptual Questions

**Q1:** What is the difference between creating a regex using literal notation `/pattern/` versus the `new RegExp()` constructor?

**Q2:** Explain what the `g`, `i`, and `m` flags do in regular expressions.

**Q3:** What is the difference between `*`, `+`, and `?` quantifiers?

**Q4:** What are capturing groups and how do you create a non-capturing group?

**Q5:** Explain the difference between greedy and lazy quantifiers.

---

## Part B: Coding Exercises

### Exercise 1: Basic Pattern Matching
Create a file `regex-basics.js` and write functions to:

```javascript
// 1. Check if a string contains only digits
function isOnlyDigits(str) {
    // Return true if string contains only 0-9
}

// 2. Check if a string contains only letters
function isOnlyLetters(str) {
    // Return true if string contains only a-z or A-Z
}

// 3. Check if a string is alphanumeric
function isAlphanumeric(str) {
    // Return true if string contains only letters and numbers
}

// 4. Check if a string contains any whitespace
function hasWhitespace(str) {
    // Return true if string contains any whitespace
}

// Test your functions
console.log(isOnlyDigits("12345")); // true
console.log(isOnlyDigits("123a5")); // false
console.log(isOnlyLetters("Hello")); // true
console.log(isAlphanumeric("Hello123")); // true
console.log(hasWhitespace("Hello World")); // true
```

### Exercise 2: Validation Patterns
Create a file `regex-validation.js` and implement:

```javascript
// 1. Validate email format
function isValidEmail(email) {
    // Basic email validation
}

// 2. Validate phone number (formats: 123-456-7890, (123) 456-7890, 1234567890)
function isValidPhone(phone) {
    // Return true if valid phone format
}

// 3. Validate date format (YYYY-MM-DD)
function isValidDate(date) {
    // Return true if matches YYYY-MM-DD format
}

// 4. Validate URL format
function isValidUrl(url) {
    // Basic URL validation (http or https)
}

// 5. Validate username (3-16 chars, letters, numbers, underscores)
function isValidUsername(username) {
    // Return true if valid username
}

// Test your functions
console.log(isValidEmail("user@example.com")); // true
console.log(isValidPhone("123-456-7890")); // true
console.log(isValidDate("2024-01-15")); // true
console.log(isValidUrl("https://example.com")); // true
console.log(isValidUsername("john_doe123")); // true
```

### Exercise 3: Extracting Data
Create a file `regex-extract.js` and implement:

```javascript
// 1. Extract all numbers from a string
function extractNumbers(str) {
    // "Order 123 costs $45.99" -> ["123", "45", "99"]
}

// 2. Extract all words from a string
function extractWords(str) {
    // "Hello, World! How are you?" -> ["Hello", "World", "How", "are", "you"]
}

// 3. Extract all email addresses from text
function extractEmails(text) {
    // Return array of email addresses
}

// 4. Extract all hashtags from a tweet
function extractHashtags(tweet) {
    // "Learning #JavaScript and #RegEx!" -> ["#JavaScript", "#RegEx"]
}

// 5. Extract data from a formatted string
function extractOrderInfo(orderString) {
    // "Order #ORD-2024-001234 - Amount: $99.99"
    // Return { orderId: "ORD-2024-001234", amount: "99.99" }
}

// Test your functions
console.log(extractNumbers("I have 3 apples and 5 oranges"));
console.log(extractWords("Hello, World! How are you?"));
console.log(extractEmails("Contact us at info@test.com or support@test.com"));
console.log(extractHashtags("Love #coding and #automation"));
console.log(extractOrderInfo("Order #ORD-2024-001234 - Amount: $99.99"));
```

### Exercise 4: Search and Replace
Create a file `regex-replace.js` and implement:

```javascript
// 1. Replace all digits with asterisks
function maskDigits(str) {
    // "Card: 1234-5678" -> "Card: ****-****"
}

// 2. Convert multiple spaces to single space
function normalizeSpaces(str) {
    // "Hello    World" -> "Hello World"
}

// 3. Remove all HTML tags from a string
function stripHtmlTags(html) {
    // "<p>Hello <b>World</b></p>" -> "Hello World"
}

// 4. Convert camelCase to snake_case
function camelToSnake(str) {
    // "backgroundColor" -> "background_color"
}

// 5. Censor bad words (replace with asterisks)
function censorWords(text, badWords) {
    // censorWords("This is bad and ugly", ["bad", "ugly"])
    // -> "This is *** and ****"
}

// Test your functions
console.log(maskDigits("SSN: 123-45-6789"));
console.log(normalizeSpaces("Too    many     spaces"));
console.log(stripHtmlTags("<div>Hello <span>World</span></div>"));
console.log(camelToSnake("myVariableName"));
console.log(censorWords("This is bad and ugly", ["bad", "ugly"]));
```

### Exercise 5: Capturing Groups
Create a file `regex-groups.js` and implement:

```javascript
// 1. Parse a name into first and last name
function parseName(fullName) {
    // "John Doe" -> { firstName: "John", lastName: "Doe" }
}

// 2. Parse a date string
function parseDate(dateStr) {
    // "2024-01-15" -> { year: "2024", month: "01", day: "15" }
}

// 3. Swap first and last name
function swapName(fullName) {
    // "John Doe" -> "Doe, John"
}

// 4. Parse a URL into components
function parseUrlComponents(url) {
    // "https://example.com:8080/path"
    // -> { protocol: "https", domain: "example.com", port: "8080", path: "/path" }
}

// 5. Extract key-value pairs from a query string
function parseQueryString(queryString) {
    // "name=John&age=30&city=NYC" -> { name: "John", age: "30", city: "NYC" }
}

// Test your functions
console.log(parseName("John Doe"));
console.log(parseDate("2024-01-15"));
console.log(swapName("John Doe"));
console.log(parseUrlComponents("https://example.com:8080/api/users"));
console.log(parseQueryString("name=John&age=30&city=NYC"));
```

### Exercise 6: Test Automation Patterns
Create a file `regex-automation.js` and implement:

```javascript
// 1. Validate test case ID format (TC-XXX-NNN)
function isValidTestCaseId(id) {
    // TC-001 to TC-999 or TC-ABC-001
}

// 2. Extract error codes from log messages
function extractErrorCodes(log) {
    // "Error [ERR-001]: Failed. Error [ERR-002]: Timeout"
    // -> ["ERR-001", "ERR-002"]
}

// 3. Validate CSS selector syntax (basic)
function isValidCssSelector(selector) {
    // Check for basic CSS selector patterns
}

// 4. Extract test data from assertion messages
function parseAssertionError(message) {
    // "Expected 'login-btn' to be visible but was hidden"
    // -> { element: "login-btn", expected: "visible", actual: "hidden" }
}

// 5. Match dynamic element IDs
function matchDynamicId(pattern, id) {
    // pattern: "user-*-profile", id: "user-12345-profile"
    // Return true if id matches the pattern (* = any characters)
}

// 6. Extract API endpoint info from URL
function parseApiEndpoint(url) {
    // "/api/v2/users/123/orders"
    // -> { version: "v2", resource: "users", id: "123", subResource: "orders" }
}

// Test your functions
console.log(isValidTestCaseId("TC-AUTH-001")); // true
console.log(extractErrorCodes("Error [ERR-001]: Failed. Error [ERR-002]: Timeout"));
console.log(parseAssertionError("Expected 'submit-btn' to be enabled but was disabled"));
console.log(matchDynamicId("user-*-profile", "user-12345-profile")); // true
```

---

## Part C: Challenge Problems

### Challenge 1: Log File Parser
Create a comprehensive log parser:

```javascript
function parseLogFile(logContent) {
    // Parse multiple log lines with format:
    // [YYYY-MM-DD HH:MM:SS] [LEVEL] [Component] - Message
    // Return array of { timestamp, level, component, message }
}

const logs = `
[2024-01-15 10:30:45] [INFO] [UserService] - User logged in
[2024-01-15 10:31:02] [ERROR] [Database] - Connection failed
[2024-01-15 10:31:15] [WARN] [Cache] - Cache miss for key: user_123
`;

console.log(parseLogFile(logs));
```

### Challenge 2: Form Validator
Create a form validation system using regex:

```javascript
function validateForm(formData) {
    // formData = { email, phone, password, username, website }
    // Return { isValid: boolean, errors: { field: message } }
}

const form = {
    email: "test@example.com",
    phone: "123-456-7890",
    password: "Secure1!",
    username: "john_doe",
    website: "https://example.com"
};

console.log(validateForm(form));
```

### Challenge 3: Markdown Link Parser
Parse markdown links and images:

```javascript
function parseMarkdownLinks(markdown) {
    // Find all [text](url) and ![alt](imageUrl) patterns
    // Return { links: [...], images: [...] }
}

const markdown = `
Check out [Google](https://google.com) and [GitHub](https://github.com).
Here's an image: ![Logo](https://example.com/logo.png)
`;

console.log(parseMarkdownLinks(markdown));
```

---

## Answers and Solutions

### Part A: Conceptual Answers

**A1:** Literal notation `/pattern/` is used when the pattern is known at compile time. The `RegExp()` constructor is used when the pattern needs to be built dynamically at runtime (e.g., from user input or variables).

**A2:**
- `g` (global): Find all matches, not just the first
- `i` (case-insensitive): Match regardless of case
- `m` (multiline): `^` and `$` match start/end of each line, not just the string

**A3:**
- `*`: Zero or more occurrences
- `+`: One or more occurrences
- `?`: Zero or one occurrence (optional)

**A4:** Capturing groups are created with parentheses `(pattern)` and capture the matched text for later use. Non-capturing groups use `(?:pattern)` - they group without capturing.

**A5:** Greedy quantifiers match as many characters as possible (default behavior). Lazy quantifiers (add `?` after quantifier, like `*?`) match as few characters as possible.

### Part B: Coding Solutions

#### Exercise 1: Basic Pattern Matching
```javascript
function isOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function isOnlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

function hasWhitespace(str) {
    return /\s/.test(str);
}
```

#### Exercise 2: Validation Patterns
```javascript
function isValidEmail(email) {
    return /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email);
}

function isValidPhone(phone) {
    return /^(\(\d{3}\)\s?|\d{3}[-.]?)\d{3}[-.]?\d{4}$/.test(phone);
}

function isValidDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isValidUrl(url) {
    return /^https?:\/\/[\w.-]+\.\w{2,}(\/\S*)?$/.test(url);
}

function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,16}$/.test(username);
}
```

#### Exercise 3: Extracting Data
```javascript
function extractNumbers(str) {
    return str.match(/\d+/g) || [];
}

function extractWords(str) {
    return str.match(/\b[a-zA-Z]+\b/g) || [];
}

function extractEmails(text) {
    return text.match(/[\w.-]+@[\w.-]+\.\w{2,}/g) || [];
}

function extractHashtags(tweet) {
    return tweet.match(/#\w+/g) || [];
}

function extractOrderInfo(orderString) {
    const orderMatch = orderString.match(/#(ORD-\d+-\d+)/);
    const amountMatch = orderString.match(/\$(\d+\.\d{2})/);

    return {
        orderId: orderMatch ? orderMatch[1] : null,
        amount: amountMatch ? amountMatch[1] : null
    };
}
```

#### Exercise 4: Search and Replace
```javascript
function maskDigits(str) {
    return str.replace(/\d/g, "*");
}

function normalizeSpaces(str) {
    return str.replace(/\s+/g, " ").trim();
}

function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, "");
}

function camelToSnake(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function censorWords(text, badWords) {
    const pattern = new RegExp(badWords.join("|"), "gi");
    return text.replace(pattern, (match) => "*".repeat(match.length));
}
```

#### Exercise 5: Capturing Groups
```javascript
function parseName(fullName) {
    const match = fullName.match(/^(\w+)\s+(\w+)$/);
    return match ? { firstName: match[1], lastName: match[2] } : null;
}

function parseDate(dateStr) {
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    return match ? { year: match[1], month: match[2], day: match[3] } : null;
}

function swapName(fullName) {
    return fullName.replace(/^(\w+)\s+(\w+)$/, "$2, $1");
}

function parseUrlComponents(url) {
    const pattern = /^(https?):\/\/([^:\/]+)(?::(\d+))?(\/.*)?$/;
    const match = url.match(pattern);

    return match ? {
        protocol: match[1],
        domain: match[2],
        port: match[3] || "",
        path: match[4] || ""
    } : null;
}

function parseQueryString(queryString) {
    const result = {};
    const pairs = queryString.match(/([^&=]+)=([^&]*)/g) || [];

    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        result[key] = value;
    });

    return result;
}
```

#### Exercise 6: Test Automation Patterns
```javascript
function isValidTestCaseId(id) {
    return /^TC-[A-Z]{0,4}\d{3}$|^TC-[A-Z]+-\d{3}$/.test(id);
}

function extractErrorCodes(log) {
    return log.match(/ERR-\d+/g) || [];
}

function isValidCssSelector(selector) {
    return /^[#.]?[\w-]+(\s*[>+~]?\s*[#.]?[\w-]+)*(\[[^\]]+\])?$/.test(selector);
}

function parseAssertionError(message) {
    const match = message.match(/Expected '([^']+)' to be (\w+) but was (\w+)/);
    return match ? {
        element: match[1],
        expected: match[2],
        actual: match[3]
    } : null;
}

function matchDynamicId(pattern, id) {
    const regexPattern = pattern.replace(/\*/g, ".*");
    return new RegExp(`^${regexPattern}$`).test(id);
}

function parseApiEndpoint(url) {
    const match = url.match(/\/api\/v(\d+)\/(\w+)(?:\/(\d+))?(?:\/(\w+))?/);
    return match ? {
        version: `v${match[1]}`,
        resource: match[2],
        id: match[3] || "",
        subResource: match[4] || ""
    } : null;
}
```

### Part C: Challenge Solutions

#### Challenge 1: Log File Parser
```javascript
function parseLogFile(logContent) {
    const logPattern = /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \[(\w+)\] \[(\w+)\] - (.+)/g;
    const results = [];
    let match;

    while ((match = logPattern.exec(logContent)) !== null) {
        results.push({
            timestamp: match[1],
            level: match[2],
            component: match[3],
            message: match[4]
        });
    }

    return results;
}
```

#### Challenge 2: Form Validator
```javascript
function validateForm(formData) {
    const errors = {};
    const rules = {
        email: {
            pattern: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
            message: "Invalid email format"
        },
        phone: {
            pattern: /^(\(\d{3}\)\s?|\d{3}[-.]?)\d{3}[-.]?\d{4}$/,
            message: "Invalid phone format"
        },
        password: {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            message: "Password must have 8+ chars, upper, lower, digit, special"
        },
        username: {
            pattern: /^[a-zA-Z0-9_]{3,16}$/,
            message: "Username must be 3-16 chars, alphanumeric and underscore only"
        },
        website: {
            pattern: /^https?:\/\/[\w.-]+\.\w{2,}/,
            message: "Invalid URL format"
        }
    };

    for (const [field, value] of Object.entries(formData)) {
        if (rules[field] && !rules[field].pattern.test(value)) {
            errors[field] = rules[field].message;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
```

#### Challenge 3: Markdown Link Parser
```javascript
function parseMarkdownLinks(markdown) {
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;

    const links = [];
    const images = [];
    let match;

    while ((match = imagePattern.exec(markdown)) !== null) {
        images.push({ alt: match[1], url: match[2] });
    }

    while ((match = linkPattern.exec(markdown)) !== null) {
        // Skip if it's an image (starts with !)
        if (!markdown.charAt(match.index - 1).match(/!/)) {
            links.push({ text: match[1], url: match[2] });
        }
    }

    return { links, images };
}
```

---

## Summary

In this assignment, you learned:
- Creating regular expressions using literal and constructor notation
- Using flags (g, i, m) to modify matching behavior
- Character classes and quantifiers for flexible patterns
- Anchors to match positions in strings
- Capturing groups to extract matched portions
- Common regex methods: test(), match(), replace(), split()
- Applying regex for validation and data extraction in test automation

**Congratulations!** You have completed the core JavaScript/TypeScript assignments. These skills are fundamental for modern test automation.
