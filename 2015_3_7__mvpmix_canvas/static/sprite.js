(function(exports, CanvasObject) {

    var sprite = function(c, x, y, sprite) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = 200;
        this.height = 200;
        this.spriteXCoordinates = [490, 625, 755, 885, 1010, 1140, 1270, 1390];
        this.position = 0;

        var self = this;
        var interval = function() {
            self.changeSpritePosition.call(self);
        }

        setInterval(interval, 100);
    };

    sprite.prototype = new CanvasObject();

    sprite.prototype.changeSpritePosition = function() {
        this.position++;

        if (this.position > this.spriteXCoordinates.length - 1)
            this.position = 0;
    };

    sprite.prototype.draw = function() {
        var c = this.c;

        var location = 6;

        c.drawImage(this.sprite, this.spriteXCoordinates[this.position], 0, 150, 150, this.x, this.y, this.width, this.height);

        this.drawSelectedState();
    };

    exports.Sprite = sprite;


})(window.Diag, window.Diag.CanvasObject);