<template lang="pug">
  div.navbar-item.has-dropdown.is-hoverable
    a(ref="btn", @click="hasHandler?link.handler:''").navbar-link
      b-icon(
      :class="link.icon.class",
      v-if="hasIcon",
      :pack="link.icon.pack||'fa'",
      :icon="link.icon.name",
      :size="link.icon.size||'is-small'")
      span(:class="link.class")  {{link.title}}
      ui-ripple-ink(trigger="btn").ripple
      ui-tooltip(v-if="hasTooltip",trigger="btn", position="right middle") {{link.tooltip}}
    div.navbar-dropdown
      plain-link(v-for="(child,i) in link.children", :link="child", :key="i")
</template>

<script>
  import PlainLink from './PlainLink'

  export default {
    name: "DropdownLink",
    components: {
      PlainLink
    },
    props: {
      "link": {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick () {
        if (this.hasHandler) {
          this.link.handler();
        } else if (this.link.to) {
          this.$router.push(this.link.to)
        }
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
      },
      hasHandler () {
        return this.link.handler;
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
