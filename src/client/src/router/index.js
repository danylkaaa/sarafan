import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/Index';
import Profile from '@pages/Profile';
import p404 from '@pages/404';
import CompanyCreate from '@pages/company/Create';

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
    },
    {
      path: '/company/create',
      name: 'Company.create',
      component: CompanyCreate
        
    },
    {
      path: '*',
      name: '404',
      component: p404
    }
  ]
})
