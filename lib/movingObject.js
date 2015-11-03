;(function () {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function (game, pos, vel, radius, color){
    this.game = game;
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.draw = function(ctx){
    // var canvas = document.getElementById('game-canvas');
    // if (canvas.getContext{
    //   var ctx = canvas.getContext('2d');
    // };
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.radius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  MovingObject.prototype.move = function () {
    var dx = this.vel[0];
    var dy = this.vel[1];

    var updatedX = this.pos[0] + dx;
    var updatedY = this.pos[1] + dy;

    var updatedPos = this.game.wrap([updatedX, updatedY]);

    this.pos[0] = updatedPos[0];
    this.pos[1] = updatedPos[1];

    if (this instanceof Asteroids.Ship) {
      this.reduceVelocity(.25);
    }
  };

  MovingObject.prototype.reduceVelocity = function (n) {
    if (this.vel[0] > 0) {
      this.vel[0] -= n;
    } else if (this.vel[0] < 0) {
      this.vel[0] += n;
    }

    if (this.vel[1] > 0) {
      this.vel[1] -= n;
    } else if (this.vel[1] < 0) {
      this.vel[1] += n;
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var distance = Math.sqrt(
      Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2)
    );

    var totalRadiiDistance = this.radius + otherObject.radius;

    if (distance <= totalRadiiDistance) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
  };

})();
