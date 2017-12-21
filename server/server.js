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

		/*socket.emit('newEmail', {
			from: 'abc@gmail.com',
			text: 'hiii There..'
		}); */

		socket.on('addroom', (message) => {
			console.log('New message: ', message);
			if(message.type=='tutorial'){
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
						console.log(JSON.stringify(result.ops, undefined, 2));
					});
			}

			if(message.type=='lecture'){
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
						console.log(JSON.stringify(result.ops, undefined, 2));
					});
			}

			if(message.type=='classroom'){
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
						console.log(JSON.stringify(result.ops, undefined, 2));
					});
			}

			if(message.type=='cabin'){
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
						console.log(JSON.stringify(result.ops, undefined, 2));
					});
			}

			if(message.type=='lab'){
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
						console.log(JSON.stringify(result.ops, undefined, 2));
					});
			}
			
		});

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

		});	
	});

server.listen(port, () => {
	console.log(`server is up on ${port}`);
});