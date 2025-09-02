// Import required modules
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import todosRouter from './todosRouter.js';

// Load Swagger documentation from file
const swaggerDoc = JSON.parse(
  await readFile(new URL('./swagger-output.json', import.meta.url))
);

const app = express();
const PORT = 3000;

// Setup Swagger UI endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Register todos API routes
app.use("/todos", todosRouter);

// Handle 404 errors for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});