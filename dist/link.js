(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Link"] = factory();
	else
		root["Link"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Link = __webpack_require__(1);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Link2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Link = function () {
  function Link(routes) {
    _classCallCheck(this, Link);

    if (!Array.isArray(routes)) {
      throw new Error('routes must be an array.');
    }

    this.routes = [];
    this._config(routes);
    this._init();
  }

  _createClass(Link, [{
    key: '_config',
    value: function _config(routes) {
      this._processRoutes(routes);
    }
  }, {
    key: '_processRoutes',
    value: function _processRoutes(routes) {
      var _this = this;

      var up = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


      routes.forEach(function (route) {

        var compositeUrl = up + route.url;

        _this.routes.push({
          url: compositeUrl,
          matcher: new RegExp(compositeUrl.replace(/:[^\s/]+/g, '([\\w-]+)')),
          view: route.view
        });

        if (route.sub && Array.isArray(route.sub)) {
          _this._processRoutes(route.sub, compositeUrl);
        }
      });
    }
  }, {
    key: '_init',
    value: function _init() {
      var _this2 = this;

      window.addEventListener('hashchange', function () {
        _this2.linkhash(window.location.hash);
      });
      this.linkhash(window.location.hash);
    }
  }, {
    key: 'linkhash',
    value: function linkhash(hash) {
      if (!hash || hash === '#' || hash === '#/' || hash === '/') {
        hash = '';
      }
      if (hash.charAt(0) === '#') hash = hash.slice(1);

      this.matchRoute(hash);
    }
  }, {
    key: 'matchRoute',
    value: function matchRoute(hash) {
      var _this3 = this;

      var arr = hash.split('?');
      var path = arr[0];
      var query = void 0;
      if (arr[1]) query = arr[1];

      var _loop = function _loop(i) {
        var route = _this3.routes[i];
        var matcher = route.matcher;
        var match = path.match(matcher);

        if (match && match[0] === path) {
          var args = [];

          Object.keys(match).forEach(function (key) {
            if (key + '' !== '0' && key !== 'index' && key !== 'input') {
              args.push(match[key]);
            }
          });

          if (query) {
            args.push((0, _util.parseQueryParams)(query));
          }

          if (route.view) {
            route.view.apply(_this3, args);
          }

          return {
            v: void 0
          };
        }
      };

      for (var i = 0; i < this.routes.length; i++) {
        var _ret = _loop(i);

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }]);

  return Link;
}();

exports.default = Link;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryParams = parseQueryParams;
exports.processSlash = processSlash;
function parseQueryParams(search) {
  var ret = {};
  var seg = search.replace(/^\?/, '').split('&').filter(function (v, i) {
    if (v !== '' && v.indexOf('=')) {
      return true;
    }
  });
  seg.forEach(function (element, index) {
    var idx = element.indexOf('=');
    var key = element.substring(0, idx);
    var val = element.substring(idx + 1);
    ret[key] = val;
  });
  return ret;
}

// //user//profile/ => /user/profile/
function processSlash(str) {
  return str.replace(/\/+/g, '/');
}

/***/ })
/******/ ])["default"];
});