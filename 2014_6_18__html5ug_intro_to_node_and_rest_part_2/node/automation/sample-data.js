var restify = require('restify');
var url = require('url');

var client = restify.createJsonClient({
  url: 'http://localhost:10820',
  version: '*',
  proxy: url.parse('http://localhost:8888/')
});

function post(title, author, year) {
    client.post('/api/book/', 
        { author: author, title: title, year: year }, 
        function(err, req, res, data) {
        }
    );    
}

post('Pet Cemetary', 'Stephen King', 1983);
post('Crime and Punishment', 'Fyodor Dostoyevsky', 1866);
post('Dragons of Autumn Twilight', 'Margaret Weis, Tracy Hickman', 1984);
post('Dune', 'Frank Herbert', 1965);
post('Sword of Shannara', 'Terry Brooks', 1977);
