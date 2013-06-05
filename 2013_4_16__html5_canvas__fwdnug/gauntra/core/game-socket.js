var io = require('socket.io').listen(3001, { log: false });

var comm = {
	io: io,
	start: function(emitter) {
	
		comm.emitter = emitter;

		io.sockets.on('connection', function (socket) {

		    console.log('connection made');

		  socket.emit('news', { hello: 'world' });
		  socket.on('new-room', function (data) {
			emitter.trigger('new-room', socket);
		  });
		  
		  socket.on('room-list-request', function() {
			emitter.trigger('room-list-request', socket);
		  });
		});
		
		emitter.on('room-created', function(args) {
			console.log('room-created fired', args);
			args.socket.emit('room-created', { roomId: args.room.id });
		});
	
		emitter.on('rooms-update', function(args) {
			args.socket.broadcast.emit('room-list', args.rooms);
			args.socket.emit('room-list', args.rooms);
		});
		
		emitter.on('room-list', function(args) {
			console.log('room-list in game-socket');
			args.socket.emit('room-list', args.rooms);
		});
	}
};

module.exports = comm;