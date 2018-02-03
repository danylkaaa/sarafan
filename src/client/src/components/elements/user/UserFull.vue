<template lang="pug">
  section.info-tiles
    div.tile.is-ancestor.has-text-centered
      div.tile.is-parent
        article.tile.is-child.box
          figure.image
            img.round-percent-1(:src="user.facebook.picture||'/static/img/user.png'")
      div.tile.is-parent.has-text-left
        article.tile.is-child.box
          section
            b-field(label="Ім'я")
              b-input(:value="user.name", readonly, icon="account")
            b-field(label="Електрона адреса")
              b-input(:value="user.email", readonly, icon="email")
            b-field(label="Зареєстрований")
              b-input(:value="user.created", readonly, icon="calendar-today")
            b-field(v-if="user.role=='admin'",label="Адміністатор")
              b-switch(:value="user.role=='admin'",readonly="true", disabled)


</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
