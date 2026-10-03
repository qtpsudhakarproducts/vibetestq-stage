# Assignment: Advanced Cypress & API Testing

**Topics Covered:** cy.intercept Advanced, cy.request API Testing, Custom Commands, Environment Configuration, CI Integration  
**Difficulty:** Intermediate to Advanced  
**Estimated Time:** 4-5 hours  
**Reference:** `Week2-Day9-Advanced-Cypress-API-Testing.md`  

---

## 📋 Learning Objectives

- ✅ Master cy.intercept for advanced network control
- ✅ Perform API testing with cy.request
- ✅ Build reusable custom commands
- ✅ Configure environments
- ✅ Integrate with CI/CD pipelines

---

## Part A: Advanced Intercepts (30 points)

**Implementation:**
```typescript
describe('Advanced Intercepts', () => {
  it('should modify request', () => {
    cy.intercept('POST', '/api/users', (req) => {
      req.body.modified = true;
      req.continue();
    });
  });

  it('should delay response', () => {
    cy.intercept('/api/slow', (req) => {
      req.reply({ delay: 2000, body: { data: 'slow' } });
    });
  });
});
```

---

## Part B: API Testing (30 points)

**Implementation:**
```typescript
describe('API Tests', () => {
  it('should test API with cy.request', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
      .its('status').should('eq', 200);
  });
});
```

---

## Part C: CI Integration (20 points)

**Implementation:**
```yaml
# .github/workflows/cypress.yml
name: Cypress Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v5
```

---

## Part D: Custom Framework (20 points)

Build complete Cypress testing framework.

---

**Total Points: 100 + 30 Bonus = 130 points**

Master advanced Cypress! 🌲
