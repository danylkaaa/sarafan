<template lang="pug">
  div.container
    br
    div
      section.tile.notification.is-link.welcome.is-small(v-if="user")
        div.container
          h1.title {{user.name}}
        figure.image.is-256x256#qr
          qr(:link="userLink", size="256")
    div.field.has-addons
      p.control
        a.button.is-danger(@click.stop="handleDelete", v-if="haveEditRules") Видалити
        // a.button.is-warning(@click.stop="handleEdit", v-if="haveEditRules")  Змінити
        router-link(:to="{name:'Company.create'}", v-if="$store.getters.isLogged()")
          a.button.is-warning Створити компанію
    b-tabs(v-if="user")
      b-tab-item(label="Інформація")
        user-card(:user="user")
      b-tab-item(label="Запрошення", v-if="haveEditRules")
        user-invites(:user="user")
      b-tab-item(label="Посади")
        user-positions(:user="user")
</template>
<script>
  import UserAPI from '#/UserAPI';
  import UserCard from '@elements/user/UserFull';
  import UserInvites from '@elements/user/UserInvites';
  import UserPositions from '@elements/user/UserPositions';
  import Qr from '@elements/qr';

  export default {
    components: {
      UserCard,
      UserPositions,
      UserInvites,
      Qr
    },
    name: 'profile',
    data () {
      return {
        id: null,
        user: null
      }
    },
    methods: {
      async handleDelete () {
        this.$bus.$emit('load-start');
        try {
          const result = await UserAPI.remove(this.id);
          if (result.data.success) {
            if (this.id == this.$store.state.user.id) {
              this.$bus.$emit('logout');
            }
            this.$router.push({name: 'Home'})
          } else {
            throw result.data.message
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
        this.$bus.$emit('load-end');
      },
      handleEdit () {

      },
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
      userLink () {
        console.log('L', `https://sarafan.herokuapp.com/#/user?id=${this.user._id || this.user.id}`);
        return  `https://sarafan.herokuapp.com/#/user?id=${this.user._id || this.user.id}`;
      },
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
      console.log('mounted')
      this.urlHandle(this.$route.query);
    },
    beforeRouteUpdate (to, from, next) {
      console.log('1')
      this.urlHandle(to.query);
      next();
    }
  }
</script>
<style scoped lang="scss">
</style>
