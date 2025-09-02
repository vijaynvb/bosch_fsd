const http = require("http");  // Import the HTTP module
const url = require("url");    // Import the URL module

const server = http.createServer((req, res) => {
  // Parse the request URL and extract query parameters
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname; // Extract URL path
  const query = parsedUrl.query;       // Extract query parameters as an object

  // Set the response headers
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the parsed URL path and query parameters as a response
  res.end(`Path: ${pathname}\nQuery: ${JSON.stringify(query)}`);
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});