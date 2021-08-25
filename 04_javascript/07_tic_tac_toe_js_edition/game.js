const Board = require('./board.js');
const HumanPlayer = require('./human_player.js');
const AIPlayer = require('./ai_player.js');

class Game {
  constructor(reader) {
    this.reader = reader;
    this.board = new Board();
    this.players = [
      new HumanPlayer(this.board, 'X'),
      new AIPlayer(this.board, 'O'),
    ];
  }

  swapTurn() {
    this.players.push(this.players.shift());
  }

  run(completionCallback) {
    this.board.print();

    if (this.board.won()) {
      console.log('Winner was player ', this.board.winner());
      completionCallback();
    } else if (this.board.full()) {
      console.log("It's a draw!");
      completionCallback();
    } else {
      this.players[0].promptMove(this.reader, (pos) => {
        if (this.board.placeMark(pos, this.players[0].mark)) {
          this.swapTurn();
        } else {
          console.log('Invalid move!');
        }
        this.run(completionCallback);
      });
    }
  }
}

module.exports = Game;
