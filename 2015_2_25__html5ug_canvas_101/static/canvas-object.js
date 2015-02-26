(function(exports) {

    var obj = function() {};

    obj.prototype.drawSelectedState = function() {

        var c = this.c;
        if (this.selected === true) {
            c.save();

            c.beginPath();
            c.rect(this.x, this.y, this.width, this.height);
            c.setLineDash([10, 4]);
            c.strokeStyle = 'rgba(255, 0, 0, .4)';
            c.stroke();

            c.restore();
        }
    }

    obj.prototype.pointInBounds = function(pt) {
        if (pt.x > this.x &&
            pt.x < this.x + this.width &&
            pt.y > this.y &&
            pt.y < this.y + this.height) {
            return true;
        }

        return false;
    }

    obj.prototype.moveTo = function(pt) {
        if (!this.mouseOffset.initialOffset) {
            this.mouseOffset.initialOffset = {
                x: (this.mouseOffset.x - this.x),
                y: (this.mouseOffset.y - this.y)
            }
        }

        var newX = pt.x - this.mouseOffset.initialOffset.x,
            newY = pt.y - this.mouseOffset.initialOffset.y;

        this.x = newX;
        this.y = newY;
    }

    exports.Diag.CanvasObject = obj;

})(window);