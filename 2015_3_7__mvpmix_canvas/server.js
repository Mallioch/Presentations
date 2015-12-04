var express = require('express'),
    serveStatic = require('serve-static');



var app = express();


var staticMiddleware = serveStatic('static');
app.use(staticMiddleware);


app.listen(8123, function() {
    console.log('listening on 8123');
});


