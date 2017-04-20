var clickMe = document.querySelector('#click-me');

clickMe.addEventListener('click', function() {
  clickMe.textContent = 'changed';
});



var index = 0;
var words = ['Longing', 'Rusted', 'Seventeen', 'Daybreak', 'Furnace', 'Nine', 'Benign', 'Homecoming', 'One', 'Freight Car'];

var clickList = document.querySelector('#click-list');
clickList.addEventListener('click', function() {
  var li = document.createElement('li');
  li.textContent = words[index];
  clickList.appendChild(li);

  index++;
  if (index === words.length) {
    index = 0;
  }
});


var itemRemover = document.querySelector('#item-remover');
itemRemover.addEventListener('click', function() {
  document.body.removeChild(clickList);
});
