# Chapter 3 — TypeScript Essentials

---

## What You Will Learn

- How TypeScript extends JavaScript with types
- How to set up a TypeScript project and configure `tsconfig.json`
- How to declare typed variables, union types, and type aliases
- How to define interfaces to describe object shapes
- How to create classes with typed properties and methods
- How to use `import` and `export` for modular code
- How to write generic functions

---

## 3.1 What Is TypeScript?

TypeScript is a superset of JavaScript. Every valid JavaScript file is also valid TypeScript. TypeScript adds **static type checking** — the compiler catches type errors before you run the code.

```
JavaScript  →  you find errors at runtime
TypeScript  →  you find errors at compile time
```

TypeScript files have the `.ts` extension. TypeScript code is compiled to JavaScript before it runs.

---

## 3.2 Project Setup

```bash
mkdir day03-typescript
cd day03-typescript
npm init -y
npm install -D typescript @types/node ts-node
```

Create a `tsconfig.json`:

```bash
npx tsc --init
```

Key settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true
  }
}
```

| Option | What it does |
|--------|-------------|
| `target` | Which JavaScript version to compile to |
| `strict` | Enables all strict type checks — always keep this `true` |
| `outDir` | Where compiled `.js` files go |
| `rootDir` | Where your `.ts` source files live |
| `esModuleInterop` | Allows `import x from 'module'` syntax for CommonJS modules |

Run TypeScript files directly without compiling manually:

```bash
npx ts-node src/main.ts
```

---

## 3.3 Basic Types

TypeScript requires type annotations after a colon following the variable name.

```typescript
let studentName: string = "Priya";
let age: number = 24;
let isEnrolled: boolean = true;
let subjects: string[] = ["Maths", "Science", "English"];
let gpa: number = 8.5;
```

TypeScript also **infers** types when you assign a value immediately:

```typescript
let city = "Mumbai";     // TypeScript infers: string
let count = 0;           // TypeScript infers: number
```

### Union Types

A union type allows a variable to hold one of several specific types.

```typescript
let grade: "A" | "B" | "C" | "D" | "F";
grade = "A";   // ok
grade = "Z";   // Error: Type '"Z"' is not assignable...
```

### Type Aliases

A type alias gives a name to a type so you can reuse it.

```typescript
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

let status: OrderStatus = "pending";
status = "shipped";      // ok
status = "lost";         // Error
```

Type aliases for object shapes:

```typescript
type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

const laptop: Product = {
    id: 1,
    name: "Laptop",
    price: 45000,
    category: "Electronics"
};
```

---

## 3.4 Functions with Types

Type annotations on function parameters and return values document intent and prevent bugs.

```typescript
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

function formatCurrency(amount: number, currency: string): string {
    return `${currency} ${amount.toFixed(2)}`;
}

function printProduct(product: Product): void {
    console.log(`ID      : ${product.id}`);
    console.log(`Name    : ${product.name}`);
    console.log(`Price   : ${product.price}`);
    console.log(`Category: ${product.category}`);
}

function findProduct(products: Product[], id: number): Product | undefined {
    return products.find(p => p.id === id);
}
```

`void` means the function does not return a value. `Product | undefined` means the function returns either a Product or undefined.

---

## 3.5 Interfaces

An interface defines the required shape of an object. Unlike type aliases, interfaces can be extended (inherited).

```typescript
interface Student {
    id: number;
    firstName: string;
    lastName: string;
    course: string;
    email?: string;   // optional property
}

interface BankAccount {
    accountNumber: string;
    holderName: string;
    balance: number;
    accountType: "savings" | "current";
}

interface Printable {
    print(): void;
}
```

The `?` marks a property as optional — you do not have to provide it.

Creating an object that satisfies an interface:

```typescript
const student1: Student = {
    id: 1,
    firstName: "Arjun",
    lastName: "Kumar",
    course: "Playwright Automation"
    // email is optional — ok to omit
};
```

---

## 3.6 Classes

Classes bundle data and behaviour together. TypeScript classes have typed properties and can implement interfaces.

```typescript
class BankAccount {
    accountNumber: string;
    holderName: string;
    balance: number;
    accountType: "savings" | "current";

