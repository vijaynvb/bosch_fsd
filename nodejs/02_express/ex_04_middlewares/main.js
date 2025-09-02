const express = require('express');
const app = express();

app.use((req,res,next)=>{
    console.log(`Request middleware 1 ${req.method}`);
    if(req.method == 'GET')
        next();
    else
        res.send("only get supported")
    console.log(`Response middleware 1 ${req.method}`);
});

app.use((req,res,next)=>{
    console.log(`Request middleware 2 ${req.method}`);
    next();
    console.log(`Response middleware 2 ${req.method}`);
});

app.get('/', (req, res) => {
    console.log(`get request`);
    res.send('Hello, Express!');
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});