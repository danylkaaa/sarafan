<template>

</template>
<script>
  import CompanyAPI from '#/CompanyAPI';

  export default {
    data () {
      return {
        id: null,
        company: null
      }
    },
    methods: {
      urlHandle (query) {
        if (query.id) {
          this.id = query.id;
          this.loadCompany();
        } else {
          this.$router.push({name: '404'});
        }
      },
      async loadCompany () {
        try {
          const response = await CompanyAPI.loadCompany(this.id);
          console.log(response.data.item)
          if (response.data.success) {
            if (!response.data.item) {
              this.$messages.error("No comany found", this);
              this.$router.push({name: '404'});
            } else {
              this.company = response.data.item;
            }
          } else {
            throw response.data;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
      }
    },
    mounted () {
      this.urlHandle(this.$route.params);
    },
    beforeRouteUpdate (to, from, next) {
      this.urlHandle(to.params);
      next();
    },
    computed: {
      computed: {
        haveEditRules () {
          if (!this.$store.getters.isLogged()) {
            return false;
          } else if (this.$store.getters.isAdmin()) {
            return true;
          } else if (this.$store.state.user.id == this.id) {
            return true;
          } else {
            return false;
          }
        }
      },
      props: [],
    }
  }
</script>
<style scoped lang="scss">
</style>
