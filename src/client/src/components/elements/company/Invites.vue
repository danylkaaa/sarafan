<template lang="pug">
  div
    div.box
      a.button.is-primary(@click.stop="handleLoad") Оновити
    geterate-invite(:company="company")
    div.box
      invites-table(:data="invites", @remove="handleRemove")
</template>
<script>
  import InvitesTable from './InvitesTable';
  import InvitesAPI from '#/InvitesAPI';
  import GeterateInvite from './GeterateInvite';

  export default {
    data () {
      return {
        invites: []
      }
    },
    components: {
      InvitesTable,
      GeterateInvite
    },
    methods: {
      async handleRemove (id) {
        this.$bus.$emit('load-start');
        try {
          let result = await InvitesAPI.remove(id);
          console.log(result.data)
          if (result.data.success) {
            this.handleLoad();
          } else {
            throw result.data.message;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
        this.$bus.$emit('load-end');
      },
      async handleLoad () {
        this.$bus.$emit('load-start')
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
        this.$bus.$emit('load-end')
      },
    },
    computed: {},
    props: {
      company: {
        required: true
      }
    },
    mounted () {
      this.handleLoad();
      this.$bus.$on('invites-update', this.handleLoad);
    },
    destroyed () {
      this.$bus.$off('invites-update', this.handleLoad);
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
