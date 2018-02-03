<template lang="pug">
  div.container
    div(v-if="user")
      br
      div(v-if="haveEditRules").field.has-addons
        p.control
          a.button.is-danger Видалити
          a.button.is-warning Змінити
      br
      user-card(:user="user")
</template>
<script>
  import UserAPI from '#/UserAPI';
  import UserCard from '@elements/user/UserFull';

  export default {
    components: {
      UserCard,
    },
    name: 'profile',
    data () {
      return {
        id: null,
        user: null
      }
    },
    methods: {
      urlHandle (query) {
        if (query.id) {
          this.id = query.id;
        } else {
          this.id = this.$store.state.user.id;
        }
        this.loadUser();
      },
      async loadUser () {
        try {
          const response = await UserAPI.loadUser(this.id);
          console.log(response.data.item)
          if (response.data.success) {
            if (!response.data.item) {
              this.$messages.error("No user found", this);
            } else {
              this.user = response.data.item;
            }
          } else {
            throw response.data;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
      }
    },
    computed: {
      haveEditRules () {
        if (!this.$store.getters.isLogged()) {
          return false;
        } else if (this.$store.getters.isAdmin()) {
          return true;
        } else if (this.$store.state.user.id == this.id) {
          return true;
        } else {
          return false;
        }
      }
    },
    props: [],
    created () {

    },
    mounted () {
      this.urlHandle(this.$route.query);
    },
    beforeRouteUpdate (to, from, next) {
      this.urlHandle(to.query);
      next();
    }
  }
</script>
<style scoped lang="scss">
</style>
