<template lang="pug">
  div.media(v-if="comment && from && to")
    | {{comment}}
    figure.media-left
      p.image.is-64x64
        img(:src="from.picture||'/static/img/user.png'")
    div.media-content
      div.content
    p
      strong {{from.name}}
    div.field
    p.control
      textarea.textarea(:value="comment.text",readonly)
    nav.level
      div.level-left
        div.level-item
          a.button.is-info Зберегти
</template>
<script>
  import UserAPI from '#/UserAPI';

  export default {
    data () {
      return {
        from: null,
        to: null
      }
    },
    methods: {
      async loadUser (id, name) {
        const response = await UserAPI.loadUser(id);
        console.log(response.data.item)
        if (response.data.success) {
          if (!response.data.item) {
            this[name] = {name: 'Unknown'}
          } else {
            this[name] = response.data.item;
          }
        } else {
          throw response.data;
        }
      },
      load () {
        try {
          this.loadUser(comment.to, 'to');
          this.loadUser(comment.from, 'from');
        } catch (err) {
          console.log(err)
        }
      }
    },
    computed: {},
    props: {
      comment: {
        required: true,
        type: Object
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
