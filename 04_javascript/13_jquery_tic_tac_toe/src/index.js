const View = require('./ttt-view');
const Game = require('./ttt/game')

$(() => {
  const view = new View(new Game, $('.ttt'));
});
