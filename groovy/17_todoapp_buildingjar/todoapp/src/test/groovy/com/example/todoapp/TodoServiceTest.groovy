package com.example.todoapp

import com.example.todoapp.entity.Todo
import com.example.todoapp.repository.TodoRepository
import com.example.todoapp.service.TodoService
import com.example.todoapp.exceptions.TodoNotFoundException
import spock.lang.Specification

class TodoServiceTest extends Specification {
    def todoRepository = Mock(TodoRepository)
    def todoService = new TodoService(todoRepository)

    def "should return all todos"() {
        given:
        todoRepository.findAll() >> [new Todo(id: 1L, title: "Test", completed: false)]

        when:
        def result = todoService.getTodos()

        then:
        result.size() == 1
        result[0].title == "Test"
    }

    def "should throw exception when todo not found"() {
        given:
        todoRepository.findById(1L) >> Optional.empty()

        when:
        todoService.getTodoById(1L)

        then:
        thrown(TodoNotFoundException)
    }

    def "should create todo"() {
        given:
        def todo = new Todo(id: 2L, title: "New", completed: false)
        todoRepository.save(_) >> todo

        when:
        def result = todoService.createTodo("New", false)

        then:
        result.title == "New"
        result.completed == false
    }

    def "should update todo for found"() {
        given:
        def todo = new Todo(id: 3L, title: "Old", completed: false)
        todoRepository.findById(3L) >> Optional.of(todo)
        todoRepository.save(_) >> { it[0] }

        when:
        def result = todoService.updateTodo(3L, "Updated", true)

        then:
        result.title == "Updated"
        result.completed == true
    }

    def "should throw exception when updating todo not found"() {
        given:
        todoRepository.findById(4L) >> Optional.empty()

        when:
        todoService.updateTodo(4L, "Updated", true)

        then:
        thrown(TodoNotFoundException)
    }

    def "should delete todo for found"() {
        given:
        def todo = new Todo(id: 5L, title: "Delete", completed: false)
        todoRepository.findById(5L) >> Optional.of(todo)

        when:
        def result = todoService.deleteTodo(5L)

        then:
        result == true
    }

    def "should throw exception when deleting todo not found"() {
        given:
        todoRepository.findById(6L) >> Optional.empty()

        when:
        todoService.deleteTodo(6L)

        then:
        thrown(TodoNotFoundException)
    }
}
