# **Middlewares in Express**

Middlewares are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can perform a variety of tasks, such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function.

## **How to Use Middlewares**

In Express, you can use middlewares by calling the `app.use()` method. Here's an example:

```javascript
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
```

## **Example Request**

To use middlewares, you would make a request to the following URL:

```
GET /
```

In this example, the middleware will log the request method and check if it is a GET request.

