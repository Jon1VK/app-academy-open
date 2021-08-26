function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.lastTime = 0;
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (currentTime) {
  this.game.draw(this.ctx);
  this.game.step(currentTime - this.lastTime);
  this.lastTime = currentTime;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  key('up, w', () => this.game.ship.power([0, -1]));
  key('left, a', () => this.game.ship.power([-1, 0]));
  key('down, s', () => this.game.ship.power([0, 1]));
  key('right, d', () => this.game.ship.power([1, 0]));

  key('space', () => this.game.ship.fireBullet());
};

module.exports = GameView;
