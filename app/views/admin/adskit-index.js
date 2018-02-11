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
