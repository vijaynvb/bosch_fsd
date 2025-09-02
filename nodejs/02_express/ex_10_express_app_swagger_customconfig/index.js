import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';
import todosRouter from './todosRouter.js';

const app = express();
const PORT = 3000;

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use("/todos", todosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});