<template lang="pug">
  div
    div.box
      figure.image.avatar.is-256x256
        img.avatar-image(:src="user.picture||'/static/img/user.png'")
      br
      div.has-text-centered
        figure.image.is-128x128#qr
          qr(:link="userLink", size="128")
      div.content
        section
          b-field(label="Ім'я")
            b-input(:value="user.name", readonly, icon="account")
          b-field(label="ID")
            b-input(:value="user.id||user._id", readonly, icon="number")
          b-field(label="Електрона адреса")
            b-input(:value="user.email", readonly, icon="email")
          b-field(label="Зареєстрований")
            b-input(:value="joined", readonly, icon="calendar-today")
          b-field(v-if="user.role=='admin'",label="Адміністатор")
            b-switch(:value="user.role=='admin'",readonly="true", disabled)
</template>
<script>
  import URLJoin from 'url-join';
  import Qr from '../qr';

  export default {
    data () {
      return {}
    },
    components: {
      Qr
    },
    methods: {},
    computed: {
      userLink () {
        return URLJoin(this.$config.ROOT_URL, '/#', `/user?id=${this.user._id || this.user.id}`);
      },
      joined () {
        return (new Date(this.user.created)).toLocaleString();
      }
    },
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
  .avatar {
    margin: auto;
    margin-top: -128px;
  }

  .avatar-image {
    background-color: white;
    border-radius: 50%;
    border: 5px white solid;
    box-sizing: content-box;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  }

  #qr {
    margin: auto;
  }

  .box {
    margin-top: 128px;
  }
</style>
