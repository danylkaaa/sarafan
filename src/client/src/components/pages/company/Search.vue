<template lang="pug">
  div.container
    div
    br
    companies-list(:companies="companies")
</template>
<script>
  import CompanyAPI from '#/CompanyAPI';
  import CompaniesList from '@elements/company/List';

  export default {
    data () {
      return {
        companies: [],
        filter: {}
      }
    },
    components: {
      CompaniesList
    },
    methods: {
      handleURL (query) {
        let {sort, page, city, area, name} = query;
        this.filter = {
          area,
          city,
          sort,
          page,
          name
        };
        console.log(this.filter);
        this.loadCompanies();
      },
      async loadCompanies () {
        try {
          const result = await CompanyAPI.loadByQuery(this.filter);
          console.log(result.data);
          if (result.data.success) {
            this.companies = result.data.items;
            this.filter.page = result.data.page;
            this.total = result.data.total;
          } else {
            throw result;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
      }
    },
    computed: {},
    props: [],
    beforeRouteUpdate (to, from, next) {
      this.handleURL(to.query);
      next();
    },
    mounted () {
      this.handleURL(this.$route.query);
    }
  }
</script>
<style scoped lang="scss">
</style>
