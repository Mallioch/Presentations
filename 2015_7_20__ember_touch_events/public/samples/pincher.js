window.Pincher = (function () {

  var pincher = function (element) {
    this.element = element;

    //This is where we will store info about all of the active touches
    this.touchInfo = {
      touchLookup: {},
      touchArray: []
    };

    this.mode = 'none'; //move, resize are other modes
    var self = this;

    this.element.addEventListener('touchstart', function (evt) { self.start.call(self, evt) });
    this.element.addEventListener('touchmove', function (evt) { self.change.call(self, evt) });
    this.element.addEventListener('touchend', function (evt) { self.end.call(self, evt) });

    this.element.addEventListener('MSPointerDown', function (evt) { self.start.call(self, evt) });
    this.element.addEventListener('MSPointerMove', function (evt) { self.change.call(self, evt) });
    this.element.addEventListener('MSPointerUp', function (evt) { self.end.call(self, evt) });
  }

  pincher.prototype.start = function (evt) {
    evt.preventDefault(); //prevent scrolling
    this.registerTouch(evt);
    this.setMode();
  }

  pincher.prototype.change = function (evt) {
    this.updateTouchEvent(evt);

    if (this.mode === 'move') {
      this.move(evt);
    }
    else if (this.mode === 'resize') {
      this.resize(evt);
    }
  }

  pincher.prototype.resize = function (evt) {
    if (!this.startingPointSet) {
      this.beginTransform(); //set our beginning state so we can begin
    }
    else {
      this.continueTransform(); //apply next change
    }
  }

  pincher.prototype.beginTransform = function () {

    //setup initial values for resize
    var firstLength = Math.abs(this.touchInfo.touchArray[0].pageX - this.touchInfo.touchArray[1].pageX);
    var secondLength = Math.abs(this.touchInfo.touchArray[0].pageY - this.touchInfo.touchArray[1].pageY);

    this.originalDistanceBetweenTouchPoints = Math.sqrt((firstLength * firstLength) + (secondLength * secondLength));

    //setup initial values for rotation
    this.startPoint0 = { x: this.touchInfo.touchArray[0].pageX, y: this.touchInfo.touchArray[0].pageY };
    this.startPoint1 = { x: this.touchInfo.touchArray[1].pageX, y: this.touchInfo.touchArray[1].pageY };

    var xDelta = this.startPoint1.x - this.startPoint0.x;
    var yDelta = this.startPoint1.y - this.startPoint0.y;

    this.initialAngle = Math.atan2(xDelta, yDelta);

    this.startingPointSet = true;
  }

  pincher.prototype.continueTransform = function () {
    //calc rotation change
    var touch0 = this.touchInfo.touchArray[0];
    var touch1 = this.touchInfo.touchArray[1];

    var xDelta = touch1.pageX - touch0.pageX;
    var yDelta = touch1.pageY - touch0.pageY;

    var newAngle = Math.atan2(xDelta, yDelta);

    var rotationAmount = this.initialAngle - newAngle;


    //calc size transform
    var firstLength = Math.abs(this.touchInfo.touchArray[0].pageX - this.touchInfo.touchArray[1].pageX);
    var secondLength = Math.abs(this.touchInfo.touchArray[0].pageY - this.touchInfo.touchArray[1].pageY);

    var newDistance = Math.sqrt((firstLength * firstLength) + (secondLength * secondLength));
    this.activeTransformValue = newDistance / this.originalDistanceBetweenTouchPoints;

    //A new currentTransformValue will be set when the transform ends.
    if (this.currentTransformValue) {
      this.activeTransformValue = this.currentTransformValue * this.activeTransformValue;
    }


    //apply to element style
    this.element.style.webkitTransform = 'scale(' + this.activeTransformValue + ')';
    this.element.style.transform = 'scale(' + this.activeTransformValue + ')';

    this.element.style.webkitTransform += ' rotate(' + rotationAmount + 'rad)';
    this.element.style.transform += ' rotate(' + rotationAmount + 'rad)';
  }

  pincher.prototype.move = function (evt) {
    if (!this.startingOffset)
      this.startingOffset = this.getPosition(evt);

    //move already assumes a single touch, so the zero-based indexing works.
    this.element.style.left = (this.touchInfo.touchArray[0].pageX - this.startingOffset.x) + 'px';
    this.element.style.top = (this.touchInfo.touchArray[0].pageY - this.startingOffset.y) + 'px';
  }

  pincher.prototype.end = function (evt) {
    this.removeDeadTouches(evt);

    this.setMode();

    //If one of the two touches has ended, need to prep for the next time two touch and can resize and rotate.
    if (this.touchInfo.touchArray.length < 2) {
      this.startingPointSet = false;
      this.originalDistanceBetweenTouchPoints = null;
      this.currentTransformValue = this.activeTransformValue;
    }
  }

  pincher.prototype.updateTouchEvent = function (evt) {
    var touch, i = 0;

    if (evt.touches) {
      for (i; i < evt.changedTouches.length; i++) {
        touch = evt.changedTouches[i];
        this.touchInfo.touchLookup[touch.identifier].pageX = touch.pageX;
        this.touchInfo.touchLookup[touch.identifier].pageY = touch.pageY;
      }
    }
    else {
      touch = this.touchInfo.touchLookup[evt.pointerId];
      touch.pageX = evt.pageX;
      touch.pageY = evt.pageY;
    }
  }

  pincher.prototype.removeDeadTouches = function (evt) {

    if (evt.touches) { //touch events
      //for touch events its hard to tell which touch ended, so we'll just remove ones from our state that
      //  are no longer in the touches array.
      var ids = '', i = 0;
      for (i; i < evt.touches.length; i++) {
        var touch = evt.touches[i];
        if (ids.length > 0)
          ids += '|';
        ids += touch.identifier;
      }

      for (var key in this.touchInfo.touchLookup) {
        if (ids.indexOf(key) === -1) { //need to remove the touch
          this.touchInfo.touchArray.splice(this.touchInfo.touchLookup[key].indexInArray);
          delete this.touchInfo.touchLookup[key];
        }
      }
    }
    else { //mouse and pointer events
      var touch = this.touchInfo.touchLookup[evt.pointerId];
      this.touchInfo.touchArray.splice(touch.indexInArray);
      delete this.touchInfo.touchLookup[touch.identifier];
    }

  }

  pincher.prototype.registerTouch = function (evt) {
    //It is in this method that we normalize the touch model between the different implementations

    if (evt.touches) { //touch events
      //find all the touches in the touch array that haven't been registered and do so.
      for (var i = 0; i < evt.touches.length; i++) {
        var evtTouch = evt.touches[i];

        if (!this.touchInfo.touchLookup[evtTouch.identifier]) {
          //Instead of storing the actual touch object, we just store what we need. The actual object
          //  isn't persisted in non-iOS webkit so this normalizes more with that pattern.
          var touch = {
            identifier: evtTouch.identifier,
            pageX: evtTouch.pageX,
            pageY: evtTouch.pageY
          };

          //Lookups for the touches
          this.touchInfo.touchArray.push(touch);
          this.touchInfo.touchLookup[touch.identifier] = touch;
          touch.indexInArray = this.touchInfo.touchArray.length - 1;
        }
      }
    }
    else { //pointer events
      //pointer events are normally collected in a group but we need to do that so we know how many touches
      //  there are.
      var touch = {
        pageX: evt.pageX,
        pageY: evt.pageY,
        identifier: evt.pointerId
      };
      this.touchInfo.touchArray.push(touch);
      this.touchInfo.touchLookup[touch.identifier] = touch;
      touch.indexInArray = this.touchInfo.touchArray.length - 1;
    }
  }

  pincher.prototype.setMode = function () {
    // we need to reset this so on the the next move can have an starting offset.
    this.startingOffset = null;

    if (this.touchInfo.touchArray.length === 1)
      this.mode = 'move';
    else if (this.touchInfo.touchArray.length === 2)
      this.mode = 'resize';
    else
      this.mode = 'none';
  }

  pincher.prototype.getPosition = function (evt) {

    var pageX = this.touchInfo.touchArray[0].pageX;
    var pageY = this.touchInfo.touchArray[0].pageY;

    //This will get us the x/y position within the element.
    return {
      y: pageY - this.element.offsetTop,
      x: pageX - this.element.offsetLeft
    };
  }

  return pincher;
})();