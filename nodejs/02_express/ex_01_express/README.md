# **Basic Express App Setup**

1. Initialize a Node.js project:

```bash
npm init -y
```

Creates a folder by name `my-express-app`. `npm init -y` creates `package.json` file and instantiates a project.

2. Install Express:

```bash
npm install express
```

3. Create an `index.js` file.

```js
const express = require("express");
const app = express(); // application object

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

The app object in Express.js is an instance of the Express application. It provides methods to configure routes, handle HTTP requests and responses, set up middleware, and more.

Let's break down the key parts of the code:

1. `Import Express:` First, we import the Express module.

2. `Create an Express App:` We create an instance of the Express application and assign it to the app variable.

3. `Define a Route:` Using the app.get() method, we define a route for handling HTTP GET requests to the root path '/'. When a GET request is made to the root URL, the provided callback function is executed, sending the response 'Hello, Express!'.

4. `Start the Server:` We specify a port number (in this case, 3000) and use the app.listen() method to start the Express server. The server will listen on the specified port, and a message is logged to the console when the server starts.

**app Object Features:**

- `Middleware:` Express middleware functions can be added to the application using app.use(). Middleware functions can perform tasks like authentication, logging, and data parsing. Here's an example of using middleware for logging:

```js
// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next(); // Continue processing
});
```