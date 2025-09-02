const express = require('express');
const app = express(); // application object

// error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    // centralized logging 
    next(); // Continue processing
  });

// security 

// static files
app.use(express.static('public'));

// Define a routes 
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    // Use the userId in your logic
    res.send(`Hello, Express! from user ${userId}`);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
