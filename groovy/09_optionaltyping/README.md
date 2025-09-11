# Optional Typing in Groovy

- Groovy is known as a **dynamic language** that also supports **static typing**.
- This flexibility is called **optional typing**, meaning you can choose whether or not to explicitly declare types for your variables, method parameters, and return values.

---

## 1. Dynamic Typing (Default in Groovy)

By default, Groovy is dynamically typed.
You can use the `def` keyword (or no type at all) to declare variables:

```groovy
def name = "Groovy"
def age = 25
def pi = 3.14

println name
println age
println pi
```

* Groovy will infer the type **at runtime**.
* You can even reassign different types later:

```groovy
def variable = "Hello"
println variable   // String

variable = 123
println variable   // Integer
```

---

## 2. Static Typing (Optional in Groovy)

If you prefer more **clarity, safety, or IDE support**, you can declare types explicitly:

```groovy
String language = "Groovy"
int version = 4
double rate = 2.5

println "Language: $language, Version: $version, Rate: $rate"
```

* Helps **readability** for teams.
* Allows IDEs and compilers to catch type errors earlier.

---

## 3. Methods with Optional Typing

You can define methods without explicit types:

```groovy
def greet(name) {
    return "Hello, $name"
}

println greet("Groovy")
```

Or with explicit typing:

```groovy
String greet(String name) {
    return "Hello, $name"
}
```

Both are valid. The first is **dynamic**, the second is **static**.

---