<template lang="pug">
  div#app
    b-loading(:active="UI.isLoading")
    app-login(ref="login")
    app-register(ref="register")
    app-header
    router-view
    q-r
</template>

<script>
  import AppLogin from '@elements/auth/Login';
  import AppRegister from '@elements/auth/Register';
  import AppHeader from '@elements/Header';
  import QR from '@elements/qr'

  export default {
    name: 'App',
    components: {
      AppLogin,
      AppRegister,
      AppHeader,
      QR
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
        this.$bus.$on('logout', this.$auth.logout);
      },
      removeEventHandlers () {
        this.$bus.$off('load-start', this.loadStart);
        this.$bus.$off('load-end', this.loadEnd);
        this.$bus.$off('logout', this.$auth.logout);
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
