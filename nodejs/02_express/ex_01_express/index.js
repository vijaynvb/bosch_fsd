import express from "express";
const app = express(); // application object
const PORT = process.env.PORT || 3000;

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});