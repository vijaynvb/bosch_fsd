package com.example.todoapp.repository

import org.springframework.data.jpa.repository.JpaRepository
import com.example.todoapp.entity.Todo

interface TodoRepository extends JpaRepository<Todo, Long> {
}
