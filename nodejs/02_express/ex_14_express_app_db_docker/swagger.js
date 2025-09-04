import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Todo API',
    description: 'Description'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**',
    },
  },
  definitions: {
    User: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        location: { type: "string" },
        role: { type: "string" },
      },
      required: ["firstName", "lastName", "email", "password", "role"],
    },
    Todo: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        due: { type: "string", format: "date-time" },
        status: {
          type: "string",
          enum: ["Not Started", "In Progress", "Completed", "Planned"],
        },
      },
      required: ["title", "due"],
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);