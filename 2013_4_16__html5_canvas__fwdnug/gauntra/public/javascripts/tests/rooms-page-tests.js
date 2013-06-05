module('Room Page Tests', {
		setup: function() {
		
			$('#qunit-fixture').html(
				'<div id="rooms" style="display: none;">' +
					'<button id="newRoom">new room</button>' +
					'<div id="roomsMessaging"></div>' +
				'</div>'
			);

		
			var fakeEmitter = {
				trigger: function(eventName) {
					this.eventCalled = eventName;
				}
			};
			
			var fakeSocket = {
				emit: function(message, args) {
					this.eventEmitted = message;
				},
				on: function() { }
			};

			this.ctrl = window.Gauntra.Pages.RoomsPage(fakeEmitter, fakeSocket);
		}
	});
	
//================================================================================
test('on navigating to the room, it initializes the new page.', function () {
	this.ctrl.show();
    
    equal(this.ctrl.socket.eventEmitted, 'room-list');
	equal($('#rooms').css('display'), 'block');
});

//================================================================================
test('on successful new room event, sends new room request to socket.', function () {
	this.ctrl.newRoom();
    
    equal(this.ctrl.socket.eventEmitted, 'new-room');
	equal($('#roomsMessaging').html(), 'Room being created.');
	equal($('#newRoom').css('display'), 'none');
});



