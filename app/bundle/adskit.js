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

module.exports = {
};
Vue.ready(() => {
  $('.adsense').each(function () {
     var $el = $(this);
     var id = $el.attr('data-id');
     var data = window["$adsensekit_" + id];

    window.AdsenseKit = new Vue({
       el: this,
       data: data,
       components: {
            adsensekit: __webpack_require__(1)
       }
    }
    );
    (adsbygoogle = window.adsbygoogle || []).push({});
  });
  $('.adimg').each(function () {
    var $el = $(this);
    var id = $el.attr('data-id');
    var data = window["$adsensekit_" + id];

   window.AdsenseKit = new Vue({
      el: this,
      data: data,
      components: {
           adsensekit: __webpack_require__(4)
      }
   }
   );
 });


});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
__vue_script__ = __webpack_require__(2)
if (__vue_script__ &&
    __vue_script__.__esModule &&
    Object.keys(__vue_script__).length > 1) {
  console.warn("[vue-loader] app\\components\\adskit-adsense.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(3)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
if (__vue_template__) {
(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
}
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "C:\\inetpub\\wwwroot\\lemarivawebsite\\packages\\lemariva\\adsensekit\\app\\components\\adskit-adsense.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  props: {
    adItem: {
      type: Object,
      required: true
    },
    adStyle: {
      type: String,
      required: false,
      default: 'display: block'
    },
    adFormat: {
      type: String,
      required: false,
      default: 'fluid'
    },
    adLayoutKey: {
      type: String,
      required: true
    },
    adClient: {
      type: String,
      required: true
    },
    adSlot: {
      type: String,
      required: true
    }
  },
  ready: function ready() {}
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "\n<ins class=\"adsbygoogle\"\n  :style=\"adStyle\"\n  :data-ad-format=\"adFormat\"\n  :data-ad-layout-key=\"adLayoutKey\"\n  :data-ad-client=\"adClient\"\n  :data-ad-slot=\"adSlot\"></ins>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
__vue_script__ = __webpack_require__(5)
if (__vue_script__ &&
    __vue_script__.__esModule &&
    Object.keys(__vue_script__).length > 1) {
  console.warn("[vue-loader] app\\components\\adskit-general.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(6)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
if (__vue_template__) {
(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
}
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  var id = "C:\\inetpub\\wwwroot\\lemarivawebsite\\packages\\lemariva\\adsensekit\\app\\components\\adskit-general.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  props: {
    adItem: {
      type: Object,
      required: true
    },
    adSrc: {
      type: String,
      required: false,
      default: ''
    },
    adName: {
      type: String,
      required: false,
      default: ''
    },
    adUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  ready: function ready() {}
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "\n<a :href=\"adUrl\" target=\"_blank\">\n  <img :src=\"adSrc\" :alt=\"adName\"/>\n</a>\n";

/***/ })
/******/ ]);