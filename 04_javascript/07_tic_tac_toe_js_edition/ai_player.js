class AIPlayer {
  constructor(board, mark) {
    this.board = board;
    this.mark = mark;
  }

  promptMove(reader, callback) {
    console.log('Player ', this.mark);
    console.log('Where do you want to place your mark? ');
    const emptyPositions = this.board.emptyPositions();
    const randomPos =
      emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    callback(randomPos);
  }
}

module.exports = AIPlayer;
