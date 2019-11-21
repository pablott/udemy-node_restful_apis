const fs = require('fs');

// Sync
//const files = fs.readdirSync('./');
//console.log(files);

// Async (path, callback(err, files))
fs.readdir('./',function(err, files){
    if (err) console.log('Error', err);
    else console.log('Result', files);
});