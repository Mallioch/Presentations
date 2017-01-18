(function() {

  var $characters = $('#characters');
  var template = $('#detail-template').html();
  var apiData;

  function loadList() {
    $.ajax({
      url: 'http://swapi.co/api/people'
    })
    .done(function(data) {
      apiData = data;

      data.results.forEach(function(person, index) {
        $characters.append('<li data-index="' + index + '">' + person.name + '</li>');
      });
    });

    $characters.on('click', 'li', function(evt) {
      var index = $(evt.target).data('index');
      index = Number(index);
      showCharacterDetails(apiData.results[index]);
    });
  }

  function showCharacterDetails(character) {
    var html = Mustache.render(template, character);
    $('#details').html(html);
  }

  loadList();


})();
