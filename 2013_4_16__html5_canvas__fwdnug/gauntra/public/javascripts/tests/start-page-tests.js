module('Start Page Tests', {
		setup: function() {
		
			var fakeEmitter = {
				trigger: function(eventName) {
					this.eventCalled = eventName;
				}
			};

			this.ctrl = window.Gauntra.Pages.StartPage(fakeEmitter);
		}
	});

//================================================================================
test('on start event, raises "transition-to-rooms" event', function () {
    //Act
	this.ctrl.start();
    
    //Assert
    equal('transition-to-rooms', this.ctrl.emitter.eventCalled);
});



