//This is based on the polyfill on MDN: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
//  It was originally meant just for IE. This now covers older Androids.
(function () {
  
  //IE10 has the custom event object but it doesn't work like the other browsers :(
  var isIE = window.navigator.userAgent.indexOf('MSIE') > -1;
  if (window.CustomEvent && !isIE) {
    //Firefox for Android, Chrome for Android, Opera, Firefox OS, iOS 6
    return;
  }

  function CustomEvent(eventName, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };

      var evt = document.createEvent('Event');
      //Android 2.1, 2.2, 2.3, IE10
      evt.initEvent(eventName, true, true)
    return evt;
  };

  //Older Androids don't have the CustomEvent object, so we only want the prototype for IE.
  if (window.CustomEvent) {
    CustomEvent.prototype = window.CustomEvent.prototype;
  }

  window.CustomEvent = CustomEvent;
})();