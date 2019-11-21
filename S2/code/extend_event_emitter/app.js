const http // EventEmitter is a class
const EventEmitter = require('events'); // load Emitter class
// Not needed after using class Logger based on EventEmitter
//const emitter = new EventEmitter(); // Create an actual object instance

// 
const Logger = require('./logger');
// 
const logger = new Logger();


// Register a listener
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});


logger.log('message');