# Assignment: Node.js Project Configuration

**Total Points**: 120  
**Estimated Time**: 2-3 hours  
**Difficulty**: ⭐⭐ Beginner-Intermediate  
**Topics**: package.json, npm, project structure, dependencies

---

## 📋 Learning Objectives

By completing this assignment, you will:
- ✅ Create and configure Node.js projects
- ✅ Manage dependencies effectively
- ✅ Write npm scripts
- ✅ Organize project structure
- ✅ Use environment variables

---

## 📝 Assignment Parts

### Part 1: Project Initialization (15 points)

Create a new Node.js project:

1. **Initialize Project** (5 points)
   ```bash
   mkdir my-nodejs-app
   cd my-nodejs-app
   npm init
   ```
   - Fill all fields properly
   - Use semantic versioning (1.0.0)
   - Add description, author, license

2. **Create README.md** (5 points)
   - Project name and description
   - Installation instructions
   - Usage examples
   - Available scripts

3. **Create .gitignore** (5 points)
   - Ignore node_modules/
   - Ignore .env
   - Ignore logs/
   - Ignore build output

---

### Part 2: Package.json Configuration (25 points)

1. **Basic Metadata** (5 points)
   - Set name, version, description
   - Add keywords (at least 5)
   - Set author with email
   - Choose appropriate license

2. **Scripts Section** (10 points)
   ```json
   "scripts": {
     "start": "node src/index.js",
     "dev": "nodemon src/index.js",
     "test": "jest",
     "lint": "eslint src/**/*.js",
     "format": "prettier --write src/**/*.js"
   }
   ```

3. **Custom Scripts** (10 points)
   - Create `clean` script to remove build files
   - Create `build` script for production
   - Create `prestart` script (runs before start)
   - Create `postinstall` script

---

### Part 3: Dependency Management (30 points)

1. **Install Production Dependencies** (10 points)
   ```bash
   npm install express dotenv
   ```
   - Express (web framework)
   - dotenv (environment variables)
   - Add at least 2 more relevant packages

2. **Install Dev Dependencies** (10 points)
   ```bash
   npm install --save-dev nodemon jest eslint
   ```
   - nodemon (auto-reload)
   - jest (testing)
   - eslint (linting)
   - Add at least 2 more dev tools

3. **Dependency Analysis** (10 points)
   - Document why each dependency is needed
   - Explain production vs dev dependencies
   - Run `npm outdated` and document output
   - Run `npm audit` and fix issues

---

### Part 4: Environment Variables (20 points)

1. **Create .env File** (10 points)
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=mongodb://localhost:27017/mydb
   API_KEY=your_api_key_here
   SECRET_TOKEN=secret123
   ```

2. **Create .env.example** (5 points)
   - Template without sensitive data
   - Add comments explaining each variable

3. **Use Environment Variables** (5 points)
   ```javascript
   // src/config.js
   require('dotenv').config();
   
   module.exports = {
     port: process.env.PORT || 3000,
     nodeEnv: process.env.NODE_ENV || 'development',
     // Add more...
   };
   ```

---

### Part 5: Project Structure (30 points)

Create the following structure:

```
my-nodejs-app/
├── src/
│   ├── index.js           # Entry point
│   ├── config.js          # Configuration
│   ├── routes/            # API routes
│   │   └── userRoutes.js
│   ├── controllers/       # Business logic
│   │   └── userController.js
│   ├── models/            # Data models
│   │   └── User.js
│   ├── middleware/        # Middleware functions
│   │   └── auth.js
│   └── utils/             # Utility functions
│       └── helpers.js
├── tests/
│   ├── unit/
│   │   └── user.test.js
│   └── integration/
│       └── api.test.js
├── public/
│   ├── css/
│   └── js/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

**Tasks**:
1. **Create Structure** (10 points)
   - Create all folders
   - Create all files with basic content
   - Ensure proper organization

2. **Implement Entry Point** (10 points)
   - Create Express server in `src/index.js`
   - Use environment variables
   - Add basic routes

3. **Add Sample Functionality** (10 points)
   - Create user model
   - Create user routes
   - Create user controller
   - Test with console logs

---

## 📊 Grading Rubric

### Project Setup (30%)
- ✅ package.json properly configured (10%)
- ✅ All required files created (10%)
- ✅ Project structure organized (10%)

### Dependency Management (30%)
- ✅ Correct dependency types (10%)
- ✅ Proper installation (10%)
- ✅ Documentation (10%)

### Configuration (20%)
- ✅ Scripts work correctly (10%)
- ✅ Environment variables used (10%)

### Code Quality (20%)
- ✅ Clean structure (10%)
- ✅ Documentation (10%)

---

## 💡 Tips

1. **Testing Scripts**:
   ```bash
   # Test each script
   npm start
   npm run dev
   npm test
   ```

2. **Check Dependencies**:
   ```bash
   npm list --depth=0
   npm outdated
   npm audit
   ```

3. **Common Issues**:
   - Forgetting to install dependencies
   - Wrong dependency type (prod vs dev)
   - Missing .env file
   - Incorrect file paths

---

## 📤 Submission

Submit your entire project folder including:
- All source files
- package.json (with all scripts)
- .env.example (not .env!)
- .gitignore
- README.md
- Screenshots of:
  - `npm start` output
  - `npm list --depth=0` output
  - Folder structure

---

## 🎯 Bonus Challenges (+20 points)

1. **Package Scripts** (+5 points):
   - Create complex script workflows
   - Use npm-run-all for parallel execution

2. **ESLint Configuration** (+5 points):
   - Create .eslintrc.json
   - Set up rules
   - Fix all linting errors

3. **Multiple Environments** (+10 points):
   - Create .env.development
   - Create .env.production
   - Create script to switch environments

---

## 🔗 Resources

- npm Documentation: https://docs.npmjs.com/
- package.json Guide: https://docs.npmjs.com/cli/v10/configuring-npm/package-json
- Documentation: Doc-18-NodeJS-Project-Structure.md

---

**Good luck! 🚀**
