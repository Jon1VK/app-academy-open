function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function () {
  return `${this.owner} loves ${this.name}`;
};

c1 = new Cat('Goku', 'Joni');
c2 = new Cat('Jiren', 'Josefiina');

console.log(c1.cuteStatement());
console.log(c2.cuteStatement());

Cat.prototype.cuteStatement = function () {
  return `Everyone loves ${this.name}`;
};

console.log(c1.cuteStatement());
console.log(c2.cuteStatement());

Cat.prototype.meow = function () {
  console.log('meow');
};

c1.meow();
c2.meow();

c1.meow = function () {
  console.log('kamehamehaa');
};

c1.meow();
c2.meow();
