import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import mqtt from './mqtt'
// import appsyncProvider from './vue-apollo'

import VueApexCharts from 'vue-apexcharts'
import VueGridLayout from 'vue-grid-layout'

Vue.config.productionTip = false
Vue.use(VueApexCharts)
Vue.use(VueGridLayout)

new Vue({
  router,
  store,
  // provide: appsyncProvider.provide(),
  render: h => h(App)
}).$mount('#app')
