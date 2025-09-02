import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // string to json , json to string 

app.use(express.urlencoded({ extended: true })); // url encoding and provides a decoded data 

app.post('/', (req, res) => {
    const request = req.query;
    console.log(req.query);
    // console.log(`get request ${request}`);
    res.send('Hello, Express!');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});