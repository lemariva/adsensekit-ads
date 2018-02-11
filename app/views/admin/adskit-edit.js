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

        settings: require('../../components/adskit-settings.vue')

    }

};

Vue.ready(window.Ad);
