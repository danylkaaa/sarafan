<template lang="pug">
  div
    div.box(v-for="(c,i) in companies",:key="c.id||c._id")
      router-link(:to="{name:'Company.view',params:{id:c._id||c.id}}")
        company-short(:id="c._id")
      br
</template>
<script>
  import CompanyShort from './CompanyShort';

  export default {
    components: {
      CompanyShort
    },
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: {
      companies: {
        type: Array
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
