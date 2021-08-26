const Utils = require('./utils.js');
const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game() {
  this.img = new Image();
  this.img.src = './space.jpg';
  this.asteroids = [];
  this.addAsteroids();
  this.bullets = [];
  this.ship = new Ship({
    game: this,
    pos: this.randomPosition(),
  });
}

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.add(
      new Asteroid({
        game: this,
        pos: this.randomPosition(),
      })
    );
  }
};

Game.prototype.allObjects = function () {
  return [...this.asteroids, ...this.bullets, this.ship];
};

Game.prototype.add = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  }
};

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(object), 1);
  } else if (object instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(object), 1);
  }
};

Game.prototype.step = function (timeDelta) {
  this.checkCollisions();
  this.moveObjects(timeDelta);
};

Game.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((object) => object.draw(ctx));
};

Game.prototype.moveObjects = function (timeDelta = 16.6667) {
  this.allObjects().forEach((object) => object.move(timeDelta));
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.asteroids.length; i++) {
    const asteroid = this.asteroids[i];

    if (this.ship.isCollidedWith(asteroid)) {
      this.ship.collideWith(asteroid);
    }

    for (let j = 0; j < this.bullets.length; j++) {
      const bullet = this.bullets[j];

      if (bullet.isCollidedWith(asteroid)) {
        bullet.collideWith(asteroid);
      }
    }
  }
};

Game.prototype.randomPosition = function () {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.isOutOfBounds = function (pos) {
  return pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y;
};

Game.prototype.wrap = function (pos) {
  return [Utils.mod(pos[0], Game.DIM_X), Utils.mod(pos[1], Game.DIM_Y)];
};

module.exports = Game;
