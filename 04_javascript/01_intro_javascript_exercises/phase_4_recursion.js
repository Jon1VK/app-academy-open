function range(start, end) {
  if (start >= end) {
    return [];
  }

  return [start].concat(range(start + 1, end));
}

function sumRec(arr) {
  if (arr.length == 0) {
    return 0;
  }

  const [first, ...rest] = arr;
  return first + sumRec(rest);
}

function exponent(base, exp) {
  if (base == 0 && exp == 0) {
    return NaN;
  }

  if (base == 0 || base == 1) {
    return base;
  }

  if (exp == 0) {
    return 1;
  }

  if (exp % 2 == 0) {
    const tmp = exponent(base, exp / 2);
    return tmp * tmp;
  }

  const tmp = exponent(base, (exp - 1) / 2);
  return base * tmp * tmp;
}

function fibonacci(n) {
  if (n == 0) {
    return [];
  }

  if (n == 1) {
    return [0];
  }

  if (n == 2) {
    return [0, 1];
  }

  const tmp = fibonacci(n - 1);
  return [...tmp, tmp[tmp.length - 2] + tmp[tmp.length - 1]];
}

function deepDup(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  const duplicate = [];
  arr.forEach((v) => duplicate.push(deepDup(v)));
  return duplicate;
}

function bsearch(arr, target) {
  if (arr.length == 0) {
    return -1;
  }

  const middle = Math.floor(arr.length / 2);
  const middleEl = arr[middle];

  if (middleEl == target) {
    return middle;
  }

  if (middleEl > target) {
    const result = bsearch(arr.slice(0, middle), target);
    return result < 0 ? -1 : result;
  } else {
    const result = bsearch(arr.slice(middle + 1, arr.length), target);
    return result < 0 ? -1 : middle + 1 + result;
  }
}

function mergesort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const [left, right] = [arr.slice(0, middle), arr.slice(middle, arr.length)];

  const [leftSorted, rightSorted] = [mergesort(left), mergesort(right)];

  const merged = [];
  let leftEl = leftSorted.shift();
  let rightEl = rightSorted.shift();

  while (leftEl != null && rightEl != null) {
    if (leftEl <= rightEl) {
      merged.push(leftEl);
      leftEl = leftSorted.shift();
    } else {
      merged.push(rightEl);
      rightEl = rightSorted.shift();
    }
  }

  if (leftEl != null) {
    merged.push(leftEl);
    return merged.concat(leftSorted);
  } else {
    merged.push(rightEl);
    return merged.concat(rightSorted);
  }
}

function subsets(arr) {
  if (arr.length == 0) {
    return [[]];
  }

  const [first, ...rest] = arr;

  withoutFirst = subsets(rest);
  withFirst = withoutFirst.map((a) => [first, ...a]);

  return withFirst.concat(withoutFirst);
}
