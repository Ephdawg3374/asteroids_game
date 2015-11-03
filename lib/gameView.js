;(function() {

  var Asteroids = window.Asteroids = window.Asteroids || {};

  var GameView = Asteroids.GameView = Asteroids.GameView || function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    window.key('w', function() {
      window.newGame.ship.power([0,-4]);
      window.lastkeystroke = 'w';
    });

    window.key('a', function() {
      window.newGame.ship.power([-4,0]);
      window.lastkeystroke = 'a';
    });

    window.key('s', function() {
      window.newGame.ship.power([0,4]);
      window.lastkeystroke = 's';
    });

    window.key('d', function() {
      window.newGame.ship.power([4,0]);
      window.lastkeystroke = 'd';
    });

    window.key('space', function() {
      window.newGame.ship.fireBullet();
    });
  };

  GameView.prototype.start = function () {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    // var ctx = canvasEl.getContext("2d");
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);
    }).bind(this), 20);

    this.bindKeyHandlers();
  };
})();
