<template>
  <ins class="adsbygoogle" :style="adStyle"
    :data-ad-format="adFormat"
    :data-ad-layout-key="adLayoutKey"
    :data-ad-client="adClient"
    :data-ad-slot="adSlot"></ins>
</template>

<script>
module.exports = {
    props: {
        adItem: {
          type: Object,
          required: true
        },
        adStyle: {
          type: String,
          required: false,
          default: 'display: block'
        },
        adFormat: {
          type: String,
          required: false,
          default: 'fluid'
        },
        adLayoutKey: {
          type: String,
          required: true
        },
        adClient: {
          type: String,
          required: true
        },
        adSlot: {
          type: String,
          required: true
        }
    },
    ready() {
              (window.adsbygoogle = window.adsbygoogle || []).push({})
    }

}
</script>
