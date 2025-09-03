## **Unit Testing with jest and supertest**

This section covers how to write unit tests for the Express Todos API using Jest and Supertest.

### **Jest**

Jest is a delightful JavaScript testing framework with a focus on simplicity. It works well with Express applications and provides a great developer experience.

### **Supertest**

Supertest is a popular testing library for HTTP assertions. It works seamlessly with Jest and allows you to test your Express routes easily.

### **Setup**

1. **Install testing dependencies**  

   Run the following command to install Jest and Supertest:

   ```bash
   npm install --save-dev jest supertest
   ```

2. **Configure Jest**  

   Create a `jest.config.js` file in the root of your project with the following content:

   ```js
   // Jest configuration for running tests with Node environment and ES modules
   export default {
   testEnvironment: "node",
   transform: {},
   };
   ```

### **Writing Tests**

1. **Create a test file** 

   Create a new file named `todosRouter.test.js` in the `__test__` directory.

2. **Write a basic test**  

   Add the following code to `todosRouter.test.js`:

   ```js
   // Import required modules for testing
   import request from 'supertest';
   import express from 'express';
   import todosRouter from '../todosRouter.js';

   // Create an in-memory Express app for testing
   const app = express();
   app.use('/todos', todosRouter);

   describe('Todos API', () => {
   let createdId;

   // Test GET /todos
   test('GET /todos should return all todos', async () => {
      const res = await request(app).get('/todos');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
   });

   // Test GET /todos/:id
   test('GET /todos/:id should return a todo', async () => {
      const res = await request(app).get('/todos/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
   });

   // Test GET /todos/:id with invalid id
   test('GET /todos/:id with invalid id should return 404', async () => {
      const res = await request(app).get('/todos/999');
      expect(res.statusCode).toBe(404);
   });

   // Test POST /todos
   test('POST /todos should create a new todo', async () => {
      const newTodo = {
         title: "Test Todo",
         description: "Test Description",
         due: "2025-04-01",
         status: "Not Started"
      };
      const res = await request(app).post('/todos').send(newTodo);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      createdId = res.body.id;
   });

   // Test PUT /todos/:id
   test('PUT /todos/:id should update a todo', async () => {
      const updatedTodo = {
         id: createdId,
         title: "Updated Todo",
         description: "Updated Description",
         due: "2025-04-02",
         status: "In Progress"
      };
      const res = await request(app).put(`/todos/${createdId}`).send(updatedTodo);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe("Updated Todo");
   });

   // Test PUT /todos/:id with invalid id
   test('PUT /todos/:id with invalid id should return 404', async () => {
      const res = await request(app).put('/todos/999').send({ id: 999 });
      expect(res.statusCode).toBe(404);
   });

   // Test DELETE /todos/:id
   test('DELETE /todos/:id should delete a todo', async () => {
      const res = await request(app).delete(`/todos/${createdId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', createdId);
   });

   // Test DELETE /todos/:id with invalid id
   test('DELETE /todos/:id with invalid id should return 404', async () => {
      const res = await request(app).delete('/todos/999');
      expect(res.statusCode).toBe(404);
   });
   });
   ```

   The above tests cover the basic CRUD operations for the Todos API.

### **Add test script to package.json**

Add the following script to your `package.json` file:

```json
"scripts": {
   "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
}
```

- `--experimental-vm-modules` flag is necessary to enable the use of ES modules in Jest.
- `node_modules/jest/bin/jest.js` is the path to the Jest CLI.

### **Running Tests**

Run the following command to execute your tests:

```bash
npm test
```

### **Troubleshooting**

- If you encounter issues with ESM modules, ensure you are using Node.js v16+ and have the correct Jest configuration.

---