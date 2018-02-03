<template lang="pug">
  div
    div.box
      p Назва
      b-field()
        b-input(:value="company.name", readonly)
    div.box
      p Адреса
      b-field(label="Область")
        b-input(:value="company.address.area", readonly)
      b-field(label="Місто")
        b-input(:value="company.address.city", readonly)
      b-field(label="Вулиця")
        b-input(:value="company.address.street", readonly)
      b-field(label="Будівля")
        b-input(:value="company.address.building", readonly)
    div.box
      p Опис
      b-field
        b-input(:value="company.info", readonly, type="textarea")
</template>

<script>

  export default {
    name: "info",
    components: {},
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
