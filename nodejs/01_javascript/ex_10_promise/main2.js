function getWheather(){
    return new Promise((resolve, reject) =>{
        // complete a task and give the response
        if(false)
            resolve("cloudy");
        else
            reject("No weather in formation");
    })
}
function getAttireInfo(weather){
    return new Promise((resolve,reject) => {
        if(weather === 'cloudy')
            resolve("raincoat");
        else
            reject("not configured")
    })
}
//getWheather().then(onSuccess, onError);
getWheather().then(getAttireInfo, error => console.log(error))
            .then(data => console.log("clothing is " + data))


getWheather().then(getAttireInfo)
            .then(data => console.log("clothing is " + data))
            .catch(error => console.log(error))