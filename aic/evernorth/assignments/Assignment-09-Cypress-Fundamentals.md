# Assignment: Cypress Fundamentals

**Topics Covered:** Cypress Setup, Selectors, Commands, Assertions, Fixtures, Intercepts, Custom Commands, Debugging  
**Difficulty:** Beginner to Intermediate  
**Estimated Time:** 4-5 hours  
**Reference:** `Week2-Day8-Cypress-Fundamentals.md`  

---

## 📋 Learning Objectives

- ✅ Set up and configure Cypress projects
- ✅ Master Cypress selectors and commands
- ✅ Implement fixtures and aliases
- ✅ Use cy.intercept for network stubbing
- ✅ Create custom commands
- ✅ Debug and troubleshoot tests

---

## Part A: Setup & Basics (25 points)

### Exercise 1: Cypress Project Setup (25 points)

**cypress.config.ts:**
```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
});
```

**First Test:**
```typescript
describe('Cypress Basics', () => {
  it('should visit and assert title', () => {
    cy.visit('/');
    cy.title().should('include', 'Cypress');
  });

  it('should use data-cy selectors', () => {
    cy.get('[data-cy=submit-button]').should('be.visible');
  });
});
```

---

## Part B: Fixtures & Intercepts (30 points)

### Exercise 2: Network Stubbing (30 points)

**Implementation:**
```typescript
describe('API Intercepts', () => {
  it('should stub API response', () => {
    cy.intercept('GET', '/api/todos', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Test Todo', completed: false }
      ]
    }).as('getTodos');

    cy.visit('/todos');
    cy.wait('@getTodos');
    cy.contains('Test Todo').should('be.visible');
  });
});
```

---

## Part C: Custom Commands (25 points)

### Exercise 3: Reusable Commands (25 points)

**cypress/support/commands.ts:**
```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-cy=email]').type(email);
  cy.get('[data-cy=password]').type(password);
  cy.get('[data-cy=submit]').click();
});
```

---

## Part D: Debugging (20 points)

### Exercise 4: Debug Tools (20 points)

**Implementation:**
```typescript
it('should debug test', () => {
  cy.log('Starting test');
  cy.visit('/');
  cy.pause(); // Pause for debugging
  cy.get('button').debug(); // Debug element
});
```

---

## Bonus Challenges (30 points)

### Exercise 5: Complete Test Suite (30 points)
Build comprehensive Cypress test suite with all features.

---

**Total Points: 100 + 30 Bonus = 130 points**

Master Cypress testing! 🌲
