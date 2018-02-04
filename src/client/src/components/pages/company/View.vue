<template lang="pug">
  div.container(v-if="company")
    br
    section.tile.notification.is-warning.is-small(v-if="company")
      div.container
        h1.title {{company.name}}
      figure.image.is-256x256#qr
        qr(:link="companyLink", size="256")
    div.field.has-addons(v-if="haveEditRules")
      p.control
        a.button.is-danger(@click.stop="handleDelete", v-if="haveEditRules") Видалити
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
  import Qr from '@elements/qr';

  export default {
    data () {
      return {
        id: null,
        company: null
      }
    },
    components: {
      Qr,
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
      async handleDelete () {
        this.$bus.$emit('load-start');
        try {
          const result = await CompanyAPI.remove(this.id);
          if (result.data.success) {
            this.$router.push({name: 'Home'})
          } else {
            throw result.data.message
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
        this.$bus.$emit('load-end');
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

      companyLink () {
        return `https://sarafan.herokuapp.com/#/company/${this.company._id || this.company.id}`;
      },
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
