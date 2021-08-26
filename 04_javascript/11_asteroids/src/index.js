const GameView = require('./game_view.js');
const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('game-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const game = new Game();
  const gameView = new GameView(game, ctx);
  gameView.start();
});
