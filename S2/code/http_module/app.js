const http = require('http');

// Servr are event emitters
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

// Server class already works as an event emitters
// so we can attach an event listener to it
// This is not used for creating a server
server.on('connection', (socket) => {
    console.log('New Connection.');
});
server.listen(3000);

console.log('Listening on 127.0.0.1:3000...');