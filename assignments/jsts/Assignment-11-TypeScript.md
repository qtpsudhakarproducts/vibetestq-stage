# Assignment: TypeScript Fundamentals

**Total Points**: 150  
**Estimated Time**: 3-4 hours  
**Difficulty**: ⭐⭐⭐ Intermediate  
**Topics**: TypeScript basics, types, interfaces, classes

---

## 📋 Learning Objectives

By completing this assignment, you will:
- ✅ Understand TypeScript type system
- ✅ Use interfaces and type aliases
- ✅ Create typed functions and classes
- ✅ Apply access modifiers and generics
- ✅ Work with TypeScript modules

---

## 📝 Assignment Parts

### Part 1: Basic Types & Type Annotations (20 points)

Create a file `basics.ts` with the following:

1. **Variable Declarations** (5 points)
   - Declare variables with proper type annotations:
     - `studentName` (string)
     - `age` (number)
     - `isEnrolled` (boolean)
     - `grades` (number array)
     - `address` (tuple: [string, number, string] for street, zip, city)

2. **Type Inference** (5 points)
   - Create 5 variables without type annotations
   - Log the inferred type using comments
   ```typescript
   let count = 10;  // Type: number (inferred)
   ```

3. **Union Types** (5 points)
   - Create a function `formatId` that accepts `number | string`
   - Return formatted string: "ID: 123" or "ID: ABC123"

4. **Type Assertions** (5 points)
   - Declare variable as `any` type
   - Use type assertion to treat it as string
   - Call string methods on it

---

### Part 2: Interfaces (25 points)

Create a file `interfaces.ts`:

1. **Product Interface** (10 points)
   ```typescript
   interface Product {
     id: number;
     name: string;
     price: number;
     category: string;
     inStock?: boolean;  // Optional
   }
   ```
   - Create 3 product objects
   - Create a function that takes Product and returns formatted string

2. **User Interface with Methods** (10 points)
   ```typescript
   interface User {
     username: string;
     email: string;
     age: number;
     greet(): string;
     isAdult(): boolean;
   }
   ```
   - Create 2 user objects
   - Implement the methods

3. **Extending Interfaces** (5 points)
   ```typescript
   interface Admin extends User {
     role: string;
     permissions: string[];
   }
   ```
   - Create admin object with all properties

---

### Part 3: Functions (25 points)

Create a file `functions.ts`:

1. **Typed Functions** (8 points)
   - `add(a: number, b: number): number` - Returns sum
   - `greet(name: string, age?: number): string` - Optional parameter
   - `calculate(...numbers: number[]): number` - Rest parameters

2. **Function Types** (7 points)
   ```typescript
   type MathOperation = (a: number, b: number) => number;
   ```
   - Create three functions matching this type
   - Create an array of MathOperation

3. **Generic Functions** (10 points)
   ```typescript
   function identity<T>(arg: T): T {
     return arg;
   }
   ```
   - Create `getFirst<T>` that returns first array element
   - Create `reverseArray<T>` that reverses array
   - Create `filterArray<T>` with predicate function

---

### Part 4: Classes (30 points)

Create a file `classes.ts`:

1. **Basic Class** (10 points)
   ```typescript
   class Rectangle {
     width: number;
     height: number;
     
     constructor(width: number, height: number) {
       this.width = width;
       this.height = height;
     }
     
     area(): number { }
     perimeter(): number { }
   }
   ```
   - Implement area and perimeter methods
   - Create 2 instances
   - Test methods

2. **Access Modifiers** (10 points)
   ```typescript
   class BankAccount {
     private balance: number;
     public accountNumber: string;
     protected owner: string;
     
     // Constructor
     // Getter for balance
     // Methods: deposit, withdraw
   }
   ```
   - Implement all methods
   - Test that private members are not accessible

3. **Inheritance** (10 points)
   ```typescript
   class Animal {
     name: string;
     speak(): void { }
   }
   
   class Dog extends Animal {
     breed: string;
     speak(): void { }  // Override
   }
   ```
   - Create base Animal class
   - Create Dog and Cat subclasses
   - Override speak method
   - Use super keyword

---

