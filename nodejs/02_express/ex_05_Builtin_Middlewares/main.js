const express = require('express');
const app = express();

app.use(express.json()); // string to json , json to string 

app.use(express.urlencoded()); // url encoding and provides a decoded data 

app.post('/todos', (req, res) => {
    const request = req.query;
    console.log(req.query);
    //console.log(`get request ${request}`);
    res.send('Hello, Express!');
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});