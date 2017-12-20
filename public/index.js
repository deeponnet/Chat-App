var socket = io();

	socket.on('connect', function() {
		console.log('new server connected');
	});

	

	jQuery('#message-form').on('submit', function(e) {
		e.preventDefault();

		socket.emit('createMessage', {
		from: 'user',
		text: jQuery('[name=message]').val()
	}, function() {
		console.log('got it');
	});
	});
