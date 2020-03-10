import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: 'AIzaSyAEiJUonLefA7MiATrwgcYh-Mhs1DNt5zI',
  authDomain: 'vue-crm-c5000.firebaseapp.com',
  databaseURL: 'https://vue-crm-c5000.firebaseio.com',
  projectId: 'vue-crm-c5000',
  storageBucket: 'vue-crm-c5000.appspot.com',
  messagingSenderId: '429040104659',
  appId: '1:429040104659:web:888e2e936a271c62515026',
  measurementId: 'G-WFJR5VJ0NV'
})
let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
