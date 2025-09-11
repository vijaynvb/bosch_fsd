# Closures in Groovy

**Closures in Groovy** — what they are, how to use them, and why they are useful. Closures are a powerful feature that make Groovy code more **compact, readable, and reusable**.

---

## What Are Closures?

* A **closure** is a **block of code** that:

  * Can take parameters
  * Can refer to variables outside its scope
  * Can return values
  * Can be passed as a parameter to methods

In simple terms: closures behave like **anonymous functions** with the ability to capture external variables.

---

## Defining a Closure

```groovy
// Define a simple closure
def myClosure1 = { println "Hello World" }

// Calling a closure
myClosure1.call()
```

Output:

```
Hello World
```

---

## Closures with Parameters

```groovy
def greet = { name -> println "Hello $name" }

// Call with argument
greet("Vijay")
```

Output:

```
Hello Vijay
```

You can omit curly braces around the variable reference:

```groovy
def greet = { name -> println "Hello $name" }
```

---

## Referencing Variables Inside Closures

Closures can capture variables from outside:

```groovy
def str = "Hello"
def greet = { name -> println "$str $name" }

greet("Vijay")
```

Output:

```
Hello Vijay
```

Note: Unlike closures, methods cannot directly capture outside variables.

---

## Passing Closures to Methods

Closures can be passed as method arguments:

```groovy
def myMethod(closure) {
    closure.call("Groovy")
}

def myClosure = { name -> println "Hello $name" }

// Passing closure to method
myMethod(myClosure)
```

Output:

```
Hello Groovy
```

---

## Closures with Return Values

Closures can return values just like methods:

```groovy
def sumClosure = { a, b, c ->
    return a + b + c
}

println sumClosure(10, 20, 30)
```

Output:

```
60
```

---

## Closures with Collections

Closures integrate seamlessly with Groovy collections.

### Using `each` on Lists

```groovy
def fruits = ["apples", "oranges", "grapes"]

fruits.each { item ->
    println item
}
```

Output:

```
apples
oranges
grapes
```

---

### Using `each` on Maps

```groovy
def myMap = [
    subject: "Groovy",
    topic  : "Closures"
]

myMap.each { key, value ->
    println "$key : $value"
}
```

Output:

```
subject : Groovy
topic : Closures
```

---

## Useful Collection Methods with Closures

### find

```groovy
def numbers = [1, 2, 3, 4, 5]
println numbers.find { it == 3 }   // 3
println numbers.find { it == 6 }   // null
```

---

### findAll

```groovy
println numbers.findAll { it > 3 }  // [4, 5]
```

---

### any

```groovy
println numbers.any { it > 3 }      // true
println numbers.any { it > 5 }      // false
```

---

### every

```groovy
println numbers.every { it > 0 }    // true
println numbers.every { it > 3 }    // false
```

---

### collect

```groovy
println numbers.collect { it * 2 }  // [2, 4, 6, 8, 10]
```

---

## Closures Beyond Groovy

Closures are not unique to Groovy — they also exist in languages like **JavaScript**.
They help make code:

* Compact
* Readable
* Reusable

---