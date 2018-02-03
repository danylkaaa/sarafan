<template lang="pug">
    div
        qrcode-vue(:value="value",  :size="size", :level="H")

</template>

<script>
    import QrcodeVue from 'qrcode.vue';
    export default {
        name: "QR",
        data() {
            return {
                value: 'dichDICH',
                size: 300
            }
        },
        components: {
            QrcodeVue
        }
    }
</script>
<style scoped lang="scss">
</style>
