window.Gauntra.GameStateCreator = (function(context) {

		var gameState = context.Gauntra.GameState = {
			count: 0,
			users: [],
			projectiles: {}
		};
		var canvas = document.getElementById('primaryCanvas');
		var userSprite = document.getElementById('heroSprite');
		var background = document.getElementById('background-plain-gray');
		var c = canvas.getContext('2d');
		var width = canvas.offsetWidth;
		var height = canvas.offsetHeight;
		var lastDirection = 3;
		var projectileNumber = 0;

		var currentUser = new window.Gauntra.User(c, 'mallioch', userSprite);
		gameState.users.push(currentUser);

    //setInterval(updateLoop, 16);
		updateLoop();
		drawLoop();
		//setInterval(drawLoop, 16);

		var hasBeenCalled = false;
		
		function updateLoop() {
		    $('#stuff').empty();

			width = canvas.width;
			height = canvas.height;

			var keyCommands = context.Gauntra.KeyManager.getKeyCommands();

			currentUser.facingDirection = keyCommands.direction || lastDirection;
			currentUser.direction = keyCommands.direction;
			currentUser.update(width, height);

			if (keyCommands.direction != -1) {
			    lastDirection = keyCommands.direction;
			}

			if (keyCommands.fireProjectile) {
			    fireProjectile();
			}

			var projectilesToRemove = {};
            for (var key in gameState.projectiles) {
			    gameState.projectiles[key].update();

			    if (gameState.projectiles[key].isOutOfRange())
			        delete gameState.projectiles[key];
            }
            setTimeout(updateLoop, 16);
		}

		var lastProjectileFireTime = new Date();

		function fireProjectile() {

		    if (new Date() - lastProjectileFireTime < 300)
		        return;

		    var stuff = $('#stuff');
		    //stuff.append('<li>lastDirection: ' + lastDirection + '</li>');
		    console.log('lastDirection', lastDirection, currentUser.y);

		    lastProjectileFireTime = new Date();

		    var projectile = new context.Gauntra.Projectile(
                currentUser.x,
                currentUser.y,
                lastDirection,
                c,
                heroSprite);
		    context.Gauntra.GameState.projectiles[projectileNumber] = projectile;
		    projectileNumber++;
		    //console.log('lastProjectile', lastProjectile, new Date() - lastProjectile);
		    //lastProjectile = new Date();
		}
		
		//console.log('background', background, width, height, canvas.offsetWidth, canvas.offsetHeight);
		
		function drawLoop() {

			c.clearRect(0, 0, width, height);
			
			var fillPattern = c.createPattern(background, 'repeat');
			c.fillStyle = fillPattern;
			
		
			
			c.fillRect(0, 0, width, height);
			for (var i = 0; i < gameState.users.length; i++) {
				gameState.users[i].draw();
			}

            for (var key in gameState.projectiles) {
			    gameState.projectiles[key].draw();
			}

            setTimeout(drawLoop, 16);
		}
		
		console.log(gameState);
});