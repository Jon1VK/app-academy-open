Function.prototype.curry = function (N) {
  const that = this;
  const args = [];

  return function _curry(arg) {
    args.push(arg);

    if (args.length == N) {
      return that(...args);
    } else {
      return _curry;
    }
  };
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30
console.log(f1);

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
