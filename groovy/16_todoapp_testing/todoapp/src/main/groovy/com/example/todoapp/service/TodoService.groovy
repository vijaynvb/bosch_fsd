package com.example.todoapp.service

import com.example.todoapp.entity.Todo
import com.example.todoapp.repository.TodoRepository
import com.example.todoapp.exceptions.TodoNotFoundException
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

    Todo getTodoById(Long id) {
        todoRepository.findById(id).orElseThrow {
            new TodoNotFoundException("Todo with id ${id} not found")
        }
    }

    Todo createTodo(String title, Boolean completed) {
        Todo todo = new Todo(title: title, completed: completed ?: false)
        todoRepository.save(todo)
    }

    Todo updateTodo(Long id, String title, Boolean completed) {
        Todo todo = todoRepository.findById(id).orElseThrow {
            new TodoNotFoundException("Todo with id ${id} not found")
        }
        if (title != null) todo.title = title
        if (completed != null) todo.completed = completed
        todoRepository.save(todo)
    }

    boolean deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow {
            new TodoNotFoundException("Todo with id ${id} not found")
        }
        todoRepository.delete(todo)
        true
    }
}


