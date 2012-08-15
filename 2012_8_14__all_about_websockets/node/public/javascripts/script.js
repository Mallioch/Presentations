(function () {
    'use strict';

    var socket = io.connect('/');
    socket.on('new-page', function (data) {
        $('section').hide();
        $(data.value).show();
        console.log('new-page', data);

        socket.emit('my other event', { my: 'data' });
    });

    socket.on('steps', function (data) {

        var html = '';
        for (var i = 0; i < data.steps.length; i++) {
            html += '<option value="';
            html += data.steps[i].value;
            html += '">';
            html += data.steps[i].text;
            html += '</option>';
        }
        $('#places-to-go').empty().html(html);
    });

    var forward = function () {
        socket.emit('go-forward');
    };

    var back = function () {
        socket.emit('go-back');
    };

    var goTo = function () {
        socket.emit('go-to', $('#places-to-go').val());
    };

    window.FronkoChat(socket);

    $('#forward').click(forward);
    $('#back').click(back);
    $('#goTo').click(goTo);
})();