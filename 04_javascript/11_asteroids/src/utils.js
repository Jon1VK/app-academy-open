const Utils = {
  inherits(childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  mod(number, modulo) {
    return ((number % modulo) + modulo) % modulo;
  },

  distance(posOne, posTwo) {
    return Math.sqrt(
      (posTwo[0] - posOne[0]) ** 2 + (posTwo[1] - posOne[1]) ** 2
    );
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Utils.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
};

module.exports = Utils;
