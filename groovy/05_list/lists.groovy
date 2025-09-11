// List of Integers
def numbers = [1, 2, 3, 4, 5]
println numbers   // [1, 2, 3, 4, 5]

// List of Strings
def fruits = ["Apples", "Oranges", "Grapes"]
println fruits   // [Apples, Oranges, Grapes]

// Nested List
def nested = [1, 2, [ 'A', 'B', 'Groovy' ], 4]
println nested   // [1, 2, [A, B, Groovy], 4]

// Heterogeneous List
def mixed = [1, "Groovy", 3.14, true]
println mixed   // [1, Groovy, 3.14, true]

// Empty List
def emptyList = []
println emptyList   // []

// Accessing List Elements
def fruits2 = ["Apples", "Oranges", "Grapes"]
println fruits2[1]       // Oranges
println fruits2.get(2)   // Grapes

// Access from Nested List
def myList = [1, 2, 3, ['A', 'B', 'Groovy'], "Hello"]
println myList[2]             // 3
println myList[3]             // [A, B, Groovy]
println myList[3][2]          // Groovy
println myList.get(3).get(2)  // Groovy

// Access Multiple Elements
def numbers2 = [10, 20, 30, 40, 50]
println numbers2[0..2]   // [10, 20, 30]
println numbers2[4..2]   // [50, 40, 30] (reverse range)

// Useful List Operations
// Check if List Contains an Element
def myList2 = [1, 2, 3, ['A', 'B', 'Groovy'], "Hello"]
println myList2.contains(2)                // true
println myList2[3].contains("Groovy")      // true

// Get List Size
println myList2.size()        // 5
println myList2[3].size()     // 3

// Add Elements
myList2.add(10)
println myList2               // [1, 2, 3, [A, B, Groovy], Hello, 10]

myList2 = myList2 + 20
println myList2               // [1, 2, 3, [A, B, Groovy], Hello, 10, 20]

myList2.add(2, 22)            // Add at index 2
println myList2               // [1, 2, 22, 3, [A, B, Groovy], Hello, 10, 20]

// Remove Elements
myList2.remove(2)             // Removes element at index 2
println myList2

myList2 = myList2 - 20        // Removes element 20
println myList2

// Pop / Remove Last
myList2.pop()                 // Removes first element
myList2.removeLast()          // Removes last element

// Advanced Operations
// Intersect
def list1 = [1, 2, 3, 4]
println list1.intersect([2, 3, 5])   // [2, 3]

// Reverse
def nums = [1, 2, 3, 4, 5]
nums = nums.reverse()
println nums   // [5, 4, 3, 2, 1]

// Sort
def nums2 = [4, 1, 3, 5, 2]
nums2 = nums2.sort()
println nums2   // [1, 2, 3, 4, 5]

// Empty & Clear
println nums2.isEmpty()   // false
nums2.clear()
println nums2.isEmpty()   // true
