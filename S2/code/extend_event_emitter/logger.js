// EventEmitter is a class
const EventEmitter = require('events'); // load Emitter class
// Not needed after using class Logger based on EventEmitter
//const emitter = new EventEmitter(); // Create an actual object instance



// url and log() are module scoped
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send HTTP request
        console.log(message);

        // Raise an event:
        // this triggers the registered event messageLogged
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }
}


// if only one just pass the function
module.exports = Logger;
