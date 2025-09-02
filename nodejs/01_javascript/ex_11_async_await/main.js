// async and await -> await should be used in a async method
// alternative way of using  promises in node js 

async function myFunction(){
    return "hello myFunction";
}
// async -> libuv
function myAsyncFunction(){
    return Promise.resolve("hello");
}

//console.log(myFunction());
//myFunction().then(data => console.log(data));
//myAsyncFunction().then(data => console.log(data));

// async method it awaited 
function myFunction1(){
    return new Promise((resolve, reject) => {
        return resolve("hello")
    });
}

async function myFun(){
    const method = await myFunction().then(data => console.log(data))
    await myFunction1()
    console.log("print this after execution of async methods ")
}

myFun();