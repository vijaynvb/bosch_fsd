# Todo Application CRUD

This project is a simple Todo application built with Groovy and Spring Boot. It demonstrates basic CRUD (Create, Read, Update, Delete) operations using RESTful endpoints.

## Features

- Create a new todo item
- Retrieve all todo items
- Retrieve a specific todo item by ID
- Update an existing todo item
- Delete a todo item
- Basic error handling for invalid requests
- In-memory storage for simplicity
- Use of `ResponseEntity` for flexible HTTP responses

## Prerequisites

- JDK 11 or later
- Gradle 6.0 or later
- An IDE with Groovy support

## Run the Application

Build and run using Maven:

- Navigate to the project directory and open in your IDE (like IntelliJ or VS Code) and run the `TodoappApplication` class using the run button or right click → Run.

OR 

using terminal:

```bash
./mvn spring-boot:run
```

The application will start at:

`http://localhost:8080/swagger-ui.html`

---

## API Endpoints

### 1. Create a Todo

**POST** `/todos`

Request body:

```json
{
  "title": "Learn Groovy",
  "completed": false
}
```

Response (201 Created):

```json
{
  "id": 1,
  "title": "Learn Groovy",
  "completed": false
}
```

---

### 2. Fetch All Todos

**GET** `/todos`

Response:

```json
[
  {
    "id": 1,
    "title": "Learn Groovy",
    "completed": false
  }
]
```

---

### 3. Fetch Todo by ID

**GET** `/todos/{id}`

Response (200 OK):

```json
{
  "id": 1,
  "title": "Learn Groovy",
  "completed": false
}
```

Response (404 Not Found):

```json
{
  "error": "Todo not found"
}
```

---

### 4. Update a Todo

**PUT** `/todos/{id}`

Request body:

```json
{
  "title": "Learn Groovy and Spring Boot",
  "completed": true
}
```

Response (200 OK):

```json
{
  "id": 1,
  "title": "Learn Groovy and Spring Boot",
  "completed": true
}
```

Response (404 Not Found):

```json
{
  "error": "Todo not found"
}
```

---

### 5. Delete a Todo

**DELETE** `/todos/{id}`

Response (204 No Content):

```json
{}
```

Response (404 Not Found):

```json
{
  "error": "Todo not found"
}
```

---