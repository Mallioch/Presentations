self.onmessage = function(event) {  
  this.times = 0;

  setInterval(function() {

      var text = 'Hi! I have said this ' + this.times + ' time(s) before.';
      this.times++;

      self.postMessage({ message: text });
  },
  500);  
}; 

