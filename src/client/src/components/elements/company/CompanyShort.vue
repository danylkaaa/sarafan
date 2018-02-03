<template lang="pug">
  article.media(v-if="company")
    figure.media-left
      p.image.is-64x64
        img.round-percent-10(:src="company.picture||'/static/img/user.png'")
    div.media-content
      div.content
      p
        strong {{company.name}}
        span {{company.id||company._id}}
      p {{address}}
</template>
<script>
  import CompanyAPI from '#/CompanyAPI';

  export default {
    data () {
      return {
        company: null
      }
    },
    methods: {
      async loadCompany () {
        try {
          const response = await CompanyAPI.loadCompany(this.id);
          console.log(response.data.item)
          if (response.data.success) {
            if (!response.data.item) {
              this.$messages.error("No company found", this);
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
    watch: {
      id () {
        this.loadCompany()
      }
    },
    computed: {
      address () {
        if (!this.company) {
          return '';
        } else {
          return `${this.company.address.area}, ${this.company.address.city}, ${this.company.address.street}, ${this.company.address.building}`;
        }
      }
    },
    mounted () {
      this.loadCompany();
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">

  .box {
    margin-top: 128px;
  }
</style>
