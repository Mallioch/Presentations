(function(exports, CanvasObject) {

    var baseline = function(c, x, y) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.verticalPadding = 20;
        this.separatorLeftPadding = 80;
        this.separatorHeightBelowBaseline = 10;
        this.width = 200;
        this.height = this.verticalPadding + this.separatorHeightBelowBaseline;
    };

    baseline.prototype = new CanvasObject();

    baseline.prototype.draw = function() {
        var c = this.c;

        c.beginPath();
        c.moveTo(this.x, this.y + this.verticalPadding);
        c.lineTo(this.x + this.width, this.y + this.verticalPadding);
        c.stroke();

        c.beginPath();
        c.moveTo(this.x + this.separatorLeftPadding, this.y);
        c.lineTo(this.x + this.separatorLeftPadding, this.y + this.verticalPadding + this.separatorHeightBelowBaseline);
        c.stroke();

        this.drawSelectedState();

    };

    exports.Baseline = baseline;


})(window.Diag, window.Diag.CanvasObject);