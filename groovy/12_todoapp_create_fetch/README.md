# TodoApp - Groovy Spring Boot CRUD Demo

A simple Groovy + Spring Boot application for managing Todo tasks.
This project demonstrates RESTful API development with Groovy, Spring Boot, and Spring Data JPA, using an H2 in-memory database.

---

## Features

* Create a new todo task
* Fetch all todo tasks
* Built with Groovy’s concise syntax

---

## Tech Stack

* Groovy – concise, JVM-based language
* Spring Boot – rapid application development
* Spring Data JPA – ORM & repository support
* H2 Database – lightweight in-memory DB

---

Absolutely! Let me break down Spring Data JPA and H2 Database in a clear, trainer-style way for your README or learning material.

---

## Spring Data JPA

Spring Data JPA is a Spring framework module that simplifies data access and persistence using the Java Persistence API (JPA). It helps you interact with databases without writing boilerplate SQL queries.

### Key Concepts:

1. Repository Abstraction

   * Spring Data JPA provides interfaces like `JpaRepository` or `CrudRepository`.
   * These give you CRUD operations (`save`, `findAll`, `findById`, `delete`) out-of-the-box.
   * You don’t need to manually implement SQL queries for standard operations.

   ```groovy
   interface TodoRepository extends JpaRepository<Todo, Long> {}
   ```

2. Entities

   * Your domain models (e.g., `Todo`) are annotated with `@Entity`.
   * JPA maps these entities to database tables automatically.

   ```groovy
   @Entity
   class Todo {
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       Long id
       String title
       Boolean completed = false
   }
   ```

3. Query Methods

   * Spring Data JPA can generate queries automatically based on method names.
   * Example: `findByTitle(String title)` generates a SQL query to fetch todos with the given title.

4. Transaction Management

   * Spring handles transactions automatically.
   * Annotate service methods with `@Transactional` if you need atomic operations.

### Advantages:

* Less boilerplate code
* Easy integration with Spring Boot
* Flexible query support (method names, JPQL, native queries)

---

## H2 Database

H2 is a lightweight, in-memory relational database written in Java. It’s ideal for development and testing because it doesn’t require installing or configuring a full-fledged DB like MySQL or PostgreSQL.

### Key Features:

1. In-Memory by Default

   * Data exists only while the app is running. Once stopped, all data is lost.
   * Perfect for demos, prototypes, or tests.

2. Fast and Lightweight

   * Minimal setup and small footprint.
   * Ideal for small projects or learning.

3. Web Console

   * H2 provides a built-in web console to inspect the database:
     `http://localhost:8080/h2-console`
   * You can query tables and see the stored data in real-time.

4. Seamless Spring Boot Integration

   * Configure via `application.properties`:

     ```properties
     spring.datasource.url=jdbc:h2:mem:todo-db
     spring.datasource.driverClassName=org.h2.Driver
     spring.datasource.username=sa
     spring.datasource.password=
     spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
     spring.h2.console.enabled=true
     ```

### Advantages:

* Quick setup, zero configuration
* Perfect for prototyping & learning
* Supports standard SQL

---

### How They Work Together

1. Spring Data JPA manages your entity objects (`Todo`) and automatically generates SQL queries.
2. H2 Database stores these entities in-memory during runtime.
3. Developers can focus on business logic, not SQL or database setup.

---

## Getting Started

### Prerequisites

* Java 8 or later
* Maven (wrapper included: `mvnw`)

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

## Project Structure

```
src/main/groovy/com/example/todoapp
│
├── TodoappApplication.groovy   # Application entry point
│
├── controller/
│   └── TodoController.groovy   # REST API endpoints
│
├── service/
│   └── TodoService.groovy      # Business logic
│
├── entity/
│   └── Todo.groovy             # Todo JPA entity
│
└── repository/
    └── TodoRepository.groovy   # Data access (JPA)
```

---

