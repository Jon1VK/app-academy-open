function sum(...nums) {
  return nums.reduce((n, m) => n + m);
}

console.log(sum(1, 2, 3, 4, 5));
