/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DOMNodeCollection)\n/* harmony export */ });\nclass DOMNodeCollection {\n  constructor(elements) {\n    this.elements = elements;\n  }\n\n  html(string) {\n    if (string != null) {\n      this.elements.forEach((element) => (element.innerHTML = string));\n    } else {\n      return this.elements[0].innerHTML;\n    }\n\n    return this;\n  }\n\n  empty() {\n    this.elements.forEach((element) => (element.innerHTML = ''));\n    return this;\n  }\n\n  append(...args) {\n    args.forEach((content) => {\n      if (typeof content === 'string') {\n        this.elements.forEach((element) => (element.innerHTML += content));\n      } else if (content instanceof HTMLElement) {\n        this.elements.forEach((element) => element.appendChild(content));\n      } else if (content instanceof HTMLCollection) {\n        this.elements.forEach((element) => element.append(...content));\n      } else if (content instanceof DOMNodeCollection) {\n        this.elements.forEach((element) => element.append(...content.elements));\n      }\n    });\n\n    return this;\n  }\n\n  attr(name, value) {\n    if (typeof name === 'object') {\n      Object.entries(name).forEach(([name, value]) =>\n        this.elements.forEach((element) => element.setAttribute(name, value))\n      );\n    } else if (value == null) {\n      return this.elements[0].getAttribute(name);\n    } else if (typeof value === 'function') {\n      this.elements.forEach((element, idx) => {\n        const currentValue = element.getAttribute(name);\n        element.setAttribute(name, value(idx, currentValue));\n      });\n    } else {\n      this.elements.forEach((element) => element.setAttribute(name, value));\n    }\n\n    return this;\n  }\n\n  addClass(className) {\n    if (className instanceof Array) {\n      this.elements.forEach((element) => {\n        element.classList.add(...className);\n      });\n    } else if (typeof className === 'function') {\n      this.elements.forEach((element, idx) => {\n        let result = className(idx, element.className);\n        result = result instanceof Array ? result : result.split(' ');\n        element.classList.add(...result);\n      });\n    } else {\n      this.elements.forEach((element) => element.classList.add(className));\n    }\n\n    return this;\n  }\n\n  removeClass(className) {\n    if (className instanceof Array) {\n      this.elements.forEach((element) => {\n        element.classList.remove(...className);\n      });\n    } else if (typeof className === 'function') {\n      this.elements.forEach((element, idx) => {\n        let result = className(idx, element.className);\n        result = result instanceof Array ? result : result.split(' ');\n        element.classList.remove(...result);\n      });\n    } else {\n      this.elements.forEach((element) => element.classList.remove(className));\n    }\n\n    return this;\n  }\n\n  children(selector) {\n    let childNodes = [];\n    this.elements.forEach((element) => {\n      childNodes.push(...element.children);\n    });\n\n    if (selector) {\n      childNodes = childNodes.filter((child) => child.matches(selector));\n    }\n\n    return new DOMNodeCollection(childNodes);\n  }\n\n  parent(selector) {\n    let parentNodes = [];\n    this.elements.forEach((element) => {\n      parentNodes.push(element.parentNode);\n    });\n\n    if (selector) {\n      parentNodes = parentNodes.filter((parent) => parent.matches(selector));\n    }\n\n    return new DOMNodeCollection(parentNodes);\n  }\n\n  find(query) {\n    const descendants = new Set();\n    this.elements.forEach((element) => {\n      [...element.querySelectorAll(query)].forEach((descendant) => {\n        descendants.add(descendant);\n      });\n    });\n\n    return new DOMNodeCollection([...descendants]);\n  }\n\n  remove(selector) {\n    const removed = [];\n    this.elements.forEach((element) => {\n      if (!selector || element.matches(selector)) {\n        removed.push(element);\n        element.remove();\n      }\n    });\n\n    return this;\n  }\n\n  on(event, callback) {\n    this.elements.forEach((element) => {\n      element.addEventListener(event, callback);\n\n      const callbacks = element[`jQueryLite${event}`];\n      if (callbacks) {\n        callbacks.push(callback);\n      } else {\n        element[`jQueryLite${event}`] = [callback];\n      }\n    });\n  }\n\n  off(event, callback) {\n    this.elements.forEach((element) => {\n      const callbacks = element[`jQueryLite${event}`];\n      if (!callbacks) {\n        return;\n      }\n\n      if (callback) {\n        element.removeEventListener(event, callback);\n        callbacks.splice(callbacks.indexOf(callback), 1);\n      } else {\n        callbacks.forEach((cb) => element.removeEventListener(event, cb));\n        callbacks.splice(0, callbacks.length);\n      }\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\n\nfunction jQueryLite(arg) {\n  if (typeof arg === 'string') {\n    const nodes = document.querySelectorAll(arg);\n    return new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__.default([...nodes]);\n  }\n\n  if (arg instanceof HTMLElement) {\n    return new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__.default([arg]);\n  }\n\n  if (arg instanceof HTMLCollection) {\n    return new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__.default([...arg]);\n  }\n\n  throw new Error(`Invalid argument ${arg}`);\n}\n\nwindow.jQueryLite = jQueryLite;\nwindow.$l = jQueryLite;\n\n\n//# sourceURL=webpack:///./src/index.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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