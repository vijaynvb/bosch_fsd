// Why do we need it?
class User {
    String name
}

def user = null
// println user.name   // NullPointerException

println user?.name  // Prints: null (no exception)

// Safe Property Access
class User2 {
    String name
}

def user2 = null
println user2?.name       // Prints: null

// Safe Method Call
class User3 {
    String greet() { "Hello!" }
}

def user3 = null
println user3?.greet()    // Prints: null

// Chained Safe Navigation
class Address {
    String city
}

class User4 {
    Address address
}

def user4 = new User4(address: null)
println user4?.address?.city   // Prints: null

// With Elvis Operator
def user5 = null
def city = user5?.address?.city ?: "Unknown"
println city   // Prints: Unknown
