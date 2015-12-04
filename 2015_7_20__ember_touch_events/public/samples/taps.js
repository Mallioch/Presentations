if (!window.CustomTouch)
    window.CustomTouch = {};

window.CustomTouch.Tap = (function() {
    function tap(element) {

        this.element = element;
        var self = this;

        //These events for firefox and webkit-based browsers
        element.addEventListener('touchstart', function (evt) { self.start.call(self, evt); });
        element.addEventListener('touchend', function (evt) { self.end.call(self, evt); });

        //If we want to support pointer events, we need to make sure mouse events are disabled.
        if (window.navigator.msPointerEnabled) {
          element.addEventListener('MSPointerDown', function (evt) { self.start.call(self, evt); });
          element.addEventListener('MSPointerUp', function (evt) { self.end.call(self, evt); });
        }
        else {
          //These events for all browsers that support mouse events
          element.addEventListener('mousedown', function (evt) { self.start.call(self, evt); });
          element.addEventListener('mouseup', function (evt) { self.end.call(self, evt); });
        }

        this.tapEvent = new CustomEvent('tap');
    };

    tap.prototype.start = function(evt) {
        evt.preventDefault();
        this.initialLocation = this.getPosition(evt)
        this.inProgress = true;
        this.startTime = new Date();
    }

    tap.prototype.end = function(evt) {
        var timeDelta = new Date() - this.startTime;
        if (timeDelta > 300)
          return;

        if (!this.inProgress)
          return;

        var currentLocation = this.getPosition(evt, this.element);
        var xDelta = Math.abs(currentLocation.x - this.initialLocation.x);
        var yDelta = Math.abs(currentLocation.y - this.initialLocation.y);
        if (xDelta > 10 || yDelta > 10)
          return;

        this.element.dispatchEvent(this.tapEvent, evt);
    }

    tap.prototype.getPosition = function(evt) {

        var pageX, pageY;
        if (evt.touches) { //If this is a touch event
          pageX = evt.changedTouches[0].pageX;
          pageY = evt.changedTouches[0].pageY;
        }
        else { //If this is a mouse or pointer event
          pageX = evt.pageX;
          pageY = evt.pageY;
        }

        return {
          y: pageY,
          x: pageX
        };
    }

    return tap;

})();


