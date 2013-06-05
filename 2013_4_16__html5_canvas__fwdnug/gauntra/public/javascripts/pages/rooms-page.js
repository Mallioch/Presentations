this.Gauntra.Pages.RoomsPage = (function(emitter, socket) {

	if (!emitter)
		throw new Error('emitter was null for RoomsPage.');
	
	if (!socket)
		throw new Error('socket was null for RoomsPage.');

	var page = {
	
		elements: {},
		socket: socket,
	
		show: function() {
			page.elements.root.show();
			socket.emit('room-list-request');
		},
		
		newRoom: function() {
			page.elements.roomsMessaging.html('Room being created.');
			page.elements.newRoomButton.hide();
			socket.emit('new-room', { foo: 'bar' });
		},
	
		roomCreated: function() {
			console.log('roomCreated called', arguments);
		},
		
		roomList: function(args) {
			page.elements.roomList.empty();
			for (var key in args) {
				var html = Mustache.render(page.roomListItemTemplate, args[key])
				page.elements.roomList.append(html);
			}
			
			$('button', page.elements.root).click(page.roomSelected);
		},
		
		roomSelected: function() {
			console.log('room selected');
			var roomId = $(this).data('roomId');
			emitter.trigger('transition-to-room', roomId);
		}
	};

	page.elements.root = $('#rooms');
	page.elements.roomsMessaging = $('#roomsMessaging');
	page.elements.newRoomButton = $('#newRoom');
	page.elements.newRoomButton.click(page.newRoom);
	page.elements.roomList = $('#roomList');
	page.roomListItemTemplate = $('#roomListItemTemplate').html();
	
	socket.on('room-created', page.roomCreated);
	socket.on('room-list', page.roomList);
	
	return page;
});