window.onerror = function (err) {
  alert(err);
}

$(function () {
  var pageChangeCallback = function (message) {
    //console.log('message from server', message);
    $('#pages section').hide();
    $('#' + message).show();
    window.scrollTo(0, 1);
  }

  var connection = $.connection('/signalr/preso');

  $(document).ready(function () {
    pageChangeCallback('start');
    
    $('#next').click(function () {
      connection.send('next');
    });
    
    $('#previous').click(function () {
      connection.send('previous');
    });
    
    $('.page-list li').click(function () {
      connection.send($(this).text());
    });
    
  });

  connection.received(function (response) {
    //$('#messages').append('<li>' + data + '</li>');
    //console.log('you said', data);
    pageChangeCallback(response.data);
    $('#wham').val(response.data);
  });

  connection.start().done(function () {
    //$("#broadcast").click(function () {
    //  connection.send($('#msg').val());
    //});
    $('#whaz').click(function () {
      //console.log('communicating');
      connection.send('yo');
    });
    

  });

});