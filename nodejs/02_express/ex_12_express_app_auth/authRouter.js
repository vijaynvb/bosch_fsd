import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import users from "./mockDB.js"; 

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, location, role = "user" } = req.body; // Default role is "user"

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { 
    id: users.length + 1, 
    firstName, 
    lastName, 
    email, 
    password: hashedPassword, 
    location, 
    role // Include role
  };

  users.push(user);

  res.status(201).json({ message: "User registered successfully", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // Include role in JWT
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

export default router;