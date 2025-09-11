# Error Handling in Todo Application

In this section, we will enhance our Todo application by adding better error handling mechanisms. This will include handling validation errors and providing more informative error responses to the client.

## Todo not Found Exception handler

To handle cases where a Todo item is not found, we can create a custom exception class:

```groovy
package com.example.todoapp.exceptions

class TodoNotFoundException extends RuntimeException {
    TodoNotFoundException(String message) {
        super(message)
    }
}

```

## Update the Service Layer

Update the `TodoService` to throw `TodoNotFoundException` when a Todo item is not found.

```groovy
Todo getTodoById(Long id) {
  todoRepository.findById(id).orElseThrow {
      new TodoNotFoundException("Todo with id ${id} not found")
  }
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
```

## Test the Error Handling

### 1. Validation Errors

When a validation error occurs (e.g., creating a todo with an empty title), the response should now include a more informative error message:

```
{
  "error": "Title must not be null and must be between 1 and 15 characters"
}
```

### 2. Todo Not Found

When a todo is not found (e.g., fetching a todo with a non-existent ID), the response should be a `404 Not Found` without a body:

```
{
  "error": "Todo not found"
}
```

---