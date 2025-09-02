# **Query Parameters in Express**

Query parameters are a way to pass additional information to the server via the URL. They are typically used for filtering, sorting, or paginating data.

## **How to Use Query Parameters**

In Express, you can access query parameters using the `req.query` object. Here's an example:

```javascript
app.get("/todos", (req, res) => {
  const { search, limit } = req.query;
  res.json({ message: `get all objects with search: ${search} and limit: ${limit}` });
});
```

## **Example Request**

To use query parameters, you would make a request to the following URL:

```
GET /todos?search=buy&limit=5
```

In this example, the `search` parameter is set to "buy" and the `limit` parameter is set to 5.