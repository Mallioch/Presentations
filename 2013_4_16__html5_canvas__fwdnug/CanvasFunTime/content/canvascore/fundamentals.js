var Fundamentals = (function (canvas, c, alphaSelect, compositionSelect) {

    function drawALine() {

        var x = 10;

        c.beginPath();
        c.moveTo(10, 10);
        c.lineTo(350, 180);
        c.lineWidth = 4;
        c.strokeStyle = "#F00";
        c.stroke();
    }

    function drawAPolygon() {
        //c.fillStyle = '#00F';
        //c.fillStyle = 'rgba(255, 0, 255, .1)';

        //var gradient = c.createLinearGradient(0, 0, 0, 200);
        var gradient = c.createRadialGradient(100, 100, 10, 100, 100, 100);

        gradient.addColorStop(0, '#000');
        gradient.addColorStop(.5, '#00F');
        gradient.addColorStop(1, '#F00');
        c.fillStyle = gradient;

        c.beginPath();
        c.moveTo(20, 20);
        c.lineTo(280, 25);
        c.lineTo(300, 150);
        c.lineTo(50, 200);
        c.lineWidth = 4;
        //c.closePath();
        //c.lineTo(20, 20);
        c.fill();
        //c.stroke();
    }

    function drawACircle() {
        //c.fillRect(97.5, 97.5, 5, 5);
        //c.strokeStyle = '#000';

        c.beginPath();
        c.arc(100, 100, 70, (Math.PI / 180) * 40, (Math.PI / 180) * 320);

        //c.lineWidth = 5;
        //c.stroke();
        c.fillStyle = '#FF0';
        c.fill();
    }

    function drawQuadraticBezierCurve() {
        c.beginPath();
        c.lineWidth = 5;
        c.moveTo(50, 50);
        c.lineTo(100, 100);
        c.stroke();

        c.quadraticCurveTo(200, 200, 30, 90);
        c.stroke();
    }

    function drawBezierCurve() {
        c.beginPath();

        c.moveTo(10, 100);
        c.bezierCurveTo(100, 300, 300, 0, 400, 100);
        //c.closePath();
        c.stroke();
    }

    function drawAnImage() {
        var img = document.getElementById('sample-image');
        c.drawImage(img, 200, 10);
    }

    function drawText() {
        c.font = "50px Verdana";
        c.fillStyle = "#f00";
        c.strokeText('Hello', 100, 80);
        c.fillText('Hello', 100, 80);
        c.strokeStyle = '#00f';
        c.lineWidth = 2;
    }

    return {
        drawALine: drawALine,
        drawAPolygon: drawAPolygon,
        drawACircle: drawACircle,
        drawQuadraticBezierCurve: drawQuadraticBezierCurve,
        drawBezierCurve: drawBezierCurve,
        drawAnImage: drawAnImage,
        drawText: drawText
    }

});


