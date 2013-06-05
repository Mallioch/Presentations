(function (context) {

    var keys = {};

    $(document).keydown(function (e) {
        keys[e.which] = true;
    });

    $(document).keyup(function (e) {
        delete keys[e.which];
    });

    var keyManager = {

        getDirection: function () {
            var direction = -1;

            if (keys) {

                var up = !!keys[38],
                    left = !!keys[37],
                    right = !!keys[39],
                    down = !!keys[40];

                if (up && left) {
                    direction = 4;
                }
                else if (up && right) {
                    direction = 5;
                }
                else if (down && right) {
                    direction = 6;
                }
                else if (down && left) {
                    direction = 7;
                }
                else if (left) {
                    direction = 0;
                }
                else if (up) {
                    direction = 1;
                }
                else if (right) {
                    direction = 2;
                }
                else if (down) {
                    direction = 3;
                }
                else {
                    direction = -1;
                }
            }

            return direction;
        },

        getKeyCommands: function () {

            var commands = {};

            var direction = keyManager.getDirection();
            commands.direction = direction;

            if (keys && !!keys[32])
                commands.fireProjectile = true;

            return commands;
        }
    }

    function move() {

        $('ul li').removeClass('pressed');
        var changeAmount = 5;
        

        if (keys) {
        }
    }

    context.Gauntra.KeyManager = keyManager;

})(this);