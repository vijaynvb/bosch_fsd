# Spring Boot + Groovy TodoApp

This guide will help you create a Spring Boot project using **Spring Initializr**, set it up with **Groovy**, and create your first **`/todos` endpoint**.

---

## 1. Create Project with Spring Initializr

1. Open [Spring Initializr](https://start.spring.io/).

2. Choose:

   * **Project:** Maven
   * **Language:** Groovy
   * **Spring Boot Version:** 3.x.x
   * **Group:** `com.example`
   * **Artifact:** `todoapp`
   * **Name:** `todoapp`
   * **Packaging:** Jar
   * **Java Version:** 17 (or higher)

3. Add Dependencies:

   * **Spring Web**
   * **Spring Boot DevTools** (optional, for live reload)

4. Click **Generate**, then extract the zip file.

---

## 2. Application Entry Point

Create `src/main/groovy/com/example/todoapp/TodoappApplication.groovy`:

```groovy
package com.example.todoapp

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = ["com.example.todoapp"])
class TodoappApplication {

	static void main(String[] args) {
		SpringApplication.run(TodoappApplication, args)
	}

}
```

---

## 3. Create First `/todos` Endpoint

Create `src/main/groovy/com/example/todoapp/controller/TodoController.groovy`:

```groovy
package com.example.todoapp.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TodoController {

    @GetMapping("/todos")
    List<Map<String, Object>> getTodos() {
        return [
            [id: 1, title: "Learn Groovy", completed: false],
            [id: 2, title: "Build Spring Boot App", completed: true]
        ]
    }
}
```

---

## 4. Run the Application

Build and run using Maven:

- Navigate to the project directory and open in your IDE (like IntelliJ or VS Code) and run the `TodoappApplication` class using the run button or right click → Run.

OR 

using terminal:

```bash
./mvn spring-boot:run
```

---

## 5. Test the Endpoint

Open in browser:

`http://localhost:8080/swagger-ui.html`

Response:

```json
[
  {"id":1,"title":"Learn Groovy","completed":false},
  {"id":2,"title":"Build Spring Boot App","completed":true}
]
```

---