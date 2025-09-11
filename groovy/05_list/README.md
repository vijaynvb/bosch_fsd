# Lists in Groovy

A **List** is a collection data type that allows you to store **multiple elements**. Lists are part of Groovy’s **collection library**, which also includes **Maps, Ranges, and more**.

---

## What is a List?

* A **list** is a structure that stores **a collection of items**.
* Items can be of **any type**: integers, strings, floats, characters, or even other lists.
* Lists are **indexed** (starting at `0`).

### Syntax:

```groovy
def listName = [element1, element2, element3]
```

---

## Examples of Lists

### 1. List of Integers

```groovy
def numbers = [1, 2, 3, 4, 5]
println numbers   // [1, 2, 3, 4, 5]
```

### 2. List of Strings

```groovy
def fruits = ["Apples", "Oranges", "Grapes"]
println fruits   // [Apples, Oranges, Grapes]
```

### 3. Nested List

```groovy
def nested = [1, 2, [ 'A', 'B', 'Groovy' ], 4]
println nested   // [1, 2, [A, B, Groovy], 4]
```

### 4. Heterogeneous List

```groovy
def mixed = [1, "Groovy", 3.14, true]
println mixed   // [1, Groovy, 3.14, true]
```

### 5. Empty List

```groovy
def emptyList = []
println emptyList   // []
```

---

## Accessing List Elements

Lists are **indexed starting from 0**.

```groovy
def fruits = ["Apples", "Oranges", "Grapes"]

println fruits[1]       // Oranges
println fruits.get(2)   // Grapes
```

### Access from Nested List

```groovy
def myList = [1, 2, 3, ['A', 'B', 'Groovy'], "Hello"]

println myList[2]             // 3
println myList[3]             // [A, B, Groovy]
println myList[3][2]          // Groovy
println myList.get(3).get(2)  // Groovy
```

---

## Access Multiple Elements

```groovy
def numbers = [10, 20, 30, 40, 50]

println numbers[0..2]   // [10, 20, 30]
println numbers[4..2]   // [50, 40, 30] (reverse range)
```

---

## Useful List Operations

### Check if List Contains an Element

```groovy
def myList = [1, 2, 3, ['A', 'B', 'Groovy'], "Hello"]

println myList.contains(2)                // true
println myList[3].contains("Groovy")      // true
```

### Get List Size

```groovy
println myList.size()        // 5
println myList[3].size()     // 3
```

### Add Elements

```groovy
myList.add(10)
println myList               // [1, 2, 3, [A, B, Groovy], Hello, 10]

myList = myList + 20
println myList               // [1, 2, 3, [A, B, Groovy], Hello, 10, 20]

myList.add(2, 22)            // Add at index 2
println myList               // [1, 2, 22, 3, [A, B, Groovy], Hello, 10, 20]
```

### Remove Elements

```groovy
myList.remove(2)             // Removes element at index 2
println myList

myList = myList - 20         // Removes element 20
println myList
```

### Pop / Remove Last

```groovy
myList.pop()                 // Removes first element
myList.removeLast()          // Removes last element
```

---

## Advanced Operations

### Intersect

```groovy
def list1 = [1, 2, 3, 4]
println list1.intersect([2, 3, 5])   // [2, 3]
```

### Reverse

```groovy
def nums = [1, 2, 3, 4, 5]
nums = nums.reverse()
println nums   // [5, 4, 3, 2, 1]
```

### Sort

```groovy
def nums = [4, 1, 3, 5, 2]
nums = nums.sort()
println nums   // [1, 2, 3, 4, 5]
```

### Empty & Clear

```groovy
println nums.isEmpty()   // false
nums.clear()
println nums.isEmpty()   // true
```

---