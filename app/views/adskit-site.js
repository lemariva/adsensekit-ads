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
            adsensekit: require('../components/adskit-adsense.vue')
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
           adsensekit: require('../components/adskit-general.vue')
      }
   }
   );
 });


});
