function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {

		socket.on('register', (data) => {
			const message = 'Welcome ' + data.username + ' !!';
			//console.log("data.username : register ", data.username);
			socket.emit('welcomeMessage', message);

			data.channels.forEach((element, index) => {
				socket.join(data.channels[index]);
				socket.emit('addedToChannel', {'channel': data.channels[index]});
			    // console.log(`Current index: ${data.channels[index]}`);
			    // console.log(element);
			});

			socket.on('message', (data) => {
				socket.to(data.channel).emit('newMessage', data);
			});

			socket.on('joinChannel', (data) => {
				socket.emit('addedToChannel', {'channel': data.channel});
			})
			socket.on('leaveChannel', (data) => {
				//console.log("data.channel :leaveChannel: ", data.channel);
				socket.leave(data.channel);
				socket.emit('removedFromChannel', {'channel' : data.channel});
			});

		});
	});
}

module.exports = bootstrapSocketServer;
