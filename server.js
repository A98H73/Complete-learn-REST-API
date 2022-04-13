const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(3022, console.log('Server to running hai'));
