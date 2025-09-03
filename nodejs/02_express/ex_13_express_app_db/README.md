# MongoDB Integration

## Introduction

In the earlier version of our project, we used a **mock database (in-memory array)** to store users and todos.
That approach works for demos, but the data **doesn’t persist** once the server restarts.

Now, we will integrate **MongoDB with Mongoose** so that our data is:

* Stored permanently.
* Queryable with powerful operators.
* Ready for production use.

## Docker MongoDB

To simplify the setup, we can use Docker to run MongoDB. Here’s how:

**1.** **Create a Docker network** (optional):

```bash
docker network create mongo-network
```

**2.** **Run MongoDB container**:

```bash
docker run -d -p 27017:27017 --name mongodb-container mongo:latest
```

**3.** **Connect to MongoDB**:

You can connect to this MongoDB instance using the connection string:

```
mongodb://localhost:27017/express_app
```

## Setup

### Install MongoDB & Mongoose

```bash
npm install mongoose
```

If you don’t have MongoDB installed locally, you can:

* Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community).
* Or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas).

### Update `.env`

Add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/express_app
JWT_SECRET=supersecretkey123
```

---

## MongoDB Connection & Models

We create a **`mongoDB.js`** file to handle:

* MongoDB connection.
* Defining schemas & models for **User** and **Todo**.
* Adding a **default admin user** if one doesn’t exist.

### mongoDB.js (key parts)

```js
// mongoDB.js - MongoDB connection, User model, and Todo model
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/express_app";// for local development, use localhost

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
```

---

## Updating Routers to Use MongoDB

### 1. Users (`userRouter.js`)

* Old: `users` array from `mockDB.js`.
* New: `User` model from MongoDB.
* Also exclude passwords when fetching users.

```js
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
```

---

### Todos (`todosRouter.js`)

* Old: todos stored in a JS array.
* New: Todos stored in MongoDB.
* All operations use `Todo.find()`, `Todo.create()`, `Todo.findByIdAndUpdate()`, etc.

```js
router.post("/", authorizeAdmin, async (req, res) => {
  const { title, description, due, status } = req.body;
  
  try {
    const existingTodo = await Todo.findOne({ title });
    if (existingTodo) {
      return res.status(400).json({ error: "Todo with this title already exists" });
    }
    const newTodo = new Todo({ title, description, due, status });
    await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo", details: err.message });
  }
});
```

---

## Testing the Integration

1. **Start MongoDB** (local or cloud).
2. Run the server:

   ```bash
   node index.js
   ```
3. Open Swagger Docs → [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
4. Test APIs:

   * Create a user → saved in MongoDB.
   * Login → fetches user from MongoDB.
   * Create todo → persisted in MongoDB.
   * Query todos → fetched from MongoDB.

---

## Key Takeaways

* Migrating from **mockDB.js** to **MongoDB** makes the app production-ready.
* **Mongoose** helps define schemas & models with built-in validation.
* **Pre-save hooks** allow automatic password hashing.
* MongoDB lets us persist data and perform powerful queries.

---