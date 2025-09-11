package com.example.todoapp.dto

import groovy.transform.Canonical
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

@Canonical
@ToString
@EqualsAndHashCode
class TodoDto {
    String title
    Boolean completed
}
