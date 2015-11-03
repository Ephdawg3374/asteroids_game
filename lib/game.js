;(function() {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var Game = Asteroids.Game = Asteroids.Game || function(NUM_ASTEROIDS) {
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.NUM_ASTEROIDS =NUM_ASTEROIDS;

    this.asteroids = [];
    this.addAsteroids();

    this.ship = new Asteroids.Ship(this, this.randomPos());

    this.bullets = [];
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(obj);
      this.asteroids.splice(idx, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      var idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    }
  };

  Game.prototype.randomPos = function () {
    var dx = (Math.random() * this.DIM_X) - 1;
    var dy = (Math.random() * this.DIM_Y) - 1;
    return [dx, dy];
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; ++i) {
      var new_asteroid = new Asteroids.Asteroid(this, this.randomPos());

      this.asteroids.push(new_asteroid);
    };
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    this.allObjects().forEach (function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach (function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] >= 0) {
      var x = pos[0] % this.DIM_X;
    } else {
      var x = this.DIM_X;
    }

    if (pos[1] >= 0) {
      var y = pos[1] % this.DIM_Y;
    } else {
      var y = this.DIM_Y;
    }
    return [x,y];
  };

  Game.prototype.checkCollision = function() {
    var allObjs = this.allObjects();

    for (var i = 0; i < allObjs.length; i++) {
      var currentObj = allObjs[i];

      for (var j = 0; j < allObjs.length; j++) {
        var otherObj = allObjs[j];

        if (currentObj !== otherObj) {
          if (currentObj.isCollidedWith(otherObj)) {
            if (currentObj instanceof Asteroids.Ship) {
                currentObj.relocate();
            } else if ((currentObj instanceof Asteroids.Bullet) &&
                        !(otherObj instanceof Asteroids.Ship)) {
              currentObj.collideWith(otherObj)
            }
          }
        }
      };
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollision();
  };

  Game.prototype.allObjects = function () {
    var allAsteroids = this.asteroids.slice();
    var allBullets = this.bullets.slice();
    var allObj = allAsteroids.concat(allBullets);
    allObj.push(this.ship);

    return allObj;
  }

})();
