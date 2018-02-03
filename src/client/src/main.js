import Vue from 'vue'
import App from './App'
import router from './router'
//plugins
import Bus from 'vue-event-bus';
import Config from '#/plugins/Config';
import Auth from '#/plugins/Auth';
// stores
import {sync} from 'vuex-router-sync'
import store from '@store'

Vue.use(Bus);
Vue.use(Auth);
Vue.use(Config)

Vue.config.productionTip = false
sync(store, router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
