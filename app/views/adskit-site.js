module.exports = {
    el: '#adsensekit',
    data: _.assign({
        aditem: {}
    }, window.$adsensekit),

    components: {
        adsensekit: require('../components/adskit-site.vue')
    }

};
Vue.ready(() => {
    window.AdsenseKit = new Vue(module.exports);
});
