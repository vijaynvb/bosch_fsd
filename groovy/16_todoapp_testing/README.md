# Testing with Spock Framework

## What is Spock Framework?

**Spock** is a powerful testing and specification framework for **Java** and **Groovy** applications.
It allows developers to write unit, integration, and functional tests in a highly expressive, concise, and readable way.

---

## Why Use Spock?

* Readable syntax → Groovy-based DSL makes tests look almost like plain English.
* Built-in mocking & stubbing → No external libraries required.
* Structured test phases → `given-when-then` clearly separates setup, action, and verification.
* Seamless integration → Works smoothly with **JUnit, Maven, and Gradle**.

---

## Adding Spock to Your Project

### 1. Add Dependencies in `pom.xml`

```xml
<dependency>
  <groupId>org.spockframework</groupId>
  <artifactId>spock-core</artifactId>
  <version>2.4-M1-groovy-4.0</version>
  <scope>test</scope>
</dependency>

<dependency>
  <groupId>org.spockframework</groupId>
  <artifactId>spock-spring</artifactId>
  <version>2.4-M1-groovy-4.0</version>
  <scope>test</scope>
</dependency>
```

### 2. Place Test Files

All Spock test classes should go inside:

```
src/test/groovy
```

---

## Example Test Code

### Service Layer Tests – `TodoServiceTest.groovy`

* Verifies business logic (service methods).
* Uses mocks for `TodoRepository`.
* Covers:

  * Fetching all todos
  * Handling "not found" cases
  * Creating, updating, and deleting todos

Example (simplified):

```groovy
def "should return all todos"() {
    given:
    todoRepository.findAll() >> [new Todo(id: 1L, title: "Test", completed: false)]

    when:
    def result = todoService.getTodos()

    then:
    result.size() == 1
    result[0].title == "Test"
}
```

---

### Controller Layer Tests – `TodoControllerTest.groovy`

* Tests REST endpoints with MockMvc.
* Covers:

  * `GET /todos` → fetch all
  * `GET /todos/{id}` → fetch by ID (found & not found)
  * `POST /todos` → create new task (valid & invalid input)
  * `PUT /todos/{id}` → update task (found & not found)
  * `DELETE /todos/{id}` → delete task (found & not found)

Example (simplified):

```groovy
def "should create todo for valid input"() {
    given:
    def todo = new Todo(id: 1L, title: "New", completed: false)
    todoService.createTodo("New", false) >> todo

    expect:
    mockMvc.perform(post("/todos")
        .contentType(MediaType.APPLICATION_JSON)
        .content('{"title":"New"}'))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.title").value("New"))
}
```

---

## Spock’s Given-When-Then Structure

Spock organizes tests into phases:

* **given** → Setup preconditions (mocks, test data).
* **when** → Perform the action (call method or API).
* **then** → Verify expected results (assertions).

This makes tests self-explanatory and readable.

---

## Running the Tests

Run all tests using Maven:

- Open the Test File and click the run icon next to the class or method name.

---