<template lang="pug">
  div.box
    router-link(:to="{name:'Position.view',params:{id:position.id||position._id}}")
      a.buton.link
        | Детальніше
    p.subtitle Посада
    b-field
      b-input(:value="position.post", readonly, type="text")
    p.subtitle Місце роботи
      router-link(:to="{name:'Company.view',params:{id:position.company}}")
        company-short(:id="position.company")
</template>
<script>
  import CompanyShort from '../company/CompanyShort';

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
      position: {
        required: true,
        type: Object
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
