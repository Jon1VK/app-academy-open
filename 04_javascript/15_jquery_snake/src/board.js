const Snake = require('./snake');
const Coordinate = require('./coordinate');

class Board {
  constructor() {
    this.size = 20;
    this.snake = new Snake();
    this.apple = null;
    this.newApple();
  }

  step() {
    this.snake.move();

    if (this.snake.inCoordinate(this.apple)) {
      this.snake.grow();
      this.newApple();
    } else if (this.outOfBounds() || this.snake.hitsItself()) {
      return false;
    }

    return true;
  }

  outOfBounds() {
    const { x, y } = this.snake.head();
    return x < 0 || x >= this.size || y < 0 || y >= this.size;
  }

  newApple() {
    let coordinate = Coordinate.random(this.size);

    while (this.snake.inCoordinate(coordinate)) {
      coordinate = Coordinate.random(this.size);
    }

    this.apple = coordinate;
  }
}

module.exports = Board;
