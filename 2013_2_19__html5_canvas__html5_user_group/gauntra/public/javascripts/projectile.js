(function (context) {

    var projectile = function (x, y, direction, canvasContext, img) {

        switch (direction) {
            case 0:
                x -= 10;
                y += 10;
                break;
            case 1:
                y -= 10;
                x += 10;
                break;
            case 2:
                x += 30;
                y += 10;
                break;
            case 3:
                y += 30;
                x += 10;
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
        }

        this.x = x;
        this.y = y;
        console.log('created with y', this.y);
        this.direction = direction;
        this.c = canvasContext;
        this.img = img;
        this.origin = { x: x, y: y };
        this.isOutOfRangeValue = false;
        this.distanceFactor = 15;
        //this.distanceFactor = 4;
        this.lastMovementFrameUpdate = new Date();
        this.movementFrame = 7;
    };

    projectile.prototype = new context.Gauntra.MovableObject();
    projectile.prototype.direction = 0;

    projectile.prototype.update = function () {

        var timeElapsed = new Date() - this.lastUpdate;

        var diff = (150 * timeElapsed * .001);
        var outOfRangeValue = 700;

        this.setNewPosition();
        switch (this.direction) {
            case 0:
                if (this.x < this.origin.x - outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 1:
                if (this.y < this.origin.y - outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 2:
                if (this.x > this.origin.x + outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 3:
                if (this.y > this.origin.y + outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 4:
                if (this.x < this.origin.x - outOfRangeValue
                    || this.y < this.origin.y - outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 5:
                if (this.x > this.origin.x + outOfRangeValue
                    || this.y < this.origin.y - outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 6:
                if (this.x > this.origin.x + outOfRangeValue
                    || this.y > this.origin.y + outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
            case 7:
                if (this.x < this.origin.x - outOfRangeValue
                    || this.y > this.origin.y + outOfRangeValue)
                    this.isOutOfRangeValue = true;
                break;
        };

        this.updateMovementFrame();
    };

    projectile.prototype.updateMovementFrame = function () {

        if (new Date() - this.lastMovementFrameUpdate < 100)
            return;
        this.lastMovementFrameUpdate = new Date();

        this.movementFrame = this.movementFrame + 1;
        if (this.movementFrame > 7)
            this.movementFrame = 0;
    };

    projectile.prototype.draw = function () {

        var offsetX = 83, offsetY = 3, spriteSize = 7;

        switch (this.movementFrame) {
            case 1:
                offsetY = 13;
                break;
            case 2:
                offsetY = 21;
                break;
            case 3:
                offsetY = 30;
                break;
            case 4:
                offsetY = 40;
                break;
            case 5:
                offsetX = 81;
                offsetY = 50;
                break;
            case 6:
                offsetX = 81;
                offsetY = 57;
                break;
            case 7:
                offsetX = 81;
                offsetY = 65;
                break;
        }

        //offsetY += this.movementFrame * 15;


        this.c.drawImage(this.img,
            offsetX,
            offsetY,
            spriteSize,
            spriteSize,
            this.x,
            this.y,
            25,
            25);

    };

    projectile.prototype.isOutOfRange = function () {
        return this.isOutOfRangeValue;
    };

    context.Gauntra.Projectile = projectile;

})(this);