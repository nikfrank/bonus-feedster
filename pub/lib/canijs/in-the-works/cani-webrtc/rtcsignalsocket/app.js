var app = require('express')()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

require('./config/express')(app);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/app/index.html');
});

var tracks = [];

// handlers for connections

io.sockets.on('connection', function (socket) {
    socket.emit('serverConnect');

    var rooms = {};
    var offers = {};
    var answers = {};

    socket.on('icecandidate', function(data){

// socket offer then answer, then 
// store ice candidate of host


	// if this is the first one with this room-id
	if(data.room in rooms) return;
	rooms[data.room] = data.candidate;

	socket.broadcast.emit('icecandidate', rooms[data.room]);
    });

    socket.on('offer', function(data){
	// if this is the first one with this room-id
	if(''+data.room.id+'||'+data.fbid in offers) return;
	offers[''+data.room.id+'||'+data.fbid] = data;

// only to the host room
	io.sockets.socket(rooms[data.room.id].host)
	    .emit('offer', offers[''+data.room+'||'+data.fbid]);
    });

    socket.on('answer', function(data){

	// if this is the first one with this room-id
	if(data.room in answers) return;
	answers[data.room] = data.answer;

	socket.broadcast.emit('answer', answers[data.room]);
    });


    socket.on('listrooms', function(data){

//check data.auth

	return io.sockets.socket(socket.id).emit({rooms:rooms});
    });

    socket.on('makeroom', function(data){
	
//check data.auth
// use fbid as room -> therefore each person can have only one room at once
// he can close his room as he pleases though to start a new one

	if(data.room.id in rooms)
	    return io.sockets.socket(socket.id).emit('err', {err:'duplicate-room'});

	rooms[data.room.id] = {room:data.room, host:socket.id};

	socket.join(data.room.id);

	return io.sockets.socket(socket.id).emit({room_created:data.room});
    });



});

app.get('*', function(req, res){
    res.sendfile(__dirname+'/app'+req.url);
});

server.listen(app.get('port'));
