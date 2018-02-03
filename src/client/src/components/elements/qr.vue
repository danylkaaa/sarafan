<template lang="pug">
  qrcode-vue(:value="link",  :size="size", :level="H")
</template>

<script>
  import QrcodeVue from 'qrcode.vue';

  export default {
    name: "QR",
    data () {
      return {}
    },
    components: {
      QrcodeVue
    },
    props: {
      link: {
        required: true,
        type: String
      },
      size: {
        default: 200
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
