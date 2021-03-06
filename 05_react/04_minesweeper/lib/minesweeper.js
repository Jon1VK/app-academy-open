export class Tile {
  constructor(board, pos) {
    this.board = board;
    this.pos = pos;
    this.bombed = false;
    this.explored = false;
    this.flagged = false;
  }

  adjacentBombCount() {
    let bombCount = 0;
    this.neighbors().forEach((neighbor) => {
      if (neighbor.bombed) {
        bombCount++;
      }
    });
    return bombCount;
  }

  explore() {
    if (this.flagged || this.explored) {
      return this;
    }

    this.explored = true;
    if (!this.bombed && this.adjacentBombCount() === 0) {
      this.neighbors().forEach((tile) => {
        tile.explore();
      });
    }
  }

  reveal() {
    this.flagged = false;
    this.explored = true;
  }

  neighbors() {
    const adjacentCoords = [];
    Tile.DELTAS.forEach((delta) => {
      const newPos = [delta[0] + this.pos[0], delta[1] + this.pos[1]];
      if (this.board.onBoard(newPos)) {
        adjacentCoords.push(newPos);
      }
    });

    return adjacentCoords.map((coord) => this.board.grid[coord[0]][coord[1]]);
  }

  plantBomb() {
    this.bombed = true;
  }

  toggleFlag() {
    if (!this.explored) {
      this.flagged = !this.flagged;
      return true;
    }

    return false;
  }
}

Tile.DELTAS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export class Board {
  constructor(width, height, numBombs) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.numBombs = numBombs;
    this.generateBoard();
    this.plantBombs();
  }

  generateBoard() {
    for (let i = 0; i < this.height; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.width; j++) {
        const tile = new Tile(this, [i, j]);
        this.grid[i].push(tile);
      }
    }
  }

  onBoard(pos) {
    return (
      pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width
    );
  }

  plantBombs() {
    let totalPlantedBombs = 0;
    while (totalPlantedBombs < this.numBombs) {
      const row = Math.floor(Math.random() * (this.height - 1));
      const col = Math.floor(Math.random() * (this.width - 1));

      let tile = this.grid[row][col];
      if (!tile.bombed) {
        tile.plantBomb();
        totalPlantedBombs++;
      }
    }
  }

  revealAll() {
    this.grid.forEach((row) => row.forEach((tile) => tile.reveal()));
  }

  lost() {
    let lost = false;
    this.grid.forEach((row) => {
      row.forEach((tile) => {
        if (tile.bombed && tile.explored) {
          lost = true;
        }
      });
    });
    return lost;
  }

  won() {
    let won = true;
    this.grid.forEach((row) => {
      row.forEach((tile) => {
        if (tile.flagged === tile.revealed || tile.flagged !== tile.bombed) {
          won = false;
        }
      });
    });
    return won;
  }
}
