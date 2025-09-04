import express, { json } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Todo } from './mongoDB.js';

dotenv.config();

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

/**
 * Middleware to authenticate JWT tokens
 */
router.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
});


/**
 * Middleware to check if the user is an admin
 */
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};


router.get("/", async (req, res) => {
  // #swagger.tags = ['Todos']
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});


router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Todos']
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
});


router.post("/", authorizeAdmin, async (req, res) => {
  // #swagger.tags = ['Todos']
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  // Use model class to create new todo
  const newTodo = new Todo(req.body);
  
  try {
    const existingTodo = await Todo.findOne({ title: newTodo.title });
    if (existingTodo) {
      return res.status(400).json({ error: "Todo with this title already exists" });
    }
    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo", details: err.message });
  }
});

router.put("/:id", authorizeAdmin, async (req, res) => {
  // #swagger.tags = ['Todos']
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (err) {
    res.status(400).json({ error: "Failed to update todo", details: err.message });
  }
});

router.delete("/:id", authorizeAdmin, async (req, res) => {
  // #swagger.tags = ['Todos']
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete todo", details: err.message });
  }
});

export default router;