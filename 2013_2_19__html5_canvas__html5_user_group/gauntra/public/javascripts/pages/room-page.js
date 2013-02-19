this.Gauntra.Pages.RoomPage = (function(emitter, socket) {

	if (!emitter)
		throw new Error('emitter was null for RoomsPage.');
	
	if (!socket)
		throw new Error('socket was null for RoomsPage.');

	var page = {
	
		elements: {},
		socket: socket,
	
		show: function() {
			page.elements.root.show();
		},
		
		startGame: function() {
			console.log('startGame called');
			emitter.trigger('transition-to-game');
		}
	};

	page.elements.root = $('#room');
	page.elements.startGameButton = $('#startGameButton');
	page.elements.startGameButton.click(page.startGame);
	
	return page;
});