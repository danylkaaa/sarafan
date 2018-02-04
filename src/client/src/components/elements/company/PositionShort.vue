<template lang="pug">
  div.box
    rating(v-if="rating ",:stats="rating", ref="rating")
    b-taglist(attached)
      b-tag(type="is-dark").is-large Оцінка
      b-tag.is-info.is-large
        a.has-text-white(@click.stop="$refs.rating.toggle") {{rating.average.toFixed(1)}}
    router-link(:to="{name:'Position.view',params:{id:position.id||position._id}}")
      a.buton.link
        | Детальніше
    p.subtitle Посада
    b-field
      b-input(:value="position.post", readonly, type="text")
    p.subtitle Особа
      router-link(:to="{name:'Profile',query:{id:position.user}}")
        user-short(:id="position.user")

</template>
<script>
  import UserShort from '../user/UserShort';
  import Rating from '@elements/rating/RatingView';
  import PositionAPI from '#/PositionAPI';

  export default {
    components: {
      UserShort,
      Rating
    },
    data () {
      return {
        rating: {
          average: 0,
          quality: 0,
          speed: 0,
          attitude: 0,
          sociability: 0,
          professionalism: 0
        }
      }
    },
    methods: {
      async loadRating () {
        try {
          const result = await PositionAPI.rating(this.position.id || this.position._id);
          if (result.data.success) {
            this.rating = result.data.item;
          }
        } catch (err) {

        }
      }
    },
    mounted () {
      this.loadRating();
    },
    computed: {},
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
