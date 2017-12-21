var socket = io();

	socket.on('connect', function() {
		console.log('new server connected');
	});

	/*jQuery('#message-form').on('submit', function(e) {
		e.preventDefault();
		console.log(jQuery('[name=room]').val());
		socket.emit('createMessage', {
		"room" : jQuery('[name=room]').val(),
		"floor" : jQuery('[name=floor]').val(),
		"block" : jQuery('[name=block]').val(),
		"des" : jQuery('[name=des]').val(),
	}, function() {
		console.log('got it');
	});
	});*/

	jQuery('#request-form').on('submit', function(e) {
		e.preventDefault();
		console.log(jQuery('[name=room]').val());
		socket.emit('createRequest', {
		"room" : jQuery('[name=room]').val()
	}, function() {
		console.log('got it');
	});
	});

	socket.on('gotRoomDetails', function(message) {
			console.log('New message: ', message);
			var room = message[0].room;
			var block = message[0].block;
			var floor = message[0].floor;
			console.log(room);
			jQuery('#room').append(room);
			jQuery('#block').append(block);
			jQuery('#floor').append(floor);
			});


