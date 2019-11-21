
// Use const instead of var to spot reassignments
const log = require('./logger');

console.log(log); // obejct with exported var/funcs in it


log('my message');