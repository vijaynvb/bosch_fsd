package com.example.todoapp.controller

import com.example.todoapp.dto.TodoDto
import com.example.todoapp.service.TodoService
import com.example.todoapp.entity.Todo
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

    @GetMapping("/{id}")
    ResponseEntity<?> getTodoById(@PathVariable("id") Long id) {
        Todo todo = todoService.getTodoById(id)
        if (!todo) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body([error: 'Todo not found'])
        }
        ResponseEntity.ok(todo)
    }

    @PostMapping
    ResponseEntity<?> createTodo(@RequestBody TodoDto payload) {
        if (!payload.title) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body([error: 'Missing field: title'])
        }
        Todo todo = todoService.createTodo(payload.title as String, payload.completed ?: false)
        ResponseEntity.status(HttpStatus.CREATED).body(todo)
    }

     @PutMapping("/{id}")
    ResponseEntity<?> updateTodo(@PathVariable("id") Long id, @RequestBody TodoDto payload) {
        Todo todo = todoService.updateTodo(id, payload.title as String, payload.completed as Boolean)
        if (!todo) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body([error: 'Todo not found'])
        }
        ResponseEntity.ok(todo)
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteTodo(@PathVariable("id") Long id) {
        boolean deleted = todoService.deleteTodo(id)
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body([error: 'Todo not found'])
        }
        ResponseEntity.noContent().build()
    }
}
