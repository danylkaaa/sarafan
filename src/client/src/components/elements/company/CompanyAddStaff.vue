<template lang="pug">
  div
    invites(:company="company")
</template>
<script>
  import Invites from './Invites'
  export default {
    data () {
      return {}
    },
    components:{
      Invites
    },
    methods: {},
    computed: {},
    props: {
      company: {
        required: true
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
