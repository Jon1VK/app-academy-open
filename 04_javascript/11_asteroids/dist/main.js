/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Asteroid({game, pos}) {\n  MovingObject.call(this,\n    {\n      game,\n      pos,\n      vel: Utils.randomVec(2),\n      radius: Asteroid.RADIUS,\n      color: Asteroid.COLOR\n    }\n  );\n}\n\nAsteroid.COLOR = 'darkgray';\nAsteroid.RADIUS = 20;\n\nUtils.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\n\nfunction Bullet({game, pos, vel}) {\n  MovingObject.call(this,\n    {\n      game,\n      pos,\n      vel,\n      color: Bullet.COLOR,\n      radius: Bullet.RADIUS\n    }\n  );\n\n  this.isWrappable = false;\n}\n\nBullet.COLOR = 'red';\nBullet.RADIUS = 2;\n\nUtils.inherits(Bullet, MovingObject);\n\nBullet.prototype.collideWith = function (asteroid) {\n  this.game.remove(asteroid);\n  this.game.remove(this);\n}\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst Asteroid = __webpack_require__(/*! ./asteroid.js */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Game() {\n  this.img = new Image();\n  this.img.src = './space.jpg';\n  this.asteroids = [];\n  this.addAsteroids();\n  this.bullets = [];\n  this.ship = new Ship(\n    {\n      game: this,\n      pos: this.randomPosition()\n    }\n  );\n}\n\nGame.DIM_X = window.innerWidth;\nGame.DIM_Y = window.innerHeight;\nGame.NUM_ASTEROIDS = 20;\n\nGame.prototype.addAsteroids = function () {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.add(\n      new Asteroid(\n        {\n          game: this,\n          pos: this.randomPosition()\n        }\n      )\n    );\n  }\n};\n\nGame.prototype.allObjects = function () {\n  return [...this.asteroids, ...this.bullets, this.ship];\n};\n\nGame.prototype.add = function (object) {\n  if (object instanceof Asteroid) {\n    this.asteroids.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  }\n};\n\nGame.prototype.remove = function (object) {\n  if (object instanceof Asteroid) {\n    this.asteroids.splice(this.asteroids.indexOf(object), 1);\n  } else if (object instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  }\n};\n\nGame.prototype.step = function (timeDelta) {\n  this.checkCollisions();\n  this.moveObjects(timeDelta);\n};\n\nGame.prototype.draw = function (ctx) {\n  ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y);\n  this.allObjects().forEach(object => object.draw(ctx));\n};\n\nGame.prototype.moveObjects = function (timeDelta = 16.6667) {\n  this.allObjects().forEach(object => object.move(timeDelta));\n};\n\nGame.prototype.checkCollisions = function () {\n  for (let i = 0; i < this.asteroids.length; i++) {\n    const asteroid = this.asteroids[i];\n\n    if (this.ship.isCollidedWith(asteroid)) {\n      this.ship.collideWith(asteroid);\n    }\n\n    for (let j = 0; j < this.bullets.length; j++) {\n      const bullet = this.bullets[j];\n\n      if (bullet.isCollidedWith(asteroid)) {\n        bullet.collideWith(asteroid);\n      }\n    }\n  }\n};\n\nGame.prototype.randomPosition = function () {\n  return [\n    Math.random() * Game.DIM_X,\n    Math.random() * Game.DIM_Y\n  ];\n};\n\nGame.prototype.isOutOfBounds = function (pos) {\n  return (\n    pos[0] < 0 ||\n    pos[0] > Game.DIM_X ||\n    pos[1] < 0 ||\n    pos[1] > Game.DIM_Y\n  );\n}\n\nGame.prototype.wrap = function (pos) {\n  return [\n    Utils.mod(pos[0], Game.DIM_X),\n    Utils.mod(pos[1], Game.DIM_Y)\n  ];\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module) => {

eval("function GameView(game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n  this.lastTime = 0;\n}\n\nGameView.prototype.start = function () {\n  this.bindKeyHandlers();\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.animate = function (currentTime) {\n  this.game.draw(this.ctx);\n  this.game.step(currentTime - this.lastTime);\n  this.lastTime = currentTime;\n  requestAnimationFrame(this.animate.bind(this));\n}\n\nGameView.prototype.bindKeyHandlers = function () {\n  key('up, w', () => this.game.ship.power([0, -1]));\n  key('left, a', () => this.game.ship.power([-1, 0]));\n  key('down, s', () => this.game.ship.power([0, 1]));\n  key('right, d', () => this.game.ship.power([1, 0]));\n\n  key('space', () => this.game.ship.fireBullet());\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\ndocument.addEventListener('DOMContentLoaded', (event) => {\n  const canvas = document.getElementById('game-canvas');\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  const ctx = canvas.getContext('2d');\n\n  const game = new Game();\n  const gameView = new GameView(game, ctx);\n  gameView.start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\nfunction MovingObject({game, pos, vel, radius, color}) {\n  this.isWrappable = true;\n  this.game = game;\n  this.pos = pos;\n  this.vel = vel;\n  this.radius = radius;\n  this.color = color;\n}\n\nMovingObject.prototype.draw = function (ctx) {\n  ctx.fillStyle = this.color;\n  ctx.strokeStyle = this.color;\n  ctx.lineWidth = 1;\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n  ctx.fill();\n  ctx.stroke();\n};\n\nMovingObject.prototype.move = function (timeDelta) {\n  this.pos[0] += this.vel[0] * timeDelta / 16.6667;\n  this.pos[1] += this.vel[1] * timeDelta / 16.6667;\n  \n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.game.remove(this);\n    }\n  }\n};\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  return (\n    Utils.distance(this.pos, otherObject.pos) <\n    this.radius + otherObject.radius\n  );\n};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Utils = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet.js */ \"./src/bullet.js\");\n\nfunction Ship({game, pos}) {\n  MovingObject.call(this,\n    {\n      game,\n      pos,\n      vel: [0, 0],\n      radius: Ship.RADIUS,\n      color: Ship.COLOR\n    }\n  );\n}\n\nShip.COLOR = 'violet';\nShip.RADIUS = 10;\n\nUtils.inherits(Ship, MovingObject);\n\nShip.prototype.collideWith = function (asteroid) {\n  this.relocate();\n}\n\nShip.prototype.relocate = function () {\n  this.pos = this.game.randomPosition();\n  this.vel = [0, 0];\n};\n\nShip.prototype.power = function (impulse) {\n  this.vel[0] += impulse[0];\n  this.vel[1] += impulse[1];\n}\n\nShip.prototype.fireBullet = function () {\n  if (this.vel !== [0, 0]) {\n    this.game.add(\n      new Bullet(\n        {\n          game: this.game,\n          pos: [...this.pos],\n          vel: Utils.scale(this.vel, 10)\n        }\n      )\n    );\n  }\n};\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const Utils = {\n  inherits(childClass, parentClass) {\n    childClass.prototype = Object.create(parentClass.prototype);\n    childClass.prototype.constructor = childClass;\n  },\n\n  mod(number, modulo) {\n    return ((number % modulo) + modulo) % modulo;\n  },\n\n  distance(posOne, posTwo) {\n    return Math.sqrt(\n      (posTwo[0] - posOne[0]) ** 2 + (posTwo[1] - posOne[1]) ** 2\n    );\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Utils.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n};\n\nmodule.exports = Utils;\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;