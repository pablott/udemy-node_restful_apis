// url and log() are module scoped
var url = 'http://mylogger.io/log';

// from wrapper
console.log(__filename);
console.log(__dirname);


function log(message) {
    // Send HTTP request
    console.log(message);
}

// exporting several var/funcs
//module.exports.log = log;
// we can export changing the var name
//module.exports.endpoint = url;

// if only one just pass the function
module.exports = log;
