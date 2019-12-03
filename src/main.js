import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import Vuelidate from 'vuelidate'
import { store } from './store/store.js'

import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.prototype.moment = moment;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log("store.getters.currentuser", store.getters.currentuser);
    
    if (store.getters.currentuser != null) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
