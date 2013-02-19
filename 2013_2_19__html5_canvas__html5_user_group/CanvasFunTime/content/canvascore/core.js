var canvas, c, alphaSelect, compositionSelect;

function updateSettings() {
    c.globalAlpha = alphaSelect.options[alphaSelect.selectedIndex].value;
    c.globalCompositeOperation = compositionSelect.options[compositionSelect.selectedIndex].value;
    console.log('settings', c.globalAlpha, c.globalCompositeOperation);
    c.rotate(15 * Math.PI / 180);
}

function clear() {
    c.fillRect(0, 0, canvas.width, canvas.height);
    //c.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    var imageData = canvas.toDataURL("image/jpeg", 1);

    uploadFileAsync(imageData, function () { alert('uploaded!'); });
}

function uploadFileAsync(file, success) {
    var formData = new FormData();
    formData.append('fileData', file);

    var xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);
            console.log('progress', percentage);
            if (percentage == 100) {
                success();
            }
        }
    }, false);

    xhr.open('POST', "/home/savepicture", true);
    xhr.send(formData);
};


$(document).ready(function () {
    canvas = $('canvas').get(0);
    c = canvas.getContext('2d');

    alphaSelect = document.getElementById('alpha-select');
    compositionSelect = document.getElementById('global-composite-operation-select');

    c.fillStyle = "#FFF";
    c.fillRect(0, 0, canvas.width, canvas.height);

    var fundamentals = new Fundamentals(canvas, c, alphaSelect, compositionSelect);
    var transforms = new Transforms(c);
    var fun = new Fun(canvas, c);

    $('#clear').click(clear);
    $('#update-settings').click(updateSettings);
    $('#save-canvas').click(saveCanvas);

    $('#draw-a-line').click(fundamentals.drawALine);
    $('#draw-a-polygon').click(fundamentals.drawAPolygon);
    $('#draw-a-circle').click(fundamentals.drawACircle);
    $('#draw-quadratic-bezier').click(fundamentals.drawQuadraticBezierCurve);
    $('#draw-a-bezier').click(fundamentals.drawBezierCurve);
    $('#draw-an-image').click(fundamentals.drawAnImage);
    $('#draw-text').click(fundamentals.drawText);

    $('#rotate-a-square').click(transforms.rotateASquare);
    $('#skew-time').click(transforms.skewTime);

    $('#sign-here-please').click(fun.start);
    $('#fun-bezier').click(function () { fun.funBezier(); });
    $('#controllable-fun-bezier').click(fun.controllableFunBezier);
    $('#chart').click(fun.chart);
});