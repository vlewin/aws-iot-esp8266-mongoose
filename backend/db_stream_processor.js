const aws = require('aws-sdk');
const uuid = require('uuid');
const _ = require('highland');

exports.handler = (event, context, callback) => {
    console.log("================ event ==================")
    console.log(event)
    console.log("================ context ==================")
    console.log(context)

    _(event.Records)
      .map(toEvent)
      .tap(print)
      .filter(tempLimitExceeded)
      .flatMap(publish)
      .collect()
      .toCallback(callback)
}

const toEvent = record => ({
  id: uuid.v1(),
  type: `item-${record.eventName.toLowerCase()}`,
  timestamp: record.dynamodb.ApproximateCreationDateTime * 1000,
  partitionKey: record.dynamodb.Keys.id.S,
  item: {
    old: record.dynamodb.OldImage ? aws.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage) : undefined,
    new: record.dynamodb.NewImage ? aws.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage) : undefined
  }
})


const print = record => {
  console.log('Record %j', record)
  return
}

const tempLimitExceeded = e => e.item.new.temperature > 20;

const publish = records => {
  console.log('Temp limit exceeded %j', records)
  return _(Promise.resolve(records))
}
