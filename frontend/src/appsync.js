// ES6 modules
import AppSyncClient, { authMode } from 'aws-appsync-js/src/index.js'

// CommonJS modules
// const AppSyncClient = require('aws-appsync-js').default;
// const { authMode } = require('aws-appsync-js');

console.log(authMode.API_KEY_MODE)
export default new AppSyncClient({
  auth: {
    mode: 'API_KEY_MODE',
    apiKey: process.env.VUE_APP_GRAPTHQL_API_KEY,
    apiUrl: process.env.VUE_APP_GRAPTHQL_ENDPOINT
  }
})
