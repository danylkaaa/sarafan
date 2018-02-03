import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/Index';
import Profile from '@pages/Profile';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Index
    },
    {
      path: '/user',
      name: 'Profile',
      component: Profile
    }
  ]
})
