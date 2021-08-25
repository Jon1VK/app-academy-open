class Board {
  constructor() {
    this.board = [...Array(3)].map(() => [...Array(3)]);
  }

  won() {
    return !!this.winner();
  }

  full() {
    return this.rows().every((row) => row.every((mark) => !!mark));
  }

  valid(pos) {
    return 0 <= pos[0] && pos[0] <= 2 && 0 <= pos[1] && pos[1] <= 2;
  }

  empty(pos) {
    return this.board[pos[0]][pos[1]] === undefined;
  }

  emptyPositions() {
    const positions = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const pos = [row, col];
        if (this.empty(pos)) {
          positions.push(pos);
        }
      }
    }
    return positions;
  }

  placeMark(pos, mark) {
    if (this.valid(pos) && this.empty(pos)) {
      this.board[pos[0]][pos[1]] = mark;
      return true;
    }
    return false;
  }

  winner() {
    const winLines = [...this.rows(), ...this.cols(), ...this.diags()];
    for (const line of winLines) {
      if (line.every((mark) => !!mark && mark === line[0])) {
        return line[0];
      }
    }
  }

  rows() {
    return this.board;
  }

  cols() {
    const columns = [[], [], []];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        columns[col][row] = this.board[row][col];
      }
    }
    return columns;
  }

  diags() {
    const diagonals = [[], []];
    for (let i = 0; i < 3; i++) {
      diagonals[0][i] = this.board[i][i];
      diagonals[1][i] = this.board[i][this.board.length - 1 - i];
    }
    return diagonals;
  }

  print() {
    this.rows().forEach((row) =>
      console.log(row.map((mark) => (!!mark ? mark : '_')))
    );
  }
}

module.exports = Board;
