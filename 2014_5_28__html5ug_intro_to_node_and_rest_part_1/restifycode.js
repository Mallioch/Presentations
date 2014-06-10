var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:10820',
  version: '*'
});

client.get('/api/person/sparkles', function(err, req, res, obj) {
  
    console.log(obj);

    client.close();

});

client.post('/api/person', { name: 'fred' }, function(err, req, res, obj) {
    console.log('done', res);
});