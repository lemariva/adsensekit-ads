<?php $view->script('adskit-index', 'lemariva/adsensekit:app/bundle/adskit-index.js', 'vue') ?>

<div id="adskit" class="uk-form" v-cloak>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

            <h2 class="uk-margin-remove" v-if="!selected.length">{{ '{0} %count% Ads|{1} %count% Ad|]1,Inf[ %count% Ads' | transChoice count {count:count} }}</h2>

            <template v-else>
                <h2 class="uk-margin-remove">{{ '{1} %count% Ad selected|]1,Inf[ %count% Ads selected' | transChoice selected.length {count:selected.length} }}</h2>

                <div class="uk-margin-left" >
                    <ul class="uk-subnav pk-subnav-icon">
                        <li><a class="pk-icon-check pk-icon-hover" title="Publish" data-uk-tooltip="{delay: 500}" @click="status(2)"></a></li>
                        <li><a class="pk-icon-block pk-icon-hover" title="Unpublish" data-uk-tooltip="{delay: 500}" @click="status(3)"></a></li>
                        <!--<li><a class="pk-icon-copy pk-icon-hover" title="Copy" data-uk-tooltip="{delay: 500}" @click="copy"></a></li>-->
                        <li><a class="pk-icon-delete pk-icon-hover" title="Delete" data-uk-tooltip="{delay: 500}" @click="remove" v-confirm="'Delete Ads?'"></a></li>
                    </ul>
                </div>
            </template>

            <div class="pk-search">
                <div class="uk-search">
                    <input class="uk-search-field" type="text" v-model="config.filter.search" debounce="300">
                </div>
            </div>

        </div>
        <div data-uk-margin>

            <a class="uk-button uk-button-primary" :href="$url.route('admin/adsensekit/ads/edit')">{{ 'Add Ad' | trans }}</a>

        </div>
    </div>

    <div class="uk-overflow-container">
        <table class="uk-table uk-table-hover uk-table-middle">
            <thead>
                <tr>
                    <th class="pk-table-width-minimum"><input type="checkbox" v-check-all:selected.literal="input[name=id]" number></th>
                    <th class="pk-table-min-width-100" v-order:title="config.filter.order">{{ 'Title' | trans }}</th>
                    <th class="pk-table-width-100 uk-text-center">
                        <input-filter :title="$trans('Status')" :value.sync="config.filter.status" :options="statusOptions"></input-filter>
                    </th>
                    <th class="pk-table-width-100 uk-text-center" v-order:comment_count="config.filter.order">{{ 'priority' | trans }}</th>
                    <th class="pk-table-width-150">{{ 'Plugin code' | trans }}<a class="uk-icon-info uk-icon-hover uk-margin-small-left"
                        data-uk-tooltip="{delay:200}" :title="'Add this code to any Pagekit content to show the form.' | trans"></a></th>
										<th class="pk-table-width-100" v-order:date="config.filter.order">{{ 'Date' | trans }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="check-item" v-for="ad in ads" :class="{'uk-active': active(ad)}">
                    <td><input type="checkbox" name="id" :value="ad.id"></td>
                    <td>
                        <a :href="$url.route('admin/adsensekit/ads/edit', { id: ad.id })">{{ ad.title }}</a>
                    </td>
                    <td class="uk-text-center">
                        <a :title="getStatusText(ad)" :class="{
                              'pk-icon-circle': ad.status == 0,
                              'pk-icon-circle-warning': ad.status == 1,
                              'pk-icon-circle-success': ad.status == 2 && ad.published,
                              'pk-icon-circle-danger': ad.status == 3,
                              'pk-icon-schedule': ad.status == 2 && !ad.published
                            }" @click="toggleStatus(ad)"></a>
                    </td>
										<td>
                        {{ ad.priority }}
                    </td>

                    <td>
                       <kbd>(adsensekit){"id":"{{ ad.id }}"}</kbd>
                    </td>

										<td>
												{{ ad.date | date }}
										</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h3 class="uk-h1 uk-text-muted uk-text-center" v-show="ads && !ads.length">{{ 'No ads found.' | trans }}</h3>

    <v-pagination :page.sync="config.page" :pages="pages" v-show="pages > 1 || page > 0"></v-pagination>

</div>
