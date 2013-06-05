(function(context) {

	var emitter = LucidJS.emitter();
	emitter.on('transition-to-rooms', transitionToRooms);
	emitter.on('transition-to-room', transitionToRoom);
	emitter.on('transition-to-game', transitionToGame);
	
	var socket = io.connect('http://localhost:3001');
	socket.on('news', function (data) {
		console.log(data);
		socket.emit('my other event', { my: 'data' });
	});
	
	function transitionToRooms() {
		hideAllTheThings();
		var page = context.Gauntra.Pages.RoomsPage(emitter, socket);
		page.show();
	}
	
	function transitionToRoom(roomId) {
		hideAllTheThings();
		console.log('transitionToRoom', roomId);
		var page = context.Gauntra.Pages.RoomPage(emitter, socket);
		page.show();
	}
	
	function transitionToGame(data) {
		deactivateParticles();
		hideAllTheThings();
		console.log('transitionToGame');
		var page = context.Gauntra.Pages.GamePage(emitter, socket);
		page.show();
	}
	
	function hideAllTheThings() {
		$('#welcome').hide();
		$('#rooms').hide();
		$('#room').hide();
		$('#adventure').hide();
	}
	
	function deactivateParticles() {
		context.Gauntra.TitleParticles.shutdown();
		$('#particleheader').remove();
		$('#staticheader').show();		
	}

	$(document).ready(function() {

		var ctrl = context.Gauntra.Pages.StartPage(emitter);
		context.Gauntra.GameStateCreator(context);

		context.Gauntra.TitleParticles.init();
		context.Gauntra.TitleParticles.play();
	});


})(this);