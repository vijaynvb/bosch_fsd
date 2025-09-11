# Groovy Variables

---

## Project Setup

* You can use **Eclipse**, **IntelliJ IDEA**, or **VS Code** with the Groovy extension.
* Create a new **Groovy class or script** named `Variables.groovy`.

---

## Defining Variables

In Groovy, you can declare variables using:

* **`def` keyword** (dynamically typed)
* **Explicit type** (like `String`, `int`, `double`, etc.)

```groovy
def name = "Vijay"
println name   // Output: Vijay

String city = "Delhi"
println city   // Output: Delhi
```

---

## Single vs Double Quotes

* **Single quotes (`'`)** → Print the string literally.
* **Double quotes (`"`)** → Allow **string interpolation** with variables.

```groovy
def name = "Vijay"

println 'Name is $name'   // Output: Name is $name
println "Name is $name"   // Output: Name is Vijay
println "Name is ${name}" // Output: Name is Vijay (preferred style)
```

---

## Naming Variables

* Can contain **letters, digits, and underscores (`_`)**.
* Must not start with a digit.
* Groovy is **case-sensitive**.

```groovy
def x = 10
def X = 20

println x  // 10
println X  // 20
```

> `x` and `X` are **different variables**.

---

## Dynamic Typing

Groovy is **dynamically typed**.
This means variable types are resolved **at runtime**, and you can reassign variables to values of different types.

```groovy
def value = "Vijay"   // String
println value        // Vijay

value = 10           // Integer
println value        // 10
```

Unlike Java or C, Groovy won’t throw an error when the type changes.

---

## Multiple Assignments

You can assign multiple values at once:

```groovy
def (a, b, c) = [30, 40, 50]

println a   // 30
println b   // 40
println c   // 50
```

With explicit types:

```groovy
def (String name, int age, double salary) = ["Vijay", 25, 55000.5]

println name    // Vijay
println age     // 25
println salary  // 55000.5
```

* If a variable has **no value**, it becomes `null`.
* If a value is extra but no variable is provided, the value is **ignored**.

```groovy
def (a, b) = [10, 20, 30]
println a  // 10
println b  // 20
// 30 is ignored
```

---