const Board = require('./board');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.renderGrid();
    this.bindKeypressHandler();
    this.run();
  }

  run() {
    this.render();
    this.animationInterval = setInterval(() => this.step(), 100);
  }

  step() {
    if (this.board.step()) {
      this.render();
    } else {
      clearInterval(this.animationInterval);
      $(document).off('keydown');
      alert('Game over!');
    }
  }

  renderGrid() {
    const $grid = $('<ul>');

    for (let row = 0; row < this.board.size; row++) {
      for (let col = 0; col < this.board.size; col++) {
        $grid.append($('<li>').addClass(`pos-${row}-${col}`));
      }
    }

    this.$el.append($grid);
  }

  render() {
    $('.segment').removeClass('segment');

    this.board.snake.segments.forEach((coordinate) => {
      $(`.pos-${coordinate.y}-${coordinate.x}`).addClass('segment');
    });

    const apple = this.board.apple;

    $('.apple').removeClass('apple');
    $(`.pos-${apple.y}-${apple.x}`).addClass('apple');
  }

  bindKeypressHandler() {
    const keyCodes = {
      ArrowLeft: 'W',
      ArrowUp: 'N',
      ArrowRight: 'E',
      ArrowDown: 'S',
      a: 'W',
      w: 'N',
      d: 'E',
      s: 'S',
    };

    $(document).on('keydown', (event) => {
      const keyCode = event.key;

      if (keyCode in keyCodes) {
        this.board.snake.turn(keyCodes[keyCode]);
      }
    });
  }
}

module.exports = View;
