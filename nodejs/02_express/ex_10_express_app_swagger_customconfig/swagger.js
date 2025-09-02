import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "A simple Express Todo API"
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./todosRouter.js"], // Path to the API docs
};

const specs = swaggerJSDoc(options);

export default specs;