import Vue from 'vue'
import VueMqtt from 'vue-mqtt'
import store from './store'

async function getSignedIoTEndpointUrl () {
  return Vue.$http.get(process.env.VUE_APP_ENDPOINT).then((data) => {
    return data
  })
}

// FIXME: Cache endpoint URL
const connect = async () => {
  const response = await getSignedIoTEndpointUrl()
  const endpoint = response.data.url

  Vue.use(VueMqtt, endpoint, {
    transformWsUrl: (url, options, client) => {
      return endpoint
    }
  })

  store.dispatch('setConnected', true)
}

connect()
