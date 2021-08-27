function View(game, $el) {
  this.game = game;
  this.$el = $el;
  this.selectedTowerIdx = null;
  this.render();
  this.addEventHandlers();
}

View.prototype.addEventHandlers = function () {
  this.$el.on('click', 'ul', this.handleClick.bind(this));
};

View.prototype.handleClick = function (event) {
  const $tower = $(event.currentTarget);
  const towerIdx = this.$el.children().index($tower);

  if (this.selectedTowerIdx == null) {
    this.selectedTowerIdx = towerIdx;
    $tower.addClass('selected');
    return;
  }

  if (!this.game.move(this.selectedTowerIdx, towerIdx)) {
    alert('Invalid move! Try again.');
  }

  this.$el.children().removeClass('selected');
  this.selectedTowerIdx = null;
  this.render(this.game.isWon());
};

View.prototype.render = function (win) {
  $('.hanoi ul').children().remove();
  this.game.towers.forEach((tower, towerIdx) => {
    tower.forEach((discId) => {
      const $tower = $(this.$el.children()[towerIdx]);
      const $disc = $('<li>').addClass(`disk-${discId}`);
      $tower.append($disc);
    });
  });

  if (win) {
    this.handleWin();
  }
};

View.prototype.handleWin = function () {
  this.$el.addClass('game-over');
  this.$el.off('click');
  setTimeout(() => alert('Good work!'));
};

module.exports = View;
