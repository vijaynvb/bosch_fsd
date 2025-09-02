## **dotenv**

The `dotenv` package is used to load environment variables from a `.env` file into `process.env`. This is useful for managing configuration settings, such as API keys and database connection strings, without hardcoding them into your application.

### **How to Use dotenv**

1. Install the `dotenv` package:

```bash
npm install dotenv
```

2. Create a `.env` file in the root of your project and add your environment variables:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
```

3. Load the environment variables in your application:

```javascript
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
```

Now you can use these environment variables in your application without exposing sensitive information in your code.
