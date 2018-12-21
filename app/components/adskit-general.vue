<template>
  <a :href="adUrl" target="_blank">
    <img :src="adSrc" :alt="adName"/>
  </a>
</template>

<script>
module.exports = {
    props: {
        adItem: {
          type: Object,
          required: true
        },
        adSrc: {
          type: String,
          required: false,
          default: ''
        },
        adName: {
          type: String,
          required: false,
          default: ''
        },
        adUrl: {
          type: String,
          required: false,
          default: ''
        }
    },
    ready() {
              //(window.adsbygoogle = window.adsbygoogle || []).push({})
    }

}
</script>
