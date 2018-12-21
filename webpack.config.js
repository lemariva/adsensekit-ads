module.exports = [
    {
        entry: {
            /*pagekit addons settings*/
            "settings": "./app/views/admin/settings",
            /*frontpage views*/
            /*admin views*/
            "adskit-index": "./app/views/admin/adskit-index",
            "adskit-edit": "./app/views/admin/adskit-edit",
            "adskit-site": "./app/views/adskit-site.js",
            "adskit": "./app/views/adskit-site",
        },
        output: {
            filename: "./app/bundle/[name].js"
        },

        module: {
            rules: [
                {test: /\.vue$/, loader: "vue-loader"},
                //{test: /\.vue$/, loader: "vue-loader"},
                //{test: /\.html$/, loader: "vue-html"}
            ]
        }

    }

];
