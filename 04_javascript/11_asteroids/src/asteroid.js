const Utils = require('./utils.js');
const MovingObject = require('./moving_object.js');

function Asteroid({ game, pos }) {
  MovingObject.call(this, {
    game,
    pos,
    vel: Utils.randomVec(2),
    radius: Asteroid.RADIUS,
    color: Asteroid.COLOR,
  });
}

Utils.inherits(Asteroid, MovingObject);
Asteroid.COLOR = 'darkgray';
Asteroid.RADIUS = 20;

module.exports = Asteroid;
