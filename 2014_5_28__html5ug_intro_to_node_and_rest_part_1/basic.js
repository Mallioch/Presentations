var fs = require('fs');

var stuff = fs.readFile('text.txt', { encoding: 'utf8' }, function(err, data) {

    var stuffArray = data.split('\n\n');

    console.log(stuffArray.length);

    var output = '';

    stuffArray.forEach(function(data) {
        output  += '<p>' + data + '</p>\n\n';
    });

    console.log('done');

});

console.log(stuff);

/*


fs.writeFileSync('seeifthisworks.txt', output);
*/
