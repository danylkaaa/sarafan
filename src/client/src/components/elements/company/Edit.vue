<template lang="pug">
  div
    div.box
      p.title Адреса
      input-text(label="area", ref="area",placeholder="Область", :rules="{required:true}", :value="company.address.area")
      input-text(label="city", ref="city",placeholder="Місто", :rules="{required:true}", :value="company.address.city")
      input-text(label="street", ref="street",placeholder="Вулиця", :rules="{required:true}", :value="company.address.street")
      input-text(label="building", ref="building",placeholder="Будівля", :rules="{required:true}", :value="company.address.building")
    div.box
      p.title Опис
      input-text(label="information", ref="info", :rules="{required:true}", :value="company.info", type="textarea")
</template>

<script>
  import InputText from '@elements/InputText';

  export default {
    name: "edit",
    components: {
      InputText
    },
    methods: {
      collect () {
        this.company.address = {
          area: this.$refs.area.data,
          city: this.$refs.city.data,
          street: this.$refs.street.data,
          building: this.$refs.building.data
        }
        this.company.info = this.$refs.info.data;
        return this.company;
      },
      validate () {
        return this.$refs.area.isValid
          && this.$refs.city.isValid
          && this.$refs.street.isValid
          && this.$refs.building.isValid
          && this.$refs.info.isValid;
      }
    },
    props: {
      company: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
