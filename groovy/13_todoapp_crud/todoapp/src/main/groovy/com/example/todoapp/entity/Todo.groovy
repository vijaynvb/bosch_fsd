package com.example.todoapp.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id
    String title
    Boolean completed = false
}
