/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/benchmarks/array-reverse/array-reverse.js":
/*!*******************************************************!*\
  !*** ./src/benchmarks/array-reverse/array-reverse.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(array, size) {\n  const result = Uint8Array.from({length: size})\n\n  for (let i = size - 1; i >= 0; i--) {\n    result[size - (i + 1)] = array[i];\n  }\n\n  return result;\n});\n\n\n//# sourceURL=webpack:///./src/benchmarks/array-reverse/array-reverse.js?");

/***/ }),

/***/ "./src/benchmarks/array-reverse/index.js":
/*!***********************************************!*\
  !*** ./src/benchmarks/array-reverse/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ArrayReverse; });\n/* harmony import */ var _array_reverse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array-reverse */ \"./src/benchmarks/array-reverse/array-reverse.js\");\n\n\nclass ArrayReverse {\n\n  static get MAX_VALUE() { return 255; }\n\n  static get args() {\n    return {\n      size: {\n        default: 500000,\n        min: 1,\n        max: 5000000\n      },\n      iterations: {\n        default: 50,\n        min: 1,\n        max: 10000000\n      }\n    }\n  }\n\n  constructor(args) {\n    this.iterations = args.iterations\n    this.size = args.size\n    this.values = Uint8Array.from(\n      {length: this.size},\n      () => Math.floor(Math.random() * ArrayReverse.MAX_VALUE)\n    )\n  }\n\n  c() {\n    const buffer = Module._malloc(this.size)\n    Module.HEAPU8.set(this.values, buffer)\n\n    let result\n\n    for (let i = 0; i < this.iterations; i++) {\n      const resultBuffer = Module._malloc(this.size)\n\n      Module.ccall(\n        'array_reverse',\n        'number',\n        ['number', 'number'],\n        [buffer, this.size, resultBuffer]\n      )\n\n      result = Module.HEAPU8.subarray(resultBuffer, resultBuffer + this.size)\n\n      Module._free(resultBuffer)\n    }\n\n    Module._free(buffer)\n\n    return result\n  }\n\n  js() {\n    let result\n\n    for (let i = 0; i < this.iterations; i++) {\n      result = Object(_array_reverse__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.values, this.size)\n    }\n\n    return result\n  }\n\n  compare(cResult, jsResult) {\n    if (cResult.length !== jsResult.length) {\n      return false\n    }\n\n    for (let i = 0; i < cResult.length; i++) {\n      if (cResult[i] !== jsResult[i]) {\n        return false\n      }\n    }\n\n    return true\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/benchmarks/array-reverse/index.js?");

/***/ }),

/***/ "./src/benchmarks/index.js":
/*!*********************************!*\
  !*** ./src/benchmarks/index.js ***!
  \*********************************/
/*! exports provided: Quicksort, ArrayReverse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quicksort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quicksort */ \"./src/benchmarks/quicksort/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Quicksort\", function() { return _quicksort__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _array_reverse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array-reverse */ \"./src/benchmarks/array-reverse/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ArrayReverse\", function() { return _array_reverse__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/benchmarks/index.js?");

/***/ }),

