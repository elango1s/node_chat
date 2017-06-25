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

	socket.on('fromClient', (recdObj) => {
		console.log("Message received: ",JSON.stringify(recdObj));
		//socket.emit will emit to the only one client that is connected
		//where as io.emit will emit to all clients that are connected
		io.emit('toClient', {
		from: recdObj.from,
		text: recdObj.text,
		recdAt: new Date().toUTCString()
		})
	})

	socket.on('clientLoc', (recdObj) => {
		console.log("Message received: ",JSON.stringify(recdObj));
		//socket.emit will emit to the only one client that is connected
		//where as io.emit will emit to all clients that are connected
		io.emit('userLoc', {
			lat: recdObj.lat,
			lng: recdObj.lng
		})
	})
})

server.listen(port, () => {
	console.log(`Server listening on ${port} on ${publicPath}`);
})