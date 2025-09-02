# Express Todos API with Swagger

<!-- This README explains setup, usage, and testing for the Express Todos API project. -->

## Setup

1. **Install dependencies**  
   <!-- Installs all required npm packages -->
   Run in project directory:

   ```
   npm install
   ```

2. **Run the server** 
   <!-- Starts the Express server and Swagger UI -->
   ```
   npm start
   ```

   - The API will be available at `http://localhost:3000/todos`  
   - Swagger docs at `http://localhost:3000/api-docs`

3. **Run tests**  
   <!-- Runs Jest unit tests using an in-memory Express app -->
   ```
   npm test
   ```
   > **Note:**  
   > The test command uses `node --experimental-vm-modules` for ES module support with Jest.  
   > If you encounter issues, ensure you are using Node.js v16+ and see [Jest ESM docs](https://jestjs.io/docs/ecmascript-modules).
   >
   > **Tests do not require the server to be running:**  
   > The Jest tests use an in-memory Express app instance, so you do not need to start the server (`npm start`) for tests to pass.

## Project Structure

- `index.js` - Main Express app (ESM)
- `todosRouter.js` - Todos API routes (ESM)
- `__test__/todosRouter.test.js` - Jest/Supertest unit tests
- `jest.config.js` - Jest configuration for ESM
- `swagger-output.json` - Swagger API spec

## Dependencies

<!-- List of npm packages used in the project -->
- express
- swagger-ui-express
- swagger-autogen
- swagger-jsdoc
- node-fetch
- jest (dev)
- supertest (dev)

## Features

- CRUD endpoints for todos
- Swagger documentation
- Jest unit tests for todos API

## Troubleshooting

<!-- Common issues and solutions for running tests -->
- If Jest fails with ESM errors, check:
  - Node version is >= 16
  - `jest.config.js` exists and sets `testEnvironment: "node"`
  - The test command uses `--experimental-vm-modules`
  - All source/test files use ES module syntax (`import`/`export`)
