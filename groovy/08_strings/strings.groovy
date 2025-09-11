// Single-Quoted Strings
def s1 = 'Hello World'
println s1   // Hello World

def name = "Vijay"
println 'My name is $name'   // My name is $name

// Double-Quoted Strings
def name2 = "Vijay"
println "My name is $name2"   // My name is Vijay

println "Hello " + name2
println "Hello ".concat(name2)

// Triple-Quoted Strings
def s2 = """This is a Groovy class
and we are learning Strings"""
println s2

// Slashy Strings
def s3 = /A green sky/
println s3

// Dollar Slashy Strings
def name3 = "Vijay"
def s4 = $/My name is "$name3"/$
println s4

// String Operations
def name4 = "Vijay"
println name4.length()   // 5

println name4[2]    // j (index starts at 0)
println name4[-2]   // a (from the end)

println name4.indexOf("j")   // 2

println name4[0..2]     // Vij
println name4[4..2]     // yaj
println name4[0,2,4]    // Vjy

println name4.substring(2)    // jay
println name4.substring(1,4)  // ija

def str = "This is a groovy class"
println str.split(" ")   // [This, is, a, groovy, class]

println str - "groovy"                 // This is a class
println str.replace("class", "session") // This is a groovy session

println str.toLowerCase()
println str.toUpperCase()

println str.toList()
// [T, h, i, s,  , i, s,  , a,  , g, r, o, o, v, y,  , c, l, a, s, s]

println "Groovy" * 3   // GroovyGroovyGroovy

println "Groovy".equals("Groovy")               // true
println "Groovy".equals("groovy")               // false
println "Groovy".equalsIgnoreCase("groovy")     // true
