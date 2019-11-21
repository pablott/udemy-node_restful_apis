// Debuggers
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

// Middleware load
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');

// Routers
const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require('express');
const app = express(); // express instance

// Template engine
app.set('view engine', 'pug'); // load pug template engine
app.set('views', './views'); // optionally set views folder

// Built-in middleware
app.use(express.json()); // JSON -> req.body
app.use(express.urlencoded({ extended: false })); // key=value&key=value -> req.body
app.use(express.static('public'));
// Third party middleware
app.use(helmet());
// Use router for every /api/courses, /
app.use('/api/courses', courses);
app.use('/', home);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`${app.get('env')}`); 

if (app.get('env') === 'development') {
    // Express external middleware
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}
// Custom middleware
app.use(logger);

// DB work
dbDebugger('Connected to the database...');

// Configuration
console.log(config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`))