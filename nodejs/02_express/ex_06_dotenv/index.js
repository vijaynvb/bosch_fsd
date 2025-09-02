import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

console.log("PORT:", PORT);
console.log("DB_HOST:", DB_HOST);
console.log("DB_USER:", DB_USER);
console.log("DB_PASS:", DB_PASS);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
