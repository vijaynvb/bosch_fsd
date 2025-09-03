import express from "express";
import todosRouter from "./todosRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "System experiencing issues try again later or contact support" });
});

app.use("/todos", todosRouter);

// route not found error handling
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});