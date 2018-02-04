import Vue from 'vue'
import Router from 'vue-router'
import Index from '@pages/Index';
import Profile from '@pages/user/Profile';
import p404 from '@pages/404';
import CompanyCreate from '@pages/company/Create';
import CompanyView from '@pages/company/View';
import CompanySearch from '@pages/company/Search';
import UserSearch from '@pages/user/Search';

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
      path: '/company/:id',
      name: 'Company.view',
      component: CompanyView

    },
    {
      path: '/users',
      name: 'User.search',
      component: UserSearch
    },
    {
      path: '/company',
      name: 'Company.search',
      component: CompanySearch
    },
    {
      path: '*',
      name: '404',
      component: p404
    }
  ]
})
