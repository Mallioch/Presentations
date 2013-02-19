(function(context) {

	var spriteSize = 19;

	function user(c, handle, img) {
		this.c = c;
		this.handle = handle;
		this.img = img;
		this.movementFrame = 0;
		
		this.lastOffsetX = 1;
		this.lastOffsetY = 37;
		//this.distanceFactor = 10;
		//setInterval(self.updateMovementFrame.call(self), 300);
	};
	
	user.prototype = new context.Gauntra.MovableObject();
	user.prototype.handle = '';
	user.prototype.x = 0;
	user.prototype.y = 0;
	user.prototype.direction = 0; //0 - left, 1 - up, 2 - right, 3 - down
	user.prototype.lastMovementFrameUpdate = new Date();
	user.prototype.facingDirection = 0;
	
	user.prototype.updateMovementFrame = function() {
	
	    if (new Date() - this.lastMovementFrameUpdate < 100)
	        return;
	    this.lastMovementFrameUpdate = new Date();

		if (!this.moving)
			return;
	
		this.movementFrame = this.movementFrame + 1;
		if (this.movementFrame > 3)
			this.movementFrame = 0;
	};
	
	user.prototype.update = function(xBounds, yBounds) {
		
		if (this.x === this.lastX && this.y === this.lastY)
			this.moving = false;
		else
			this.moving = true;

		this.lastX = this.x;
		this.lastY = this.y;

		this.setNewPosition();
		this.checkBounds(xBounds, yBounds);

		this.updateMovementFrame();
	};
	
	user.prototype.draw = function() {
	
		var offsetX = 0, offsetY = 0;
		switch (this.direction) {
			case 0:
				offsetX = 1 + (this.movementFrame * spriteSize); //59
				offsetY = 55;
				break;
			case 1:
				offsetX = 1 + (this.movementFrame * spriteSize);
				offsetY = 1;
				break;
			case 2:
				offsetX = 1 + (this.movementFrame * spriteSize); //19
				offsetY = 19;
				break;
			case 3:
				offsetX = 1 + (this.movementFrame * spriteSize); //40
				offsetY = 37;
				break;
		    default:
		        offsetX = this.lastOffsetX;
		        offsetY = this.lastOffsetY;
		        break;
		}

		this.lastOffsetX = offsetX;
		this.lastOffsetY = offsetY;
		
		//ar spriteLocation = directionOffset;
	
		this.c.drawImage(this.img, 
			offsetX, 
			offsetY, 
			spriteSize, 
			spriteSize, 
			this.x, 
			this.y, 
			50, 
			50);
	};

	user.prototype.fire = function () {
	};

	context.Gauntra.User = user;
})(this);