# Python Basics

Welcome to the Python Basics Tutorial! This guide will walk you through the essential concepts of Python programming with clear explanations and practical examples.

## Table of Contents

- [Introduction to Python](#introduction-to-python)
- [Variables and Data Types](#variables-and-data-types)
- [Data Structures](#data-structures)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
- [Modules and Libraries](#modules-and-libraries)
- [File Handling](#file-handling)
- [Error Handling](#error-handling)
- [Comprehensions](#comprehensions)
- [Async & Await](#async--await)

## Introduction to Python

- Python is a high-level, interpreted programming language.
- Known for its simple syntax and readability, making it ideal for beginners.
- Used in web development, data science, automation, scripting, and more.
- Supports multiple programming paradigms: procedural, object-oriented, and functional.

## Variables and Data Types

- Variables store data values and do not require explicit type declaration.
- **Integers (`int`)**: Whole numbers, e.g., `5`, `-10`.
- **Floating-point numbers (`float`)**: Numbers with decimals, e.g., `3.14`, `-0.001`.
- **Strings (`str`)**: Textual data, e.g., `"Hello, World!"`.
- **Booleans (`bool`)**: Logical values, `True` or `False`.
- Dynamic typing allows variables to change type during execution.

## Data Structures

- **Lists**:
  
  - Ordered, mutable collections.
  - Can store mixed data types.
  - Support indexing, slicing, and various methods (`append`, `remove`, etc.).

- **Tuples**:
  
  - Ordered, immutable collections.
  - Useful for fixed data sets.
  - Support indexing and nesting.

- **Dictionaries**:
  
  - Unordered, mutable collections of key-value pairs.
  - Keys must be unique and immutable.
  - Fast lookups and flexible data organization.

- **Sets**:
  
  - Unordered collections of unique elements.
  - Useful for membership tests and removing duplicates.
  - Support mathematical set operations (`union`, `intersection`, etc.).

## Control Flow

- **Conditional Statements**:
  
  - Use `if`, `elif`, and `else` to execute code based on conditions.
  - Support logical operators (`and`, `or`, `not`) for complex conditions.

- **Loops**:
  
  - `for` loops iterate over sequences (lists, strings, etc.).
  - `while` loops repeat as long as a condition is true.
  - Loop control statements: `break`, `continue`, and `pass`.

## Functions

- Functions are reusable blocks of code that perform specific tasks.
- Defined using the `def` keyword.
- Support parameters, return values, and documentation strings.
- **Lambda functions**:
  
  - Anonymous, single-expression functions.
  - Useful for short, throwaway operations.

## Object-Oriented Programming (OOP)

- **Classes and Objects**:
  
  - Classes define blueprints for objects.
  - Objects are instances of classes with attributes and methods.

- **Encapsulation**:
  
  - Bundles data and methods within a class.
  - Restricts direct access to internal data using private attributes.

- **Inheritance**:
  
  - Allows new classes to inherit properties and methods from existing classes.
  - Promotes code reuse and hierarchical relationships.

- **Polymorphism**:
  
  - Enables objects of different classes to be treated as objects of a common superclass.
  - Supports method overriding for flexible interfaces.

## Modules and Libraries

- **Modules**:
  
  - Files containing Python code (functions, classes, variables).
  - Can be imported to reuse code across projects.

- **Libraries**:
  
  - Collections of modules for specific tasks (e.g., `math`, `random`, `numpy`).
  - External libraries can be installed via `pip`.

## File Handling

- Read from and write to files using built-in functions (`open`, `read`, `write`).
- Support for text and binary files.
- Context managers (`with` statement) ensure proper resource management.
- File modes: read (`r`), write (`w`), append (`a`), binary (`b`).

## Error Handling

- Use `try-except` blocks to catch and handle exceptions.
- Prevents program crashes and enables graceful error recovery.
- Can specify multiple exception types and use `finally` for cleanup actions.

## Comprehensions

- Concise syntax for creating lists, dictionaries, and sets.
- Combine loops and conditional logic in a single line.
- Improve code readability and efficiency.

## Async & Await

- Write asynchronous code for concurrent operations.
- Use `async` and `await` keywords to define and run coroutines.
- Ideal for I/O-bound tasks like web requests and file operations.

---