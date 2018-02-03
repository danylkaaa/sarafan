<template lang="pug">
  div
    div.box
      a.button.is-primary(@click.stop="handleLoad") Оновити
    div.box
      invites-table(:data="invites", @remove="handleRemove", @accept="handleAccept")
</template>
<script>
  import InvitesAPI from '#/InvitesAPI';
  import InvitesTable from './InvitesTable';

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
      async handleAccept (id) {
        this.$bus.$emit('load-start');
        try {
          let result = await InvitesAPI.accept(id);
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
          let result = await InvitesAPI.loadByUser(this.$store.state.user.id || this.$store.state.user._id);
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
      user: {
        required: true,
        type: Object
      }
    },
    mounted () {
      this.handleLoad();
      this.$bus.$on('invites-update', this.handleLoad);
    },
    destroyed () {
      this.$bus.$off('invites-update', this.handleLoad);
    },
  }
</script>
<style scoped lang="scss">
</style>
