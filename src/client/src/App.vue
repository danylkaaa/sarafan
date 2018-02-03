<template lang="pug">
  div#app
    b-loading(:active="UI.isLoading")
    app-header
    router-view
</template>

<script>
  import AppHeader from '@elements/Header';
  export default {
    name: 'App',
    components: {
      AppHeader
    },
    data () {
      return {
        UI: {
          isLoading: false
        }
      }
    },
    methods: {
      loadStart () {
        this.UI.isLoading = true;
      },
      loadEnd () {
        this.UI.isLoading = false;
      },
      addEventHandlers () {
        this.$bus.$on('load-start', this.loadStart);
        this.$bus.$on('load-end', this.loadEnd);
        this.$bus.$on('login', this.loginHandler);
        this.$bus.$on('logout', this.$auth.logout);
      },
      removeEventHandlers () {
        this.$bus.$off('login', this.loginHandler);
        this.$bus.$off('load-start', this.loadStart);
        this.$bus.$off('load-end', this.loadEnd);
        this.$bus.$off('logout', this.$auth.logout);
      },
      async loginHandler (type) {
        this.$bus.$emit('load-start');
        try {
          await this.$auth.login(type)
        } catch (err) {
          this.$messages.error(err, this)
        }
        this.$bus.$emit('load-end');
      }
    },
    mounted () {
      this.addEventHandlers();
    },
    beforeDestroy () {
      this.removeEventHandlers();
    }
  }
</script>

<style>
</style>
