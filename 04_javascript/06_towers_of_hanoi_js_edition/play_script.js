const Game = require('./game');
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function completionCallback() {
  reader.question('Do you want to play another game? > ', (input) => {
    if (input === 'yes') {
      new Game(reader, completionCallback).run();
    } else {
      reader.close();
    }
  });
}

new Game(reader, completionCallback).run();
