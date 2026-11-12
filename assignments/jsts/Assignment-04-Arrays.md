# Assignment: Working with Arrays

**Topics Covered:** Arrays, Array Methods, Array Manipulation  
**Difficulty:** Intermediate  
**Estimated Time:** 2-3 hours  
**Reference:** File 06 from documentation

---

## Instructions

- Use array methods appropriately
- Avoid mutating original arrays unless required
- Write clean, functional code
- Test with various array inputs

---

## Part A: Array Basics (20 points)

### Exercise 1: Array Creation and Access (5 points)
Create an array of your 5 favorite movies. Then:
- Print the first movie
- Print the last movie
- Print the middle movie
- Print the array length
- Add a new movie at the end
- Add a new movie at the beginning

**Example Output:**
```
Movies: ["Inception", "Matrix", "Interstellar", "Avatar", "Tenet"]
First: Inception
Last: Tenet
Middle: Interstellar
Length: 5
After adding: ["Oppenheimer", "Inception", "Matrix", "Interstellar", "Avatar", "Tenet", "Dune"]
```

### Exercise 2: Array Modification (8 points)
Given an array: `[10, 20, 30, 40, 50]`

Perform the following operations and display the array after each:
- Change the third element to 35
- Remove the last element
- Remove the first element
- Add 5 at the beginning
- Add 60 at the end
- Find the index of 35
- Check if 40 exists in the array

### Exercise 3: Array Slicing and Splicing (7 points)
Given array: `["Apple", "Banana", "Cherry", "Date", "Elderberry"]`

Use appropriate methods to:
- Get the first 3 fruits
- Get the last 2 fruits
- Get fruits from index 1 to 3
- Remove "Cherry" and add "Coconut" in its place
- Display original and modified arrays

---

## Part B: Array Iteration (25 points)

### Exercise 4: Student Grades Analysis (10 points)
Given an array of student grades:
```javascript
let grades = [85, 92, 78, 95, 88, 76, 90, 82, 88, 94];
```

Write code to:
- Print all grades using forEach
- Find the highest grade
- Find the lowest grade
- Calculate the average grade
- Count how many students scored above 85
- Count how many students scored below 80

**Expected Output:**
```
All Grades: 85, 92, 78, 95, 88, 76, 90, 82, 88, 94
Highest: 95
Lowest: 76
Average: 86.8
Above 85: 6 students
Below 80: 2 students
```

### Exercise 5: Product Inventory (8 points)
Given an array of product prices:
```javascript
let prices = [29.99, 15.50, 8.75, 42.00, 19.99, 35.50];
```

Using for loop:
- Print each price with $ symbol
- Find total cost
- Find most expensive item
- Find cheapest item
- Count items under $20

### Exercise 6: Name Formatter (7 points)
Given array: `["john doe", "jane smith", "bob wilson"]`

Write code to:
- Convert each name to Title Case (First letter uppercase)
- Print formatted names
- Store in a new array

**Example:**
```
Original: ["john doe", "jane smith", "bob wilson"]
Formatted: ["John Doe", "Jane Smith", "Bob Wilson"]
```

---

## Part C: Array Methods - map, filter, reduce (30 points)

### Exercise 7: Using map() (10 points)
Given array: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`

Use map() to create new arrays containing:
- Square of each number
- Each number multiplied by 10
- Each number converted to string
- Each number with "Number: " prefix

**Example:**
```
Original: [1, 2, 3, 4, 5]
Squares: [1, 4, 9, 16, 25]
Times 10: [10, 20, 30, 40, 50]
Strings: ["1", "2", "3", "4", "5"]
Prefixed: ["Number: 1", "Number: 2", ...]
```

### Exercise 8: Using filter() (10 points)
Given array: `[12, 5, 8, 21, 15, 7, 30, 18, 4, 25]`

Use filter() to create arrays with:
- Only even numbers
- Only odd numbers
- Numbers greater than 15
- Numbers between 5 and 20
- Numbers divisible by 3

### Exercise 9: Using reduce() (10 points)
Given array: `[5, 10, 15, 20, 25, 30]`

Use reduce() to:
- Find the sum of all numbers
- Find the product of all numbers
- Find the maximum value
- Count how many numbers are greater than 15
- Build a string: "5-10-15-20-25-30"

**Example:**
```
Array: [5, 10, 15, 20, 25, 30]
Sum: 105
Product: 11250000
Max: 30
Count > 15: 4
String: "5-10-15-20-25-30"
```

---

## Part D: Multidimensional Arrays (15 points)

### Exercise 10: Matrix Operations (8 points)
Create a 3x3 matrix:
```javascript
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

Write code to:
- Print the entire matrix in table format
- Calculate sum of each row
- Calculate sum of each column
- Find the maximum value in the matrix
- Find the minimum value in the matrix

