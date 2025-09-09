# TodoApp with MongoDB (Async DB)

We replaced JSON file storage with MongoDB using the Motor driver (async Mongo client).

---

## Database Connection (`db/mongo.py`)

```python
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/fastapi_db")
client = AsyncIOMotorClient(MONGO_URL)
database = client.fastapi_db

user_collection = database.get_collection("users")
todo_collection = database.get_collection("todos")
```

Explanation:

* `AsyncIOMotorClient` → async driver for MongoDB.
* `MONGO_URL` → connection string (default: `mongodb://localhost:27017/fastapi_db`).
* `user_collection` and `todo_collection` → references to MongoDB collections.

This makes DB queries non-blocking, perfect for FastAPI’s async model.

---

## Todo Service (`services/todoService.py`)

Now, all CRUD operations run against MongoDB.

### Get All Todos

```python
async def get_all_todos():
    todos = []
    async for todo in todo_collection.find():
        todo["id"] = str(todo["_id"])  # convert ObjectId → string
        todos.append(todo)
    return todos
```

* Uses `async for` to iterate over MongoDB cursor.
* `_id` is Mongo’s primary key, but we also keep a custom incrementing integer `id` for compatibility.

---

### Create Todo

```python
async def create_todo(data):
    last = await todo_collection.find().sort("id", -1).limit(1).to_list(length=1)
    new_id = (last[0]["id"] if last else 0) + 1
    todo = {"id": new_id, "title": data.title, "completed": False}
    result = await todo_collection.insert_one(todo)
    todo["id"] = str(result.inserted_id)
    return todo
```

* To stay compatible with old code, we still maintain an auto-incrementing `id` field.
* Mongo’s `_id` is used as unique identifier, but converted to a string for JSON responses.

---

### Update Todo

```python
async def update_todo(id: int, data):
    update_data = {}
    if data.title is not None:
        update_data["title"] = data.title
    if data.completed is not None:
        update_data["completed"] = data.completed
    result = await todo_collection.update_one({"id": id}, {"$set": update_data})
    if result.modified_count == 1:
        todo = await todo_collection.find_one({"id": id})
        todo["id"] = str(todo["_id"])
        return todo
    return None
```

* Uses `$set` operator to update only provided fields.
* Returns updated document if successful.

---

### Delete Todo

```python
async def delete_todo(id: int):
    await todo_collection.delete_one({"id": id})
```

* Removes the todo by its `id`.
* Returns nothing (handled at router level).

---

## Authentication with MongoDB (`services/authService.py`)

Instead of JSON, users are stored in MongoDB.

### Read Users

```python
async def read_users():
    users = []
    async for user in user_collection.find():
        user["id"] = str(user["_id"])
        users.append(user)
    return users
```

* Iterates through MongoDB `users` collection.

---

### Get User

```python
async def get_user(username: str):
    user = await user_collection.find_one({"username": username})
    if user:
        user["id"] = str(user["_id"])
        return user
    return None
```

* Finds user by username (used for login).

---

### Signup User

```python
async def signup_user(username: str, password: str):
    user = await get_user(username)
    if user:
        raise HTTPException(status_code=400, detail="Username already exists")
    last = await user_collection.find().sort("id", -1).limit(1).to_list(length=1)
    new_id = (last[0]["id"] if last else 0) + 1
    user_data = {
        "id": new_id,
        "username": username,
        "hashed_password": pwd_context.hash(password),
        "role": "user"
    }
    result = await user_collection.insert_one(user_data)
    user_data["id"] = str(result.inserted_id)
    return user_data
```

* Passwords are stored securely using `bcrypt`.
* Users default to `"user"` role unless created as `"admin"`.

---

## Main Application (`main.py`)

```python
from passlib.context import CryptContext
from db.mongo import user_collection

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def init_admin_user():
    admin = await user_collection.find_one({"username": "admin"})
    if not admin:
        admin_user = {
            "id": 1,
            "username": "admin",
            "hashed_password": pwd_context.hash("admin"),
            "role": "admin"
        }
        await user_collection.insert_one(admin_user)

@app.on_event("startup")
async def startup_event():
    await init_admin_user()
```

* Ensures that an admin user is auto-created if DB is empty.
* Default credentials: `admin / admin`.

---

## Requirements (`requirements.txt`)

```
fastapi
uvicorn
python-jose
passlib
bcrypt==3.2.0
motor           # async MongoDB driver
python-dotenv   # load .env
python-multipart # needed for form data (OAuth2 login)
```

---

# Benefits of MongoDB Integration

* Scalable: JSON file storage replaced with a real database.
* Asynchronous: Non-blocking queries improve performance.
* Authentication: Secure password storage & JWT-based access.
* Admin Bootstrapping: Ensures system always has an admin user.

---