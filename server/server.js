const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

MongoClient.connect('mongodb://admin:admin@ds161856.mlab.com:61856/class', (err, db) => {
	if(err) {
		console.log(err);
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to mongodb server');

	io.on('connection', (socket) => {
		console.log('new user connected');

///////////Fetching of select optionss//////////////////////////////////////////////////////////////////////////////////////////////
		db.collection("lectureroom").find().toArray(function(err, result) {
		    if (err) throw err;
		    var i = 0;
		    var lectureArray = new Array();
		    for(i = 0; i< result.length ; i++){
		    	lectureArray.push(result[i].room);
		    }
		   	lectureArray.sort();
		    socket.emit('allLectures', lectureArray);
		});

		db.collection("tutorialroom").find().toArray(function(err, result) {
		    if (err) throw err;
		    var i = 0;
		    var tutorialArray = new Array();
		    for(i = 0; i< result.length ; i++){
		    	tutorialArray.push(result[i].room);
		    }
		    tutorialArray.sort();
		    socket.emit('allTutorials', tutorialArray);
		});

		db.collection("lab").find().toArray(function(err, result) {
		    if (err) throw err;
		    var i = 0;
		    var labArray = new Array();
		    for(i = 0; i< result.length ; i++){
		    	labArray.push(result[i].room);
		    }
		    labArray.sort();
		    socket.emit('allLabs', labArray);
		});

		db.collection("cabin").find().toArray(function(err, result) {
		    if (err) throw err;
		    var i = 0;
		    var cabinArray = new Array();
		    for(i = 0; i< result.length ; i++){
		    	cabinArray.push(result[i].room);
		    }
		    cabinArray.sort();
		    socket.emit('allCabins', cabinArray);
		});

		db.collection("classroom").find().toArray(function(err, result) {
		    if (err) throw err;
		    var i = 0;
		    var classArray = new Array();
		    for(i = 0; i< result.length ; i++){
		    	classArray.push(result[i].room);
		    }
		    classArray.sort();
		    socket.emit('allClass', classArray);
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////aading room to databse//////////////////////////////////////////////////////////////////////////////////////////////
		socket.on('addroom', (message) => {
			console.log('New message: ', message);
			if(message.type=='tutorial'){
				db.collection("tutorialroom").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    if(result.length != 0){
			    	//console.log('already present');
			    	socket.emit('addRoomResponse', 'Room You Are Adding Is Already Present On Database.!!');
			    }
			    else{
					db.collection('tutorialroom').insertOne(
					{
						"room" : message.room,
				        "floor" : message.floor,
				        "block" : message.block,
				        "des" : message.des
						}, (err, result) => {
							if(err) {
								return console.log('unable to insert Room', err);
							}
							socket.emit('addRoomResponse', 'Successfully Added Room');
							//console.log(JSON.stringify(result.ops, undefined, 2));
						});
					}	
				});
			}

			if(message.type=='lecture'){
				db.collection("lectureroom").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    if(result.length != 0){
			    	//console.log('already present');
			    	socket.emit('addRoomResponse', 'Room You Are Adding Is Already Present On Database.!!');
			    }
			    else{
			    	db.collection('lectureroom').insertOne(
				{
					"room" : message.room,
			        "floor" : message.floor,
			        "block" : message.block,
			        "des" : message.des
					}, (err, result) => {
						if(err) {
							return console.log('unable to insert Room', err);
						}
						//console.log(JSON.stringify(result.ops, undefined, 2));
						socket.emit('addRoomResponse', 'Successfully Added Room');
					});
			    }
			})};

			if(message.type=='classroom'){
				db.collection("classroom").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    if(result.length != 0){
			    	//console.log('already present');
			    	socket.emit('addRoomResponse', 'Room You Are Adding Is Already Present On Database.!!');
			    }
			    else{
					db.collection('classroom').insertOne(
					{
						"room" : message.room,
				        "floor" : message.floor,
				        "block" : message.block,
				        "des" : message.des
						}, (err, result) => {
							if(err) {
								return console.log('unable to insert Room', err);
							}
							socket.emit('addRoomResponse', 'Successfully Added Room');
							//console.log(JSON.stringify(result.ops, undefined, 2));
						});
					}	
				});
			}

			if(message.type=='lab'){
				db.collection("lab").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    if(result.length != 0){
			    	//console.log('already present');
			    	socket.emit('addRoomResponse', 'Room You Are Adding Is Already Present On Database.!!');
			    }
			    else{
					db.collection('lab').insertOne(
					{
						"room" : message.room,
				        "floor" : message.floor,
				        "block" : message.block,
				        "des" : message.des
						}, (err, result) => {
							if(err) {
								return console.log('unable to insert Room', err);
							}
							socket.emit('addRoomResponse', 'Successfully Added Room');
							//console.log(JSON.stringify(result.ops, undefined, 2));
						});
					}	
				});
			}

			if(message.type=='cabin'){
				db.collection("cabin").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    if(result.length != 0){
			    	//console.log('already present');
			    	socket.emit('addRoomResponse', 'Room You Are Adding Is Already Present On Database.!!');
			    }
			    else{
					db.collection('cabin').insertOne(
					{
						"room" : message.room,
				        "floor" : message.floor,
				        "block" : message.block,
				        "des" : message.des
						}, (err, result) => {
							if(err) {
								return console.log('unable to insert Room', err);
							}
							socket.emit('addRoomResponse', 'Successfully Added Room');
							//console.log(JSON.stringify(result.ops, undefined, 2));
						});
					}	
				});
			}
			
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////responding to queries/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		socket.on('lectureRequest', (message, callback) => {
			console.log('New message: ', message);
			db.collection("lectureroom").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    socket.emit('gotRoomDetails', result);
				}); 
			});

		socket.on('tutorialRequest', (message, callback) => {
			console.log('New message: ', message);
			db.collection("tutorialroom").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    socket.emit('gotRoomDetails', result);
				}); 
			});

		socket.on('labRequest', (message, callback) => {
			console.log('New message: ', message);
			db.collection("lab").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    socket.emit('gotRoomDetails', result);
				}); 
			});

		socket.on('classRequest', (message, callback) => {
			console.log('New message: ', message);
			db.collection("classroom").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    socket.emit('gotRoomDetails', result);
				}); 
			});

		socket.on('cabinRequest', (message, callback) => {
			console.log('New message: ', message);
			db.collection("cabin").find( {"room" : message.room }).toArray(function(err, result) {
			    if (err) throw err;
			    console.log(result);
			    socket.emit('gotRoomDetails', result);
				}); 
			});





		});	
	});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
server.listen(port, () => {
	console.log(`server is up on ${port}`);
});