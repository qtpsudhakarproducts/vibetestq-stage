# Assignment: Variables and Operators

**Topics Covered:** Variables, Data Types, Operators  
**Difficulty:** Beginner  
**Estimated Time:** 1-2 hours  
**Reference:** Files 01, 02, 03 from documentation

---

## Instructions

- Write clean, well-commented code
- Use meaningful variable names
- Test your code with different inputs
- Follow best practices (use const/let, not var)

---

## Part A: Variable Declaration and Data Types (20 points)

### Exercise 1: Personal Information (5 points)
Create variables to store the following information about yourself:
- Full name (string)
- Age (number)
- Is student (boolean)
- Favorite programming language (string)
- Years of experience (number)

Print all variables with descriptive labels.

**Example Output:**
```
Name: John Doe
Age: 25
Is Student: true
Favorite Language: JavaScript
Experience: 2 years
```

### Exercise 2: Type Checking (5 points)
Create variables of different types and use `typeof` to display their types:
- A string
- A number
- A boolean
- An array
- An object
- undefined
- null

**Example Output:**
```
"Hello" is of type: string
42 is of type: number
null is of type: object
```

### Exercise 3: Type Conversion (5 points)
Write code to convert:
- String "123" to number
- Number 456 to string
- String "true" to boolean
- Number 0 to boolean
- Empty string to boolean

Display original value, converted value, and their types.

### Exercise 4: Variable Naming (5 points)
Fix the following variable names to follow JavaScript naming conventions:
```javascript
let my-name = "John";
let 123number = 123;
let FirstName = "Jane";
let user name = "Bob";
let _private_var = "secret";
```

---

## Part B: Arithmetic Operators (20 points)

### Exercise 5: Basic Calculator (10 points)
Create variables for two numbers and perform all arithmetic operations:
- Addition
- Subtraction
- Multiplication
- Division
- Modulus (remainder)
- Exponentiation (power)

Display results in a formatted way.

**Example Output:**
```
Number 1: 10
Number 2: 3

Addition: 10 + 3 = 13
Subtraction: 10 - 3 = 7
Multiplication: 10 * 3 = 30
Division: 10 / 3 = 3.333...
Modulus: 10 % 3 = 1
Exponentiation: 10 ** 3 = 1000
```

### Exercise 6: Temperature Converter (10 points)
Write code to convert:
- Celsius to Fahrenheit: F = (C × 9/5) + 32
- Fahrenheit to Celsius: C = (F - 32) × 5/9

Test with:
- 0°C
- 100°C
- 32°F
- 212°F

**Example Output:**
```
0°C = 32°F
100°C = 212°F
32°F = 0°C
212°F = 100°C
```

---

## Part C: Comparison and Logical Operators (30 points)

### Exercise 7: Age Verification (10 points)
Create variables for:
- Person's age
- Minimum age requirement (18)

Use comparison operators to check:
- Is the person exactly 18?
- Is the person older than 18?
- Is the person younger than 18?
- Is the person 18 or older?

Print results as boolean values.

### Exercise 8: Password Strength Checker (10 points)
Create variables for:
- Password length
- Has uppercase letter (boolean)
- Has number (boolean)
- Has special character (boolean)

Use logical operators to check if password is:
- Weak: length < 8
- Medium: length >= 8 AND (has uppercase OR has number)
- Strong: length >= 8 AND has uppercase AND has number AND has special character

Print the password strength.

### Exercise 9: Login Validator (10 points)
Create variables for:
- Username
- Password
- Correct username: "admin"
- Correct password: "pass123"

Use comparison and logical operators to check if:
- Both username and password are correct
- Only username is correct
- Only password is correct
- Both are incorrect

Display appropriate messages.

---

## Part D: Assignment Operators (15 points)

### Exercise 10: Counter Operations (7 points)
Create a counter variable starting at 10. Use assignment operators to:
- Add 5
- Subtract 3
- Multiply by 2
- Divide by 4
- Find remainder when divided by 3
- Raise to power 2

Print the counter value after each operation.

### Exercise 11: Shopping Cart Total (8 points)
Create a variable for cart total starting at 0. Use += to add:
- Item 1: $29.99
- Item 2: $15.50
- Item 3: $8.75
- Apply discount: -= $5.00
- Add tax (multiply by 1.08)

Print the total after each step.

---

## Part E: Ternary Operator (15 points)

### Exercise 12: Grade Evaluator (7 points)
Create a variable for marks (0-100). Use ternary operator to:
- Check if marks >= 50, display "Pass" or "Fail"
- Check if marks >= 75, display "Excellent" or "Good"
- Check if marks < 35, display "Failed" or "Passed"

### Exercise 13: Ticket Price Calculator (8 points)
Create variables for:
- Person's age
- Is weekend (boolean)

Use nested ternary operators to calculate ticket price:
- Age < 12: $5 (weekday) or $7 (weekend)
- Age >= 12 and < 65: $10 (weekday) or $15 (weekend)
- Age >= 65: $6 (weekday) or $8 (weekend)

Display the ticket price.

---

## Bonus Challenge (10 points)

### Exercise 14: BMI Calculator
Create a program that:
1. Stores weight in kilograms
2. Stores height in meters
3. Calculates BMI using formula: BMI = weight / (height * height)
4. Uses ternary operators to categorize:
   - BMI < 18.5: "Underweight"
   - BMI >= 18.5 and < 25: "Normal"
   - BMI >= 25 and < 30: "Overweight"
   - BMI >= 30: "Obese"

Display weight, height, BMI, and category.

**Example Output:**
```
Weight: 70 kg
Height: 1.75 m
BMI: 22.86
Category: Normal
```

---

## Submission Guidelines

1. Create a JavaScript file named `assignment02_yourname.js`
2. Include comments explaining your logic
3. Test all exercises with at least 2 different inputs
4. Ensure your code runs without errors
5. Format your output clearly

## Grading Rubric

- **Code Correctness (40%)**: Does the code work as expected?
- **Code Quality (30%)**: Clean code, good naming, comments
- **Output Formatting (20%)**: Clear, readable output
- **Testing (10%)**: Multiple test cases provided

## Common Mistakes to Avoid

❌ Using `var` instead of `let` or `const`
❌ Using `==` instead of `===`
❌ Not using meaningful variable names
❌ Forgetting to test with different inputs
❌ Not adding comments to explain logic

## Tips for Success

✅ Use `const` for values that don't change
✅ Use `let` for values that will change
✅ Always use `===` for comparison
✅ Test your code with edge cases
✅ Add descriptive console.log messages

---

**Total Points: 100 + 10 Bonus**

Good luck! 🚀
