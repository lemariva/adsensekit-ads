<template>

    <div class="uk-grid pk-grid-large pk-width-sidebar-large uk-form-stacked" data-uk-grid-margin>
        <div class="pk-width-content">

            <div class="uk-form-row">
                <input class="uk-width-1-1 uk-form-large" type="text" name="title" :placeholder="'Enter Title' | trans" v-model="ad.title" v-validate:required>
                <p class="uk-form-help-block uk-text-danger" v-show="form.title.invalid">{{ 'Title cannot be blank.' | trans }}</p>
            </div>
            <div class="uk-form-row">
                    <label for="form-adtype" class="uk-form-label">{{ 'Ads type' | trans }}</label>
                    <div class="uk-form-controls">
                        <select id="ad-adtype" class="uk-width-1-1" v-model="ad.adtype" data-uk-switcher="{connect:'#ads-type-switcher'}" onchange="UIkit.switcher($('#ads-type-switcher')).show($('li#'+this.value));">  
                            <option v-for="(id, adtype) in data.adstypes" :value="id" >{{adtype}}</option>
                        </select>
                    </div>
            </div>
            <br/><br/>
            <ul id="ads-type-switcher" class="uk-switcher">
                <li id="0">
                    <div class="uk-form-row">
                        <label for="ad-adformat" class="uk-form-label">{{ 'Ad format' | trans }}</label>
                        <div class="uk-form-controls">
                            <input id="ad-adformat" class="uk-width-1-1" type="text" v-model="ad.adformat_adsense">
                        </div>
                    </div>

                    <div class="uk-form-row">
                        <label for="ad-adlayoutkey" class="uk-form-label">{{ 'Ad layout key' | trans }}</label>
                        <div class="uk-form-controls">
                            <input id="ad-adlayoutkey" class="uk-width-1-1" type="text" v-model="ad.adlayoutkey_adsense">
                        </div>
                    </div>

                    <div class="uk-form-row">
                        <label for="ad-adclient" class="uk-form-label">{{ 'Ad client' | trans }}</label>
                        <div class="uk-form-controls">
                            <input id="ad-adclient" class="uk-width-1-1" type="text" v-model="ad.adclient_adsense">
                        </div>
                    </div>

                    <div class="uk-form-row">
                        <label for="ad-adslot" class="uk-form-label">{{ 'Ad slot' | trans }}</label>
                        <div class="uk-form-controls">
                            <input id="ad-adslot" class="uk-width-1-1" type="text" v-model="ad.adslot_adsense">
                        </div>
                    </div>
                </li>
                <li id="1">
                    <div class="uk-form-row">
                        <label for="ad-text" class="uk-form-label">{{ 'Ad img src' | trans }}</label>
                        <div class="uk-form-controls">
                            <input id="ad-src" class="uk-width-1-1" type="text" v-model="ad.adsrc_img">
                        </div>
                    </div>
                    <div class="uk-form-row">
                        <label for="ad-text" class="uk-form-label">{{ 'Ad link url' | trans }}</label>
                        <div class="uk-form-controls">
                            <input id="ad-url" class="uk-width-1-1" type="text" v-model="ad.adurl_img">
                        </div>
                    </div>
                </li>
            </ul>

        </div>
        <div class="pk-width-sidebar">

            <div class="uk-panel">


                <div class="uk-form-row">
                    <label for="ad-slug" class="uk-form-label">{{ 'Slug' | trans }}</label>
                    <div class="uk-form-controls">
                        <input id="ad-slug" class="uk-width-1-1" type="text" v-model="ad.slug">
                    </div>
                </div>
                <div class="uk-form-row">
                    <label for="ad-priority" class="uk-form-label">{{ 'Priority' | trans }}</label>
                    <div class="uk-form-controls">
                        <input id="ad-priority" class="uk-width-1-1" type="text" v-model="ad.priority">
                    </div>
                </div>
                <div class="uk-form-row">
                    <label for="form-status" class="uk-form-label">{{ 'Status' | trans }}</label>
                    <div class="uk-form-controls">
                        <select id="ad-status" class="uk-width-1-1" v-model="ad.status">
                            <option v-for="(id, status) in data.statuses" :value="id">{{status}}</option>
                        </select>
                    </div>
                </div>
                <div class="uk-form-row" v-if="data.canEditAll">
                    <label for="form-author" class="uk-form-label">{{ 'Author' | trans }}</label>
                    <div class="uk-form-controls">
                        <select id="ad-author" class="uk-width-1-1" v-model="ad.user_id">
                            <option v-for="author in data.authors" :value="author.id">{{author.username}}</option>
                        </select>
                    </div>
                </div>
                <div class="uk-form-row">
                    <span class="uk-form-label">{{ 'Campaing starts on' | trans }}</span>
                    <div class="uk-form-controls">
                        <input-date :datetime.sync="ad.date_start"></input-date>
                    </div>
                </div>
                <div class="uk-form-row">
                    <span class="uk-form-label">{{ 'Campaing ends on' | trans }}</span>
                    <div class="uk-form-controls">
                        <input-date :datetime.sync="ad.date_end"></input-date>
                    </div>
                </div>

            </div>

        </div>
    </div>

</template>

<script>

    module.exports = {

        props: ['ad', 'data', 'form'],

        section: {
            label: 'Ad'
        }

    };

</script>
