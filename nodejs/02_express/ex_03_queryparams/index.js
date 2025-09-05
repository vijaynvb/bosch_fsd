import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// routes with query params
// http://localhost:3000/todos?search=buy&limit=5
app.get("/todos", (req, res) => {
  const { search, limit } = req.query;  // req.query search limit
  res.json({ message: `get all objects with search: ${search} and limit: ${limit}` });
});
// http://localhost:3000/todos/1
app.get("/todos/:id", (req, res) => {
   const { id } = req.params;
    res.json({message: `get object by id: ${id}`});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
