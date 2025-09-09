# FastAPI Todo App - Authentication & Authorization

## Overview

This project demonstrates how to implement **JWT-based authentication** and **role-based authorization** in a FastAPI application. It features a todo API with user management, secure login, and admin/user roles.

---

## Authentication

- **JWT (JSON Web Token)** is used for stateless authentication.
- Users log in via `/auth/login` and receive a JWT token.
- The token must be included in the `Authorization: Bearer <token>` header for protected routes.

### Signup

- New users can register via `/auth/signup`.
- Default role for new users is `user`.
- Admin user is initialized in `db/user.json`.

---

## Authorization

- **Role-based access control** is enforced:
  - **Admin** (`role: admin`): Can create, update, delete todos and view/manage users.
  - **User** (`role: user`): Can only view todos (GET), cannot modify todos or access user management routes.

### Route Protection

- All `/todos` routes require authentication.
- Only admins can POST, PUT, DELETE todos.
- Only admins can access `/users` routes.
- Regular users can only GET todos.

---

## Project Structure

```
TodoApp/
│── db/
│   ├── todo.json               # Stores todo records
│   └── user.json               # Stores user records
│
│── error/
│   ├── todoNotFound.py         # Custom error for Todo not found
│   └── userNotFound.py         # Custom error for User not found
│
│── models/
│   ├── todoModel.py            # Todo model class
│   └── userModel.py            # User model class
│
│── routers/
│   ├── authRouter.py           # Login & Signup endpoints
│   ├── userRouter.py           # User management (admin-only)
│   └── todoRouter.py           # Todo CRUD (with role checks)
│
│── schemas/
│   ├── todoSchema.py           # Pydantic schemas for todos
│   └── userSchema.py           # Pydantic schemas for users
│
│── services/
│   ├── authService.py          # Authentication & JWT handling
│   └── todoService.py          # Business logic for todos
│
│── .env                        # Secret & config
│── main.py                     # FastAPI entrypoint
│── requirements.txt            # Dependencies
```

---

## Usage

1. **Install dependencies:**

   ```
   pip install -r requirements.txt
   ```

2. **Run the app:**

   ```
   uvicorn main:app --reload
   ```

3. **Login:**

   - Use `/auth/login` with username and password to get a JWT token.
   - Default admin credentials:  

     - Username: `admin`
     - Password: `admin`

4. **Signup:**

   - Use `/auth/signup` to create a new user.

5. **Access protected routes:**

   - Include the JWT token in the `Authorization` header.

---

## Example Requests

### Login

```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=admin
```

### Signup

```http
POST /auth/signup
Content-Type: application/json

{
  "username": "newuser",
  "password": "newpass"
}
```

### Access Todos (as user)

```http
GET /todos/
Authorization: Bearer <your_token>
```

### Create Todo (admin only)

```http
POST /todos/
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Task"
}
```

---

## File Structure

- `main.py` - FastAPI app setup and router inclusion.
- `routers/` - API route definitions (`todoRouter.py`, `authRouter.py`, `userRouter.py`).
- `services/` - Business logic and helpers (`authService.py`, `todoService.py`).
- `db/` - JSON files for persistent storage (`user.json`, `todo.json`).
- `error/` - Custom exception handlers.

---

## Security Notes

- Passwords are hashed using bcrypt via passlib.
- JWT secret key should be changed for production.
- Only admins can manage users and todos.

---