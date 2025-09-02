import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "./mockDB.js";

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

router.get("/", (req, res) => {
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  res.json(users);
});
  
router.get("/:id", (req, res) => {
  /* #swagger.security = [{
           "bearerAuth": []
   }] */
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default router;
