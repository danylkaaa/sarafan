<template lang="pug">
  div
    div.box
      a.button.is-primary(@click.stop="handleLoad") Update
      a.button.is-info(@click.stop="handleGenerate") Generate
    div.box
      invites-table(:data="invites")
</template>
<script>
  import InvitesTable from './InvitesTable';
  import InvitesAPI from '#/InvitesAPI';

  export default {
    data () {
      return {
        invites: []
      }
    },
    components: {
      InvitesTable
    },
    methods: {
      async handleLoad () {
        try {
          let result = await InvitesAPI.load(this.company.id);
          console.log(result.data)
          if (result.data.success) {
            this.invites = result.data.item;
          } else {
            throw result.data.message;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
      },
      async handleGenerate(){

      }
    },
    computed: {},
    props: {
      company: {
        required: true
      }
    },
    mounted () {
      this.handleLoad();
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
