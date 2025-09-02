## **Swagger**

Swagger is a powerful tool for documenting and testing RESTful APIs. It provides a user-friendly interface to explore API endpoints, view request/response structures, and test API calls directly from the documentation. Swagger uses the OpenAPI Specification (OAS) to define the structure of APIs.

### **Installation**

To use Swagger in your Node.js application, you can install the `swagger-ui-express` and `swagger-autogen` packages:

```bash
npm install swagger-ui-express swagger-autogen
```

### **Basic Setup**

create a file named `swagger.js` in your project directory. This file will be responsible for generating the Swagger documentation based on your API routes.

```js
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'REST API',
    description: 'Description'
  },
  host: 'localhost:3000',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);
```

`index.js` is the main file where your Express app is defined. You can replace it with your actual entry point file.

### **Integrating Swagger with Express**

In your main application file (e.g., `index.js`), you can integrate Swagger with Express:

```js
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import todosRouter from './todosRouter.js';
import { readFile } from 'fs/promises';

const swaggerDoc = JSON.parse(
  await readFile(new URL('./swagger-output.json', import.meta.url))
);

const app = express();
const PORT = 3000;

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use("/todos", todosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### **Update Package.json**

In your `package.json`, add a script to generate the Swagger documentation:

```json
{
  "scripts": {
    "start": "npm run swagger && node index.js",
    "swagger": "node swagger.js"
  }
}
```

---

### **Running the Application Swagger**

Run the application which will generate the Swagger documentation and start the server:

```bash
npm start
```

---

### **Accessing Swagger UI**

Open your web browser and navigate to `http://localhost:3000/api-docs`. You should see the Swagger UI displaying your API documentation, including the available endpoints, request parameters, and response structures.

---