**Example Output:**
```
Matrix:
1  2  3
4  5  6
7  8  9

Row Sums: [6, 15, 24]
Column Sums: [12, 15, 18]
Maximum: 9
Minimum: 1
```

### Exercise 11: Student Report Card (7 points)
Create a 2D array for 3 students with 4 subject marks each:
```javascript
let reportCard = [
    [85, 90, 78, 92],  // Student 1
    [88, 76, 95, 85],  // Student 2
    [92, 88, 90, 94]   // Student 3
];
```

Calculate and display:
- Each student's total marks
- Each student's average
- Each subject's class average
- Overall class average

---

## Part E: Advanced Array Operations (10 points)

### Exercise 12: Remove Duplicates (5 points)
Given array: `[1, 2, 3, 2, 4, 1, 5, 3, 6, 4]`

Write code to remove duplicates and create a new array with unique values.

**Output:**
```
Original: [1, 2, 3, 2, 4, 1, 5, 3, 6, 4]
Unique: [1, 2, 3, 4, 5, 6]
```

### Exercise 13: Sorting and Reversing (5 points)
Given array: `[45, 12, 78, 34, 90, 23, 56]`

Create and display:
- Sorted array (ascending)
- Sorted array (descending)
- Reversed original array

---

## Bonus Challenges (30 points)

### Exercise 14: Shopping Cart System (10 points)
Create a shopping cart array with objects:
```javascript
let cart = [
    { name: "Laptop", price: 999.99, quantity: 1 },
    { name: "Mouse", price: 29.99, quantity: 2 },
    { name: "Keyboard", price: 79.99, quantity: 1 }
];
```

Calculate:
- Total items in cart
- Subtotal for each item (price × quantity)
- Cart total
- Apply 10% discount if total > $500
- Final amount with 8% tax

### Exercise 15: Array Manipulation Challenge (10 points)
Given two arrays:
```javascript
let array1 = [1, 2, 3, 4, 5];
let array2 = [4, 5, 6, 7, 8];
```

Find:
- Common elements (intersection)
- All unique elements (union)
- Elements only in array1 (difference)
- Elements only in array2 (difference)

### Exercise 16: Student Performance Analyzer (10 points)
Given student data:
```javascript
let students = [
    { name: "Alice", marks: [85, 90, 78, 92] },
    { name: "Bob", marks: [88, 76, 95, 85] },
    { name: "Charlie", marks: [92, 88, 90, 94] },
    { name: "David", marks: [70, 75, 68, 72] }
];
```

Calculate and display:
- Each student's average
- Top performer (highest average)
- Student(s) below 75% average
- Subject-wise class averages
- Rank students by performance

---

## Programming Challenge (40 points extra)

### Exercise 17: Data Processing Application
Create a complete program that:

**Features:**
1. Store employee records (name, department, salary)
2. Add new employee
3. Remove employee by name
4. Update employee salary
5. Find employees by department
6. Calculate department-wise average salary
7. Find highest paid employee
8. Find lowest paid employee
9. Display all employees sorted by salary
10. Display statistics

**Example Structure:**
```javascript
let employees = [
    { name: "John", department: "IT", salary: 75000 },
    { name: "Jane", department: "HR", salary: 65000 },
    // ... more employees
];
```

**Menu:**
```
Employee Management System
--------------------------
1. Add Employee
2. Remove Employee
3. Update Salary
4. Find by Department
5. Department Average
6. Highest Paid
7. Lowest Paid
8. Display All (sorted)
9. Statistics
10. Exit
```

---

## Submission Guidelines

1. Create file `assignment04_yourname.js`
2. Use array methods appropriately (map, filter, reduce)
3. Don't modify original arrays unless required
4. Include test data and outputs
5. Comment your code clearly

## Grading Rubric

- **Array Operations (30%)**: Correct use of methods
- **Logic (30%)**: Problem-solving approach
- **Code Quality (20%)**: Clean, efficient code
- **Functionality (20%)**: All features work correctly

## Common Mistakes to Avoid

❌ Mutating original arrays unintentionally
❌ Not using appropriate array methods
❌ Inefficient nested loops
❌ Not handling empty arrays
❌ Hardcoding array indices

## Tips for Success

✅ Use map() for transformations
✅ Use filter() for selecting elements
✅ Use reduce() for calculations
✅ Use spread operator [...] to copy arrays
✅ Test with empty arrays
✅ Consider performance for large arrays

---

## Array Method Quick Reference

| Method | Use Case | Returns |
|--------|----------|---------|
| map() | Transform each element | New array |
| filter() | Select elements | New array |
| reduce() | Calculate single value | Any type |
| forEach() | Iterate elements | undefined |
| find() | Find first match | Element or undefined |
| sort() | Sort array | Same array (mutated) |
| slice() | Extract portion | New array |
| splice() | Modify array | Removed elements |

---

**Total Points: 100 + 70 Bonus**

Master arrays and become a JavaScript pro! 💪
