module.exports = {

};

Vue.ready(() => {

  $('.adsensekit').each(function () {
     var $el = $(this);
     var id = $el.attr('data-id');
     var data = window["$adsensekit_" + id];

    window.AdsenseKit = new Vue({
       el: this,
       data: data,
       components: {
            adsensekit: require('../components/adskit-site.vue')
       }
    }
    );
    
    (adsbygoogle = window.adsbygoogle || []).push({});
  });
});
