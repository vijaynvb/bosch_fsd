## **Actuator**

Actuator is a set of tools that help you monitor and manage your application. It provides endpoints that expose various metrics, health checks, and other useful information about the application's state.

### **Installation**

To use Actuator in your Node.js application, you can install the `express-actuator` package. You can do this using npm:

```bash
npm install express-actuator
```

**Endpoints**

|  **ID** |                     **Description**                    |
|:-------:|:------------------------------------------------------:|
| info    | Displays application information.                      |
| metrics | Shows metrics information for the current application. |
| health  | Shows application health information.                  |

**Usage**

To use the Actuator endpoints, you need to include the `express-actuator` middleware in your Express application:

```js
import express from 'express';
import actuator from 'express-actuator';

const app = express();
const PORT = process.env.PORT || 3000;

// Actuator setup
app.use(actuator("/actuator"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

You can then access the Actuator endpoints at the following URLs:

- **/actuator/info**: Displays application information.
- **/actuator/metrics**: Shows metrics information for the current application.
- **/actuator/health**: Shows application health information.

## **Add Actuator Endpoints to Swagger**

Configure Swagger to include the Actuator endpoints by adding the following code to your Swagger setup:

```js
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
```

now you can run your application and access the Swagger UI at `http://localhost:3000/api-docs`. You should see the Actuator endpoints documented there, along with any other API endpoints you have defined.

---