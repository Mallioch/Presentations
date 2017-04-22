var button = document.querySelector('button');



button.addEventListener('click', function() {
  $.ajax({
    url: 'https://api.github.com/search/repositories?q=steak'
  })
  .done(function(data) {
    console.log('got data', data);
  });

});
