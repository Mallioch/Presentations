(function(exports, CanvasObject) {

    var verticalDescender = function(c, x, y) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 50;
    };

    verticalDescender.prototype = new CanvasObject();

    verticalDescender.prototype.draw = function() {
        var c = this.c;
        var topBoundsPadding = 25;

        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y + this.height);
        c.lineTo(this.x + this.width, this.y + this.height);
        c.stroke();

        this.drawSelectedState();
    };

    exports.VerticalDescender = verticalDescender;

})(window.Diag, window.Diag.CanvasObject);