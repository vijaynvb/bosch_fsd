// indexed array
const arr = [1,2];

// let a = arr[0];
// let b = arr[1];

const [x,y] = arr;

// console.log(x);
// console.log(y);

const obj = {a:5,b:6};
const {a:p,b:q} = obj;

// console.log(p);
// console.log(q);

// rest property 

const arr1 = [1,2,3,4,5,6]
const [first, ...all] = arr1;
// console.log(first);
// console.log(all.toString());


function f(){
    return [1,2,3];
}
const [a,b,c,d=0] = f(); // http response -> 
console.log(a);
console.log(b);
console.log(c);
console.log(d);