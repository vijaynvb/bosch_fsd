# Strings in Groovy

- **Strings in Groovy** — their types, features, and commonly used operations.
- Even if you are a beginner, this guide will walk you step by step.

---

## Types of Strings in Groovy

Groovy supports multiple types of string literals:

### 1. Single-Quoted Strings

```groovy
def s1 = 'Hello World'
println s1   // Hello World
```

* **No interpolation** (variables won’t be evaluated).
* Example:

  ```groovy
  def name = "Vijay"
  println 'My name is $name'   // My name is $name
  ```

---

### 2. Double-Quoted Strings

```groovy
def name = "Vijay"
println "My name is $name"   // My name is Vijay
```

* Supports **interpolation** (variables are evaluated).
* Concatenation:

  ```groovy
  println "Hello " + name
  println "Hello ".concat(name)
  ```

---

### 3. Triple-Quoted Strings

Used for **multi-line text**.

```groovy
def s2 = """This is a Groovy class
and we are learning Strings"""
println s2
```

Works with both:

* `""" triple double quotes """`
* `''' triple single quotes '''`

---

### 4. Slashy Strings (`/.../`)

```groovy
def s3 = /A green sky/
println s3
```

* Supports **multi-line**
* Supports **interpolation**
* Often used for **Regular Expressions**

---

### 5. Dollar Slashy Strings (`$/.../$`)

```groovy
def name = "Vijay"
def s4 = $/My name is "$name"/$
println s4
```

* Supports interpolation
* Useful when working with **escape-heavy content** (like regex).
* No need for escaping double quotes.

---

## String Operations

### Length

```groovy
def name = "Vijay"
println name.length()   // 5
```

---

### Access Characters

```groovy
println name[2]    // j (index starts at 0)
println name[-2]   // a (from the end)
```

---

### Index of Character

```groovy
println name.indexOf("j")   // 2
```

---

### Ranges

```groovy
println name[0..2]     // Vij
println name[4..2]     // yaj
println name[0,2,4]    // Vjy
```

---

### Substrings

```groovy
println name.substring(2)    // jay
println name.substring(1,4)  // ija
```

---

### Split

```groovy
def str = "This is a groovy class"
println str.split(" ")   // [This, is, a, groovy, class]
```

---

### Remove / Replace

```groovy
println str - "groovy"                 // This is a class
println str.replace("class", "session") // This is a groovy session
```

---

### Case Conversion

```groovy
println str.toLowerCase()
println str.toUpperCase()
```

---

### Convert to List

```groovy
println str.toList()
// [T, h, i, s,  , i, s,  , a,  , g, r, o, o, v, y,  , c, l, a, s, s]
```

---

### Repeat Strings

```groovy
println "Groovy" * 3   // GroovyGroovyGroovy
```

---

### Comparisons

```groovy
println "Groovy".equals("Groovy")               // true
println "Groovy".equals("groovy")               // false
println "Groovy".equalsIgnoreCase("groovy")     // true
```

---