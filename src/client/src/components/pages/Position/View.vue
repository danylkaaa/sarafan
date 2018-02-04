<template lang="pug">
  div.container(v-if="position")
    position-full(:position="position")
</template>
<script>
  import PositionAPI from '#/PositionAPI';
  import PositionFull from '@elements/Position/Full';

  export default {
    components: {
      PositionFull
    },
    data () {

      return {
        id: null,
        position: null
      }
    },
    methods: {
      urlHandle (query) {
        if (query.id) {
          this.id = query.id;
          this.load();
        } else {
          this.$router.push({name: '404'});
        }
      },
      async load () {
        this.$bus.$emit('load-start')
        try {
          const response = await PositionAPI.load(this.id);
          console.log(response.data.item)
          if (response.data.success) {
            if (!response.data.item) {
              this.$messages.error("No position found", this);
            } else {
              this.position = response.data.item;
            }
          } else {
            this.$router.push({name: '404'});
            throw response.data;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
        this.$bus.$emit('load-end')
      }
    },
    mounted () {
      this.urlHandle(this.$route.params);
    },
    beforeRouteUpdate (to, from, next) {
      this.urlHandle(to.params);
      next();
    },
  }
</script>
<style scoped lang="scss">
</style>
