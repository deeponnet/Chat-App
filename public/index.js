var socket = io();

	socket.on('connect', function() {
		console.log('new server connected');
	});

	function lecture() {
	    var lec = document.getElementById("lecture").value;
	    socket.emit('lectureRequest', {
			"room" : lec
		});
	};

	function tutorial() {
	    var tut = document.getElementById("tutorial").value;
	    socket.emit('tutorialRequest', {
			"room" : tut
		});
	};

	socket.on('gotRoomDetails', function(message) {
			console.log('New message: ', message);
			var room = message[0].room;
			var block = message[0].block;
			var floor = message[0].floor;
			var des = message[0].des;
			console.log(room);
			document.getElementById("room").innerHTML = "Room : "
			document.getElementById("floor").innerHTML = "Floor : "
			document.getElementById("block").innerHTML = "Block : "
			document.getElementById("des").innerHTML = "Description : "
			jQuery('#room').append(room);
			jQuery('#block').append(block);
			jQuery('#floor').append(floor);
			jQuery('#des').append(des);
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


	


