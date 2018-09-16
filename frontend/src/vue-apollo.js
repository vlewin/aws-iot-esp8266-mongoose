'use strict'

import Vue from 'vue'
import AWSAppSyncClient from 'aws-appsync'
import VueApollo from 'vue-apollo'
// import { WebSocketLink } from "apollo-link-ws";

Vue.use(VueApollo)

const config = {
  url: process.env.VUE_APP_GRAPTHQL_ENDPOINT,
  region: 'eu-central-1',
  auth: {
    type: 'API_KEY',
    apiKey: process.env.VUE_APP_GRAPTHQL_API_KEY
  }
}
const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
}
const client = new AWSAppSyncClient(config, options)

// NOTE: https://stackoverflow.com/questions/51179522/struggling-with-apollo-link-ws-x-api-key-authorization?rq=1
export default new VueApollo({
  defaultClient: client
})
