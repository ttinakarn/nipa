import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import BedInfo from './views/BedInfo.vue'
import AddVS from './views/AddVS.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/bedinfo',
      name: 'bedinfo',
      component: BedInfo
    },
    {
      path: '/addvs',
      name: 'addvs',
      component: AddVS
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
