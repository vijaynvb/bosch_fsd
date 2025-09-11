# Installing Groovy on Windows

---

## Prerequisites

* **Java must be installed** before installing Groovy.

  * Open Command Prompt and check:

    ```sh
    java -version
    ```

  * If Java is **not installed**, download and install:

    * [Java JDK](https://www.oracle.com/java/technologies/downloads/)
    * Or [OpenJDK](https://openjdk.org/)

Groovy requires a **JVM**:

* **Groovy 5.x** → Java 11 or above
* **Groovy 4.x** → Java 8 or above

---

## Downloading Groovy

1. Go to the [Official Groovy Website](https://groovy-lang.org/).
2. Navigate to the **Download** section.
3. Select **Windows Installer** (recommended).

Alternative: You can also download the **binary distribution** if you prefer manual setup.

---

## Installing Groovy

1. Run the downloaded **Groovy installer** (`.msi`).

2. Follow the installation wizard:

   * Accept license agreement.
   * Choose 
   * Click **Install**.

3. The installer will:

   * Create an environment variable: `GROOVY_HOME`
   * Add `GROOVY_HOME/bin` to the system **PATH**

This allows you to run Groovy from anywhere in Command Prompt.

---

## Verifying Installation

Open a **new Command Prompt** and run:

```sh
groovy --version
```

or

```sh
groovy -v
```

You should see output similar to:

```
Groovy Version: 3.0.0 JVM: 11 Vendor: Oracle Corporation OS: Windows 10
```

You can also check the installation path:

```sh
where groovy
```

---

## Using Groovy Console

Groovy installation includes a **Groovy Console** GUI.
To launch it:

* Search for **Groovy Console** in Start Menu, or
* Run `groovyConsole` from Command Prompt.

Example program:

```groovy
println "Hello, World!"
```

Click **Run**, and you should see the output in the console.

---

## Running Groovy in IntelliJ IDEA

### Prerequisites

* Install [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
* [Install Java (JDK or JRE)](https://www.oracle.com/java/technologies/downloads/)
* [Install Groovy](https://groovy-lang.org/download.html)

Check installations:

```sh
java -version
groovy -version
```

---

### Step 1: Create Your First Groovy Script

1. Inside the folder, create a new file:

   ```
   script1.groovy
   ```

2. Add the following code:

   ```groovy
   println "Hello, World!"
   ```

3. Save the file (`Ctrl+S`).

---

### Step 2: Run Groovy Code

#### Option 1: Run via Terminal

1. Open **Terminal** in VS Code:

   * `Terminal → New Terminal`

2. Run the script:

   ```sh
   groovy script1.groovy
   ```

3. Output:

   ```
   Hello, World!
   ```

---

## Running Groovy in Visual Studio Code 


### Prerequisites

* [Install Java (JDK or JRE)](https://www.oracle.com/java/technologies/downloads/)
* [Install Groovy](https://groovy-lang.org/download.html)
* [Install Visual Studio Code](https://code.visualstudio.com/)

Check installations:

```sh
java -version
groovy -version
```

---

### Step 1: Install Groovy Extension

1. Open **VS Code**.
2. Go to the **Extensions** panel (`Ctrl+Shift+X`).
3. Search for **Groovy**.
4. Install **Code Groovy** (`code-groovy`) extension from **Marlon Franca**.

This provides Groovy syntax highlighting and language support.

---

### Step 1: Create Your First Groovy Script

1. Inside the folder, create a new file:

   ```
   script1.groovy
   ```

2. Add the following code:

   ```groovy
   println "Hello, World!"
   ```

3. Save the file (`Ctrl+S`).

---

### Step 2: Run Groovy Code

#### Option 1: Run via Terminal

1. Open **Terminal** in VS Code:

   * `Terminal → New Terminal`

2. Run the script:

   ```sh
   groovy script1.groovy
   ```

3. Output:

   ```
   Hello, World!
   ```

---

#### Option 2: Run via Code Runner Extension

1. Install the **Code Runner** extension from the Extensions panel.
2. Open your Groovy script.
3. Right-click inside the editor → **Run Code**.
4. Output will appear in the terminal/output panel.

---

## Maven Installation ( Optional )

If you planning to run on VS Code, you might want to install Maven as well. You can follow these steps:

**Prerequisites**

- You need a Java Development Kit (JDK) installed. Either set the JAVA_HOME environment variable to the path of your JDK installation or have the java executable on your PATH.


**Windows:**

1. To install Apache Maven, extract the archive and add its bin directory to the `MAVEN_HOME`. This works on any operating system, but setting the path and environment variables depends on the OS.

2. Download the Apache Maven [binary distribution archive](https://maven.apache.org/download.html).

3. Extract the distribution archive in any directory. Use `unzip apache-maven-3.9.11-bin.zip` or `tar xzvf apache-maven-3.9.11-bin.tar.gz` depending on the archive.

4. Add the `bin` directory of the extracted Maven folder to the `MAVEN_HOME` environment variable.

5. Confirm with `mvn -v` in a new shell.

**Mac OS:**

Using Homebrew:

```sh
brew install maven
```

**Linux:**

Appropriate package manager commands, e.g., for Debian-based systems:

```sh
sudo apt-get install maven
```

---