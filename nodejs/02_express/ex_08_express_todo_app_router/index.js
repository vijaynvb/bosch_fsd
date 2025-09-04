import express from "express";
import todosRouter from "./todosRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/todos", todosRouter);

// error handling middleware 500 - server error
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json({ error: "System is busy, please try again later." });
});


// route not found error handling
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});