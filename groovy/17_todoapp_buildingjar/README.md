# Building JAR with Maven

To build a JAR file for your Groovy application using Maven, follow these steps:

1. **Package Your Application**

   - Run the following command in the root directory of your project in your terminal:

   ```bash
   mvn clean package
   ```

   In IntelliJ, you can use the Maven tool window -> Lifecycle -> package to build the JAR.

2. **Locate the JAR File**

   After the build is successful, you can find the JAR file in the `target` directory:

   ```
   target/todoapp-0.0.1-SNAPSHOT.jar
   ```

3. **Run the JAR File**

   You can run the JAR file using the following command:

   ```bash
   java -jar target/todoapp-0.0.1-SNAPSHOT.jar
   ```

   This will start your Spring Boot application.


