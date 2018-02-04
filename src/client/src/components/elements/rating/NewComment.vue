<template lang="pug">
  div.box
    rating(:stats="comment.stats", ref="rating", :canModify="'true'")
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
  import Rating from '@elements/rating/RatingView';

  export default {
    components: {
      InputText,
      Rating
    },
    data () {
      return {
        comment: {
          stats: {
            quality: 3,
            speed: 3,
            attitude: 3,
            sociability: 3,
            professionalism: 3
          }
        },
        from: null,
        to: null
      }
    },
    methods: {
      async send (comment) {
        this.$bus.$off('comment', this.send)
        this.$bus.$emit('load-start');
        try {
          const result = await CommentsAPI.save(this.newComment);
          if (result.data.success) {
            this.$messages.success('Ви прокоментували роботу фахівця', this)
            this.$bus.$emit('comments-updated');
          } else {
            throw result;
          }
        } catch (err) {
          this.$messages.error(err, this)
        }
        this.$bus.$emit('load-end');
      },
      rate () {
        this.$bus.$off('comment', this.send)
        this.$bus.$on('comment', this.send);
        this.$refs.rating.toggle();
      },
      async handleSave () {
        if (!this.$refs.comment.isValid) {
          this.$messages.error('Ви не написали відгук!',this);
          return;
        }
        this.rate();
      }
    },
    computed: {
      newComment () {
        return {
          target: this.position.id || this.position._id,
          comment: this.$refs.comment.data,
          stats: this.comment.stats
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
