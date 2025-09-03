import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// routes with query params
// http://localhost:3000/todos?search=buy&limit=5
app.get("/todos", (req, res) => {
  const { search, limit } = req.query;
  res.json({ message: `get all objects with search: ${search} and limit: ${limit}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
