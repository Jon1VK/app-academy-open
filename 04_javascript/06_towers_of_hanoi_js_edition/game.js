class Game {
  constructor(reader, cb) {
    this.reader = reader;
    this.cb = cb;
    this.towers = [[3, 2, 1], [], []];
  }

  promptMove(cb) {
    this.print();
    this.reader.question('Move plate `from to` > ', (input) => {
      const [from, to] = input.split(' ').map((s) => parseInt(s));
      cb(from, to);
    });
  }

  isValidMove(from, to) {
    const fromTower = this.towers[from];
    const plate1 = fromTower[fromTower.length - 1];

    const toTower = this.towers[to];
    const plate2 = toTower[toTower.length - 1];

    return plate1 && (!plate2 || plate1 < plate2);
  }

  move(from, to) {
    if (this.isValidMove(from, to)) {
      const [fromTower, toTower] = [this.towers[from], this.towers[to]];
      toTower.push(fromTower.pop());
      return true;
    }
    return false;
  }

  print() {
    console.log(JSON.stringify(this.towers));
  }

  isWon() {
    return this.towers[1].length == 3 || this.towers[2].length == 3;
  }

  run() {
    this.promptMove((from, to) => {
      if (this.move(from, to)) {
        if (!this.isWon()) {
          this.run();
        } else {
          console.log('You won!');
          this.cb();
        }
      } else {
        throw new Error('Invalid move!');
      }
    });
  }
}

module.exports = Game;
