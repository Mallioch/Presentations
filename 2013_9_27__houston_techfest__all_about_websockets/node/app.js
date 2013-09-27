#!/usr/bin/env node

var express = require("express"),
    app = express.createServer(),
    io = require('socket.io').listen(app); // socket.io may listen to an http
// or express server

// Use Express to serve static content, such as our index.html
app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});


var stepNumber = 0;
var steps = [
    { text: 'Intro', value: '#intro' },
    { text: 'Go Here', value: '#go-here' },
    { text: 'The Normal Web', value: '#the-norm' },
    { text: 'The Normal Web - Step 2', value: '#the-norm-step-2' },
    { text: 'The Normal Web - Step 3', value: '#the-norm-step-3' },
    { text: 'The Normal Web - Step 4', value: '#the-norm-step-4' },
    { text: 'The Normal Web - Step 5', value: '#the-norm-step-5' },
    { text: 'caniuse.com', value: '#can-i-use' },
    { text: 'websockets-test', value: '#websockets-test' },
    { text: 'socket code', value: '#socket-code' },
    { text: 'chat', value: '#chat' },
    { text: 'so-sockets', value: '#so-sockets' },
    { text: 'but-sockets', value: '#but-sockets' },
    { text: 'fini', value: '#fini' }
];

var users = {};

io.sockets.on('connection', function (socket) {
socket.emit('ping', { msg: 'Hello. I know socket.io.' });
    socket.emit('steps', { steps: steps });

    socket.emit('new-page', steps[stepNumber]);

    socket.on('go-forward', function (data) {
        if (stepNumber + 1 == steps.length) {
            console.log('reached the end.');
            return;
        }

        stepNumber++;
        socket.broadcast.emit('new-page', steps[stepNumber]);
    });

    socket.on('go-back', function (data) {
        if (stepNumber === 0) {
            console.log('reached the beginning');
            return;
        }

        stepNumber--;
        socket.broadcast.emit('new-page', steps[stepNumber]);
    });

    socket.on('go-to', function (data) {

        var step;
        for (var i = 0; i < steps.length; i++) {
            if (steps[i].value === data) {
                step = steps[i];
                stepNumber = i;
                break;
            }
        }
        socket.broadcast.emit('new-page', step);
    });

    socket.on('new-user', function (data) {

        users[parseInt(socket.id)] = {
            handle: data.handle,
            socket: socket
        };

        var usersToSend = {};
        for (var key in users) {
            usersToSend[key] = {
                handle: users[key].handle,
                id: key
            };
        }

        socket.broadcast.emit('user-list', usersToSend);
        socket.emit('user-list', usersToSend);
    });

    socket.on('send-message', function (data) {
        var user = users[parseInt(data.id)];
        var sendingUserHandle = users[parseInt(socket.id)].handle;
        user.socket.emit('new-message', { message: data.message, handle: sendingUserHandle });
    });

});


app.listen(8080);