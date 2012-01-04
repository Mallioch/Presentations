(function(exports) {

    var ie = {
        register: function(pageChangeCallback) {

            this.currentPage = '';
            var self = this;

            setInterval(function() {
                var num = Math.floor(Math.random()*1100000)

                $.ajax({
                    url: '/getpage?foo=' + num,
                    success: function(data) {

                       //console.log('current page', self.currentPage);
                       if (self.currentPage != data.message) {
                           self.currentPage = data.message;
                           pageChangeCallback(data.message);
                       }
                    }
                });
            },
            2000);
        },

        sendMessage: function() {
            alert('cannot send a message with websocketless-based browsers.');
        },

        next: function() {
            alert('cannot navigate with websocketless-based browsers.');
        },

        previous: function() {
            alert('cannot navigate with websocketless-based browsers.');
        }
    };

    var notSuck = {

        register: function(pageChangeCallback) {
            this.socket = io.connect('');
            this.socket.on('message', function(data) {
                console.log('message received', data);
            });

            this.socket.on('pageChange', function(data) {
                console.log('pageChange', data);
                pageChangeCallback(data.message);
//                $('#pages div').hide();
//                $('#page' + data.message).show();
            });
        },

        sendMessage: function(data) {
            this.socket.emit('sendMessage', data);
        },

        next: function() {
            this.socket.emit('next');
        },

        previous: function() {
            this.socket.emit('previous');
        }
    };

    exports.IECommunicator = ie;
    exports.SocketCommunicator = notSuck;

})(this);