### Part 5: Advanced Types (20 points)

Create a file `advanced.ts`:

1. **Type Aliases** (5 points)
   ```typescript
   type ID = string | number;
   type Status = 'pending' | 'approved' | 'rejected';
   type Point = { x: number; y: number };
   ```
   - Use these types in functions

2. **Enums** (5 points)
   ```typescript
   enum UserRole {
     Admin,
     User,
     Guest
   }
   ```
   - Create enum for OrderStatus
   - Use in a function

3. **Generics with Constraints** (10 points)
   ```typescript
   interface HasLength {
     length: number;
   }
   
   function logLength<T extends HasLength>(item: T): void {
     console.log(item.length);
   }
   ```
   - Create similar constrained generic functions
   - Test with different types

---

### Part 6: Modules (15 points)

Create multiple files:

1. **Export/Import** (15 points)
   
   **mathUtils.ts**:
   ```typescript
   export function add(a: number, b: number): number { }
   export function subtract(a: number, b: number): number { }
   export const PI = 3.14159;
   ```
   
   **shapes.ts**:
   ```typescript
   export default class Circle {
     constructor(public radius: number) {}
     area(): number { }
   }
   
   export class Square {
     constructor(public side: number) {}
     area(): number { }
   }
   ```
   
   **main.ts**:
   - Import and use functions from mathUtils
   - Import default and named exports from shapes
   - Test all functionality

---

### Part 7: Final Project - Task Management System (15 points)

Create a complete TypeScript application:

**Requirements**:
1. **Interfaces** (5 points):
   - Task (id, title, description, status, priority, dueDate)
   - User (id, name, email, tasks array)

2. **Enums** (2 points):
   - TaskStatus (Todo, InProgress, Done)
   - Priority (Low, Medium, High)

3. **Classes** (8 points):
   - TaskManager class with:
     - Private tasks array
     - addTask(task: Task): void
     - removeTask(id: number): void
     - updateTaskStatus(id: number, status: TaskStatus): void
     - getTasksByStatus(status: TaskStatus): Task[]
     - getHighPriorityTasks(): Task[]
     - getUserTasks(userId: number): Task[]

**Test Data**:
- Create at least 5 tasks
- Test all methods
- Display results

---

## 📊 Grading Rubric

### Correctness (50%)
- ✅ Code compiles without errors (20%)
- ✅ All functions work as expected (20%)
- ✅ Proper type usage (10%)

### Code Quality (30%)
- ✅ Proper type annotations (10%)
- ✅ Good naming conventions (5%)
- ✅ Code organization (10%)
- ✅ Comments where needed (5%)

### Testing (20%)
- ✅ All features tested (10%)
- ✅ Test data provided (5%)
- ✅ Output demonstrated (5%)

---

## 💡 Tips

1. **Compilation**:
   ```bash
   # Compile single file
   tsc filename.ts
   
   # Compile all
   tsc
   
   # Run TypeScript directly
   ts-node filename.ts
   ```

2. **Common Errors**:
   - Missing type annotations
   - Incorrect access modifier usage
   - Forgetting to implement interface methods

3. **Best Practices**:
   - Use interfaces for object shapes
   - Avoid `any` type when possible
   - Use access modifiers appropriately
   - Leverage type inference

---

## 📤 Submission

Submit the following files:
- `basics.ts`
- `interfaces.ts`
- `functions.ts`
- `classes.ts`
- `advanced.ts`
- `mathUtils.ts`
- `shapes.ts`
- `main.ts`
- `taskManager.ts` (final project)
- `README.md` (instructions to run)

---

## 🎯 Bonus Challenges (+20 points)

1. **Utility Types** (+5 points):
   - Use Partial, Required, Pick, Omit
   - Create examples with User interface

2. **Decorators** (+10 points):
   - Research and implement class decorators
   - Create method decorators

3. **Declaration Files** (+5 points):
   - Create .d.ts file for a JavaScript library
   - Use it in TypeScript code

---

## 🔗 Resources

- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- TypeScript Playground: https://www.typescriptlang.org/play
- Documentation: Doc-17-TypeScript-Basics.md

---

**Good luck! 🚀**
