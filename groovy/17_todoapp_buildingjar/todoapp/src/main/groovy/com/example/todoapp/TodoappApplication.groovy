package com.example.todoapp

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = ["com.example.todoapp"])
class TodoappApplication {

	static void main(String[] args) {
		SpringApplication.run(TodoappApplication, args)
	}

}
