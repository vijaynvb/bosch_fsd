// Dynamic Typing (Default in Groovy)
def name = "Groovy"
def age = 25
def pi = 3.14

println name
println age
println pi

def variable = "Hello"
println variable   // String

variable = 123
println variable   // Integer

// Static Typing (Optional in Groovy)
String language = "Groovy"
int version = 4
double rate = 2.5

println "Language: $language, Version: $version, Rate: $rate"

// Methods with Optional Typing
def greet(name) {
    return "Hello, $name"
}

println greet("Groovy")

String greet2(String name) {
    return "Hello, $name"
}
