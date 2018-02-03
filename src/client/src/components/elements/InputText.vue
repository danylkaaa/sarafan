<template lang="pug">
  b-field(
  :type="!isValid? 'is-danger': data?'is-success':''",
  :message="errorMessage")
    b-input(
    @input="$emit('action')",
    :type="type",
    :icon="icon",
    :value="value",
    :name="label",
    :placeholder="placeholder",
    v-model="data",
    v-validate.initial="rules",
    :password-reveal="reveal")

</template>
<script>
  export default {
    name: "InputText",
    data () {
      return {
        data: ""
      }
    },
    methods: {},
    computed: {
      errorMessage () {
        return !this.isValid ? this.errors.first(this.label) : ''
      },
      isValid () {
        return !this.errors.has(this.label);
      }
    },
    watch: {
      value () {
        this.data = this.value;
      }
    },
    props: {
      "rules": {
        type: Object
      },
      "icon": {
        type: String
      },
      "label": {
        type: String,
        required: true
      },
      "placeholder": {
        type: String,
      },
      "type": {
        type: String,
        default: "text"
      },
      "reveal": {
        type: Boolean,
        default: false
      },
      "value": {
        type: String,
        default: ""
      },
    },
  }
</script>
<style scoped lang="scss">
</style>
