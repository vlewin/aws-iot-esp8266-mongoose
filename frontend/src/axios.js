import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'

axios.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers = { 'Authorization': `Bearer ${process.env.VUE_APP_SECRET}` }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

Vue.$http = axios
Object.defineProperty(Vue.prototype, '$http', { value: axios })
// Vue.use(VueAxios, axios)
