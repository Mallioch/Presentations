window.FronkoChat = (function (socket) {

    var recipientHandle;
    var recipientId;

    function login() {
        var handle = $('#chat .login input').val();
        $('#chat .login').hide();
        $('#chat .list').show();

        socket.emit('new-user', { handle: handle });
    }

    function userListUpdated(users) {
        var ul = $('.list ul');
        ul.empty();
        for (var key in users) {
            ul.append('<li data-id="' + key + '">' + users[key].handle + '</li>');
        }
    }

    function moveToSendMessage() {
        $('#chat .list').hide();
        $('#chat .send-message').show();

        recipientHandle = $(this).html();
        recipientId = $(this).data('id');

        $('#chat .send-message .handle').html(recipientHandle);
    }

    function sendMessage() {
        console.log('trying to send a message');
        socket.emit('send-message', {
            id: recipientId,
            message: $('#chat textarea').val()
        });
        $('#chat .list').show();
        $('#chat .send-message').hide();
        $('#chat .send-message textarea').val('');
    }

    function newMessageReceived(data) {
        console.log('newMessageReceived', data);

        var dom = '<div class="flash"><span class="handle">'
            + data.handle
            + ' says:</span><span class="message">'
            + data.message
            + '</span></div>';

        var $dom = $(dom);
        setTimeout(function () {
            $dom.remove()
        }, 3000);

        $('#chat .app').append($dom);
    }

    socket.on('user-list', userListUpdated);
    socket.on('new-message', newMessageReceived);

    $('#chat .login button').click(login);
    $('#chat .list').on('click', 'li', moveToSendMessage);
    $('#chat .send-message button').click(sendMessage);

});