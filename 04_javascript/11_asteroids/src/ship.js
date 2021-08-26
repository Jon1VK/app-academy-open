const Utils = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

function Ship({ game, pos }) {
  MovingObject.call(this, {
    game,
    pos,
    vel: [0, 0],
    radius: Ship.RADIUS,
    color: Ship.COLOR,
  });
}

Ship.COLOR = 'violet';
Ship.RADIUS = 10;

Utils.inherits(Ship, MovingObject);

Ship.prototype.collideWith = function (asteroid) {
  this.relocate();
};

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  if (this.vel !== [0, 0]) {
    this.game.add(
      new Bullet({
        game: this.game,
        pos: [...this.pos],
        vel: Utils.scale(this.vel, 10),
      })
    );
  }
};

module.exports = Ship;
