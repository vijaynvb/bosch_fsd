// Defining a Closure
def myClosure1 = { println "Hello World" }
myClosure1.call()

// Closures with Parameters
def greet = { name -> println "Hello $name" }
greet("Vijay")

// Referencing Variables Inside Closures
def str = "Hello"
def greet2 = { name -> println "$str $name" }
greet2("Vijay")

// Passing Closures to Methods
def myMethod(closure) {
    closure.call("Groovy")
}
def myClosure = { name -> println "Hello $name" }
myMethod(myClosure)

// Closures with Return Values
def sumClosure = { a, b, c ->
    return a + b + c
}
println sumClosure(10, 20, 30)

// Closures with Collections
// Using each on Lists
def fruits = ["apples", "oranges", "grapes"]
fruits.each { item ->
    println item
}

// Using each on Maps
def myMap = [
    subject: "Groovy",
    topic  : "Closures"
]
myMap.each { key, value ->
    println "$key : $value"
}

// Useful Collection Methods with Closures
def numbers = [1, 2, 3, 4, 5]
println numbers.find { it == 3 }   // 3
println numbers.find { it == 6 }   // null

println numbers.findAll { it > 3 }  // [4, 5]

println numbers.any { it > 3 }      // true
println numbers.any { it > 5 }      // false

println numbers.every { it > 0 }    // true
println numbers.every { it > 3 }    // false

println numbers.collect { it * 2 }  // [2, 4, 6, 8, 10]
