var socket = io();

	socket.on('connect', function() {
		console.log('new server connected');
	});

	jQuery('#message-form').on('submit', function(e) {
		e.preventDefault();

		socket.emit('createMessage', {
		"room" : jQuery('[name=room]').val(),
		"floor" : jQuery('[name=floor]').val(),
		"block" : jQuery('[name=block]').val(),
		"des" : jQuery('[name=des]').val(),
	}, function() {
		console.log('got it');
	});
	});
