var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var server = express();

server.use(express.static(__dirname + '/public'));
server.use(bodyParser());
server.set('view engine', 'ejs');

server.get('/api/person/:name', function(req, res) {
    res.json(200, { data: req.params.name });
});

var database = {};

server.post('/api/person', function(req, res) {

    console.log('got some stuff', req.body);

    var person = { name: req.body.name };

    database[person.name] = person;
    console.log('we have this data: ', database);

    res.writeHead(201);
    res.end();
});

server.get('/foo/:catname', function(req, res) {
    res.render('foopage', { cat: "<b>Dante</b>" });
});














server.listen(10820, function() {
    console.log('now listening with express on 10820');
});