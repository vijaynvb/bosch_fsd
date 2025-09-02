const string1 = "Hello world";
const string2 = 'Hello world';
const string3 = "I'll learn \"Javascript\"";

// string templates 

const name = 'vijay';
const age =1;

const person = name + age ;
const person1 = `${name} : ${age}`; // back tick with interporlation ${}
//console.log(person1);
const number = -1; 
console.log(`Number is ${number > 0 ? "Positive" : "Negative"}`); 


const func = function(){
    return "Bangalore";
}

const person2 = `${name} : ${age} : ${func()}`; 

console.log(person2);
