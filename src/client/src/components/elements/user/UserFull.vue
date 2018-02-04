<template lang="pug">
  div
    div.box
      div.avatar
        img.avatar-image(:src="user.picture||'/static/img/user.png'")
      br
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
      },
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
    width: 256px;
    margin-top: -128px;
  }

  .avatar-image {
    width: 256px;
    heigth: 256px;
    object-fit: cover;
    position: relative;
    border-radius: 5px;
    display: block;
  }

  #qr {
    margin: auto;
  }

  .box {
    margin-top: 128px;
  }
</style>
