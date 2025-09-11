// Defining Variables
def name = "Vijay"
println name   // Output: Vijay

String city = "Delhi"
println city   // Output: Delhi

// Single vs Double Quotes
def name2 = "Vijay"

println 'Name is $name2'   // Output: Name is $name2
println "Name is $name2"   // Output: Name is Vijay
println "Name is ${name2}" // Output: Name is Vijay (preferred style)

// Naming Variables
def x = 10
def X = 20

println x  // 10
println X  // 20

// Dynamic Typing
def value = "Vijay"   // String
println value        // Vijay

value = 10           // Integer
println value        // 10

// Multiple Assignments
def (a, b, c) = [30, 40, 50]

println a   // 30
println b   // 40
println c   // 50

def (String name3, int age, double salary) = ["Vijay", 25, 55000.5]

println name3    // Vijay
println age      // 25
println salary   // 55000.5

def (a2, b2) = [10, 20, 30]
println a2  // 10
println b2  // 20
// 30 is ignored
