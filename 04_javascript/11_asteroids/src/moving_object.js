const Utils = require('./utils.js');

function MovingObject({ game, pos, vel, radius, color }) {
  this.isWrappable = true;
  this.game = game;
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

MovingObject.prototype.move = function (timeDelta) {
  this.pos[0] += (this.vel[0] * timeDelta) / 16.6667;
  this.pos[1] += (this.vel[1] * timeDelta) / 16.6667;

  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  return (
    Utils.distance(this.pos, otherObject.pos) < this.radius + otherObject.radius
  );
};

module.exports = MovingObject;
