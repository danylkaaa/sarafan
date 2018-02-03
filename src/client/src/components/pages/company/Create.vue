<template lang="pug">
  div.container
    br
    company-edit(:company="company", ref="editArea")
    br
    div.has-text-centered
      a.button.is-success.is-large(@click.stop="handleCreate") Створити
</template>

<script>
  import CompanyInfo from '@elements/company/Info';
  import CompanyEdit from '@elements/company/Edit';
  import CompanyAPI from '#/CompanyAPI';

  export default {
    components: {
      CompanyInfo,
      CompanyEdit
    },
    name: "create",
    data () {
      return {
        company: {
          address: {}
        }
      }
    },
    methods: {
      async handleCreate () {
        if (!this.$refs.editArea.validate()) {
          this.$messages.error("У вас виникла помилка призаповненні", this)
          return;
        }
        this.$bus.$emit('load-start');
        try {
          await this.$refs.editArea.collect();
          const result = await CompanyAPI.create(this.company);
          console.log(result.data.item)
          if (result.data.success) {
            this.$messages.success('Created', this);
            this.$router.push({name: 'Company', params: {id: result.data.item.id}});
          } else {
            throw result.data.message;
          }
        } catch (err) {
          this.$messages.error(err, this)
        }
        this.$bus.$emit('load-end');
      }
    },
    mounted () {
      console.log(1)
    }
  }
</script>

<style scoped>

</style>
