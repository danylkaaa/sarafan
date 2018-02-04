<template lang="pug">
  div.box
    router-link(:to="{name:'Position.view',params:{id:position.id||position._id}}")
      a.buton.link
        | Детальніше
    p.subtitle Посада
    b-field
      b-input(:value="position.post", readonly, type="text")
    p.subtitle Особа
      router-link(:to="{name:'Profile',query:{id:position.user}}")
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
