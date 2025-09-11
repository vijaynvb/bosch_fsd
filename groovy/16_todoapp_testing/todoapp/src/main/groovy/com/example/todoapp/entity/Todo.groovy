package com.example.todoapp.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

@Entity
class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id
    @NotNull(message = "Title must not be null")
    @Size(min = 1, max = 15, message = "Title must be between 1 and 15 characters")
    String title
    Boolean completed = false
}
