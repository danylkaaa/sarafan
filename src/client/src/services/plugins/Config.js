import config from '@/config';

export default {
  install (Vue) {
    console.log(config);
    Vue.prototype.$config = config
  }
}
