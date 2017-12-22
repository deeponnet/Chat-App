var socket = io();

	socket.on('connect', function() {
		//console.log('new server connected');
	});
//////////////////////////////////////////////Dropdown option fetching//////////////////////////////////////////////////////////
	function initDropdownList( id, arr ) {
	    var select, i, option;
	    select = document.getElementById( id );
	    for ( i = 0; i < arr.length; i ++) {
	        option = document.createElement( 'option' );
	        option.value = arr[i];
	        option.text = arr[i];
	        //console.log(option);
	        select.appendChild(option);
	    };
	};

	socket.on('allLectures', function(lectureArray) {
		//console.log(lectureArray);
		initDropdownList('lecture', lectureArray);
	});

	socket.on('allTutorials', function(tutorialArray) {
		//console.log(tutorialArray);
		initDropdownList('tutorial', tutorialArray);
	});

	socket.on('allLabs', function(labArray) {
		//console.log(labArray);
		initDropdownList('lab', labArray);
	});

	socket.on('allCabins', function(cabinArray) {
		//console.log(cabinArray);
		initDropdownList('cabin', cabinArray);
	});

	socket.on('allClass', function(classArray) {
		//console.log(classArray);
		initDropdownList('class', classArray);
	});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////queries requesting///////////////////////////////////////////////////////////////////
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

	function lab() {
	    var lab = document.getElementById("lab").value;
	    socket.emit('labRequest', {
			"room" : lab
		});
	};

	function classf() {
	    var classs = document.getElementById("class").value;
	    socket.emit('classRequest', {
			"room" : classs
		});
	};

	function cabin() {
	    var cab = document.getElementById("cabin").value;
	    socket.emit('cabinRequest', {
			"room" : cab
		});
	};

	socket.on('gotRoomDetails', function(message) {
			console.log('New message: ', message);
			var room = message[0].room;
			var block = message[0].block;
			var floor = message[0].floor;
			var des = message[0].des;
			document.getElementById("room").innerHTML = "Room : "
			document.getElementById("floor").innerHTML = "Floor : "
			document.getElementById("block").innerHTML = "Block : "
			document.getElementById("des").innerHTML = "Description : "
			var str = "<span style='color:hsl(171, 100%, 41%);'>"+room+"</span>"
			jQuery('#room').append(str);
			
			var str = "<span style='color:hsl(171, 100%, 41%);'>"+floor+"</span>"
			jQuery('#floor').append(str);

			var str = "<span style='color:hsl(171, 100%, 41%);'>"+block+"</span>"
			jQuery('#block').append(str);

			var str = "<span style='color:hsl(171, 100%, 41%);'>"+des+"</span>"
			jQuery('#des').append(str);
		});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////adding room request//////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	


