const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.IOT_AWS_REGION });
const Dynamo = new AWS.DynamoDB.DocumentClient();
const publish = require('./helpers/iot')


var subMinutes = require('date-fns/sub_minutes')

const now = new Date()
const lastHour = subMinutes(now, 30).getTime()

console.log(now, lastHour)
// return


console.log('Get values from', lastHour, new Date(lastHour), 'to', now.getTime(), new Date(now))


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
      ':timestamp2': now.getTime(),
    }
};


var fs = require('fs');


Dynamo.query(params).promise().then((data) => {
  console.log('Found', data.Count, 'items')
  fs.writeFile('items.json', JSON.stringify(data.Items), 'utf8', function() {});
})

// return
var contents = JSON.parse(fs.readFileSync('items.json', 'utf8'))

console.log(contents.length)

var isWithinRange = require('date-fns/is_within_range')
var startOfHour = require('date-fns/start_of_hour')
var endOfHour = require('date-fns/end_of_hour')
var addMinutes = require('date-fns/add_minutes')
var subMinutes = require('date-fns/sub_minutes')

const interval = 10
const step = 60 / interval

const groups = Array.from(new Array(step),(_, index)=> {
  let start = index * interval;
  let end = start+interval
  let label = `${start}-${end}`
  return { start, end, label } 
});

console.log(groups)
const endOfMinute = require('date-fns/end_of_minute')

const aggregates = {}
for(let group of groups) {
  aggregates[group.label] = contents.filter((item) => {
    let startHour = startOfHour(item.timestamp)
    let start = addMinutes(startHour, group.start)
    let end = endOfMinute(addMinutes(startHour, group.end-1))
    let date = new Date(item.timestamp)

    item.date = date.toLocaleString('de-DE')
    return isWithinRange(date, start, end)
  })

}

// console.log(aggregates)


async function update(timestamp, date, temperature, humidity, voltage) {
  params = {
      TableName: 'aws-iot-esp8266-mongoose-24-hours',
      Key: {
        "id": 'esp8266_C05332',
        "timestamp": timestamp
      },

      ExpressionAttributeNames: {
        '#date': 'date'
      },

      ExpressionAttributeValues: {
        ":date": date,
        ":t": temperature,
        ":h": humidity,
        ":v": voltage
      },
      UpdateExpression: "set #date = :date, temperature = :t, humidity=:h, voltage=:v",
      ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating the item...");
  await Dynamo.update(params).promise()
}

const min = arr => Math.min(...arr);
const max = arr => Math.max(...arr);
const avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

for(let key in aggregates) {
  let values = aggregates[key]
  if(values.length) {
    let timestamp = addMinutes(startOfHour(values[0].timestamp), key.split('-')[0])

    const temperature = values.map(item => item.temperature)
    const humidity = values.map(item => item.humidity)
    const voltage = values.map(item => item.voltage)
    console.log('Aggregates for', timestamp, key)
    // console.log('min', min(temperature))
    // console.log('max', max(temperature))
    // console.log('avg', avg(temperature))

    update(timestamp.getTime(), timestamp.toLocaleString('de-DE'), avg(temperature), avg(humidity), avg(voltage))
  } else {
    console.log('No values for', key)
  }

}
