import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./mongoDB.js"; // Mongoose User model

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

router.post("/signup", async (req, res) => {
  // #swagger.tags = ['Auth']
  // Use model class to create new user
  const newUser = new User(req.body);

  try {
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user, mongoose pre-save hook will handle password hashing
    const savedUser = await newUser.save();
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  // #swagger.tags = ['Auth']
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    console.log(password);
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;