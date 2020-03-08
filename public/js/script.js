//function to display alert messages
function showAlertMessage(messageDiv) {

	let alertMessage = document.getElementById('alertContainer');
	alertMessage.insertAdjacentHTML( 'afterbegin', messageDiv );
}

function sendMessage(event, socket) {
	const channel = document.getElementById('channel').value;
	const message = document.getElementById('message').value;
	const username = document.getElementById('username').value;

	let chatWindow = document.getElementById('chatContainer');

	let cardDiv =
	`<div class="col-12">
		<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">Me : ${message}</p>
			</div>
		</div>
	</div>`;
	chatWindow.insertAdjacentHTML( 'afterbegin', cardDiv );

	socket.emit('message', {
		'message': message,
		'channel': channel,
		'username': username
	});
}

function joinChannel(event, socket) {
	const channelToJoin = document.getElementById('newchannel').value;
	socket.emit('joinChannel', {'channel' : channelToJoin});
}

function leaveChannel(event, socket) {
	const channelToLeave = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', {'channel' : channelToLeave});
}

function onWelcomeMessageReceived(welcomeMsg) {
	let chatWindow = document.getElementById('chatContainer');

	let welcomeMessge =
	`<div class="col-12">
		<div class="card received-message">
			<div class="card-body">
				<p class="card-text">System : ${welcomeMsg}</p>
			</div>
		</div>
	</div>`;
	//chatWindow.innerHTML = welcomeMessge;
	chatWindow.insertAdjacentHTML( 'afterbegin', welcomeMessge );
}

function onNewMessageReceived(messageData) {
	let chatWindow = document.getElementById('chatContainer');
	const receivedMessage =
	`<div class="col-12">
		<div class="card received-message">
			<div class="card-body">
				<p class="card-text">${messageData.username} : ${messageData.message}</p>
			</div>
		</div>
	</div>`;
	chatWindow.insertAdjacentHTML( 'afterbegin', receivedMessage );
	//chatWindow.innerHTML = receivedMessage;
}

function onAddedToNewChannelReceived(channelObj) {

	if (channelObj.channel !== ''){
			let datalist = document.getElementById('channelsList');
			let option = document.createElement('option');
			const idStr = 'opt-' + channelObj.channel.replace(/\s/g, '-');
			option.setAttribute('id', idStr);
			option.setAttribute('value', channelObj.channel);
			datalist.appendChild(option);
			let messageDiv = `<div class="alert alert-success alert-dismissible fade show" role="alert">
				You are added to <strong>${channelObj.channel}</strong> successfully!
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>`;

			showAlertMessage(messageDiv);
	}
}

function onRemovedFromChannelReceived(channelObj) {
	//replace used in case there is space in channel
	console.log(" onRemovedFromChannelReceived : channelObj.channel : ", channelObj.channel);
	if(channelObj.channel.trim() !== ''){
		const idStr = '#opt-' + channelObj.channel.replace(/\s/g, '-');
		document.querySelector(idStr).remove();
	}
	let messageDiv = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
		You are removed from <strong>${channelObj.channel}</strong> successfully!
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>`;
	showAlertMessage(messageDiv);
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
