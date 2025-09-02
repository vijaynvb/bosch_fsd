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
