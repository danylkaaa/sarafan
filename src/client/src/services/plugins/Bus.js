import Vue from 'vue';

export const $bus = new Vue();
export const EventBus = {
  install (Vue) {
    Vue.prototype.$bus = $bus;
  }
}
