package com.example.todoapp.service

import com.example.todoapp.entity.Todo
import com.example.todoapp.repository.TodoRepository
import org.springframework.stereotype.Service

@Service
class TodoService {
    private final TodoRepository todoRepository

    TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository
    }

    List<Todo> getTodos() {
        todoRepository.findAll()
    }

    Todo createTodo(String title, Boolean completed) {
        Todo todo = new Todo(title: title, completed: completed ?: false)
        todoRepository.save(todo)
    }
}
