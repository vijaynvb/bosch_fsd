import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // string to json , json to string 

app.use(express.static('public')); // serve static files from the public directory

app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});