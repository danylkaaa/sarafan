<template lang="pug">
  div.box
    p.subtitle Посада
    b-field
      b-input(:value="position.post", readonly, type="text")
    p.subtitle Особа
      router-link(:to="{name:'Profile',params:{id:position.user}}")
        user-short(:id="position.user")
</template>
<script>
  import UserShort from '../user/UserShort';

  export default {
    components: {
      UserShort
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
