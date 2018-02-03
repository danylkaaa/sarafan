<template lang="pug">
    dropdown-link( v-if="hasChildren", :link="link")
    plain-link( v-else, :link="link")
</template>

<script>
  import PlainLink from './PlainLink';
  import DropdownLink from './DropdownLink';

  export default {
    name: "HeaderLink",
    components: {
      PlainLink,
      DropdownLink
    },
    props: {
      "link": {
        type: Object,
        required: true
      }
    },
    computed: {
      hasChildren () {
        return this.link.children && this.link.children.length > 0;
      },
      hasTooltip () {
        return this.link.tooltip && this.link.tooltip.length > 0;
      },
      hasIcon () {
        return this.link.icon;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .ripple {
    color: rgba(0, 0, 0, .3)
  }
</style>
