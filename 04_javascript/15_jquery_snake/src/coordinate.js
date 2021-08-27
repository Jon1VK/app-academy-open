class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(coordinate) {
    this.x += coordinate.x;
    this.y += coordinate.y;
  }

  moveTo(coordinate) {
    this.x = coordinate.x;
    this.y = coordinate.y;
  }

  equals(coordinate) {
    return this.x == coordinate.x && this.y == coordinate.y;
  }

  isOpposite(coordinate) {
    return this.x == -coordinate.x && this.y == -coordinate.y;
  }
}

Coordinate.random = (size) => {
  const x = Math.floor(Math.random() * size);
  const y = Math.floor(Math.random() * size);
  return new Coordinate(x, y);
};

module.exports = Coordinate;
