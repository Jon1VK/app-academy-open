const Utils = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');

function Bullet({ game, pos, vel }) {
  MovingObject.call(this, {
    game,
    pos,
    vel,
    color: Bullet.COLOR,
    radius: Bullet.RADIUS,
  });

  this.isWrappable = false;
}

Bullet.COLOR = 'red';
Bullet.RADIUS = 2;

Utils.inherits(Bullet, MovingObject);

Bullet.prototype.collideWith = function (asteroid) {
  this.game.remove(asteroid);
  this.game.remove(this);
};

module.exports = Bullet;
