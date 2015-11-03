(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};

  var DEFAULTRADIUS = 10;
  var DEFAULTCOLOR = "#FF0000";

  var Bullet = Asteroids.Bullet = Asteroids.Bullet || function (game, pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, game, pos, vel, DEFAULTRADIUS, DEFAULTCOLOR);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject)
})();
