import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';
const doc = {
  info: {
    title: 'Todo API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const actuatorEndpoints = {
  '/actuator/health': {
    get: {
      description: 'Health endpoint',
      responses: {
        200: {
          description: 'Health check response',
          content: {
            'application/json': {
              example: { status: 'UP' }
            }
          }
        }
      }
    }
  },
  '/actuator/info': {
    get: {
      description: 'App info',
      responses: {
        200: {
          description: 'Info response',
          content: {
            'application/json': {
              example: { app: 'Todo API', version: '1.0.0' }
            }
          }
        }
      }
    }
  },
  '/actuator/metrics': {
    get: {
      description: 'Metrics',
      responses: {
        200: {
          description: 'Metrics response',
          content: {
            'application/json': {
              example: { requests: 123, uptime: 4567 }
            }
          }
        }
      }
    }
  },
};
 

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  const swaggerDoc = JSON.parse(fs.readFileSync(outputFile));
  swaggerDoc.paths = { ...swaggerDoc.paths, ...actuatorEndpoints };
  fs.writeFileSync(outputFile, JSON.stringify(swaggerDoc, null, 2));
});