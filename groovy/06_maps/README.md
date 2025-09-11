# Maps in Groovy

**Maps in Groovy**, one of the collection data types available in the **Groovy Collection Library**, along with **Lists, Ranges, and more**.

Maps in Groovy are **key-value pairs** and form an **unordered collection**. Unlike Lists, which are ordered by index, Maps rely on **unique keys** to store and retrieve values.

---

## Defining Maps

### Syntax

* A Map is defined inside square brackets `[ ]` using `key: value` pairs.
* Keys can be **strings**, **numbers**, or **objects**.
* Values can be of **any data type**.

```groovy
// Simple map
def employee = [name: "John", age: 40]

// Multi-line style
def employee = [
    name: "John",
    age: 40
]

// Empty map
def emptyMap = [:]
```

---

## Accessing Map Values

You can access values using different approaches:

```groovy
def employee = [name: "John", age: 40]

// Dot notation
println employee.name       // John

// Bracket notation
println employee['name']    // John

// Using get() method
println employee.get('age') // 40
```

---

## Common Map Operations

### Size of a Map

```groovy
println employee.size()  // 2
```

---

### Adding Elements

```groovy
employee.put("city", "Paris")
println employee
// [name:John, age:40, city:Paris]
```

---

### Checking Keys and Values

```groovy
println employee.containsKey("name")   // true
println employee.containsValue("Paris") // true
```

---

### Checking the Class

```groovy
println employee.getClass()
// class java.util.LinkedHashMap
```

---

### Cloning a Map

```groovy
def emp2 = employee.clone()
println emp2
// [name:John, age:40, city:Paris]
```

---

## Iterating Over Maps

### 1. Using `each`

```groovy
employee.each { key, value ->
    println "$key : $value"
}
```

---

### 2. Using `eachWithIndex`

```groovy
employee.eachWithIndex { key, value, index ->
    println "$index - $key : $value"
}
```

---

### 3. Using Entry Objects

```groovy
employee.each { entry ->
    println "${entry.key} : ${entry.value}"
}
```

With index:

```groovy
employee.eachWithIndex { entry, i ->
    println "$i - ${entry.key} : ${entry.value}"
}
```

---

## Validating Keys and Values with Entry Set

```groovy
def map1 = [a: 1, b: 2]

def entries = map1.entrySet()

entries.each { entry ->
    assert entry.key in ['a', 'b']
    assert entry.value in [1, 2]
}
```

If you include a value not present, the assertion will fail.

---

## Clearing a Map

```groovy
employee.clear()
println employee
// [:]
```

---