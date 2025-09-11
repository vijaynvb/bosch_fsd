// Defining Maps
def employee = [name: "John", age: 40]

// Multi-line style
def employee2 = [
    name: "John",
    age: 40
]

// Empty map
def emptyMap = [:]

// Accessing Map Values
println employee.name       // John
println employee['name']    // John
println employee.get('age') // 40

// Common Map Operations
// Size of a Map
println employee.size()  // 2

// Adding Elements
employee.put("city", "Paris")
println employee         // [name:John, age:40, city:Paris]

// Checking Keys and Values
println employee.containsKey("name")    // true
println employee.containsValue("Paris") // true

// Checking the Class
println employee.getClass()             // class java.util.LinkedHashMap

// Cloning a Map
def emp2 = employee.clone()
println emp2                            // [name:John, age:40, city:Paris]

// Iterating Over Maps
// Using each
employee.each { key, value ->
    println "$key : $value"
}

// Using eachWithIndex
employee.eachWithIndex { key, value, index ->
    println "$index - $key : $value"
}

// Using Entry Objects
employee.each { entry ->
    println "${entry.key} : ${entry.value}"
}

employee.eachWithIndex { entry, i ->
    println "$i - ${entry.key} : ${entry.value}"
}

// Validating Keys and Values with Entry Set
def map1 = [a: 1, b: 2]
def entries = map1.entrySet()
entries.each { entry ->
    assert entry.key in ['a', 'b']
    assert entry.value in [1, 2]
}

// Clearing a Map
employee.clear()
println employee    // [:]
