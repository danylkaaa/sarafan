<template lang="pug">
  b-modal.modal(
  :active.sync="isShown",
  scroll="keep",
  animation="zoom-out",
  width="400px")
    div.box
      div.has-text-centered
        b-icon(v-if="score>=4",icon="star", size="is-large",type="is-success", custom-size="fa-5x")
        b-icon(v-else-if="score>=2",icon="star", size="is-large",type="is-warning", custom-size="fa-5x")
        b-icon(v-else, icon="star", size="is-large",type="is-danger", custom-size="fa-5x")
      p Швидкість
      b-field
        input#speed.slider.is-fullwidth.is-large.is-circle(min="0",max="5", name="speed", v-model="stats.speed", type="range",:disabled="!canModify",
        :class="{'is-danger':stats.speed<2, 'is-warning':stats.speed>=2 && stats.speed<4,'is-success':stats.speed>=4}")
        output(for="speed") {{stats.speed.toFixed(1)}}
      p Якість обслуговування
      b-field
        input#quality.slider.is-fullwidth.is-large.is-circle(min="0",max="5", name="quality", v-model="stats.quality", type="range",:disabled="!canModify",
        :class="{'is-danger':stats.quality<2, 'is-warning':stats.quality>=2 && stats.quality<4,'is-success':stats.quality>=4}")
        output(for="quality") {{stats.quality.toFixed(1)}}
      p Професійність
      b-field
        input#professionalism.slider.is-fullwidth.is-large.is-circle(min="0",max="5", name="professionalism", v-model="stats.professionalism", type="range",:disabled="!canModify",
        :class="{'is-danger':stats.professionalism<2, 'is-warning':stats.professionalism>=2 && stats.professionalism<4,'is-success':stats.professionalism>=4}")
        output(for="professionalism") {{stats.professionalism.toFixed(1)}}
      p Ввічливість
        b-field
          input#sociability.slider.is-fullwidth.is-large.is-circle(min="0",max="5", name="sociability", v-model="stats.sociability", type="range",:disabled="!canModify",
          :class="{'is-danger':stats.sociability<2, 'is-warning':stats.sociability>=2 && stats.sociability<4,'is-success':stats.sociability>=4}")
          output(for="sociability") {{stats.sociability.toFixed(1)}}
      p Порядність
        b-field
          input#attitude.slider.is-fullwidth.is-large.is-circle(min="0",max="5", name="attitude", v-model="stats.attitude", type="range",:disabled="!canModify",
          :class="{'is-danger':stats.attitude<2, 'is-warning':stats.attitude>=2&& stats.attitude<4,'is-success':stats.attitude>=4}")
          output(for="attitude") {{stats.attitude.toFixed(1)}}
      a.button.is-success.is-medium.is-block(@click.stop="saveHandler",v-if="canModify") Зберегти
</template>
<script>
  export default {
    data () {
      return {
        isShown: false
      }
    },
    methods: {
      saveHandler () {
        this.$bus.$emit('comment',this.comment);
        this.toggle();
      },
      toggle () {
        this.isShown = !this.isShown;
      }
    },
    computed: {
      score () {
        try {
          let score = 0;
          let i = 0;
          Object.keys(this.stats).forEach(x => {
              i++;
              score += Number(this.stats[x])
            }
          )
          return (score / i).toFixed(1);
        } catch (err) {
          return 0;
        }
      }
    },
    props: {
      stats: {
        required: true,
        type: Object
      },
      canModify: {
        default: false
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
