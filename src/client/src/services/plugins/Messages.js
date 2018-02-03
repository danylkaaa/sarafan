export default {
  install (Vue) {
    Vue.prototype.$messages = {
      error (err, Vue) {
        console.log(err)
        let msg = "Something is going wrong";
        if (typeof msg == 'string') {
          msg = err;
        } else if (err.data && err.data.message) {
          msg = err.data.message;
        } else if (err.message) {
          msg = err.message;
        }
        Vue.$toast.open({
          duration: 5000,
          message: msg,
          position: 'is-top',
          queue: false,
          type: 'is-danger'
        })
      },
      success (msg, Vue) {
        Vue.$toast.open({
          duration: 5000,
          message: msg || "All is ok",
          position: 'is-top',
          queue: false,
          type: 'is-success'
        })
      }
    }
  }
}
