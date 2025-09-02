# Routes

In Express, routes are used to define the endpoints of your web application. Each route corresponds to a specific URL path and HTTP method (GET, POST, PUT, DELETE, etc.). When a request is made to a specific URL, the corresponding route handler is executed.

**1. Define Routes:** You can define routes using app.get(), app.post(), app.put(), and app.delete() methods. Each method corresponds to a specific HTTP verb.

```js
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/todos", (req, res) => {
    res.json({message: "get all objects"});
});

app.get("/todos/:id", (req, res) => {
    res.json({message: "get object by id"});
});

app.post("/todos", (req, res) => {
   res.json({message: "object Added"});
});

app.put("/todos/:id", (req, res) => {
   res.json({message: "object updated"});
});

app.delete("/todos/:id", (req, res) => {
   res.json({message: "object delete"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

- `Route Parameters:` You can define routes with parameters using colons (:) in the route path. For example:

```js
app.get("/todos/:id", (req, res) => {
    res.json({message: "get object by id"});
});
```

---

