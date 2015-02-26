(function(DrawingSpace) {
    'use strict';

    var mainCanvas = window.document.getElementById('mainCanvas');
    var mainCanvasContext = mainCanvas.getContext('2d');

    var baselineButton = window.document.getElementById('baselineButton');
    var verticalDescenderButton = window.document.getElementById('verticalDescenderButton');
    var wordButton = window.document.getElementById('wordButton');
    var spriteButton = window.document.getElementById('spriteButton');
    var blackAndWhiteButton = window.document.getElementById('blackAndWhiteButton');

    DrawingSpace.init(mainCanvasContext, mainCanvas.width, mainCanvas.height);

    baselineButton.addEventListener('click', function() {
        DrawingSpace.addObject(new Diag.Baseline(mainCanvasContext, 200, 200));
    });

    verticalDescenderButton.addEventListener('click', function() {
        DrawingSpace.addObject(new Diag.VerticalDescender(mainCanvasContext, 200, 200));
    });

    spriteButton.addEventListener('click', function() {
        DrawingSpace.addObject(new Diag.Sprite(mainCanvasContext, 0, 0, DrawingSpace.sprite));
    });

    wordButton.addEventListener('click', function() {
        DrawingSpace.addObject(new Diag.Word(mainCanvasContext, 300, 100));
    });

    blackAndWhiteButton.addEventListener('click', function() {
        DrawingSpace.blackAndWhite = !DrawingSpace.blackAndWhite;
    });



    mainCanvas.addEventListener('click', function(evt) {
        var location = getPositionFromTarget(evt, mainCanvas);
        DrawingSpace.click(location);
    });

    mainCanvas.addEventListener('mousedown', function(evt) {
        var location = getPositionFromTarget(evt, mainCanvas);
        DrawingSpace.mousedown(location);
    });

    mainCanvas.addEventListener('mousemove', function(evt) {
        var location = getPositionFromTarget(evt, mainCanvas);
        DrawingSpace.mousemove(location);
    });

    mainCanvas.addEventListener('mouseup', function(evt) {
        var location = getPositionFromTarget(evt, mainCanvas);
        DrawingSpace.mouseup(location);
    });

    var img = new Image();   // Create new img element
    img.addEventListener("load", function() {
        console.log('minotaur loaded', img);
        DrawingSpace.sprite = img;
    }, false);
    img.src = 'minotaur.png'; // Set source path

    function getPositionFromTarget(evt, target) {
        return {
            y: evt.pageY - target.offsetTop,
            x: evt.pageX - target.offsetLeft
        };
    }
})(window.Diag.DrawingSpace);