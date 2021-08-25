const Game = require('./game.js');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const onCompletion = function onCompletion() {
  reader.question("Do you want to play again? ", (answer) => {
    if (answer == 'yes') {
      const game = new Game(reader);
      game.run(onCompletion);
    } else {
      reader.close();
    }
  });
}

const game = new Game(reader);
game.run(onCompletion);
