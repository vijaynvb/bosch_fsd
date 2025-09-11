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
