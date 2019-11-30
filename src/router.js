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
      component: Home
    },
    {
      path: '/bedinfo/:bednumber/:an',
      name: 'bedinfo',
      component: BedInfo
    },
    {
      path: '/addvs/:bednumber/:an',
      name: 'addvs',
      component: AddVS
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/graph/:an',
      name: 'graph',
      component: VitalSignGraph
    },
    {
      path: '/tv',
      name: 'tv',
      component: TV
    },
    {
      path: '/condition',
      name: 'condition',
      component: Condition
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/patientslist',
      name: 'patientslist',
      component: PatientList
    },
    {
      path: '/patient/:an',
      name: 'patient',
      component: EditPatient
    },
    {
      path: '/addpatient',
      name: 'addpatient',
      component: AddPatient
    },
    {
      path: '/patients',
      name: 'patients',
      component: Patients
    },
    {
      path: '/admit/:hn',
      name: 'admit',
      component: Admit
    },
    {
      path: '/admitdetail/:an',
      name: 'admitdetail',
      component: AdmitDetail
    }
  ]
})
