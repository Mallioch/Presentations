var c, canvas, aDiv, tile, elements, skeleton;
var tileSize = 100;
var gridSize = 5;
var skewWidth = 70;
var skewHeight = 35;
var grid = [];

createGrid();

function createGrid() {
    var i = 0;
    for (i; i < gridSize; i++) {
        var column = [];
        grid.push(column);

        var j = 0;
        for (j; j < gridSize; j++) {
            column.push({});
        }
    }
}

gameInit = {
    
    run: function () {

        console.log('gameInit', this.windowLoaded, this.tileLoaded, this.textureLoaded);

        if (this.windowLoaded && this.tileLoaded && this.textureLoaded) {
            var map = NS.map(canvas, grid);
            map.draw();

            drawElements();
        }
    }
}

window.onload = function () {

    gameInit.windowLoaded = true;

    canvas = document.getElementById('theCanvas');
    aDiv = document.getElementById('aDiv');
    c = canvas.getContext('2d');
    skeleton = document.getElementById('skeleton');

    var tileRenderer = document.getElementById('tileRenderer');
    var tc = tileRenderer.getContext('2d');

    var texture = new Image();
    texture.src = "/content/isometric/100x100_green.jpg";
    texture.onload = function () {
        drawTile();

        gameInit.textureLoaded = true;
        gameInit.run();


        tile = new Image();
        var url = tileRenderer.toDataURL();

        elements = [
            {
                x: 4,
                y: 4,
                height: 50
            }
        ];

        tile.onload = function () {
            gameInit.tileLoaded = true;
            gameInit.run();
        }

        tile.src = url;
    }



    function drawTile() {
        tc.save();
        tc.scale(1, 0.5);
        tc.rotate(45 * Math.PI / 180);

        tc.drawImage(texture,
            0,
            0,
            texture.width,
            texture.height,
            texture.width / 2,
            (texture.height / 2) * -1,
            texture.width,
            texture.height);

        tc.restore();
    }

}


function drawElements() {

    var sliceX = 550, sliceY = 900, size = 100;

    var skel1 = new NS.troop(3, 3, 'dr', skeleton, grid);
    skel1.draw();

    var skel2 = new NS.troop(0, 2, 'ul', skeleton, grid);
    skel2.draw();

    var skel3 = new NS.troop(4, 2, 'dl', skeleton, grid);
    skel3.draw();

    var skel4 = new NS.troop(1, 1, 'ur', skeleton, grid);
    skel4.draw();
}



