<template lang="pug">
  div.box
    b-field()
      b-autocomplete(
      v-model="role",
      :data="data",
      placeholder="Оберіть посаду",
      icon="magnify",
      @input="getAsyncData",
      :loading="isFetching",
      @select="option => selected = option")
    input-text(label="to", ref = "to", type = "text", :rules="{required:true}", placeholder="ID користувача")
    a.button.is-success(@click.stop="handleCreate") Створити
</template>
<script>
  import InputText from '@elements/InputText';
  import InvitesAPI from '#/InvitesAPI';

  export default {
    data () {
      return {
        data: [],
        role: null,
        isFetching: false
      }
    },
    components: {
      InputText
    },
    methods: {
      async getAsyncData () {
        if(!this.role){
          return;
        }
        this.data = [];
        try {
          const result = await InvitesAPI.loadProfessions(this.role);
          if (result) {
            this.data = result.data.item;
          } else {
            throw result;
          }
        } catch (err) {
          this.$messages.error(err, this);
        }
      },
      async handleCreate () {
        if (!this.role || !this.$refs.to.isValid) {
          this.$messages.error("Не всі поля заповнені", this)
          return;
        }
        this.$bus.$emit('load-start')
        try {
          const result = await InvitesAPI.create(this.company.id || this.company._id, this.args)
          if (result.data.success) {
            this.$bus.$emit('invites-update');
            console.log(1)
          } else {
            throw result.data.message
          }
        } catch (err) {
          this.$messages.error(err, this)
        }
        this.$bus.$emit('load-end')
      }
    },
    computed: {
      allOk () {
        return (this.role && this.$refs.to.valid);
      },
      args () {
        return {
          userID: this.$refs.to.data,
          role: this.role
        }
      }
    },
    props: {
      company: {
        required: true
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
