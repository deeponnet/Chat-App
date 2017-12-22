	var socket = io();

	socket.on('connect', function() {
		//console.log('new server connected');
	});
	
	jQuery('#adddetails').on('submit', function(e) {
		e.preventDefault();
		console.log(jQuery('[name=room]').val());
		socket.emit('addroom', {
		"type" : jQuery('[id=type]').val(),
		"room" : jQuery('[name=room]').val(),
		"floor" : jQuery('[name=floor]').val(),
		"block" : jQuery('[name=block]').val(),
		"des" : jQuery('[name=des]').val(),
	});
	});

	socket.on('addRoomResponse', function(txt){
		console.log(txt);
		document.getElementById("responseMessage").innerHTML = txt;
	});