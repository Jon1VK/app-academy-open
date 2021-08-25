class HumanPlayer {
  constructor(board, mark) {
    this.board = board;
    this.mark = mark;
  }

  promptMove(reader, callback) {
    console.log('Player ', this.mark);
    reader.question('Where do you want to place your mark? ', (answer) => {
      const pos = answer.split(' ').map((input) => parseInt(input));
      callback(pos);
    });
  }
}

module.exports = HumanPlayer;
