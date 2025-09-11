package com.example.todoapp.dto;

import groovy.transform.ToString;
import groovy.transform.EqualsAndHashCode;
import groovy.transform.Canonical;

@Canonical
@ToString
@EqualsAndHashCode
class TodoDto {
    String title
    Boolean completed
}
