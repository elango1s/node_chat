const express = require('express');
const path  = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 5000;
const socketIO = require('socket.io');

var app = express();

app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log("Connected to client");

	socket.on('disconnect', () => {
		console.log("Client disconnected");
	})

	socket.emit('newMessage', {
		from: 'Elango',
		text: 'Hello from server',
		createdAt: '123456'
	})

	socket.on('createMessage', (recdObj) => {
		console.log("Message received: ",JSON.stringify(recdObj));
	})
})

server.listen(port, () => {
	console.log(`Server listening on ${port} on ${publicPath}`);
})