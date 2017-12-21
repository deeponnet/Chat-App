var socket = io();

	socket.on('connect', function() {
		console.log('new server connected');
	});

	jQuery('#message-form').on('submit', function(e) {
		e.preventDefault();

		socket.emit('createMessage', {
		"lecture" : jQuery('[name=room]').val(),
		"floor" : jQuery('[name=floor]').val(),
		"block" : jQuery('[name=block]').val(),
		"des" : ""
	}, function() {
		console.log('got it');
	});
	});
