TBD

`cd frontend`
`cp env.example.local env.local`

VUE_APP_SECRET=<BACKEND_API_TOKEN>
VUE_APP_ENDPOINT=https://<ID>.execute-api.eu-central-1.amazonaws.com/development/sign
VUE_APP_WSS_ENDPOINT=wss://<ID>.iot.eu-central-1.amazonaws.com/mqtt
VUE_APP_GRAPTHQL_ENDPOINT=https://<ID>.appsync-api.eu-central-1.amazonaws.com/graphql
VUE_APP_GRAPTHQL_API_KEY=<GRAPTHQL_API_KEY>

`yarn`
`yarn serve`
