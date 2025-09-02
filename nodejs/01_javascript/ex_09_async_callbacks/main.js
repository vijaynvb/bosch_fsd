// function need to be async 

// success error
function fun1(){
    setTimeout(() => {
        console.log("hello");
        if(true)
            shareddata("hello world");
        else 
            error();
    }, 2000);
}

function error(){
    console.log("something happend");
}
function shareddata(data){
    console.log(data);
}

//fun1();

// dynamic call backs 

// async method
function doSomethingAsync(callback1) {
    setTimeout(function () {
      console.log("Task completed!");
      callback1();
    }, 1000);
  }
  // call back sync 
  function onComplete(error, data) {
    console.log("All tasks are done!");
  }
  //invoke async method
  doSomethingAsync(onComplete);