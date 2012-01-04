var express = require('express');
var app = express.createServer();

var io = require('socket.io').listen(app);
io.set('transports', ['websocket', 'xhr-polling']);

console.log('cool stuff');

var masterSocket = 0;
var pageState = {
    currentPage: 'start',
    currentSpot: 0
};

var pages = [];
pages.push('start');
pages.push('assumptions');
pages.push('about_code');
pages.push('on_your_own_device');

pages.push('what_we_are_using_now');
pages.push('modernizr');
pages.push('modernizr_code_css');
pages.push('modernizr_code_javascript');
pages.push('websockets');
pages.push('websockets_code1');
pages.push('websockets_code2');
pages.push('websockets_code3');
pages.push('server');
pages.push('boxshadow');
pages.push('boxshadow_code');
pages.push('boxshadow2');
pages.push('boxshadow2_code');
pages.push('mediaqueries');
pages.push('mediaqueries_code');
pages.push('viewport_meta_tag');

pages.push('css3');
pages.push('text_shadow');
pages.push('text_shadow_code');
pages.push('border_radius');
pages.push('border_radius_code');
pages.push('opacity');
pages.push('opacity_code');
pages.push('rgba');
pages.push('rgba_code');
pages.push('generated_content');
pages.push('generated_content_code');
pages.push('css_gradients');
pages.push('css_gradients_code');
pages.push('css_gradients_code_2');
pages.push('multiple_backgrounds');
pages.push('multiple_backgrounds_code');
pages.push('transforms');
pages.push('transforms_code_1');
pages.push('transforms_code_2');
pages.push('transforms_code_3');
pages.push('transforms_code_4');
pages.push('transition');
pages.push('transition_code_1');
pages.push('transition_code_2');
pages.push('animation_prep');
pages.push('animation');
pages.push('animation_code1');
pages.push('animation_code2');
pages.push('css_over');

pages.push('html5');
pages.push('video');
pages.push('video_code');
pages.push('audio');
pages.push('audio_2');
pages.push('audio_code');
pages.push('forms');
pages.push('forms_2');
pages.push('forms_1_code');
pages.push('forms_2_code');
pages.push('offline');
pages.push('offline_htmltag');
pages.push('offline_manifest');
pages.push('geolocation');
pages.push('geolocation_code');
pages.push('canvas');
pages.push('canvas_code');
pages.push('webworkers');
pages.push('webworkers_code_1');
pages.push('webworkers_code_2');
pages.push('history');
pages.push('history_code');
pages.push('webstorage');
pages.push('webstorage_code');

pages.push('final_thoughts');
pages.push('progressive_enhancement');
pages.push('argument_of_speed');
pages.push('tomorrow');
pages.push('about_me');

app.listen(13405);

//=====================================
//setup
app.set('view options', {
    layout: false
});

app.set('views', __dirname + '/views');
app.register('.htm', require('ejs'));
app.set('view engine', 'html');

app.use('/public', express.static(__dirname + '/public'));
app.get('/public/*', function(req, res) {
    res.render(req.params);
});

app.get('/', function (req, res) {
    res.render('index.htm');
});

app.get('/getpage', function(req, res) {
    console.log('get page called');
    console.log('telling ie about ', pageState.currentPage);
    res.send({message: pageState.currentPage});
});

//=====================================
//socket.io


io.sockets.on('connection', function(socket) {

    socket.emit('pageChange', { message: pageState.currentPage });

    socket.on('sendMessage', function(data) {
        console.log('==========================');
        console.log('message from ', socket.id, data);
        console.log('current master socket is ', masterSocket);
        console.log('==========================');

        if (data.message == 'password') {
            masterSocket = socket.id;
            console.log('control yielded to', socket.id);
            return;
        }

        if (masterSocket == socket.id) {
            console.log('change current page ', pageState.currentPage, ' to ', data.message);
            pageState.currentPage = data.message;

            for (var i = 0; i < pages.length; i++) {
                if (pages[i] == pageState.currentPage) {
                    pageState.currentSpot = i;
                    break;
                }
            }

            socket.broadcast.emit('pageChange', data);
            socket.emit('pageChange', data);
        }
    });

    socket.on('next', function(data) {
        if (masterSocket != socket.id)
			return;
        
        if (pageState.currentSpot == pages.length - 1)
            return;

        pageState.currentSpot++;
        pageState.currentPage = pages[pageState.currentSpot];
 
        console.log('moving to page ', pageState.currentPage, pageState.currentSpot);

        socket.broadcast.emit('pageChange', { message: pageState.currentPage });
        socket.emit('pageChange', { message: pageState.currentPage });
    });

    socket.on('previous', function(data) {
        if (masterSocket != socket.id)
			return;
			
        if (pageState.currentSpot == 0)
            return;

        pageState.currentSpot--;
        pageState.currentPage = pages[pageState.currentSpot];

        console.log('moving to page ', pageState.currentPage, pageState.currentSpot);

        socket.broadcast.emit('pageChange', { message: pageState.currentPage });
        socket.emit('pageChange', { message: pageState.currentPage });
    });
    
});

console.log('Server running at http://127.0.0.1:13405/');
