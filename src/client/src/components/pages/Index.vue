<template lang="pug">
  div
    section.hero.is-info.is-medium#search
      div.hero-body
        div.container.has-text-centered
          h1.title.big-text-2.is-uppercase.has-text-primary.is-mega-text Сарафан
          h2.title.big-text-1.has-text-white Сервіс оцінки якості роботи
  

</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  #search {
    background-image: url('/static/img/bg.jpg');
    background-repeat: no-repeat;
    background-position: bottom;
    background-attachment: fixed;
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

