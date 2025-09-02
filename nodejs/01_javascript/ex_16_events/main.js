// EventEmitter is a class
const EventEmitter = require('events');

// Create a custom event emitter
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register an event listener
myEmitter.once('myEvent', () => {
  console.log('Custom event emitted');
});

// Emit the custom event
setTimeout(()=>{
    myEmitter.emit('myEvent');
    myEmitter.emit('myEvent');
}, 2000)
