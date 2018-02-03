<template lang="pug">
  b-table( :data="data", :columns="columns")
</template>
<script>
  export default {
    data () {
      return {
        columns: [
          {
            field: 'to',
            label: 'TO',
          },
          {
            field: 'role',
            label: 'Role',
          },
        ]
      }
    },
    methods: {},
    computed: {},
    props: {
      data: {
        required: true,
        type: Array
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
