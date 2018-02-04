<template lang="pug">
  div.container
    br
    b-tabs(v-if="company")
      b-tab-item(label="Інформація")
        div.container(v-if="this.company")
          company-info(:company="company")
      b-tab-item(label="Додати співробітників", v-if="haveEditRules")
        company-add-staff(:company="company")
      b-tab-item(label="Співробітники")
        company-staff(:company="company")
</template>
<script>
  import CompanyAPI from '#/CompanyAPI';
  import CompanyInfo from '@elements/company/Info';
  import CompanyAddStaff from '@elements/company/CompanyAddStaff';
  import CompanyStaff from '@elements/company/CompanyStaff';
  export default {
    data () {
      return {
        id: null,
        company: null
      }
    },
    components: {
      CompanyInfo,
      CompanyAddStaff,
      CompanyStaff
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
        console.log(1)
        try {
          const response = await CompanyAPI.loadCompany(this.id);
          console.log(response.data.item)
          if (response.data.success) {
            if (!response.data.item) {
              this.$messages.error("No company found", this);
            } else {
              this.company = response.data.item;
              return;
            }
          } else {
            throw response.data;
          }
        } catch (err) {
          console.log(4)
          this.$messages.error(err, this);
        }
        console.log(3)
        this.$router.push({name: '404'});
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
      isOwner () {
        if (!this.company || !this.$store.getters.isLogged() || !this.company.administration) {
          return false
        }
        if (this.company.administration.indexOf(this.$store.state.user.id) < 0) {
          return false;
        }
        return true
      },
      haveEditRules () {
        if (!this.$store.getters.isLogged()) {
          return false;
        } else if (this.$store.getters.isAdmin()) {
          return true;
        } else if (this.isOwner) {
          return true;
        } else {
          return false;
        }
      },
    }
  }
</script>
<style scoped lang="scss">
</style>
