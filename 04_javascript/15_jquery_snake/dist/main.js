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

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\nconst Coordinate = __webpack_require__(/*! ./coordinate */ \"./src/coordinate.js\");\n\nclass Board {\n  constructor() {\n    this.size = 20;\n    this.snake = new Snake();\n    this.apple = null;\n    this.newApple();\n  }\n\n  step() {\n    this.snake.move();\n\n    if (this.snake.inCoordinate(this.apple)) {\n      this.snake.grow();\n      this.newApple();\n    } else if (this.outOfBounds() || this.snake.hitsItself()) {\n      return false;\n    }\n\n    return true;\n  }\n\n  outOfBounds() {\n    const { x, y } = this.snake.head();\n    return x < 0 || x >= this.size || y < 0 || y >= this.size;\n  }\n\n  newApple() {\n    let coordinate = Coordinate.random(this.size);\n\n    while (this.snake.inCoordinate(coordinate)) {\n      coordinate = Coordinate.random(this.size);\n    }\n\n    this.apple = coordinate;\n  }\n}\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/coordinate.js":
/*!***************************!*\
  !*** ./src/coordinate.js ***!
  \***************************/
/***/ ((module) => {

eval("class Coordinate {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  plus(coordinate) {\n    this.x += coordinate.x;\n    this.y += coordinate.y;\n  }\n\n  moveTo(coordinate) {\n    this.x = coordinate.x;\n    this.y = coordinate.y;\n  }\n\n  equals(coordinate) {\n    return this.x == coordinate.x && this.y == coordinate.y;\n  }\n\n  isOpposite(coordinate) {\n    return this.x == -coordinate.x && this.y == -coordinate.y;\n  }\n}\n\nCoordinate.random = (size) => {\n  const x = Math.floor(Math.random() * size);\n  const y = Math.floor(Math.random() * size);\n  return new Coordinate(x, y);\n};\n\nmodule.exports = Coordinate;\n\n\n//# sourceURL=webpack:///./src/coordinate.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const View = __webpack_require__(/*! ./view */ \"./src/view.js\");\n\n$(() => {\n  const $rootEl = $('.snake')\n  const view = new View($rootEl);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Coordinate = __webpack_require__(/*! ./coordinate */ \"./src/coordinate.js\");\n\nDIRECTIONS = {\n  N: new Coordinate(0, -1),\n  E: new Coordinate(1, 0),\n  S: new Coordinate(0, 1),\n  W: new Coordinate(-1, 0),\n};\n\nclass Snake {\n  constructor() {\n    this.direction = 'E';\n    this.segments = [new Coordinate(1, 1)];\n  }\n\n  head() {\n    return this.segments[0];\n  }\n\n  tail() {\n    return this.segments[this.segments.length - 1];\n  }\n\n  move() {\n    for (let i = this.segments.length - 1; i > 0; i--) {\n      this.segments[i].moveTo(this.segments[i - 1]);\n    }\n\n    this.head().plus(DIRECTIONS[this.direction]);\n  }\n\n  turn(direction) {\n    if (!DIRECTIONS[direction].isOpposite(DIRECTIONS[this.direction])) {\n      this.direction = direction;\n    }\n  }\n\n  grow() {\n    const { x, y } = this.tail();\n    this.segments.push(new Coordinate(x, y));\n    this.segments.push(new Coordinate(x, y));\n  }\n\n  hitsItself() {\n    return this.segments\n      .slice(1)\n      .some((segment) => segment.equals(this.head()));\n  }\n\n  inCoordinate(coordinate) {\n    return this.segments.some((segment) => segment.equals(coordinate));\n  }\n}\n\nmodule.exports = Snake;\n\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\nclass View {\n  constructor($el) {\n    this.$el = $el;\n    this.board = new Board();\n    this.renderGrid();\n    this.bindKeypressHandler();\n    this.run();\n  }\n\n  run() {\n    this.render();\n    this.animationInterval = setInterval(() => this.step(), 100);\n  }\n\n  step() {\n    if (this.board.step()) {\n      this.render();\n    } else {\n      clearInterval(this.animationInterval);\n      $(document).off('keydown');\n      alert('Game over!');\n    }\n  }\n\n  renderGrid() {\n    const $grid = $('<ul>');\n\n    for (let row = 0; row < this.board.size; row++) {\n      for (let col = 0; col < this.board.size; col++) {\n        $grid.append($('<li>').addClass(`pos-${row}-${col}`));\n      }\n    }\n\n    this.$el.append($grid);\n  }\n\n  render() {\n    $('.segment').removeClass('segment');\n\n    this.board.snake.segments.forEach((coordinate) => {\n      $(`.pos-${coordinate.y}-${coordinate.x}`).addClass('segment');\n    });\n\n    const apple = this.board.apple;\n\n    $('.apple').removeClass('apple');\n    $(`.pos-${apple.y}-${apple.x}`).addClass('apple');\n  }\n\n  bindKeypressHandler() {\n    const keyCodes = {\n      ArrowLeft: 'W',\n      ArrowUp: 'N',\n      ArrowRight: 'E',\n      ArrowDown: 'S',\n      a: 'W',\n      w: 'N',\n      d: 'E',\n      s: 'S',\n    };\n\n    $(document).on('keydown', (event) => {\n      const keyCode = event.key;\n\n      if (keyCode in keyCodes) {\n        this.board.snake.turn(keyCodes[keyCode]);\n      }\n    });\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/view.js?");

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