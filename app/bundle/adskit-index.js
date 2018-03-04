/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ function(module, exports) {

module.exports = {

    name: 'adskit',

    el: '#adskit',

    data: function() {
        return _.merge({
            posts: false,
            config: {
                filter: this.$session.get('ads.filter', {order: 'id desc', limit:25})
            },
            pages: 0,
            count: '',
            selected: [],
            canEditAll: false
        }, window.$data);
    },

    ready: function () {
        this.resource = this.$resource('api/adsensekit/ads{/id}');
        this.$watch('config.page', this.load, {immediate: true});
    },

    watch: {

        'config.filter': {
            handler: function (filter) {
                if (this.config.page) {
                    this.config.page = 0;
                } else {
                    this.load();
                }

                this.$session.set('ads.filter', filter);
            },
            deep: true
        }

    },

    computed: {

        statusOptions: function () {

            var options = _.map(this.$data.statuses, function (status, id) {
                return { text: status, value: id };
            });

            return [{ label: this.$trans('Filter by'), options: options }];
        },

    },

    methods: {

        active: function (ad) {
            return this.selected.indexOf(ad.id) != -1;
        },

        save: function (ad) {
            this.resource.save({ id: ad.id }, { ad: ad }).then(function () {
                this.load();
                this.$notify('Ad saved.');
            });
        },

        status: function(status) {

            var ads = this.getSelected();

            ads.forEach(function(ad) {
                ad.status = status;
            });

            this.resource.save({ id: 'bulk' }, { ads: ads }).then(function () {
                this.load();
                this.$notify('Ads saved.');
            });
        },

        remove: function() {

            this.resource.delete({ id: 'bulk' }, { ids: this.selected }).then(function () {
                this.load();
                this.$notify('Ads deleted.');
            });
        },

        toggleStatus: function (ad) {
            ad.status = ad.status === 2 ? 3 : 2;
            this.save(ad);
        },

        load: function () {
            this.resource.query({ filter: this.config.filter, page: this.config.page }).then(function (res) {
                var data = res.data;

                this.$set('ads', data.ads);
                this.$set('pages', data.pages);
                this.$set('count', data.count);
                this.$set('selected', []);
            });
        },

        getSelected: function() {
            return this.ads.filter(function(ad) { return this.selected.indexOf(ad.id) !== -1; }, this);
        },

        getStatusText: function(ad) {
            return this.statuses[ad.status];
        }

    }

};

Vue.ready(module.exports);


/***/ }

/******/ });