    constructor(
        accountNumber: string,
        holderName: string,
        balance: number,
        accountType: "savings" | "current"
    ) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = balance;
        this.accountType = accountType;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ₹${amount}. New balance: ₹${this.balance}`);
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log("Insufficient funds");
        } else {
            this.balance -= amount;
            console.log(`Withdrew ₹${amount}. New balance: ₹${this.balance}`);
        }
    }

    getStatement(): void {
        console.log(`Account : ${this.accountNumber}`);
        console.log(`Holder  : ${this.holderName}`);
        console.log(`Balance : ₹${this.balance}`);
        console.log(`Type    : ${this.accountType}`);
    }
}

const myAccount = new BankAccount("ACC001", "Meena Reddy", 5000, "savings");
myAccount.deposit(2000);
myAccount.withdraw(1500);
myAccount.getStatement();
```

### Inheritance

A class can extend another class to inherit its properties and methods.

```typescript
class Student implements Printable {
    id: number;
    firstName: string;
    lastName: string;
    course: string;
    grade: string;

    constructor(id: number, firstName: string, lastName: string, course: string, grade: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.course = course;
        this.grade = grade;
    }

    print(): void {
        console.log(`[${this.id}] | ${this.firstName} ${this.lastName} | ${this.course} | Grade: ${this.grade}`);
    }
}

class GraduateStudent extends Student {
    thesisTopic: string;

    constructor(id: number, firstName: string, lastName: string, course: string, grade: string, thesisTopic: string) {
        super(id, firstName, lastName, course, grade);  // call parent constructor
        this.thesisTopic = thesisTopic;
    }

    print(): void {
        super.print();  // call parent method
        console.log(`Thesis: ${this.thesisTopic}`);
    }
}

const grad = new GraduateStudent(10, "Vikram", "Nair", "M.Tech CS", "A", "AI in Test Automation");
grad.print();
```

---

## 3.7 Modules: Import and Export

Splitting code across files makes it maintainable. Each file is a module.

**`src/config.ts`**:

```typescript
export const TAX_RATE = 0.18;
export const CURRENCY = "USD";
export type Category = "Electronics" | "Clothing" | "Food" | "Books";
```

**`src/utils.ts`**:

```typescript
import { TAX_RATE, CURRENCY } from "./config";

export function addTax(price: number): number {
    return price + price * TAX_RATE;
}

export function formatPrice(amount: number): string {
    return `${CURRENCY} ${amount.toFixed(2)}`;
}
```

**`src/main.ts`**:

```typescript
import { addTax, formatPrice } from "./utils";
import type { Category } from "./config";

const products: { name: string; price: number; category: Category }[] = [
    { name: "Headphones", price: 1500, category: "Electronics" },
    { name: "T-Shirt", price: 400, category: "Clothing" },
    { name: "Novel", price: 250, category: "Books" }
];

for (const p of products) {
    const withTax = addTax(p.price);
    console.log(`${p.name}: ${formatPrice(withTax)}`);
}
```

---

## 3.8 Generics

Generics allow you to write functions that work with any type while keeping type safety.

```typescript
function getFirst<T>(items: T[]): T | undefined {
    return items.length > 0 ? items[0] : undefined;
}

// TypeScript infers T from the argument
const firstString = getFirst(["apple", "banana", "mango"]);
// firstString is: string | undefined

const firstNumber = getFirst([10, 20, 30]);
// firstNumber is: number | undefined

const firstProduct = getFirst(products);
// firstProduct is: { name: string; price: number; category: Category } | undefined
```

Without generics, you would need separate functions for each type, or use `any` (which kills type safety).

---

## Review Questions

**Q1. What is TypeScript and how does it relate to JavaScript?**

TypeScript is a superset of JavaScript that adds optional static type annotations. All valid JavaScript is valid TypeScript. TypeScript compiles to JavaScript before it runs. The main benefit is catching type errors at compile time rather than at runtime.

**Q2. What is the difference between a `type` alias and an `interface`?**

Both describe object shapes. The key differences: interfaces can be re-opened and extended with `extends`, while type aliases cannot be re-declared. Interfaces are preferred for objects that will be extended or implemented by classes. Type aliases are better for union types or primitive aliases.

**Q3. What does the `strict` option in `tsconfig.json` do?**

`strict: true` enables a group of strict type-checking options: `noImplicitAny` (variables cannot have an implicit `any` type), `strictNullChecks` (values cannot be `null` or `undefined` unless explicitly typed that way), and several others. It significantly reduces bugs.

**Q4. What is `void` as a return type?**

`void` means the function does not return a meaningful value. Functions that only perform side effects (printing, updating state) use `void`. It is different from `undefined` — a `void` function call cannot be assigned to a typed variable.

**Q5. What is an optional property in an interface?**

A property marked with `?` after its name is optional. When creating an object that satisfies the interface, you can omit that property without a type error. For example, `email?: string` means email may be a string or may not be present at all.

**Q6. What is the purpose of `super()` in a subclass constructor?**

`super()` calls the constructor of the parent class. In TypeScript/JavaScript, you must call `super()` before accessing `this` in a derived class constructor. It ensures the parent class is properly initialized before the child class adds its own properties.

**Q7. What is a generic function?**

A generic function uses a type parameter (`<T>`) that represents a type which is determined when the function is called, not when it is defined. This allows a single function to work with many types while preserving type information throughout.

**Q8. What is the difference between `export` and `export default`?**

Named exports (`export const x`) allow multiple exports per file and must be imported using the same name with curly braces: `import { x } from './file'`. Default exports (`export default x`) allow only one per file and can be imported with any name: `import anything from './file'`.

**Q9. What does `implements` mean in a class declaration?**

`class X implements Y` means class X promises to have all the properties and methods defined in interface Y. TypeScript will throw a compile error if any required member is missing. It is a contract enforced at compile time.

**Q10. Why use `ts-node` during development?**

`ts-node` runs TypeScript files directly without a separate compile step. Instead of running `tsc` to compile to JavaScript and then `node dist/file.js`, you just run `npx ts-node src/file.ts`. It is faster for development and testing.
