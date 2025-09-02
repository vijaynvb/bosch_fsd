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


router.use(json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - due
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the todo item
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: A detailed description of the task
 *         due:
 *           type: string
 *           format: date
 *           description: The due date of the task (YYYY-MM-DD)
 *         status:
 *           type: string
 *           enum: [Not Started, In Progress, Completed]
 *           description: The current status of the task
 *       example:
 *         id: 1
 *         title: Learn HTML
 *         description: Master the basics of HTML, including elements, attributes, and page structuring.
 *         due: 2025-03-10
 *         status: In Progress
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The todos managing API
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns the list of all the todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/", (req, res) => {
  res.json(todos);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get the todo by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */
router.post("/", (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update the todo by the id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });
  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Remove the todo by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 *       500:
 *         description: Some error happened
 */

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});

export default router;