<template lang="pug">
    div.container
        qrcode-vue(:value="link",  :size="qrsize", :level="H")

</template>

<script>
    import QrcodeVue from 'qrcode.vue';

    export default {
        name: "QR",
        data() {
            return {
                link: 'http://google.ua',
                qrsize: 300
            }
        },
        components: {
            QrcodeVue
        }
    }
</script>
<style scoped lang="scss">
</style>
