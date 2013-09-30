SocketDraw = {
    init: function() {
        this.canvas = document.getElementById('canvas-advanced');
        this.context = this.canvas.getContext('2d');
        var enableTouch = document.getElementById('clear') != undefined;
        this.touches = [];

        if (enableTouch) {
            this.attachTouchEvents();

            if (window.navigator.msPointerEnabled) {
                this.attachPointerEvents();
            }
            else {
                this.attachMouseEvents();
            }
        }

        this.connect();
        this.draw();
        this.attachClearButton();
    },

    draw: function () {
        this.clearCanvas();
        var i;
        for (i = 0; i < this.touches.length; i++) {
            this.drawSegment(this.touches[i]);
        }
    },

    drawSegment: function(segment) {
        var i = 0;
        var firstTouch = true;
        for (i = 0; i < segment.length; i++) {
            var touch = segment[i];

            if (firstTouch) {
                firstTouch = false;
                this.context.beginPath();
                this.context.moveTo(touch.x, touch.y);
                continue;
            }

            this.context.lineTo(touch.x, touch.y);

        }

        this.context.strokeStyle = '#000';
        this.context.stroke();
    },

    clearCanvas: function () {
        console.log('clearing the canvas');
        this.context.fillStyle = '#FFF';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    addTouch: function (position) {
        if (!position)
            return;

        var touchArray = this.touches[this.touches.length - 1];
        touchArray.push(position);
        this.draw();
    },

    start: function (evt) {
        evt.preventDefault();
        this.touches.push([]);

        var position = this.getPositionFromTarget(evt);
        this.addTouch(position);
    },

    change: function(evt) {
        var position = this.getPositionFromTarget(evt);
        this.addTouch(position);
    },

    end: function(evt) {
        var position = this.getPositionFromTarget(evt);
        this.addTouch(position);
        this.sendLine();
    },

    attachTouchEvents: function () {
        var self = this;
        this.canvas.addEventListener('touchstart', function (evt) {
            self.currentTouchId = evt.touches[0].identifier;

            self.start.call(self, evt);
        });

        this.canvas.addEventListener('touchmove', function (evt) {
            var i, position;
            for (i = 0; i < evt.changedTouches.length; i++) {
                if (evt.changedTouches[i].identifier !== self.currentTouchId)
                    continue;
                self.change.call(self, evt);
            }
        });

        this.canvas.addEventListener('touchend', function (evt) {
            self.end.call(self, evt);
        });
    },
    
    attachPointerEvents: function () {
        var self = this;

        this.canvas.addEventListener('MSPointerDown', function (evt) {
            if (self.currentTouchId)
                return;

            self.currentTouchId = evt.pointerId;

            self.start.call(self, evt);
        });

        this.canvas.addEventListener('MSPointerMove', function (evt) {
            if (evt.pointerId !== self.currentTouchId)
                return;

            self.change.call(self, evt);
        });

        this.canvas.addEventListener('MSPointerUp', function (evt) {
            self.currentTouchId = undefined;
            self.end.call(self, evt);
        });
    },

    attachMouseEvents: function (canvas) {
        var self = this;

        this.canvas.addEventListener('mousedown', function (evt) {
            self.isWriting = true;
            self.start.call(self, evt);
        });

        this.canvas.addEventListener('mousemove', function (evt) {
            if (self.isWriting) {
                self.change.call(self, evt);
            }
        });

        this.canvas.addEventListener('mouseup', function (evt) {
            self.isWriting = false;
            self.end.call(self, evt);
        });
    },

    getPositionFromTarget: function (evt) {
        if (evt.touches) {
            if (evt.touches.length === 0)
                return;
            return {
                y: evt.touches[0].pageY - evt.target.offsetTop,
                x: evt.touches[0].pageX - evt.target.offsetLeft
            };
        }
        else {
            return {
                y: evt.pageY - evt.target.offsetTop,
                x: evt.pageX - evt.target.offsetLeft
            };
        }
        

    },

    connect: function () {
        var connection = this.connection = $.connection('/signalr/socketdraw');
        var self = this;

        connection.received(function (response) {
            if (response === 'clear') {
                self.touches = [];
                self.clearCanvas();
            }
            else if (response.push) {
                for (var i = 0; i < response.length; i++) {
                    self.touches.push(JSON.parse(response[i]));
                }
            }
            else {
                self.touches.push(JSON.parse(response));
            }
            SocketDraw.draw();
        });

        connection.start();
    },

    sendLine: function () {
        this.connection.send(JSON.stringify(this.touches[this.touches.length - 1]));
    },

    attachClearButton: function () {
        var clearButton = document.getElementById('clear');
        if (clearButton) {
            var self = this;
            clearButton.addEventListener('click', function () {
                self.clear.call(self);
            });
        }

    },

    clear: function () {
        this.connection.send('clear');
    }
};


if (window.addEventListener) {
    window.addEventListener('load', function () {
        SocketDraw.init();
    });
}






