<template lang="pug">

</template>

<script>
  import InputText from '@elements/InputText';

  export default {
    name: "register",
    components: {
      InputText
    },
    data () {
      return {
        UI: {
          isShown: false,
          isLoading: false
        }
      }
    },
    methods: {

    },

  }
</script>

<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .ripple {
    color: $md-amber-200;
  }

  .avatar {
    margin-top: -70px;
  }

  .avatar-image {
    background-color: white;
    border-radius: 50%;
    border: 5px white solid;
    box-sizing: content-box;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  }

  .box {
    margin-top: 70px;
  }

  .ripple {
    color: $md-light-blue-900;
  }

  .modal {
    z-index: 1000;
  }
</style>
