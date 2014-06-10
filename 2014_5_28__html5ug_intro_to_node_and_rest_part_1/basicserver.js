var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
    console.log('request made');

    fs.readFile('public/index.html', { encoding : 'utf8' }, function(err, data) {

        if (err) {
            res.writeHead(404);
        }
        else {
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.write(data);            
        }

        res.end();

    });

});

server.listen(10820, function() {
    console.log('listening on port 10820');
});





