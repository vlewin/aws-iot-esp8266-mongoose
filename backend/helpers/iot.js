var AWS = require('aws-sdk');


process.env.IOT_ENDPOINT_HOST = 'a2ghmpgy4q9x2c.iot.eu-central-1.amazonaws.com'
var iotdata = new AWS.IotData({endpoint: process.env.IOT_ENDPOINT_HOST.toLowerCase()});

module.exports = (topic, payload) => {
  var params = {
    topic: topic,
    payload: payload,
    qos: 1
  };

  iotdata.publish(params, function(err, data){
    if(err){
        console.log(err);
    }
    else{
        console.log("success?");
        //context.succeed(event);
    }
  });
};
