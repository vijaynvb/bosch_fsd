// mongoDB.js - MongoDB connection, User model, and Todo model
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// MongoDB connection
const MONGODB_URI = "mongodb://mongodb:27017/express_app"; // for local development, use localhost

mongoose.connect(MONGODB_URI);

// ==================
// User Schema
// ==================
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  role: String,
});

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Add a default admin user if not exists
const addDefaultAdmin = async () => {
  const adminEmail = "admin@example.com";
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) {
    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: "admin123", // Will be hashed
      location: "Headquarters",
      role: "admin",
    });
  }
};

addDefaultAdmin();

// ==================
// Todo Schema
// ==================
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  due: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "Planned"],
    default: "Not Started"
  }
});

const Todo = mongoose.model("Todo", todoSchema);

// Export models
export { User, Todo };
