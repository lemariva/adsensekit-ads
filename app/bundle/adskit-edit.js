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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

window.Ad = {

    el: '#ad',

    data: function () {
        return {
            data: window.$data,
            ad: window.$data.ad,
            sections: []
        }
    },

    created: function () {

        var sections = [];

        _.forIn(this.$options.components, function (component, name) {

            var options = component.options || {};

            if (options.section) {
                sections.push(_.extend({name: name, priority: 0}, options.section));
            }

        });

        this.$set('sections', _.sortBy(sections, 'priority'));

        this.resource = this.$resource('api/adsensekit/ads{/id}');
    },

    ready: function () {
        this.tab = UIkit.tab(this.$els.tab, {connect: this.$els.content});
    },

    methods: {

        save: function () {
            var data = {ad: this.ad, id: this.ad.id};

            this.$broadcast('save', data);

            this.resource.save({id: this.ad.id}, data).then(function (res) {

                var data = res.data;

                if (!this.ad.id) {
                    window.history.replaceState({}, '', this.$url.route('admin/adsensekit/ads/edit', {id: data.ad.id}))
                }

                this.$set('ad', data.ad);

                this.$notify('Ad saved.');

            }, function (res) {
                this.$notify(res.data, 'danger');
            });
        }

    },

    components: {

        settings: __webpack_require__(7)

    }

};

Vue.ready(window.Ad);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_script__, __vue_template__
var __vue_styles__ = {}
__vue_script__ = __webpack_require__(8)
if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
  console.warn("[vue-loader] app\\components\\adskit-settings.vue: named exports in *.vue files are ignored.")}
__vue_template__ = __webpack_require__(9)
module.exports = __vue_script__ || {}
if (module.exports.__esModule) module.exports = module.exports.default
var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
if (__vue_template__) {
__vue_options__.template = __vue_template__
}
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})
if (false) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  var id = "_v-0b191275/adskit-settings.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, __vue_template__)
  }
})()}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

    props: ['ad', 'data', 'form'],

    section: {
        label: 'Ad'
    }

};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"uk-grid pk-grid-large pk-width-sidebar-large uk-form-stacked\" data-uk-grid-margin>\n    <div class=\"pk-width-content\">\n\n        <div class=\"uk-form-row\">\n            <input class=\"uk-width-1-1 uk-form-large\" type=\"text\" name=\"title\" :placeholder=\"'Enter Title' | trans\" v-model=\"ad.title\" v-validate:required>\n            <p class=\"uk-form-help-block uk-text-danger\" v-show=\"form.title.invalid\">{{ 'Title cannot be blank.' | trans }}</p>\n        </div>\n        <div class=\"uk-form-row\">\n            <label for=\"ad-adformat\" class=\"uk-form-label\">{{ 'Ad format' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"ad-adformat\" class=\"uk-width-1-1\" type=\"text\" v-model=\"ad.adformat\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"ad-adlayoutkey\" class=\"uk-form-label\">{{ 'Ad layout key' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"ad-adlayoutkey\" class=\"uk-width-1-1\" type=\"text\" v-model=\"ad.adlayoutkey\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"ad-adclient\" class=\"uk-form-label\">{{ 'Ad client' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"ad-adclient\" class=\"uk-width-1-1\" type=\"text\" v-model=\"ad.adclient\">\n            </div>\n        </div>\n\n        <div class=\"uk-form-row\">\n            <label for=\"ad-adslot\" class=\"uk-form-label\">{{ 'Ad slot' | trans }}</label>\n            <div class=\"uk-form-controls\">\n                <input id=\"ad-adslot\" class=\"uk-width-1-1\" type=\"text\" v-model=\"ad.adslot\">\n            </div>\n        </div>\n\n    </div>\n    <div class=\"pk-width-sidebar\">\n\n        <div class=\"uk-panel\">\n\n\n            <div class=\"uk-form-row\">\n                <label for=\"ad-slug\" class=\"uk-form-label\">{{ 'Slug' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"ad-slug\" class=\"uk-width-1-1\" type=\"text\" v-model=\"ad.slug\">\n                </div>\n            </div>\n            <div class=\"uk-form-row\">\n                <label for=\"ad-priority\" class=\"uk-form-label\">{{ 'Priority' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <input id=\"ad-priority\" class=\"uk-width-1-1\" type=\"text\" v-model=\"ad.priority\">\n                </div>\n            </div>\n            <div class=\"uk-form-row\">\n                <label for=\"form-status\" class=\"uk-form-label\">{{ 'Status' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"ad-status\" class=\"uk-width-1-1\" v-model=\"ad.status\">\n                        <option v-for=\"(id, status) in data.statuses\" :value=\"id\">{{status}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"uk-form-row\" v-if=\"data.canEditAll\">\n                <label for=\"form-author\" class=\"uk-form-label\">{{ 'Author' | trans }}</label>\n                <div class=\"uk-form-controls\">\n                    <select id=\"ad-author\" class=\"uk-width-1-1\" v-model=\"ad.user_id\">\n                        <option v-for=\"author in data.authors\" :value=\"author.id\">{{author.username}}</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"uk-form-row\">\n                <span class=\"uk-form-label\">{{ 'Publish on' | trans }}</span>\n                <div class=\"uk-form-controls\">\n                    <input-date :datetime.sync=\"ad.date\"></input-date>\n                </div>\n            </div>\n\n        </div>\n\n    </div>\n</div>\n\n";

/***/ })
/******/ ]);