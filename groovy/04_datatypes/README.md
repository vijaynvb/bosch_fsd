# Groovy Data Types

## What are Data Types?

* **Variables** are used to store information.
* This information can be of **different types**, e.g. numbers, characters, text, or boolean values.
* A **data type** defines the type of information a variable can store.

Groovy supports the same primitive data types as **Java**:

```
byte, short, int, long, float, double, char, boolean, string
```

---

## Number Data Types

- Groovy supports multiple numeric data types, each with different ranges.
- This allows memory optimization based on the values you want to store.

### 1. Byte

```groovy
byte b = 10
println b                // 10
println Byte.MIN_VALUE   // -128
println Byte.MAX_VALUE   // 127
```

> Best used when values are between **-128 to 127**.

---

### 2. Short

```groovy
short s = 100
println s                // 100
println Short.MIN_VALUE  // -32768
println Short.MAX_VALUE  // 32767
```

---

### 3. Integer

```groovy
int i = 1000
println i
println Integer.MIN_VALUE   // -2147483648
println Integer.MAX_VALUE   // 2147483647
```

---

### 4. Long

```groovy
long l = 100000L
println l
println Long.MIN_VALUE
println Long.MAX_VALUE
```

You can append `L` (or `l`) to indicate a **long literal**.

---

### 5. Float

```groovy
float f = 3.14F
println f
println Float.MIN_VALUE
println Float.MAX_VALUE
```

Use `F` to mark as a float literal.

---

### 6. Double

```groovy
double d = 99.99D
println d
println Double.MIN_VALUE
println Double.MAX_VALUE
```

Use `D` (optional). Doubles have **higher precision** than floats.

---

## Char (Character)

```groovy
char c = 'A'
println c    // A

c = '*'
println c    // *

// Not allowed: more than one character
char x = 'AB'   // Error: Cannot cast String to char
```

---

## Boolean

Stores **true/false** values.

```groovy
boolean flag = true
println flag    // true
```

Also accepts expressions that evaluate to `true` or `false`.

---

## String

Strings store **text values**.

```groovy
String str = "Groovy"
println str     // Groovy
```

Supports **single quotes**, **double quotes**, and **interpolation** with double quotes.

---

## Dynamic Typing

Groovy is a **dynamically typed language**.
That means you can use `def` instead of an explicit data type:

```groovy
def value = 10
println value          // 10
println value.getClass().getName()
// java.lang.Integer
```

Groovy automatically assigns the data type **at runtime**.

### Type Casting Example

```groovy
def b = (byte) 10
println b.getClass().getName()
// java.lang.Byte
```

---