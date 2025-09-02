// function 
// defnition
function add(a,b){
    return a+b;
} 
// invocation
//console.log( add(4,5));

// anonumous functions
// parameter for any function
const func =  function(a){
    return a+5;
}

func();

// console.log(add(4, (function(){
//     return 4+5;
// })()));

// arrow functions -> lambda functions -> 1930's -> calculs

// multi core systems -> cpu can have -> 8 core 16 core 
// in one core -> 7 core -> take input give output there is no context [this]
// 

const add1 =  () => { return 4+5; }

// variations
const add2 =  () => 4 + 5;

const add3 =  (a) => a + 5;

const add4 =  a => a + 5;

const add5 =  (a,b) => a + b;

const add6 =  (a,b) => {
    console.log(`Addtion of: a =${a}, b = ${b}`);
    return  a + b
};

// difference between normal function and arrow:

// this key word 

function add7(){
    console.log(`named function ${ arguments[0]}`)
    return arguments[0] + arguments[1];
} 

const add8 =  () => {
    console.log(`named function ${ arguments[0]}`)
    return arguments[0] + arguments[1];
};
//console.log(`my func ${add8(4,5)}`);

// return of json object 

const response = () => ({name: "vijay", age: 2});
console.log(response());
