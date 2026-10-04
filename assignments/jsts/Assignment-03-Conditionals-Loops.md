# Assignment: Conditionals and Loops

**Topics Covered:** if-else, switch, for loops, while loops  
**Difficulty:** Beginner to Intermediate  
**Estimated Time:** 2-3 hours  
**Reference:** Files 04, 05 from documentation

---

## Instructions

- Write clean, well-commented code
- Use appropriate control structures
- Handle edge cases
- Test thoroughly with different inputs

---

## Part A: Conditional Statements (25 points)

### Exercise 1: Day of Week Identifier (8 points)
Write a program using **switch statement** that:
- Takes a number (1-7) representing day of the week
- Prints the day name (1=Monday, 2=Tuesday, etc.)
- For 6-7, print "It's the weekend!"
- For invalid numbers, print "Invalid day number"

**Test Cases:**
```
Input: 1 → Output: Monday
Input: 6 → Output: Saturday - It's the weekend!
Input: 9 → Output: Invalid day number
```

### Exercise 2: Grade Calculator (8 points)
Write a program using **if-else if-else** that:
- Takes marks (0-100)
- Assigns grade based on:
  - 90-100: A
  - 80-89: B
  - 70-79: C
  - 60-69: D
  - Below 60: F
- Validates that marks are between 0 and 100

**Test Cases:**
```
Input: 95 → Output: Grade: A
Input: 75 → Output: Grade: C
Input: 105 → Output: Invalid marks
```

### Exercise 3: Leap Year Checker (9 points)
Write a program that checks if a year is a leap year.

**Rules:**
- Divisible by 4: leap year
- BUT if divisible by 100: NOT a leap year
- BUT if divisible by 400: IS a leap year

**Test Cases:**
```
2024 → Leap year
2000 → Leap year
1900 → Not a leap year
2023 → Not a leap year
```

---

## Part B: For Loops (25 points)

### Exercise 4: Multiplication Table (7 points)
Write a program that prints the multiplication table for a given number (1 to 10).

**Example Output for 5:**
```
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50
```

### Exercise 5: Pattern Printing (8 points)
Write programs to print the following patterns:

**Pattern 1: Right Triangle**
```
*
**
***
****
*****
```

**Pattern 2: Number Pyramid**
```
1
12
123
1234
12345
```

**Pattern 3: Reverse Triangle**
```
*****
****
***
**
*
```

### Exercise 6: Sum and Average Calculator (10 points)
Write a program that:
- Uses a for loop to sum numbers from 1 to N
- Calculates the average
- Finds how many numbers are even
- Finds how many numbers are odd

**Example for N=10:**
```
Sum: 55
Average: 5.5
Even numbers: 5
Odd numbers: 5
```

---

## Part C: While and Do-While Loops (20 points)

### Exercise 7: Number Guessing Game (10 points)
Write a program that:
- Sets a secret number (e.g., 42)
- Uses a while loop to keep asking for guesses
- Gives hints: "Too high" or "Too low"
- Counts the number of attempts
- Stops when the correct number is guessed

**Simulation:**
```
Guess the number (1-100): 50
Too high!
Guess the number (1-100): 25
Too low!
Guess the number (1-100): 42
Correct! You guessed it in 3 attempts.
```

### Exercise 8: Menu-Driven Calculator (10 points)
Write a calculator program using do-while loop:
- Display menu:
  1. Add
  2. Subtract
  3. Multiply
  4. Divide
  5. Exit
- Perform selected operation
- Continue until user chooses Exit

**Example:**
```
Calculator Menu:
1. Add
2. Subtract
3. Multiply
4. Divide
5. Exit
Choose operation: 1
Enter first number: 10
Enter second number: 5
Result: 15

Continue? (Press 5 to exit)
```

---

## Part D: Nested Loops (20 points)

### Exercise 9: Prime Number Finder (10 points)
Write a program that:
- Finds all prime numbers from 1 to N
- Uses nested loops to check if a number is prime
- Prints all prime numbers

