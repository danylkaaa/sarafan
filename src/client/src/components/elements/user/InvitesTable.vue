<template lang="pug">
  b-table( :data="data",
  detailed,
  focusable,
  detail-key="_id")
    template( slot-scope="props")
      b-table-column( field="to", label="ID компанії") {{ props.row.from}}
      b-table-column( field="role", label="Посада") {{ props.row.role }}
      b-table-column( field="id",label="Погодитися")
        a.button(@click.stop="handleDelete(props.row._id||props.row._id)")
          b-icon(icon="check", type="is-success")
      b-table-column( field="id",label="Видалити")
        a.button(@click.stop="handleDelete(props.row._id||props.row._id)")
          b-icon(icon="delete", type="is-danger")
    template(slot="empty")
      section.section
        div.content.has-text-grey.has-text-centered
          p
            b-icon(    icon="emoticon-sad",    size="is-large")
          p Немає запрошень
    template(slot="detail",slot-scope="props")
      company-short(:id="props.row.from")
</template>
<script>
  import CompanyShort from '@elements/company/CompanyShort';

  export default {
    data () {
      return {}
    },
    components: {
      CompanyShort
    },
    methods: {
      handleDelete (id) {
        this.$emit('remove', id)
      }
    },
    computed: {
      detailedUser () {

      }
    },
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
