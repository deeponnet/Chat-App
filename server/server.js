const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

socket.emit('newEmail', {
	from: 'abc@gmail.com',
	text: 'hiii There..'
});

socket.on('createMessage', (message, callback) => {
	console.log('New message: ', message);
	callback();
});
});

server.listen(port, () => {
	console.log(`server is up on ${port}`);
});