**Example for N=20:**
```
Prime numbers from 1 to 20:
2, 3, 5, 7, 11, 13, 17, 19
Total prime numbers: 8
```

### Exercise 10: Multiplication Table Grid (10 points)
Write a program that prints a multiplication table grid from 1 to N.

**Example for N=5:**
```
    1   2   3   4   5
1   1   2   3   4   5
2   2   4   6   8  10
3   3   6   9  12  15
4   4   8  12  16  20
5   5  10  15  20  25
```

---

## Part E: Break and Continue (10 points)

### Exercise 11: Sum Until Negative (5 points)
Write a program that:
- Asks for numbers in a loop
- Adds them to a sum
- Uses `break` to stop when a negative number is entered
- Prints the total sum

**Example:**
```
Enter number: 10
Enter number: 20
Enter number: 15
Enter number: -5
Sum of positive numbers: 45
```

### Exercise 12: Skip Multiples (5 points)
Write a program that:
- Prints numbers from 1 to 50
- Uses `continue` to skip numbers divisible by 3 and 5
- Counts how many numbers were printed

**Example:**
```
Numbers (skipping multiples of 3 and 5):
1, 2, 4, 7, 8, 11, 13, 14, ...
Total numbers printed: 26
```

---

## Bonus Challenges (20 points)

### Exercise 13: Fibonacci Series (7 points)
Generate the first N terms of Fibonacci series.

**Example for N=10:**
```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

### Exercise 14: Factorial Calculator (6 points)
Calculate factorial of a number using:
1. For loop
2. While loop

Compare both approaches.

**Example:**
```
Factorial of 5:
Using for loop: 120
Using while loop: 120
```

### Exercise 15: Diamond Pattern (7 points)
Print a diamond pattern with N rows.

**Example for N=5:**
```
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
```

---

## Advanced Challenge: Complete Program (30 points extra)

### Exercise 16: Student Grade Management System
Create a complete program that:

1. **Menu Options:**
   - Add student grade
   - View all grades
   - Calculate class average
   - Find highest grade
   - Find lowest grade
   - Exit

2. **Features:**
   - Store up to 10 student grades
   - Validate grade input (0-100)
   - Use appropriate loops and conditions
   - Display results in formatted tables

3. **Example Output:**
```
Student Grade Management
------------------------
1. Add grade
2. View all grades
3. Class average
4. Highest grade
5. Lowest grade
6. Exit

Choice: 1
Enter grade (0-100): 85
Grade added successfully!

Choice: 3
Class Average: 82.5
```

---

## Submission Guidelines

1. Create a file named `assignment03_yourname.js`
2. Clearly separate each exercise with comments
3. Include test outputs as comments
4. Handle edge cases (negative numbers, zero, etc.)
5. Use meaningful variable names

## Grading Rubric

- **Correctness (40%)**: Code works as expected
- **Logic (25%)**: Appropriate use of loops and conditions
- **Code Quality (20%)**: Clean, readable, commented
- **Edge Cases (15%)**: Handles invalid inputs

## Common Mistakes to Avoid

❌ Infinite loops (forgetting to update loop variable)
❌ Off-by-one errors in loop conditions
❌ Not validating input
❌ Using wrong loop type for the task
❌ Not breaking out of loops when needed

## Tips for Success

✅ Trace your loop logic on paper first
✅ Use meaningful loop variable names
✅ Test with boundary values (0, 1, max)
✅ Add comments explaining loop purpose
✅ Use break and continue appropriately
✅ Choose the right loop for the task

---

## Loop Selection Guide

| Task | Best Loop |
|------|-----------|
| Known iterations | for loop |
| Unknown iterations | while loop |
| Execute at least once | do-while loop |
| Iterate array | for...of loop |
| Iterate object keys | for...in loop |

---

**Total Points: 100 + 50 Bonus**

Happy Coding! 🎯