/***/ "./src/benchmarks/quicksort/index.js":
/*!*******************************************!*\
  !*** ./src/benchmarks/quicksort/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Quicksort; });\nclass Quicksort {\n\n  static get MAX_VALUE() { return 255; }\n\n  static get args() {\n    return {\n      size: {\n        default: 5000,\n        min: 1,\n        max: 10000\n      },\n      iterations: {\n        default: 50,\n        min: 1,\n        max: 10000000\n      }\n    }\n  }\n\n  constructor(args) {\n    this.iterations = args.iterations\n    this.size = args.size\n    this.values = Uint8Array.from(\n      {length: this.size},\n      () => Math.floor(Math.random() * Quicksort.MAX_VALUE)\n    )\n  }\n\n  c() {\n    let result\n\n    for (let i = 0; i < this.iterations; i++) {\n      const newValues = this.values.slice(0)\n\n      const buffer = Module._malloc(newValues.length)\n      Module.HEAPU8.set(newValues, buffer)\n\n      Module.ccall(\n        'quicksort',\n        'number',\n        ['number', 'number'],\n        [buffer, newValues.length]\n      )\n\n      result = Module.HEAPU8.subarray(buffer, buffer + newValues.length)\n\n      Module._free(buffer)\n    }\n\n    return result\n  }\n\n  js() {\n    let result\n\n    for (let i = 0; i < this.iterations; i++) {\n      const newValues = this.values.slice(0)\n      result = newValues.sort((a, b) => a - b)\n    }\n\n    return result\n  }\n\n  jsQuickSort(unSortedArray) {\n    var tempStack = [unSortedArray];\n    var sortedArray = [];\n\n\n    while(tempStack.length) {\n      var tempVar = tempStack.pop();\n      var currentLength = tempVar.length;\n\n      if(currentLength == 1) {\n        sortedArray.push(tempVar[0]);\n        continue;\n      }\n\n      var pivotElement = tempVar[0];\n      var leftElement = [];\n      var rightElement = [];\n\n      for (var iter=1; iter < currentLength; iter++) {\n        if(tempVar[iter] < pivotElement) {\n          leftElement.push(tempVar[iter]);\n        } else {\n          rightElement.push(tempVar[iter]);\n        }\n      }\n\n      leftElement.push(pivotElement);\n\n      if(rightElement.length)\n        tempStack.push(rightElement);\n      if(leftElement.length)\n        tempStack.push(leftElement);\n    }\n\n    return sortedArray;\n  }\n\n  compare(cResult, jsResult) {\n    if (cResult.length !== jsResult.length) {\n      return false\n    }\n\n    for (let i = 0; i < cResult.length; i++) {\n      if (cResult[i] !== jsResult[i]) {\n        return false\n      }\n    }\n\n    return true\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/benchmarks/quicksort/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _benchmarks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./benchmarks */ \"./src/benchmarks/index.js\");\n\n\nlet selectedBenchmark = 'quicksort'\n\nconst benchmarks = {\n  quicksort: _benchmarks__WEBPACK_IMPORTED_MODULE_0__[\"Quicksort\"],\n  arrayreverse: _benchmarks__WEBPACK_IMPORTED_MODULE_0__[\"ArrayReverse\"]\n}\n\nfunction run(fn) {\n  const start = performance.now()\n  const result = fn()\n  const end = performance.now()\n  const duration = end - start\n\n  return [result, duration]\n}\n\nasync function runBenchmark() {\n\n  document.getElementById(\"run\").disabled = true\n  document.getElementById(\"run\").innerHTML = '...'\n  document.getElementById(\"c-result\").innerHTML = '...'\n  document.getElementById(\"js-result\").innerHTML = '...'\n\n  setTimeout(() => {\n    const Benchmark = benchmarks[selectedBenchmark]\n\n    const args = {}\n    for (const arg of Object.keys(Benchmark.args)) {\n      args[arg] = Number(document.getElementById(arg).value)\n    }\n\n    const benchmark = new Benchmark(args)\n\n    const [cResult, cDuration] = run(benchmark.c.bind(benchmark))\n    const [jsResult, jsDuration] = run(benchmark.js.bind(benchmark))\n\n    if (!benchmark.compare(cResult, jsResult)) {\n      alert('Test failed - results not equal')\n    }\n\n    document.getElementById(\"c-result\").innerHTML = `${cDuration}ms`\n    document.getElementById(\"js-result\").innerHTML = `${jsDuration}ms`\n\n    document.getElementById(\"run\").disabled = false\n    document.getElementById(\"run\").innerHTML = 'Run'\n  }, 100)\n\n}\n\nfunction changeEventHandler(ev) {\n  setBenchmark(ev.target.value)\n}\n\nfunction setBenchmark(benchmark) {\n  selectedBenchmark = benchmark\n  const Benchmark = benchmarks[benchmark]\n\n  let argsHtml = ''\n  const args = {}\n\n  for (const argName of Object.keys(Benchmark.args)) {\n    const arg = Benchmark.args[argName]\n    argsHtml += `\n      <div>\n        <label for=\"${argName}\">${argName}</label>\n        <input id=\"${argName}\" type=\"number\" value=\"${arg.default}\" min=\"${arg.min}\" max=${arg.max}\" />\n      </div>\n    `\n  }\n\n  document.getElementById(\"args\").innerHTML = argsHtml\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  document.getElementById(\"run\").addEventListener(\"click\", runBenchmark)\n  document.getElementById(\"benchmark\").onchange = changeEventHandler\n  setBenchmark('quicksort')\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });