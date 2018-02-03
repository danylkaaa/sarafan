<template lang="pug">
  div.hero
    p Quality:
      star-rating( :star-size = 30, @rating-selected ="setRatingQuality")
    p Attitude:
      star-rating( :star-size = 30, @rating-selected ="setRatingAttitude")
    p Professionalism:
      star-rating( :star-size = 30, @rating-selected ="setRatingProfessionalism")
    p Sociability:
      star-rating( :star-size = 30, @rating-selected ="setRatingSociability")
    p Speed:
      star-rating( :star-size = 30, @rating-selected ="setRatingSpeed")

</template>

<script>
  import StarRating from 'vue-star-rating'

  export default {
    name: "StarRater",
    data() {
      return {
        stats: {
          quality : 0,
          attitude : 0,
          professionalism : 0,
          sociability : 0,
          speed : 0
          }
        }

    },
    methods: {
      setRatingQuality: function(rating){
        this.stats.quality = rating;
        console.log(this.stats.quality);
      },
      setRatingAttitude: function(rating){
        this.stats.attitude = rating;
        console.log(this.stats.attitude);
      },
      setRatingProfessionalism: function(rating){
        this.stats.professionalism = rating;
        console.log(this.stats.professionalism);
      },
      setRatingSociability: function(rating){
        this.stats.sociability = rating;
        console.log(this.stats.sociability);
      },
      setRatingSpeed: function(rating){
        this.stats.speed = rating;
        console.log(this.stats.speed);
      },
    },
    components: {
      StarRating
    }
  }
</script>
<style scoped lang="scss">
</style>
