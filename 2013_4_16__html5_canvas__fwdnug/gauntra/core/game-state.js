var randomString = require('./random');

var rooms = {};

var gameState = {

	init: function(emitter) {
		gameState.emitter = emitter;

		emitter.on('new-room', gameState.newRoom);
		emitter.on('room-list-request', gameState.roomList);
	},
	
	newRoom: function(socket) {
		var roomId = randomString(128);
		
		console.log('a new room has been requested', roomId);
		rooms[roomId] = room = {
			id: roomId
		};
		
		gameState.emitter.trigger('room-created', { socket: socket, room: room });
		gameState.emitter.trigger('rooms-update', { socket: socket, rooms: rooms });
	},
	
	roomList: function(socket) {
		gameState.emitter.trigger('room-list', { socket: socket, rooms: rooms });
	}
};

module.exports = gameState;