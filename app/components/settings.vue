<template>

    <div class="uk-form uk-form-horizontal">

        <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
            <div data-uk-margin>

                <h2 class="uk-margin-remove">{{ 'AdsenseKit Settings' | trans }}</h2>

            </div>
            <div data-uk-margin>

                <button class="uk-button uk-button-primary" @click="save">{{ 'Save' | trans }}</button>

            </div>
        </div>


        <div class="uk-form-row">
            <label class="uk-form-label">{{ 'Ads per page' | trans }}</label>
            <div class="uk-form-controls uk-form-controls-text">
                <p class="uk-form-controls-condensed">
                    <input type="number" step="10" v-model="package.config.ads_per_page" class="uk-form-width-small">
                </p>
            </div>
        </div>

    </div>

</template>

<script>

    module.exports = {

        props: ['package'],

        settings: true,

        methods: {

            save() {
                this.$http.post('admin/system/settings/config', {
                    name: 'lemariva/adsensekit',
                    config: this.package.config
                })
                    .then(() => this.$notify('Settings saved.', ''))
                    .error(res => this.$notify(res.data, 'danger'))
                    .always(() =>this.$parent.close());
            }

        }

    };

    window.Extensions.components['settings-adsensekit'] = module.exports;

</script>
