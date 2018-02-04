<template lang="pug">
  div.box
    rating(v-if="rating ",:stats="rating", ref="rating")
    router-link(:to="{name:'Position.view',params:{id:position.id||position._id}}")
      a.buton.link
        | Детальніше
    p.subtitle Посада
    b-field
      b-input(:value="position.post", readonly, type="text")
    p.subtitle Місце роботи
      router-link(:to="{name:'Company.view',params:{id:position.company}}")
        company-short(:id="position.company")
    b-taglist(attached)
      b-tag(type="is-dark").is-large Оцінка
      b-tag.is-info.is-large
        a.has-text-white(@click.stop="$refs.rating.toggle") {{rating.score}}
</template>
<script>
  import CompanyShort from '../company/CompanyShort';
  import Rating from '@elements/rating/RatingView';
  import PositionAPI from '#/PositionAPI';

  export default {
    components: {
      CompanyShort,
      Rating
    },
    data () {
      return {
        rating: {
          score: 0,
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
