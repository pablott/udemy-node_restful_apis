// EventEmitter is a class
const EventEmitter = require('events'); // load Emitter class
const emitter = new EventEmitter(); // Create an actual object instance


// Register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

// Raise an event:
// this triggers the registered event 
// messageLogged above
emitter.emit('messageLogged',{id: 1, url: 'http://'});


