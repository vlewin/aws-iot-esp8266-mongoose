TBD

`cp environment.example.yml environment.yml`

IOT_ENDPOINT_HOST: <IOT_ENDPOINT_HOST> # <ID>.iot.eu-central-1.amazonaws.com
IOT_AWS_REGION: eu-central-1
TOKEN: <API_TOKEN>

`yarn`
`yarn deploy`

### Appsync query resolver
{
    "version" : "2017-02-28",
    "operation" : "Query",
    "query" : {
        "expression": "#id = :id and #timestamp between :from and :to",
        "expressionNames" : {
        	"#id": "id",
      		"#timestamp": "timestamp"
    	},
        "expressionValues" : {
            ":id" : {
                "S" : "${ctx.args.id}"
            },
            ":from": {
                "N": "${ctx.args.from}"
            },
            ":to": {
                "N": "${ctx.args.to}"
            }
        }
    }
}


## GraphQL query
query getStatesInRange {
   getStatesInRange(
    id: "esp8266_C05332",
    from: 1537101539.175695,
    to: 1537101659.176117) {
     items {
        id,
        timestamp,
        temperature,
        humidity,
        voltage
     }
   }
 }
