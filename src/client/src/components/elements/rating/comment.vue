<template lang="pug">
  div.box
    rating(:stats="comment.stats", ref="rating")
    div.media(v-if="comment && from")
      figure.media-left
        p.image.is-64x64
          img(:src="from.picture||'/static/img/user.png'")
        br
        b-tag.is-info.is-large()
          a.has-text-white(@click.stop="$refs.rating.toggle") {{rating}}
      div.media-content
        div.content
          p
            strong {{from.name}}
          p
            | {{created}}
            br
            router-link(:to="{name:'Profile',query:{id:from.id||from._id}}") Профіль
            br
            div {{text}}
            a.is-success(v-if="!isShort", @click.stop="()=>detailed=!detailed") Розгорнути

</template>
<script>
  import UserAPI from '#/UserAPI';
  import Rating from '@elements/rating/RatingView';
  export default {
    data () {
      return {
        detailed: false,
        from: null
      }
    },
    components:{
      Rating
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
          this.loadUser(this.comment.author, 'from');
        } catch (err) {
          console.log(err)
        }
      }
    },
    computed: {
      isShort () {
        return this.comment.comment.length <= 50;
      },
      text () {
        if (this.isShort) {
          return this.comment.comment;
        } else if (this.detailed) {
          return this.comment.comment;
        } else {
          return this.comment.comment.substr(0, 50) + '...';
        }
      },
      created () {
        return (new Date(this.comment.modified)).toLocaleString();
      },
      rating () {
        try {
          let score = 0;
          let i = 0;
          Object.keys(this.comment.stats).forEach(x => {
              i++;
              score += Number(this.comment.stats[x])
            }
          )
          return (score / i).toFixed(1);
        } catch (err) {
          return 0;
        }
      }
    },
    props: {
      comment: {
        required: true,
        type: Object
      }
    },
    mounted () {
      this.load()
    }
  }
</script>
<style scoped lang="scss">
</style>
