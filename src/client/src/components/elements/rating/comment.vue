<template lang="pug">
  figure.media-left
    p.image.is-64x64
      img(:src="from.picture||'/static/img/user.png'")
  div.media-content
    div.content
  p
    strong {{from.name}}
    small відвовів {{to.name||''}}
  div.field
  p.control
    textarea.textarea(placeholder="Add a comment...")
  nav.level
    div.level-left
      div.level-item
        a.button.is-info Зберегти
</template>
<script>
  import CommentsAPI from '#/CommentsAPI';
  export default {
    data () {
      return {
        from: null,
        text: null,
        to: null,
      }
    },
    watch:{
      id(){
        this.handleLoad()
      }
    },
    methods: {
      handleLoad () {
        try {
          const result=CommentsAPI.load(this.id);
        } catch (err) {
          this.$messages.error(err, this);
        }
      }
    },
    computed: {},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
