(function(exports) {

    var drawingSpace = self = {
        init: function(c, width, height) {
            this.c = c;
            this.width = width;
            this.height = height;
            this.objects = [];
        },

        drawLoop: function() {
            if (!self.objects)
                return;

            self.c.clearRect(0, 0, self.width, self.height);
            for (var i = 0; i < self.objects.length; i++) {
                //mainCanvasContext.strokeStyle = 'rgba(255, 0, 0, .1)';
                //objects[i].drawOutline();

                self.c.strokeStyle = 'rgba(0, 0, 0, 1)';
                self.c.lineWidth = 2;
                self.objects[i].draw();
            }
            if (self.blackAndWhite) {
                console.log('b&w');
                self.repaintBlackAndWhite();
            }

            window.requestAnimationFrame(self.drawLoop);
        },

        addObject: function(obj) {
            this.objects.push(obj);
            console.log('current objects', obj);
        },

        getObjectAtPoint: function(pt) {
            for (var i = 0; i < self.objects.length; i++) {
                var obj = self.objects[i];
                if (obj.pointInBounds(pt)) {
                    return obj;
                }
            }
            return null;
        },

        click: function(pt) {
            var obj = this.getObjectAtPoint(pt);

            if (obj)
                obj.selected = !obj.selected;

        },

        mousedown: function(pt) {
            var obj = this.getObjectAtPoint(pt);
            if (!obj || !obj.selected)
                return;
            this.currentlyMovingObject = obj;
            obj.moving = true;
            obj.mouseOffset = pt;
            console.log('mousedown', pt);
        },

        mousemove: function(pt) {
            //var obj = this.getObjectAtPoint(pt);
            if (this.currentlyMovingObject) {
                this.currentlyMovingObject.moveTo(pt);
            }
        },

        mouseup: function(pt) {
            var obj = this.getObjectAtPoint(pt);
            if (!obj)
                return;
            obj.moving = false;
            obj.mouseOffset = null;
            this.currentlyMovingObject = null;
            console.log('mouseup', obj);
        },

        repaintBlackAndWhite: function() {
            //console.log('repainting');

            var imageData = this.c.getImageData(0, 0, 
                this.width, this.height);

            //console.log('length', imageData);
            for (var i = 0; i < imageData.data.length + 4; i += 4) {
                var red = imageData.data[i],
                    green = imageData.data[i + 1],
                    blue = imageData.data[i + 2];

                var gray = parseInt(red + green + blue) / 3;
                imageData.data[i] = gray;
                imageData.data[i + 1] = gray;
                imageData.data[i + 2] = gray;
            }

            this.c.putImageData(imageData, 0, 0);
        }
    }

    window.requestAnimationFrame(drawingSpace.drawLoop);

    exports.DrawingSpace = drawingSpace;

})(window.Diag);