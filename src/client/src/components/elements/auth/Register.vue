<template lang="pug">
  b-modal.modal(
  v-if="!$store.isLogged",
  :active.sync="UI.isShown",
  scroll="keep",
  animation="zoom-out",
  width="400px")
    div.box.has-text-centered
      figure.avatar
        img.avatar-image(src="/static/img/user.png", width="140px", alt="")
      h3.title.has-text-grey Реєстрація
      p.subtitle.has-text-grey Зроби країну кращою вже сьогодні
      form.has-text-left
        input-text(label="name", ref="name",placeholder="Ваше повне ім'я",:rules="{required:true}", icon="account", type="text")
        input-text(label="email", ref="email",placeholder="Ваш дійсний email",:rules="{required:true, email:true}", icon="email", type="email")
        input-text(label="password", ref="password",placeholder="Ваш пароль", :rules="{required:true}",icon="lock", :reveal="true", type="password")
      br
      a.button.is-info.is-medium.is-block(@click="registerHandler('basic')") Зареєструватися
      br
      button.button.is-fullwidth.is-medium.is-facebook.is-block(@click="registerHandler('facebook')")
        b-icon(pack="fa" icon="facebook")
        span Facebook
      hr
      p.has-text-grey.is-size-6 Вже зареєстровані?
        br
        a(@click.register="register") Уввійти

</template>

<script>
  import InputText from '@elements/InputText';

  export default {
    name: "register",
    components: {
      InputText
    },
    data () {
      return {
        UI: {
          isShown: false
        }
      }
    },
    methods: {
      isValidCredentials () {
        return (!this.$refs.email || this.$refs.email.isValid) && (!this.$refs.password || this.$refs.password.isValid);
      },
      async registerFacebook () {
        if (await this.$auth.login('facebook')) {
          this.toggle();
        }
      },
      async registerHandler (type) {
        this.$bus.$emit('load-start');
        try {
          if (type == 'facebook') {
            await this.registerFacebook();
          } else {
            await this.registerBasic();
          }
        } catch (err) {
          this.$messages.error(err, this)
        }
        this.$bus.$emit('load-end');
      },
      async registerBasic () {
        if (this.isValidCredentials()) {
          console.log(1)
          if (await this.$auth.register('basic', this.credentials)) {
            this.toggle();
          }
        } else {
          this.$messages.error("Looks like, there are some problems with your input", this);
        }
      },
      toggle () {
        this.UI.isShown = !this.UI.isShown;
      }
    },
    mounted () {
      this.$bus.$on('register', this.toggle)
    },
    destroyed () {
      this.$bus.$off('register', this.toggle)
    },
    computed: {
      credentials () {
        return {
          name: this.$refs.name.data,
          email: this.$refs.email.data,
          password: this.$refs.password.data
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .ripple {
    color: $md-amber-200;
  }

  .avatar {
    margin-top: -70px;
  }

  .avatar-image {
    background-color: white;
    border-radius: 50%;
    border: 5px white solid;
    box-sizing: content-box;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  }

  .box {
    margin-top: 70px;
  }

  .ripple {
    color: $md-light-blue-900;
  }

  .modal {
    z-index: 1000;
  }
</style>
