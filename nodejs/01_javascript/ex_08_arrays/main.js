// arrays 
// indexed 
const arr = [];
arr[0]=1;
arr[1]=2;
arr[2]=3;

console.log(arr[0]);

// named array
const arr2 = [];
arr2['name'] = 'vijay';
arr2['age'] = 1;
arr2['Location'] = 'bangalore';

console.log(arr2['name']);
console.log(arr2.name);

// objects
const arr1 = [];
arr1.push({name:'vijay', age:1, location:'bangalore'});
arr1.push({name:'jai', age:1, location:'bangalore'});
arr1.push({name:'xyz', age:1, location:'bangalore'});

console.log(arr1[2]['name']);
console.log(arr1[2].name);

// console.log(arr.length);
// console.log(arr1.length);
// console.log(arr2.length);