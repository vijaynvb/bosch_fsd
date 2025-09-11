// Byte
byte b = 10
println b                // 10
println Byte.MIN_VALUE   // -128
println Byte.MAX_VALUE   // 127

// Short
short s = 100
println s                // 100
println Short.MIN_VALUE  // -32768
println Short.MAX_VALUE  // 32767

// Integer
int i = 1000
println i
println Integer.MIN_VALUE   // -2147483648
println Integer.MAX_VALUE   // 2147483647

// Long
long l = 100000L
println l
println Long.MIN_VALUE
println Long.MAX_VALUE

// Float
float f = 3.14F
println f
println Float.MIN_VALUE
println Float.MAX_VALUE

// Double
double d = 99.99D
println d
println Double.MIN_VALUE
println Double.MAX_VALUE

// Char (Character)
char c = 'A'
println c    // A

c = '*'
println c    // *

// Not allowed: more than one character
// char x = 'AB'   // Error: Cannot cast String to char

// Boolean
boolean flag = true
println flag    // true

// String
String str = "Groovy"
println str     // Groovy

// Dynamic Typing
def value = 10
println value          // 10
println value.getClass().getName()
// java.lang.Integer

// Type Casting Example
def b2 = (byte) 10
println b2.getClass().getName()
// java.lang.Byte