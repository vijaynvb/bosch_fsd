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