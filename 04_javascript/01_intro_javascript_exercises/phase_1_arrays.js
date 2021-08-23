Array.prototype.uniq = function () {
  const newArr = [];
  this.forEach((el) => {
    if (!newArr.includes(el)) {
      newArr.push(el);
    }
  });
  return newArr;
};

Array.prototype.twoSum = function () {
  const pairs = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] == -this[j]) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
};

Array.prototype.transpose = function () {
  const transposed = [];
  for (let col = 0; col < this[0]?.length; col++) {
    const transposedRow = [];
    for (let row = 0; row < this.length; row++) {
      transposedRow.push(this[row][col]);
    }
    transposed.push(transposedRow);
  }
  return transposed;
};
