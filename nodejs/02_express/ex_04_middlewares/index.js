import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req,res,next)=>{
    console.log(`Request middleware 1 ${req.method}`);
    next();
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
