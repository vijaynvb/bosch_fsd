# Authentication & Authorization in Express.js with JWT

## Introduction

In modern web applications, **authentication** and **authorization** are two key concepts:

* **Authentication** → Verifies **who the user is** (e.g., logging in with email & password).
* **Authorization** → Verifies **what the user is allowed to do** (e.g., only admins can create/update/delete todos).

In this workshop, we will build an **Express.js API** with:

* User **sign-up & login** (authentication).
* JWT-based session handling.
* Role-based access control (authorization).
* Swagger UI for API documentation.

---

## Project Setup

### Install dependencies

```bash
npm install express jsonwebtoken bcryptjs dotenv swagger-ui-express swagger-autogen
```

## Environment Variables (`.env`)

```env
JWT_SECRET=supersecretkey123
```

## Authentication Flow

### `authRouter.js`

Handles **signup** and **login**.

#### Signup

```js
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, location, role = "user" } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, firstName, lastName, email, password: hashedPassword, location, role };
  users.push(user);

  res.status(201).json({ message: "User registered successfully", user });
});
```

**Explanation**

* Checks if the email already exists.
* Hashes the password before storing it.
* Stores new user with a **default role = "user"**.

---

#### Login

```js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});
```

**Explanation**

* Verifies email & password.
* If valid, generates a **JWT token** with:

  * `id`, `email`, `role` (payload).
  * Expiry time = **1 hour**.
* Client must send token in `Authorization: Bearer <token>` header.

---

## Authorization Flow

### `todosRouter.js`

* Protects routes with JWT middleware.
* Only **admins** can create/update/delete todos.

#### Middleware (Authentication)

```js
router.use((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
});
```

#### Middleware (Authorization: Admin Only)

```js
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};
```

**Explanation**

* Every request must include a valid JWT.
* If token is valid → request moves forward.
* Admin-only endpoints check `req.user.role === "admin"`.

---

## User API

### `userRouter.js`

* Protected with JWT.
* Fetch **all users** or a **specific user** by ID.
* add authentication and authorization middleware to user routes.

```js
router.get("/", (req, res) => res.json(users));
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});
```

---

## API Documentation (Swagger)

Then start the server:

```bash
npm start
```

Open Swagger UI:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Testing the Flow

### admin flow

1. **Login as Admin**

```json
POST /auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

2. **Access Todos**

Add the token to the Authorize in swagger UI:

```http
Authorization: Bearer <JWT_TOKEN>
```

Try to access a protected route (e.g., GET /todos).

### user flow

1. **Signup a new user**

```json
POST /auth/signup

{
  "firstName": "use",
  "lastName": "1",
  "email": "user1@example.com",
  "password": "user123",
  "location": "India",
  "role": "user"
}
```

2. **Login and get token**

```json
POST /auth/login
{
  "email": "user1@example.com",
  "password": "user123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

3. **Access Todos (Protected Route)**

Add the token to the Authorize in swagger UI:

```http
Authorization: Bearer <JWT_TOKEN>
```

Try to access a protected route (e.g., GET /todos).

---

## Key Takeaways

* **Authentication** → Ensures **valid user identity**.
* **Authorization** → Ensures **user has the right permissions**.
* JWT allows **stateless authentication** (no server-side session storage).
* Role-based access control helps restrict sensitive operations (e.g., only admins can manage todos).

---