// Using Promise.all
const promise1 = Promise.resolve('Promise 1');
const promise2 = Promise.reject('Promise 2');
const promise3 = Promise.resolve('Promise 3');

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // ["Promise 1", "Promise 2", "Promise 3"]
  })
  .catch((error) => {
    console.error(error);
  });
