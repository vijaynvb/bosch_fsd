import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Todo API',
    description: 'Description'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'], // or ['https'] if using HTTPS
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**',
    },
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, endpointsFiles, doc);