var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var Book = require('./models/book').Book;
var mongoPath = "mongodb://localhost:27017/favoritebooks";

var server = express();

server.use(express.static(__dirname + '/public'));
server.use(bodyParser());
server.set('view engine', 'ejs');


function serviceUnavailable(res) {
    res.statusCode = 503;
    res.json({ message: 'The service is unavailable. Please try again soon.' });
    res.end();
}

function badRequest(res, message) {
    res.statusCode = 400;
    res.json({ message: message });
    res.end();
}

function notFound(res) {
    res.statusCode = 404;
    res.end();
}

server.get('/api/book/:id', function(req, res) {

    mongoClient.connect(mongoPath, function(err, db) {
        if(err) {
            serviceUnavailable(res);
            return;
        }


        var objectId;
        try {
            objectId = new ObjectId(req.params.id);
        } 
        catch (e) {
            badRequest(res, 'Invalid id');
            return;
        }

        var collection  = db.collection('favoritebooks');
        collection.findOne({ _id:  objectId}, function(err, result) {

            if (!result) {
                notFound(res);
                return;
            }

            res.json(new Book(result._id, result.title, result.author, result.year));
            res.end();        
        });
    });

});

server.get('/api/book', function(req, res) {
    mongoClient.connect(mongoPath, function(err, db) {
        
        if(err) {
            serviceUnavailable(res);
            return;
        }

        var collection  = db.collection('favoritebooks');
        collection.find().toArray(function(err, result) {

            var books = [];
            result.forEach(function(data) {
                books.push(new Book(data._id, data.title, data.author, data.year));
            });

            res.json(200, books);
            res.end();        
        });
    });
});

server.post('/api/book', function(req, res) {

    mongoClient.connect(mongoPath, function(err, db) {

        if(err) {
            serviceUnavailable(res);
            return;
        }

        //Even though we could, we don't want to take everything from the request and dump it into Mongo.
        //  Someone could send rogue data.
        var book = {
            year: req.body.year,
            title: req.body.title,
            author: req.body.author
        };

        var collection  = db.collection('favoritebooks');
        collection.insert(book, function(err, result) {

            var book = new Book(result[0]._id, result[0].title, result[0].author, result[0].year);

            res.json(201, book);
            res.end();        
        });
    });
});

server.put('/api/book/:id', function(req, res) {

    mongoClient.connect(mongoPath, function(err, db) {

        if(err) {
            serviceUnavailable(res);
            return;
        }

        //Even though we could, we don't want to take everything from the request and dump it into Mongo.
        //  Someone could send rogue data.
        var book = {
            year: req.body.year,
            title: req.body.title,
            author: req.body.author
        };

        var collection  = db.collection('favoritebooks');
        collection.update(
            { _id: new ObjectId(req.params.id) },
            { $set : { author: book.author, title: book.title, year: book.year } },
            { w: 1 },
            function(err, result) {

                if (result === 1) {

                    //After the PUT we want to return a representation as the links and other state could have changed.
                    collection.findOne({ _id: new ObjectId(req.params.id) }, function(err, result) {
                            console.log('after mongo put get', err, result);

                            res.json(new Book(result._id, result.title, result.author, result.year));
                            res.end();        
                        });                     
                }
                else {
                    notFound(res);
                    return;
                }

            });


    });
});

server.delete('/api/book/:id', function(req, res) {

    mongoClient.connect(mongoPath, function(err, db) {

        if(err) {
            serviceUnavailable(res);
            return;
        }

        var collection  = db.collection('favoritebooks');
        collection.remove(
            { _id: new ObjectId(req.params.id) },
            function(err, result) {
                console.log('after mongo delete', err, result);
                if (result === 1) {
                    res.writeHead(204);
                    res.end();
                           
                }
                else {
                    notFound(res);
                    return;
                }

            });


    });
});



server.listen(10820, function() {
    console.log('now listening with express on 10820');
});