const Coordinate = require('./coordinate');

DIRECTIONS = {
  N: new Coordinate(0, -1),
  E: new Coordinate(1, 0),
  S: new Coordinate(0, 1),
  W: new Coordinate(-1, 0),
};

class Snake {
  constructor() {
    this.direction = 'E';
    this.segments = [new Coordinate(1, 1)];
  }

  head() {
    return this.segments[0];
  }

  tail() {
    return this.segments[this.segments.length - 1];
  }

  move() {
    for (let i = this.segments.length - 1; i > 0; i--) {
      this.segments[i].moveTo(this.segments[i - 1]);
    }

    this.head().plus(DIRECTIONS[this.direction]);
  }

  turn(direction) {
    if (!DIRECTIONS[direction].isOpposite(DIRECTIONS[this.direction])) {
      this.direction = direction;
    }
  }

  grow() {
    const { x, y } = this.tail();
    this.segments.push(new Coordinate(x, y));
    this.segments.push(new Coordinate(x, y));
  }

  hitsItself() {
    return this.segments
      .slice(1)
      .some((segment) => segment.equals(this.head()));
  }

  inCoordinate(coordinate) {
    return this.segments.some((segment) => segment.equals(coordinate));
  }
}

module.exports = Snake;
