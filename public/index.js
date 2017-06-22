			var socket = io();
			socket.on('connect', function() {
				console.log("Connected to server");
				socket.emit('createMessage', {
					from: 'ElanGO',
					text: 'Hello from client'
				})
			})

			socket.on('disconnect', function() {
				console.log("Disconnected from server");
			})

			socket.on('newMessage', function(obj) {
				console.log("Got a message:",JSON.stringify(obj));
			})