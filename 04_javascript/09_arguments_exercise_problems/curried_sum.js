function curriedSum(N) {
  const numbers = [];

  return function _curriedSum(n) {
    numbers.push(n);

    if (numbers.length == N) {
      return numbers.reduce((a, b) => a + b);
    } else {
      return _curriedSum;
    }
  };
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56
