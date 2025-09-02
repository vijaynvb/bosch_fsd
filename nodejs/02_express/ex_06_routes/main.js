const http = require("http"); // Import the built-in HTTP module

// Create an HTTP server
const server = http.createServer((req, res) => {
  
  if (req.url === "/") {
    // Handle the root route "/"
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the homepage!");

  } else if (req.url === "/about") {
    // Handle the "/about" route
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About us: We are an awesome company!");

  } else {
    // Handle all other undefined routes (404 Not Found)
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});