;(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var DEFAULTRADIUS = 50;

  var DEFAULTCOLOR = "#0000FF";

  var bulletVelocity = function () {
    switch (window.lastkeystroke) {
      case 'w':
        return [0,-10];
      case 'a':
        return [-20,0];
      case 's':
        return [0,20];
      case 'd':
        return [20,0];
      default:
        return [20,0];
    };
  };

  var Ship = Asteroids.Ship = Asteroids.Ship || function (game, randomPos) {
    Asteroids.MovingObject.call(this, game, randomPos, [0,0], DEFAULTRADIUS, DEFAULTCOLOR);
  };

  // INHERIT FIRST, THEN ADD METHODS TO SHIP PROTOTYPE!!

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
  };

  Ship.prototype.power = function (impulse) {
    var dx = this.vel[0] + impulse[0];
    var dy = this.vel[1] + impulse[1];

    this.vel = [dx, dy]

    this.move();
  };

  Ship.prototype.fireBullet = function () {
    var newBullet = new Asteroids.Bullet(this.game, this.pos, bulletVelocity());

    this.game.bullets.push(newBullet);
  };
})();
