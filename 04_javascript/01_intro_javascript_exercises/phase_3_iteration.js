Array.prototype.bubbleSort = function () {
  let sorted = false;
  while (!sorted) {
    sorted = true;

    for (let i = 0; i < this.length - 1; i++) {
      const [left, right] = [this[i], this[i + 1]];
      if (left > right) {
        [this[i], this[i + 1]] = [right, left];
        sorted = false;
      }
    }
  }
  return this;
};

String.prototype.subStrings = function () {
  const subStrs = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j <= this.length; j++) {
      subStrs.push(this.slice(i, j));
    }
  }
  return subStrs;
};
