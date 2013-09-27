if (!window.CustomTouch)
  window.CustomTouch = {};

window.CustomTouch.LazySwipe = (function () {
  function swipe(element) {

    this.element = element;
    var self = this;

    //These events for firefox and webkit-based browsers
    element.addEventListener('touchstart', function (evt) { self.start.call(self, evt); });
    element.addEventListener('touchmove', function (evt) { self.move.call(self, evt); });
    element.addEventListener('touchend', function (evt) { self.end.call(self, evt); });

    //If we want to support pointer events, we need to make sure mouse events are disabled.
    if (window.navigator.msPointerEnabled) {
      element.addEventListener('MSPointerDown', function (evt) { self.start.call(self, evt); });
      element.addEventListener('MSPointerMove', function (evt) { self.move.call(self, evt); });
      element.addEventListener('MSPointerUp', function (evt) { self.end.call(self, evt); });
    }
    else {
      //These events for all browsers that support mouse events
      element.addEventListener('mousedown', function (evt) { self.start.call(self, evt); });
      element.addEventListener('mousemove', function (evt) { self.move.call(self, evt); });
      element.addEventListener('mouseup', function (evt) { self.end.call(self, evt); });
    }

    this.swipeLeftEvent = new CustomEvent('swipeleft');
    this.swipeRightEvent = new CustomEvent('swiperight');
  };

  swipe.prototype.start = function (evt) {
    evt.preventDefault();
    //We need to know where we started from later to make decisions on the nature of the event.
    this.initialLocation = this.getPosition(evt)
    this.inProgress = true;
    this.startTime = new Date();
  }

  swipe.prototype.move = function (evt) {
    if (!this.inProgress)
      return false;

    var currentLocation = this.getPosition(evt, this.element);
    var verticalDelta = Math.abs(currentLocation.y - this.initialLocation.y);
    if (verticalDelta > 50) {
      this.inProgress = false;
    }
  }

  swipe.prototype.end = function (evt) {
    var timeDelta = new Date() - this.startTime;
    if (timeDelta > 700)
      return;

    if (!this.inProgress)
      return;

    var currentLocation = this.getPosition(evt, this.element);
    var delta = Math.abs(currentLocation.x - this.initialLocation.x);
    if (delta < 100)
      return;

    //If you end to the right of where you started, you swipe right.
    if (currentLocation.x > this.initialLocation.x) {
      this.element.dispatchEvent(this.swipeRightEvent, evt);
    } //If you end to the left of where you started, you swipe left.
    else if (currentLocation.x < this.initialLocation.x) {
      this.element.dispatchEvent(this.swipeLeftEvent, evt);
    }
  }

  swipe.prototype.getPosition = function(evt) {

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

  return swipe;
})();