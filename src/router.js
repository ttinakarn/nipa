import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import BedInfo from './views/BedInfo.vue'
import AddVS from './views/AddVS.vue'
import Dashboard from './views/Dashboard.vue'
import VitalSignGraph from './views/VitalSignGraph.vue'
import TV from './views/TV.vue'
import Condition from './views/Condition.vue'
import Index from './views/Index.vue'
import EditPatient from './views/EditPatient.vue'
import PatientList from './views/PatientList.vue'
import Patients from './views/Patients.vue'
import Admit from './views/Admit.vue'
import AdmitDetail from './views/AdmitDetail.vue'
import AddPatient from './views/AddPatient.vue'

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
      component: Home,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/bedinfo/:bednumber/:an',
      name: 'bedinfo',
      component: BedInfo,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/addvs/:bednumber/:an',
      name: 'addvs',
      component: AddVS,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/graph/:an',
      name: 'graph',
      component: VitalSignGraph,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/tv',
      name: 'tv',
      component: TV
    },
    {
      path: '/condition',
      name: 'condition',
      component: Condition,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/patientslist',
      name: 'patientslist',
      component: PatientList,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/patient/:an',
      name: 'patient',
      component: EditPatient,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/addpatient',
      name: 'addpatient',
      component: AddPatient,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/patients',
      name: 'patients',
      component: Patients,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/admit/:hn',
      name: 'admit',
      component: Admit,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/admitdetail/:an',
      name: 'admitdetail',
      component: AdmitDetail,
      meta: { 
        requiresAuth: true
      }
    }
  ]
})
