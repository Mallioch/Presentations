var Transforms = (function (c) {

    function rotateASquare() {

        var x = 50;
        var y = 50;
        var width = 50;
        var height = 50;
        var degrees = 5;

        //c.fillStyle = '#F00';
        //c.fillRect(x, y, width, height);

        c.save();
        c.translate(50, 0);
        c.rotate(degrees * Math.PI / 180);
        c.fillStyle = '#00F';
        c.fillRect(x, y, width, height);
        c.restore();

        //c.fillStyle = '#0F0';
        //c.fillRect(x, y, width, height);

    }

    function skewTime() {
        var width = 50;
        var height = 50;
        var x = 0;
        var y = 0;
        var degrees = 70;

        c.save();
        c.translate((width * .75), 0);
        c.fillStyle = '#00F';

        c.scale(1, 0.5);
        c.rotate(45 * Math.PI / 180);


        c.fillRect(x, y, width, height);
        c.restore();
    }

    return {
        rotateASquare: rotateASquare,
        skewTime: skewTime
    };
});