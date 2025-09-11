package com.example.todoapp.controller

import com.example.todoapp.service.TodoService
import com.example.todoapp.entity.Todo
import com.example.todoapp.dto.TodoDto
import org.springframework.web.bind.annotation.*
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/todos")
class TodoController {
    private final TodoService todoService

    TodoController(TodoService todoService) {
        this.todoService = todoService
    }

    @GetMapping
    List<Todo> getTodos() {
        todoService.getTodos()
    }

    @PostMapping
    ResponseEntity<?> createTodo(@RequestBody TodoDto payload) {
        if (!payload.title) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body([error: 'Missing field: title'])
        }
        Todo todo = todoService.createTodo(payload.title as String, payload.completed ?: false)
        ResponseEntity.status(HttpStatus.CREATED).body(todo)
    }
}
