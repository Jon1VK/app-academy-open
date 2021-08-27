const { marks } = require("./ttt/board");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on('click', 'li', (event) => this.makeMove($(event.target)));
  }

  makeMove($square) {
    try {
      const currentPlayer = this.game.currentPlayer;

      this.game.playMove($square.data('pos'));

      $square.html(`<span>${currentPlayer}</span>`);
      $square.addClass('mark-' + currentPlayer);
      $square.removeClass('unmarked');

      if (this.game.isOver()) {
        this.gameOver();
      }
    } catch (error) {
      alert("Position already taken!");
    }
  }

  gameOver() {
    const winner = this.game.winner();

    const marks = this.$el.find('li');
    marks.removeClass('unmarked');
    marks
      .filter('.mark-' + winner)
      .addClass('winner');
    marks
      .not('.mark-' + winner)
      .addClass('loser');
    $('<figcaption>')
      .text(winner ? `You win, ${winner}!` : "It's a draw!")
      .appendTo(this.$el);
    this.$el.off('click');
  }

  setupBoard() {
    const $board = $('<ul>');

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        $('<li>')
          .data('pos', [row, col])
          .addClass('unmarked')
          .appendTo($board);
      }
    }

    this.$el.append($board);
  }
}

module.exports = View;
