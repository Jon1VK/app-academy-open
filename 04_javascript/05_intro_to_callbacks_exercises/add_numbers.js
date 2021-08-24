const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question('Next number > ', (number) => {
      sum += parseInt(number);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    reader.close();
    completionCallback(sum);
  }
}

addNumbers(0, 3, (sum) => console.log(`Total Sum: ${sum}`));
