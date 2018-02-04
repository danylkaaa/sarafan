<template lang="pug">
  div
    section.hero.is-facebook.is-fullheight#search
      div.hero-body
        div.container.has-text-centered
          h1.title.is-size-1.is-uppercase.has-text-warning.is-mega-text Сарафан
          h2.title.is-size-2.has-text-white Сервіс оцінки якості роботи
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  #search {
    background-size: cover;
  }

  .big-text-2 {
    font-size: 5em;
  }

  .big-text-1 {
    font-size: 4em;
  }

  .ripple {
    color: $md-yellow-50;
  }

</style>

