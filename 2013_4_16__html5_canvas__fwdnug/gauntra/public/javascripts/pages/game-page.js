this.Gauntra.Pages.GamePage = (function(emitter, socket) {

	if (!emitter)
		throw new Error('emitter was null for RoomsPage.');
	
	if (!socket)
		throw new Error('socket was null for RoomsPage.');

	var page = {
	
		elements: {},
		socket: socket,
	
		show: function() {
			page.elements.root.show();
		}
	};

	page.elements.root = $('#adventure');

	
	return page;
});