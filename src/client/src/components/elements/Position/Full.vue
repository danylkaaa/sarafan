<template lang="pug">
  div
    br
    a.button.is-success(@click.stop="$bus.$emit('comments-updated')") Оновити
    hr
    b-taglist(attached)
      b-tag(type="is-dark").is-large Посада
      b-tag.is-info.is-large
        span.subtitle.has-text-white {{position.post}}
    div.notification
      p.title Компанія
      router-link(:to="{name:'Company.view',params:{id:position.company}}")
        a.buton.link
          | Детальніше
      company-short(:id="position.company")
    br
    div.notification
      p.title Особа
      router-link(:to="{name:'Profile',params:{id:position.user}}")
        a.buton.link
          | Детальніше
      user-short(:id="position.user")
    br
    div.notification
      p.title Відгуки
    comments(:position="position")
</template>
<script>
  import UserShort from '@elements/user/UserShort';
  import CompanyShort from '@elements/company/CompanyShort';
  import Comments from '@elements/rating/CommentList'

  export default {
    components: {
      UserShort,
      CompanyShort,
      Comments
    },
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: {
      position: {
        required: true,
        type: Object
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
