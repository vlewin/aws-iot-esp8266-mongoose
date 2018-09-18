const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.IOT_AWS_REGION });
const Dynamo = new AWS.DynamoDB.DocumentClient();
const publish = require('./helpers/iot')

const now = new Date() / 1000
const lastHour = (new Date - (60*60*1000)) / 1000
let params = {
    TableName: 'aws-iot-esp8266-mongoose',
    // ProjectionExpression: '#id, temperature',
    KeyConditionExpression: '#id = :id and #timestamp between :timestamp1 and :timestamp2',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#timestamp': 'timestamp'
    },

    ExpressionAttributeValues: {
      ':id': 'esp8266_C05332',
      ':timestamp1': lastHour,
      ':timestamp2': now,
    },
};

Dynamo.query(params).promise().then((data) => {
  console.log('Query succeeded.');
  console.log(data)
  let temperature_row = data.Items.map(item => item.temperature)
  let humiditie_row = data.Items.map(item => item.humidity)
  let voltage_row = data.Items.map(item => item.voltage)

  const temperature_values = {
    min: Math.min.apply(null, temperature_row),
    max: Math.max.apply(null, temperature_row),
    avg: temperature_row.reduce((a,b) => a + b, 0) / temperature_row.length
  }

  const humidity_values = {
    min: Math.min.apply(null, humiditie_row),
    max: Math.max.apply(null, humiditie_row),
    avg: humiditie_row.reduce((a,b) => a + b, 0) / humiditie_row.length
  }

  const voltage_values = {
    min: Math.min.apply(null, voltage_row),
    max: Math.max.apply(null, voltage_row),
    avg: voltage_row.reduce((a,b) => a + b, 0) / voltage_row.length
  }


  console.log('temperature', temperature_values)
  console.log('humidity', humidity_values)
  console.log('voltage', voltage_values)

  update(temperature_values, humidity_values, voltage_values)

}).catch((err) => {
  console.log('Unable to query. Error:', JSON.stringify(err, null, 2));
});

function update(temperature, humidity, voltage) {
  params = {
      TableName: 'aws-iot-esp8266-mongoose-24-hours',
      Key: {
          "id": 'esp8266_C05332'
      },
      ExpressionAttributeValues: {
          ":t": temperature,
          ":h": humidity,
          ":v": voltage
      },
      UpdateExpression: "set temperature = :t, humidity=:h, voltage=:v",
      ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating the item...");
  Dynamo.update(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        publish('esp8266_C05332/updates', JSON.stringify(data.Attributes))
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
  });
}
