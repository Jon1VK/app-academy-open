// DON'T TOUCH THIS CODE
if (typeof window === 'undefined') {
  var Piece = require('./piece');
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid() {
  const grid = [...Array(8)].map(() => [...Array(8)]);

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board() {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const [row, col] = pos;
  return 0 <= row && row < 8 && 0 <= col && col < 8;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw new Error('Not valid pos!');
  }

  const [row, col] = pos;
  return this.grid[row][col];
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  return this.getPiece(pos)?.color == color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.getPiece(pos);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (
  pos,
  color,
  dir,
  positionsToFlip = []
) {
  const newPos = pos.map((coord, i) => coord + dir[i]);

  if (!this.isValidPos(newPos) || !this.isOccupied(newPos)) {
    return [];
  }

  if (this.getPiece(newPos).color == color) {
    return positionsToFlip;
  }

  positionsToFlip.push(newPos);
  return this._positionsToFlip(newPos, color, dir, positionsToFlip);
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  return (
    !this.isOccupied(pos) &&
    Board.DIRS.some((dir) => this._positionsToFlip(pos, color, dir).length > 0)
  );
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) {
    throw new Error('Invalid move!');
  }

  const [row, col] = pos;
  this.grid[row][col] = new Piece(color);
  Board.DIRS.forEach((dir) =>
    this._positionsToFlip(pos, color, dir).forEach((pos) =>
      this.getPiece(pos).flip()
    )
  );
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  const positions = [];
  for (let row = 0; row < this.grid.length; row++) {
    for (let col = 0; col < this.grid[0].length; col++) {
      const pos = [row, col];
      if (this.validMove(pos, color)) {
        positions.push(pos);
      }
    }
  }
  return positions;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove('white') && !this.hasMove('black');
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log('  0 1 2 3 4 5 6 7');
  this.grid.forEach((row, i) => {
    console.log(
      row.reduce((str, piece) => {
        return str + (piece == null ? '  ' : ` ${piece}`);
      }, `${i}`)
    );
  });
};

// DON'T TOUCH THIS CODE
if (typeof window === 'undefined') {
  module.exports = Board;
}
// DON'T TOUCH THIS CODE
