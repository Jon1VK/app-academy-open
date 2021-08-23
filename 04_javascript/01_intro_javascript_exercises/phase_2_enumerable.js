Array.prototype.myEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i]);
  }
};

Array.prototype.myMap = function (cb) {
  const newArr = [];
  this.myEach(function (v) {
    newArr.push(cb(v));
  });
  return newArr;
};

Array.prototype.myReduce = function (cb, initialValue) {
  let result = initialValue;
  this.myEach((v) => {
    if (result == null) {
      result = v;
    } else {
      result = cb(result, v);
    }
  });
  return result;
};
