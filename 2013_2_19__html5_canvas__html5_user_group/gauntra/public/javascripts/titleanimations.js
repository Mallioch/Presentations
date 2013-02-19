this.Gauntra.TitleParticles.Animations = function () {

    var TimeState = {
        phaseDurationMs: 3000, // how long does each animation phase take? (ms)
        phaseFloatNoLoop: 0,
        phaseFloatLooping: 0,
		phaseFloatUncapped: 0,
        startTs: Date.now(),
        elapsedMs: 0,
        
        update: function () {
            this.elapsedMs = Date.now()-this.startTs;

			this.phaseFloatUncapped = this.elapsedMs/this.phaseDurationMs;

            this.phaseFloat =
				(this.elapsedMs % this.phaseDurationMs)
					/this.phaseDurationMs;
			
            this.phaseFloatLoopable = Math.asin(this.phaseFloat); // need to look up correct technique
			
			//console.log(//"phaseFloatNoLoop:"
				//+ this.phaseFloatNoLoop
				//+ "\n"
				//"phaseFloatLoopable: "
			//	+ this.phaseFloatLoopable
		//	);	
        },

        reset: function() {
            this.startTs = Date.now();
            this.update();
        }
    }


    var animsObj = {
        // time & state calculation methods
        updateTimeState: function () {
            TimeState.update();
        },
        resetTimeState: function () {
            TimeState.reset();
        },

        // animation duration, progress, phase state info & methods
		simpleTween: function (startVal, endVal, progress) {
			var delta = endVal - startVal;
			delta *= progress;
			return (startVal+delta);
		},
        
        // planned: emmitting, shown, scattering, hidden
        // methods for calculating animation
        showingAnim: {
            update: function (particle) {
				if (Math.random() > animsObj.simpleTween(0.85, 0, TimeState.phaseFloatUncapped*0.75)) {
					particle.curX = particle.finalX + Math.floor(Math.random() * 1.4);
					particle.curY = particle.finalY + Math.floor(Math.random() * 1.4);
				}
				
				// that's long enough, let's do the next phase
				if (TimeState.phaseFloatUncapped > 1.3 && animsObj.animationPhase == "showingAnim") {
					animsObj.resetTimeState();
					animsObj.animationPhase = "scatterAnim";
				}
            }
        },

        hidingAnim: {
			drawBlack: function(context) {
				var opacity = TimeState.phaseFloatUncapped;
				if (opacity > 1) opacity = 1;
				canvasContext.fillStyle = "rgba(0,0,0,"+TimeState.phaseFloatUncapped+")";
				canvasContext.fillRect(0,0,573,150);
			},

            update: function (particle) {
				
				particle.curY = animsObj.simpleTween(particle.curY, 300, TimeState.phaseFloatUncapped);
	
				if (TimeState.phaseFloatUncapped > 0.4) {
					animsObj.resetTimeState();
					animsObj.animationPhase = "emitAnim";
				}
            }
        },

        scatterAnim: {
			
			setupHasRun: false,
			laserImgSource: "/images/titlelaser.png",
			laserImgReady: false,
			laserImgEl: null,
			
			setup: function() {
				this.setupHasRun = true;
				this.laserImgEl = document.createElement("img");
				this.laserImgEl.onload = function() {
					animsObj.scatterAnim.laserImgReady = true;	
				}
				this.laserImgEl.src = this.laserImgSource;
			},

			drawLaser: function(context) {
				
				if (!this.laserImgReady)
					return;
				
				var laserX = animsObj.simpleTween(573, 0, TimeState.phaseFloatUncapped);
				
				context.drawImage(this.laserImgEl, laserX, 25);
			},

            update: function (particle) {
			
				if (!this.setupHasRun)
					this.setup();

				// in addition to time, we will drive our
				// particle animation phase ahead or behind
				// based on x distance of particle being processed 
				var effectTimeFloat;			

				// calculate animation & store in particle
				if (!particle.otherX)
					particle.otherX = particle.finalX + Math.random()*-200;
				if (!particle.otherY)
					particle.otherY = particle.finalY + Math.acos(Math.random())*200;
			
				// horizontal offset
				var horizontalFloat = 1- particle.finalX / 573;
				if (horizontalFloat > TimeState.phaseFloatUncapped) {
					animsObj.showingAnim.update(particle);
					return;
				}
				else {
					effectTimeFloat = TimeState.phaseFloatUncapped - horizontalFloat; 
					particle.curX = animsObj.simpleTween(particle.finalX, particle.otherX, effectTimeFloat);
					particle.curY = animsObj.simpleTween(particle.finalY, particle.otherY, effectTimeFloat);
				}
		
				// that's long enough, let's do the next phase
				if (TimeState.phaseFloatUncapped > 2) {
					animsObj.resetTimeState();
					animsObj.animationPhase = "hidingAnim";
				}
            }
        },

        emitAnim: {
			setupHasRun: false,
			axeImgSource: "/images/titleaxe.png",
			axeImgReady: false,
			axeImgEl: null,
			
			setup: function() {
				this.setupHasRun = true;
				
				console.log("emitAnim setup running.");
				
				this.axeImgEl = document.createElement("img");
				this.axeImgEl.onload = function() {
					console.log("got an axe to grind");
					animsObj.emitAnim.axeImgReady = true;	
				}
				this.axeImgEl.src = this.axeImgSource;
			},

			drawAxe: function(context) {
				if (!this.axeImgReady)
					return;
				
				var axeX = animsObj.simpleTween(-43, 530, TimeState.phaseFloatUncapped);
				//var axeRotation = animsObj.simpleTween(0, 600, TimeState.phaseFloatUncapped); 

				// convert to correct units
				// transform the context
				context.save();
				context.translate(axeX, 75);
				context.rotate(TimeState.phaseFloatUncapped*Math.PI*2);
				context.drawImage(this.axeImgEl, -43, -45);
				context.restore();
				
			},

			
            update: function (particle) {
				if (!this.setupHasRun)
					this.setup();

				var effectTimeFloat;			

				// calculate destination & store in particle
				if (!particle.otherX)
					particle.otherX = particle.finalX + Math.random()*-200;
				if (!particle.otherY)
					particle.otherY = particle.finalY + Math.acos(Math.random())*200;

				// horizontal offset
				var horizontalFloat = particle.finalX / 573;
				if (horizontalFloat > TimeState.phaseFloatUncapped-0.15) {
					particle.curX = -10;
					particle.curY = -10;// offscreen
					return;
				}
				else {
					effectTimeFloat = TimeState.phaseFloatUncapped - horizontalFloat; 
					if (effectTimeFloat < 0) effectTimeFloat = 0;
					if (effectTimeFloat > 1) effectTimeFloat = 1;
				
					
					if (effectTimeFloat<1) {
					
						particle.curX = animsObj.simpleTween(
							animsObj.simpleTween(particle.finalX, particle.otherY, 0.1),
							particle.finalX,
							effectTimeFloat
						);
	
						particle.curY = animsObj.simpleTween(
							75,
							animsObj.simpleTween(
								animsObj.simpleTween(particle.finalY, 75, 0.5),
								particle.finalY,
								effectTimeFloat
							),
							effectTimeFloat*1.05
						);
					}
					else {
						particle = animsObj.showingAnim.update(particle);	
					}
				}

				// that's long enough, let's do the next phase
				if (TimeState.phaseFloatUncapped > 2.7) {
					animsObj.resetTimeState();
					animsObj.animationPhase = "showingAnim";
				}

            }
        },



    }

    return animsObj;

}();