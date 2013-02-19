this.Gauntra.TitleParticles = function() {

	// just some simple pixels, replaced by image
	var particleColors = [],
		particleArray = [],
		
		canvasElement,
		canvasContext,
		
        // particle-to-canvas translation values
		particleSize = 3,
		xOffset = 0,
		yOffset = 0,
		
        // animation time tracking
		
		frameDelay = 25,

		backgroundColor = "rgba(0, 0, 0, 1.0)",

		nextTimeout = null,
		Animations = null; // not ready per load sequence

	var TitleParticles = {

		playing: false,
		
		init: function() {
			canvasElement = document.getElementById("titleparticles");
			canvasContext = canvasElement.getContext('2d');
			
			setUpParticleArray("/images/gauntra.png");
			
			Animations = window.Gauntra.TitleParticles.Animations; // ready at this point
			Animations.animationPhase = "emitAnim"
		},
		
		play: function() {
			TitleParticles.playing = true;
			TitleParticles.schedule_next_frame();
		},
		
		pause: function() {
			TitleParticles.playing = false; 
		},
		
		shutdown: function() {
			
			console.log("shutting down particles");
			TitleParticles.playing = false;
			if (TitleParticles.nextTimeout) {
				clearInterval(TitleParticles.nextTimeout);
				TitleParticles.nextTimeout = null;
			}
			particleArray = []; // dealloc big chunk of memory
			
		},

		schedule_next_frame: function() {
			if (TitleParticles.playing)
				TitleParticles.nextTimeout = setTimeout(performUpdateAndDraw, frameDelay);
		}
	}

	// here is our particle structure
	/* 
	{
		color,
		curX,
		curY,
		finalX,
		finalY,
		otherX,
		otherY,
	}
	*/




	function drawParticlesToCanvas() {
		
		// clear canvas
		canvasContext.fillStyle = backgroundColor;
		canvasContext.fillRect(0,0,573,150);
		
		if (Animations.animationPhase == "scatterAnim")
			Animations.scatterAnim.drawLaser(canvasContext);
		
		
		// step through array
		for (var i=0; i<particleArray.length; i++) {
		    if (particleArray[i].color != backgroundColor) { // don't create particles for invisible colors
				
				canvasContext.fillStyle = particleArray[i].color;
					
				canvasContext.fillRect(
					particleArray[i].curX,
					particleArray[i].curY,
					particleSize,
					particleSize
				);
			}
		}
		
		if (Animations.animationPhase == "emitAnim")
			Animations.emitAnim.drawAxe(canvasContext);
			
		//if (animationPhase == "hidingAnim") // used to fade out
		//	Animations.hidingAnim.drawBlack(canvasContext);
		
    }
	
	function performUpdateAndDraw() {

		updateParticleValues();
		drawParticlesToCanvas();
	
		TitleParticles.schedule_next_frame();
	}


	function updateParticleValues() {

    	var particle;
        Animations.updateTimeState();

        for (var p = 0; p < particleArray.length; p++ ) {
		    particle = particleArray[p];

	        switch (Animations.animationPhase) {
	            case "showingAnim":
	                Animations.showingAnim.update(particle);
	                break;
	            case "scatterAnim":
	                Animations.scatterAnim.update(particle);
	                break;
					
	            case "emitAnim":
	                Animations.emitAnim.update(particle);
	                break;

	            case "hidingAnim":
	                Animations.hidingAnim.update(particle);
	                break;


	            default:
	                //console.log("no valid animation phase specified");
	        }

		}
	}

	function setUpParticleArray(imageUrl) {

	    if (imageUrl) {
	        loadParticleColorsFromUrl(imageUrl); // this method schedules a callback upon image load
	        return;
	    }

        var p = 0,
            color;

		// set values for coordinates of array
		for (var x=0; x<particleColors.length; x++) {
		    for (var y = 0; y < particleColors[0].length; y++) {

		        color = particleColors[x][y];

		        if (color != "rgba(0,0,0, 1.0)") {

		            particleArray[p] = {
		                color: color,
		                finalX: (x * particleSize) + xOffset,
		                finalY: (y * particleSize) + yOffset
		            }

		            p++;
		        }
			}
		}
	}

	function loadParticleColorsFromUrl(imageUrl) {
		var imgEl = document.createElement("img"),
			canvasEl = document.createElement("canvas"),
			width = 0,
			height = 0,
			pixelData;
		
		imgEl.onload = function() {
			
			document.getElementById("titleparticlescratch").appendChild(imgEl);
			document.getElementById("titleparticlescratch").appendChild(canvasEl);
			
			width = imgEl.naturalWidth;
			height = imgEl.naturalHeight;

			canvasEl.setAttribute("width", width);
			canvasEl.setAttribute("height", height);
			
			var context = canvasEl.getContext('2d');
			context.drawImage(imgEl, 0, 0);
			pixelData = context.getImageData(0, 0, width, height).data;
			
			var x,
				y,
				slot,
				red,
				green,
				blue,
				rowData,
				pixelColorString;
			
			for (x=0; x<width; x++) {
				rowData = [];
				for (y=0; y<height; y++) {
					slot = (y*width + x) * 4;
					red = pixelData[slot+0] || 0;
					green = pixelData[slot+1] || 0;
					blue = pixelData[slot+2] || 0;
					pixelColorString = "rgba("+red+","+green+","+blue+", 1.0)";
					rowData.push(pixelColorString);
				}
				particleColors[x] = rowData;
			}
			
			setUpParticleArray();
			particleColors = []; // dealloc
		}
		imgEl.src = imageUrl;
	}


	return(TitleParticles);

}();