this.Gauntra.Pages.StartPage = (function(emitter) {

	if (!emitter)
		throw new Error('Emitter cannot be null for StartPage');

	var startPage = {
	
		elements: {},
		emitter: emitter,
	
		multiPlayer: function() {
			emitter.trigger('transition-to-rooms');
		},
	
		singlePlayer: function() {
			emitter.trigger('transition-to-game');
		}
	};
	
	startPage.elements.multiPlayerButton = $('#multiPlayer');
	startPage.elements.multiPlayerButton.click(startPage.multiPlayer);
	startPage.elements.singlePlayerButton = $('#singlePlayer');
	startPage.elements.singlePlayerButton.click(startPage.singlePlayer);
		
	return startPage;
});
