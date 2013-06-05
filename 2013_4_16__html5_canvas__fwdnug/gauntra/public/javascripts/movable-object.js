(function (context) {

    var movableObject = function () {
        this.lastUpdate = new Date();
    };

    movableObject.prototype.setNewPosition = function () {
        if (this.direction == -1)
            return;

        switch (this.direction) {
            case 0:
                this.x -= this.distanceFactor;
                break;
            case 1:
                this.y -= this.distanceFactor;
                break;
            case 2:
                this.x += this.distanceFactor;
                break;
            case 3:
                this.y += this.distanceFactor;
                break;
            case 4:
                this.x -= this.distanceFactor;
                this.y -= this.distanceFactor;
                break;
            case 5:
                this.y -= this.distanceFactor;
                this.x += this.distanceFactor;
                break;
            case 6:
                this.x += this.distanceFactor;
                this.y += this.distanceFactor;
                break;
            case 7:
                this.x -= this.distanceFactor;
                this.y += this.distanceFactor;
                break;
        };
    }

    movableObject.prototype.setNewPositionWithBetterTimeCalc = function () {
        if (this.direction == -1)
            return;

        var timeElapsed = new Date() - this.lastUpdate;
        this.lastUpdate = new Date();
        var diff = (this.distanceFactor * timeElapsed * .001);
        var stuff = $('#stuff');

        if (!diff)
            diff = 0;
        stuff.append('<li>diff - ' + diff + '</li>');

        switch (this.direction) {
            case 0:
                this.x -= diff;
                break;
            case 1:
                this.y -= diff;
                break;
            case 2:
                this.x += diff;
                break;
            case 3:
                this.y += diff;
                break;
            case 4:
                this.x -= diff;
                this.y -= diff;
                break;
            case 5:
                this.y -= diff;
                this.x += diff;
                break;
            case 6:
                this.x += diff;
                this.y += diff;
                break;
            case 7:
                this.x -= diff;
                this.y += diff;
                break;
        };
    }

    movableObject.prototype.checkBounds = function (xBounds, yBounds) {
        if (this.x < 0)
            this.x = 0;
        if (this.y < 0)
            this.y = 0;
        if (this.x > xBounds - this.width)
            this.x = xBounds - this.width;
        if (this.y > yBounds - this.height)
            this.y = yBounds - this.height;
    }

    movableObject.prototype.direction = 3;
    movableObject.prototype.distanceFactor = 5;
    movableObject.prototype.monkeys = 'large';
    movableObject.prototype.height = 50;
    movableObject.prototype.width = 50;

    context.Gauntra.MovableObject = movableObject;

})(this);