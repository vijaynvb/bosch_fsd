# Input VAlidation in a Todo Application

In this section, we will enhance our Todo application by adding input validation to ensure that the data being processed meets certain criteria. We will use Jakarta Bean Validation (JSR 380) to validate the input data for creating and updating todos.

## Update the pom.xml

Add the following dependencies to your `pom.xml` to include the validation API and its implementation:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>jakarta.validation</groupId>
    <artifactId>jakarta.validation-api</artifactId>
    <version>3.0.2</version>
</dependency>
```

## Update the Todo Entity

Add validation annotations to the `title` field in the `Todo` entity class:

```groovy
@NotNull(message = "Title must not be null")
@Size(min = 1, max = 15, message = "Title must be between 1 and 15 characters")
String title
Boolean completed = false
```

## Run the Application

Build and run using Maven:

- Navigate to the project directory and open in your IDE (like IntelliJ or VS Code) and run the `TodoappApplication` class using the run button or right click → Run.

OR 

using terminal:

```bash
./mvn spring-boot:run
```

Application will start at:

`http://localhost:8080/swagger-ui.html`

## Test the Validation

POST `/todos` with invalid data as below:

```
{
  "title": ""
}
```

The response should be a `500 Internal Server Error` with a message indicating that the title must not be null and must be between 1 and 15 characters.

## Next Steps

You have successfully added input validation to your Todo application. In the next section, we will explore error handling to provide more user-friendly error messages when validation fails.