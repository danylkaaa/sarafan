import Vue from 'vue'
import App from './App'
import router from './router'
//plugins
import {EventBus} from '#/plugins/Bus';
import Config from '#/plugins/Config';
import Auth from '#/plugins/Auth';
// stores
import {sync} from 'vuex-router-sync'
import store from '@store'
// styles
import 'vue-material-design-icons/styles.css'
import 'buefy/lib/buefy.css'
import '@/assets/styles/main.scss'
import 'font-awesome/css/font-awesome.css';
import 'mdi/css/materialdesignicons.css';
import 'keen-ui/dist/keen-ui.css';

import Buefy from 'buefy'
import KeenUI from 'keen-ui';
import Ripple from 'vue-ripple-directive'
import Gravatar from 'vue-gravatar';
// tools
import VeeValidate from 'vee-validate';

Vue.use(EventBus);
Vue.use(Auth);
Vue.use(Config)


Vue.component('v-gravatar', Gravatar);
Ripple.color = 'rgba(255,255,255,0.25)';
Vue.directive('ripple', Ripple);

Vue.use(KeenUI);
Vue.use(Buefy);
Vue.use(VeeValidate);

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
