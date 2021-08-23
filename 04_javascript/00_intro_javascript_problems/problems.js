const madLib = (verb, adjective, noun) =>
  `We shall ${verb.toUpperCase()} the ${adjective.toUpperCase()} ${noun.toUpperCase()}.`;

const isSubstring = (str, subStr) => str.includes(subStr);

const fizzBuzz = (arr) =>
  arr.filter((v) => v % 15 != 0 && (v % 3 == 0 || v % 5 == 0));

const isPrime = (n) =>
  n > 1 &&
  [...Array(Math.floor(Math.sqrt(n) - 1))].every((_, i) => n % (i + 2) != 0);

function* primeSequence() {
  yield 2;
  let n = 3;
  while (true) {
    if (isPrime(n)) {
      yield n;
    }
    n += 2;
  }
}

function firstNPrimes(n) {
  const primeSeq = primeSequence();
  return [...Array(n)].map(() => primeSeq.next().value);
}

const sumOfNPrimes = (n) =>
  firstNPrimes(n).reduce((sum, value) => sum + value, 0);

function titleize(names, cb) {
  cb(names.map((name) => `Mx. ${name} Jingleheimer Schmidt`));
}

function printCallback(array) {
  array.forEach((el) => console.log(el));
}

function Elephant(name, height, tricks = []) {
  this.name = name;
  this.height = height;
  this.tricks = tricks;
}

Elephant.prototype.trumpet = function () {
  console.log(`${this.name} the elephant goes 'phrRRRRRRRRRRR!!!!!!!'`);
};

Elephant.prototype.grow = function () {
  this.height += 12;
};

Elephant.prototype.addTrick = function (trick) {
  this.tricks.push(trick);
};

Elephant.prototype.play = function () {
  random = Math.floor(Math.random() * this.tricks.length);
  console.log(`${this.name} is ${this.tricks[random]}!`);
};

let ellie = new Elephant('Ellie', 185, [
  'giving human friends a ride',
  'playing hide and seek',
]);
let charlie = new Elephant('Charlie', 200, [
  'painting pictures',
  'spraying water for a slip and slide',
]);
let kate = new Elephant('Kate', 234, ['writing letters', 'stealing peanuts']);
let micah = new Elephant('Micah', 143, [
  'trotting',
  'playing tic tac toe',
  'doing elephant ballet',
]);

let herd = [ellie, charlie, kate, micah];

Elephant.paradeHelper = function (elephant) {
  console.log(`${elephant.name} is trotting by!`);
};

Elephant.paradeHelper(micah);

herd.forEach((elephant) => Elephant.paradeHelper(elephant));

function dinerBreakfast() {
  const orders = ['cheesy scrambled eggs'];
  console.log(`I'd like ${orders.join(' and ')} please.`);

  return (order) => {
    orders.push(order);
    console.log(`I'd like ${orders.join(' and ')} please.`);
  };
}
