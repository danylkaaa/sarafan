<template lang="pug">
  div.container
    div
    br
    companies-list(:companies="companies")
</template>
<script>
  export default {
    data () {
      return {
        companies: [],
        filter: {}
      }
    },
    methods: {
      handleURL(query){

      }
    },
    computed: {},
    props: [],
    beforeRouteUpdate(to,from,next){
      this.handleURL(to.query);
      next();
    },
    mounted(){
      this.handleURl(this.$route.query);
    }
  }
</script>
<style scoped lang="scss">
</style>
