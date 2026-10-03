# Assignment 03: TypeScript Essentials

---

## Learning Objectives

- Set up a TypeScript project and compile it
- Use basic types, union types, and type aliases
- Define interfaces and classes
- Use import/export for modules
- Configure `tsconfig.json`

---

## Instructions

- Create a folder `day03-typescript`
- Run `npm init -y`, then `npm install -D typescript @types/node ts-node`
- Create a `tsconfig.json` (ask your trainer or use `npx tsc --init`)
- Run TypeScript files with `npx ts-node filename.ts`
- All variables must have explicit types

---

## Part A: Types and Type Aliases

### Exercise 1: Basic Types

Create a file `src/types-basics.ts`.

1. Declare typed variables for a student record:
   - `studentName`: string
   - `age`: number
   - `isEnrolled`: boolean
   - `subjects`: string array
   - `gpa`: number

2. Declare a variable `grade` that can only be one of these values: `'A' | 'B' | 'C' | 'D' | 'F'`. This is a **union type**. Try assigning `'Z'` and see what TypeScript says.

3. Create a **type alias** called `OrderStatus` for `'pending' | 'shipped' | 'delivered' | 'cancelled'`. Declare a variable using this type.

4. Create a **type alias** called `Product` that is an object type with:
   - `id`: number
   - `name`: string
   - `price`: number
   - `category`: string

---

### Exercise 2: Functions with Types

Create a file `src/typed-functions.ts`.

1. Write a function `calculateTotal(price: number, quantity: number): number` that returns the total cost.

2. Write a function `formatCurrency(amount: number, currency: string): string` that returns:  
   `"USD 29.99"` (currency + space + amount)

3. Write a function `printProduct(product: Product): void` — use the type alias from Exercise 1.  
   Print each field in the format `"Field: Value"`.

4. Write a function `findProduct(products: Product[], id: number): Product | undefined`  
   that returns the product with the matching `id`, or `undefined` if not found.

---

## Part B: Interfaces and Classes

### Exercise 3: Interfaces

Create a file `src/interfaces.ts`.

1. Create an interface `Student` with:
   - `id`: number
   - `firstName`: string
   - `lastName`: string
   - `course`: string
   - `email?`: string *(optional)*

2. Create an interface `BankAccount` with:
   - `accountNumber`: string
   - `holderName`: string
   - `balance`: number
   - `accountType`: `'savings' | 'current'`

3. Create an interface `Printable` with one method signature:  
   `print(): void`

4. Create an object of type `Student` with values. Try leaving out a required field — observe the TypeScript error.

---

### Exercise 4: Classes

Create a file `src/classes.ts`.

1. Create a class `BankAccount` that implements the `BankAccount` interface from Exercise 3:
   - A constructor that sets `accountNumber`, `holderName`, `balance`, and `accountType`
   - A method `deposit(amount: number)` that adds to balance and prints the new balance
   - A method `withdraw(amount: number)` that:
     - Deducts from balance if sufficient funds exist
     - Prints `"Insufficient funds"` if not
   - A method `getStatement()` that prints all account details

2. Create two instances of `BankAccount` and call `deposit`, `withdraw`, and `getStatement` on each.

3. Create a class `Student` that implements the `Printable` interface from Exercise 3.
   - Properties: `id`, `firstName`, `lastName`, `course`, `grade`
   - A constructor that sets all properties
   - Implement `print()` — it should print:  
     `"[id] | [firstName] [lastName] | [course] | Grade: [grade]"`

4. Create a class `GraduateStudent` that **extends** `Student`.
   - Add a property `thesisTopic: string`
   - Override `print()` to also print the thesis topic
   - Create an instance and call `print()`

---

## Part C: Modules and Configuration

### Exercise 5: Import and Export

Create the following files:

**`src/config.ts`**
- Export a constant `TAX_RATE` with value `0.18`
- Export a constant `CURRENCY` with value `"USD"`
- Export a type `Category` for `'Electronics' | 'Clothing' | 'Food' | 'Books'`

**`src/utils.ts`**
- Import `TAX_RATE` and `CURRENCY` from `config.ts`
- Export a function `addTax(price: number): number` that returns price + tax
- Export a function `formatPrice(amount: number): string` that returns `"USD 29.99"` format

**`src/main.ts`**
- Import everything needed from both files
- Create an array of 3 products with the `Product` type from Exercise 1
- Call `addTax()` and `formatPrice()` for each product and print the results

---

### Exercise 6: TypeScript Configuration

1. Open your `tsconfig.json`. Find and explain what these options do:
   - `"strict"`
   - `"target"`
   - `"outDir"`
   - `"rootDir"`
   - `"esModuleInterop"`

2. In your existing code from Exercise 2:
   - Remove the type annotation from one function parameter
   - Observe the error TypeScript gives with `strict: true`
   - Fix it by adding the type back

3. Create a file `src/generics.ts`:
   - Write a generic function `getFirst<T>(items: T[]): T | undefined` that returns the first item of any array
   - Call it with a `string[]`, a `number[]`, and a `Product[]` from Exercise 1
   - Print each result — TypeScript should infer the return type correctly
