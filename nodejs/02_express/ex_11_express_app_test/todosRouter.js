// Import express and json middleware
import express, { json } from "express";

const router = express.Router();

// Sample data - stored in a local variable (for simplicity)
let todos = [
  { 
    id: 1, 
    title: "Learn HTML", 
    description: "Master the basics of HTML, including elements, attributes, and page structuring.", 
    due: "2025-03-10", 
    status: "In Progress" 
  },
  { 
    id: 2, 
    title: "Learn Vue JS", 
    description: "Explore Vue.js fundamentals, including components, directives, and state management.", 
    due: "2025-03-15", 
    status: "Not Started" 
  }
];

// Enable JSON body parsing for all routes
router.use(json());

// GET /todos - Return all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// GET /todos/:id - Return a single todo by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST /todos - Create a new todo
router.post("/", (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update an existing todo
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });
  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// DELETE /todos/:id - Delete a todo by id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});

// Export the router for use in the main app
export default router;