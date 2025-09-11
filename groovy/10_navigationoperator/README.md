# Safe Navigation Operator in Groovy (`?.`)

The **Safe Navigation Operator (`?.`)** in Groovy helps prevent `NullPointerException` when accessing properties or methods of an object that might be `null`.

Instead of throwing an exception, it returns `null` if the reference is `null`.

---

## Why do we need it?

In Java or traditional languages, calling a method or property on a `null` object results in a `NullPointerException`.

```groovy
class User {
    String name
}

def user = null
println user.name   // NullPointerException
```

In Groovy, the safe navigation operator `?.` helps avoid this:

```groovy
println user?.name  // Prints: null (no exception)
```

---

## Syntax

```groovy
object?.property
object?.method()
```

* If `object` is not `null`, it evaluates the property/method normally.
* If `object` is `null`, the entire expression safely evaluates to `null`.

---

## Examples

### 1. Safe Property Access

```groovy
class User {
    String name
}

def user = null
println user?.name       // Prints: null
```

### 2. Safe Method Call

```groovy
class User {
    String greet() { "Hello!" }
}

def user = null
println user?.greet()    // Prints: null
```

### 3. Chained Safe Navigation

```groovy
class Address {
    String city
}

class User {
    Address address
}

def user = new User(address: null)
println user?.address?.city   // Prints: null
```

### 4. With Elvis Operator

Often combined with the **Elvis operator (`?:`)** to provide a default value:

```groovy
def user = null
def city = user?.address?.city ?: "Unknown"
println city   // Prints: Unknown
```

---

## Key Benefits

* Prevents `NullPointerException`.
* Cleaner code (no need for explicit `if (obj != null)` checks).
* Can be chained for deeply nested properties.

---