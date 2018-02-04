<template lang="pug">
  div(v-if="this.position")
    | {{comments}}
    comment(v-for="c in comments", :key="c.id||c._id",:comment="c")
    new-comment(v-if="canComment", :position="position")
</template>
<script>
  import CommentsAPI from '#/CommentsAPI';
  import Comment from './comment';
  import NewComment from './NewComment';

  export default {
    components: {
      Comment,
      NewComment
    },
    data () {
      return {
        comments: []
      }
    },
    methods: {
      async load () {
        this.$bus.$emit('load-start')
        try {
          const response = await CommentsAPI.loadByPosition(this.position.id || this.position._id);
          console.log(response.data.item)
          if (response.data.success) {
            if (!response.data.item) {
            } else {
              this.comments = response.data.item;
            }
          } else {
            throw response.data;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
        this.$bus.$emit('load-end')
      }
    },
    computed: {
      canComment () {
        if (!this.position) {
          return false;
        } else if (!this.$store.getters.isLogged()) {
          return false;
        }
        return true
      }
    },
    watch: {
      id () {
        this.load()
      }
    },
    mounted () {
      this.load()
    },
    props: {
      position: {
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
