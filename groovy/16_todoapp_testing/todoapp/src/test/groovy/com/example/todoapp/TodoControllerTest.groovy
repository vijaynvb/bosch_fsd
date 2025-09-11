package com.example.todoapp

import com.example.todoapp.controller.TodoController
import com.example.todoapp.service.TodoService
import com.example.todoapp.entity.Todo
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import spock.lang.Specification

class TodoControllerTest extends Specification {
    def todoService = Mock(TodoService)
    def controller = new TodoController(todoService)
    MockMvc mockMvc

    def setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build()
    }

    def "should get all todos"() {
        given:
        todoService.getTodos() >> [new Todo(id: 1L, title: "Test", completed: false)]
        
        expect:
        mockMvc.perform(MockMvcRequestBuilders.get("/todos"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath('$[0].title').value("Test"))
    }

    def "should get todo by id for found"() {
        given:
        todoService.getTodoById(1L) >> new Todo(id: 1L, title: "Test", completed: false)

        expect:
        mockMvc.perform(MockMvcRequestBuilders.get("/todos/1"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath('$.title').value("Test"))
    }

    def "should get todo by id for not found"() {
        given:
        todoService.getTodoById(2L) >> null

        expect:
        mockMvc.perform(MockMvcRequestBuilders.get("/todos/2"))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(MockMvcResultMatchers.jsonPath('$.error').value("Todo not found"))
    }

    def "should create todo for valid input"() {
        given:
        def todo = new Todo(id: 1L, title: "New", completed: false)
        todoService.createTodo("New", false) >> todo

        expect:
        mockMvc.perform(MockMvcRequestBuilders.post("/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content('{"title":"New"}'))
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.jsonPath('$.title').value("New"))
    }

    def "should not create todo for missing title"() {
        expect:
        mockMvc.perform(MockMvcRequestBuilders.post("/todos")
            .contentType(MediaType.APPLICATION_JSON)
            .content('{"completed":false}'))
            .andExpect(MockMvcResultMatchers.status().isBadRequest())
            .andExpect(MockMvcResultMatchers.jsonPath('$.error').value("Missing field: title"))
    }

    def "should update todo for found"() {
        given:
        def todo = new Todo(id: 1L, title: "Updated", completed: true)
        todoService.updateTodo(1L, "Updated", true) >> todo

        expect:
        mockMvc.perform(MockMvcRequestBuilders.put("/todos/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content('{"title":"Updated","completed":true}'))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath('$.title').value("Updated"))
    }

    def "should not update todo for not found"() {
        given:
        todoService.updateTodo(2L, "Updated", true) >> null

        expect:
        mockMvc.perform(MockMvcRequestBuilders.put("/todos/2")
            .contentType(MediaType.APPLICATION_JSON)
            .content('{"title":"Updated","completed":true}'))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(MockMvcResultMatchers.jsonPath('$.error').value("Todo not found"))
    }

    def "should delete todo for found"() {
        given:
        todoService.deleteTodo(1L) >> true

        expect:
        mockMvc.perform(MockMvcRequestBuilders.delete("/todos/1"))
            .andExpect(MockMvcResultMatchers.status().isNoContent())
    }

    def "should not delete todo for not found"() {
        given:
        todoService.deleteTodo(2L) >> false

        expect:
        mockMvc.perform(MockMvcRequestBuilders.delete("/todos/2"))
            .andExpect(MockMvcResultMatchers.status().isNotFound())
            .andExpect(MockMvcResultMatchers.jsonPath('$.error').value("Todo not found"))
    }
}
