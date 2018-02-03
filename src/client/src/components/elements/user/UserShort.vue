<template lang="pug">
  article.media(v-if="user")
    figure.media-left
      p.image.is-64x64
        img.round-percent-10(:src="user.picture||'/static/img/user.png'")
    div.media-content
      div.content
      p
        strong {{user.name}}
      p {{user.id||user._id}}
</template>
<script>
  import UserAPI from '#/UserAPI';

  export default {
    data () {
      return {
        user: null
      }
    },
    methods: {
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
    watch: {
      id () {
        this.loadUser()
      }
    },
    computed: {
      joined () {
        return (new Date(this.user.created)).toLocaleString();
      }
    },
    mounted () {
      this.loadUser();
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">

  .box {
    margin-top: 128px;
  }
</style>
