(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var DEFAULTCOLOR = "#9a8262";

  var DEFAULTRADIUS = 100;

  var randomVel = function(length) {
    var dx = (Math.random() * length) - 1;
    var dy = (Math.random() * length) - 1;
    return [dx,dy];
  };

  var Asteroid = Asteroids.Asteroid = function (game, pos){
    Asteroids.MovingObject.call(this, game, pos, randomVel(1), DEFAULTRADIUS,DEFAULTCOLOR)
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
})();
