import express from "express";
import expressOasGenerator from 'express-oas-generator';

const app = express(); // application object
expressOasGenerator.init(app, {}); 

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});