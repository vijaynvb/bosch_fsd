// scopes of a given variable 
// 1. global
// 2. local block scope

let name='vijay';

{ // if for while function 
    // local or block scope
    let name='somthing'; // var = variable hoisting 
    //console.log(name);
}
console.log(name);

// var let const -> define any data type -> self understod 
var i = 1; // number
var j = "vijay" // string bool function bigint object array

// console.log( typeof i);

// scope and readonly variables

// pop [function] oopl [objects] ->

// for(let i=0;i<5;i++){
//     console.log(i);
// }
// console.log(i);


const age = 4;
//age = 5; // error 

const arr = []; // base addr of a array 

arr.push(1);
arr.push(2);
// arr = 1; error

const funcPointer = function(){
    return "hello world";
}

console.log(arr.toString())

console.log(funcPointer());