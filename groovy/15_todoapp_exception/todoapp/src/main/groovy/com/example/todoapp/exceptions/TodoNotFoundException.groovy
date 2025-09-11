package com.example.todoapp.exceptions

class TodoNotFoundException extends RuntimeException {
    TodoNotFoundException(String message) {
        super(message)
    }
}
