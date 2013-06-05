var Fun = (function (canvas, c) {

    var obj = {
        start: function () {
            
            c.strokeStyle = '#000';
            var write = false;
            var started = false;

            canvas.addEventListener('mousedown', function (ev) {
                write = true;
            }, false);

            canvas.addEventListener('mouseup', function (e) {
                write = false;
            }, false);

            canvas.addEventListener('mousemove', function (ev) {
                
                var x, y;

                if (ev.layerX || ev.layerX == 0) { // Firefox
                    x = ev.layerX;
                    y = ev.layerY;
                } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                    x = ev.offsetX;
                    y = ev.offsetY;
                }

                if (write) {
                    if (!started) {

                        c.beginPath();
                        c.moveTo(x, y);
                        started = true;
                    } else {
                        c.lineTo(x, y);
                        c.stroke();
                    }
                }
                else {
                    started = false;
                }
            }, false);
        },

        controllableFunBezier: function () {

            var func = function (e) {

                c.fillRect(0, 0, canvas.width, canvas.height, '#FFF');
                obj.funBezier(e.layerX, e.layerY);
            }

            canvas.addEventListener('mousemove', func, false);

        },

        funBezier: function (x, y) {

            x = x || 360;
            y = y || 100;

            var string = 'foo bar i want pizza'.split('');
            var length = string.length;
            var interval = 1 / length;

            var myPointA = bezier.point(40, 100);
            var myPointB = bezier.point(80, 20);
            var myPointC = bezier.point(250, 180);
            var myPointD = bezier.point(x, y);

            var time = 0;

            c.save();
            bezier.drawCurve(
                myPointA, myPointB,
                myPointC, myPointD,
                300,
                c,
                '#000');
            c.restore();

            for (var i = 0; i < length; i++) {

                time += interval;

                resultPoint = bezier.calc(
                    myPointA, myPointB,
                    myPointC, myPointD,
                    time
                );

                resultAngle = bezier.findAngle(
                    myPointA, myPointB,
                    myPointC, myPointD,
                    time);

                resultAngle += 1;

                c.save();
                c.translate(resultPoint.x, resultPoint.y);
                c.rotate(resultAngle);
                c.font = "12px Verdana";
                c.fillStyle = "#f00";
                c.fillText(string[i], 0, 0);
                c.restore();
            }

        },

        chart: function () {

            var originX = 60;
            var originY = 150;
            var width = 50;
            var buffer = 10;

            c.fillStyle = '#F00';
            c.fillRect(originX + buffer, originY - 50, 50, 50);

            c.fillStyle = '#0F0';
            c.fillRect(originX + buffer + width + buffer, originY - 120, 50, 120);

            c.fillStyle = '#00F';
            c.fillRect(originX + buffer + (buffer + width) * 2, originY - 80, 50, 80);

            c.moveTo(originX, 20);
            c.lineTo(originX, originY);
            c.strokeStyle = '#000';
            c.lineTo(originX + 190, originY);
            c.stroke();

            c.font = "12px Verdana";
            c.fillStyle = "#000";
            c.fillText('Day of week', originX + 10, originY + 20);

            c.save();
            c.translate(-80, 260);
            c.rotate(270 * Math.PI / 180);
            c.fillText('Hit points', originX + 60, originY - 20);
            c.restore();
        }
    }

    return obj;
});