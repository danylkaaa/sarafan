<template lang="pug">
  div.box
    div.media
      figure.media-left
        p.image.is-64x64
          img(:src="$store.state.user.picture||'/static/img/user.png'")
      div.media-content
        div.content
          input-text(type="textarea",placeholder="Залиши коментар", :rules="{required:true}", label="comment",ref="comment")
          nav.level
            div.level-left
              div.level-item
                a.button.is-info(@click.stop="handleSave") Зберегти
</template>
<script>
  // import UserAPI from '#/UserAPI';
  import CommentsAPI from "#/CommentsAPI";
  import InputText from '@elements/InputText'

  export default {
    components: {
      InputText
    },
    data () {
      return {
        from: null,
        to: null
      }
    },
    methods: {
      async handleSave () {
        if (!this.$refs.comment.isValid) {
          this.$messages.error('Ви не написали відгук!');
          return;
        }
        this.$bus.$emit('load-start');
        try {
          const result = await CommentsAPI.save(this.newComment)
          if (result.data.success) {
            this.$messages.success('Ви прокоментували роботу фахівця', this)
          } else {
            throw result;
          }
        } catch (err) {
          this.$messages.error(err, this)
        }
        this.$bus.$emit('load-end');
      }
    },
    computed: {
      newComment () {
        return {
          target: this.position.id || this.position._id,
          comment: this.$refs.comment.data,
          stats: {
            quality: 1,
            attitude: 1,
            professionalism: 1,
            sociability: 1,
            speed: 1
          }
        }
      }
    },
    props: {
      position: {
        required: true,
      }
    },
    created () {


    }
  }
</script>
<style scoped lang="scss">
</style>
