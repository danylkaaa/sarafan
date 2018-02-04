<template lang="pug">
  header
    nav.navbar.is-white(role="navigation" aria-label="main navigation")
      div.container
        div.navbar-brand
          router-link(:to="{name:'Home'}").navbar-item
            img(src="/static/img/logo.png" alt="Сарафан" width="150" height="60")
        a.navbar-burger.burger.round-percent-50(data-target="menu", ref="burger", @click="showAllMenu()")
          span
          span
          span
        div#menu.navbar-menu(ref="menu")
          div.navbar-start
            header-link(v-for="(link, i) in links", :key="i", :link="link",
            v-if="!('condition' in link) || link.condition()")
    addr
</template>

<script>
  import links from './headerLinks/links';
  import HeaderLink from './headerLinks/HeaderLink'
  import Addr from './AdressAutocomplete.vue'

  export default {
    components: {
      HeaderLink,
      Addr
    },
    name: "app-header",
    data () {
      return {
        UI: {
          isShown: true
        },
        links
      }
    },
    methods: {
      showAllMenu: function () {
        let burger = this.$refs.burger;
        let menu = this.$refs.menu;
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      },
    }
  }
</script>

<style scoped>

</style>

