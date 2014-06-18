var restify = require('restify');
var url = require('url');

var client = restify.createJsonClient({
  url: 'http://localhost:10820',
  version: '*',
  proxy: url.parse('http://localhost:8888/')
});



//deleteMissingBook();
updateMissingBook();


function deleteMissingBook() {
    client.del('/api/book/53a11f4414c87c0000869642',
        function(err, req, res, data) {
            console.log('after bad delete', err, data);
        });
}

function updateMissingBook() {
    

    client.put('/api/book/53a11f4414c87c0000869642', 
        { author: 'bob' , title: 'cool book', year: 2067 }, 
        function(err, req, res, data) {
            console.log('got it back', res.statusCode);
        });
}






function getList() {
    client.get('/api/book/',
        function(err, req, res, data) {
            console.log('======================\n/get/', data.length);
        });
}

function get(url) {
    client.get(url, function(err, req, res, data) {
        console.log('======================\n/get/:id', data);
        getCallback(data);
    });

}

function post(cb) {
    client.post('/api/book/', 
        { author: 'Stephen King', title: 'Pet Cemetary', year: 1983 }, 
        function(err, req, res, data) {
            if (data.author !== 'Stephen King')
                throw 'bad post';
            console.log('======================\npost', data);

            if (cb)
                cb(data);
        }
    );    
}

function put(book, cb) {

    client.put(book.links['self'].href, 
        { author: book.author + ' updated' , title: book.title + 'updated too', year: book.year }, 
        function(err, req, res, data) {
            console.log('got it back', data);
            if (data.author !== 'Stephen King updated')
                throw 'bad post';
            console.log('======================\nput', data);

            //if (cb)
                cb(data);
        }
    );    
}








