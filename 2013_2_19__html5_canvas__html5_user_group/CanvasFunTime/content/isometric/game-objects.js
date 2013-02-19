var NS = {};

var directions = {
    dr: { y: 4, x: 5 },
    dl: { y: 7, x: 5 },
    ul: { y: 1, x: 5 },
    ur: { y: 3, x: 5 }
};

(function () {
    NS.troop = function (x, y, direction, sprite, grid) {
        this.position = { x: x, y: y };
        this.direction = direction;
        this.sprite = sprite;
        this.grid = grid;
    }

    var base = NS.troop.prototype;

    base.draw = function () {

        var cell = this.grid[this.position.x][this.position.y];

        console.log('teh cell', cell);

        var size = 125;
        var spriteOffset = 85;
        var spriteX = directions[this.direction].x * 125;
        var spriteY = (directions[this.direction].y * 125) + 10;

        console.log('drawing', spriteX, spriteY, cell);

        c.drawImage(this.sprite,
            spriteX, spriteY,
            size, size,
            cell.centerX - spriteOffset + 10, cell.centerY - spriteOffset,
            size, size);
    }
})();

NS.map = function (canvas, grid) {
    var c = canvas.getContext('2d');

    var map = {

        draw: function() {
            c.clearRect(0, 0, canvas.width, canvas.height);

            var thingToDraw = tile;

            for (var col = 0; col < grid.length; col++) {
                for (var row = 0; row < grid[col].length; row++) {

                    var tilePositionX = (row - col) * thingToDraw.height;
                    tilePositionX += (canvas.width / 2) - (thingToDraw.width / 2);
                    var tilePositionY = (row + col) * (thingToDraw.height / 2);

                    var cell = grid[col][row];
                    cell.x = tilePositionX;
                    cell.y = tilePositionY;
                    cell.centerX = tilePositionX + 70;
                    cell.centerY = tilePositionY + 30;

                    c.drawImage(thingToDraw,
                        Math.round(tilePositionX),
                        Math.round(tilePositionY),
                        thingToDraw.width,
                        thingToDraw.height);

                }
            }
        },
    };

    return map;
};