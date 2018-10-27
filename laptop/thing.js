var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: 'bab73c365f-private.pem.key',
  certPath: 'bab73c365f-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
  clientId: 'MacbookPro',
   host: 'a2ghmpgy4q9x2c-ats.iot.eu-central-1.amazonaws.com'
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//


device.on('connect', function() {
  console.log('connect');
  device.subscribe('topic_1');
  device.publish('topic_1', JSON.stringify({ test_data: 'NodeJS server connected...'}));
});

device.on('message', function(topic, payload) {
  console.log('message', topic, payload.toString());
});

const si = require('systeminformation');

console.log('Dynamic data')

si.getStaticData().then(data => console.log(data)).catch(error => console.error(error));

console.log('Dynamic data')
si.getDynamicData().then(data => console.log(data)).catch(error => console.error(error));


// callback style
// si.cpu(function(data) {
// 	console.log('CPU-Information:');
// 	console.log(data);
// });

// promises style - new in version 3
// si.cpu().then(data => console.log(data)).catch(error => console.error(error));

// GET AND PUBLISH
// si.battery().then((data) => {
//   device.publish('topic_1', JSON.stringify({ device: 'Macbook Pro', channels: { battery: data }}));
//   console.log(data)
// }).catch(error => console.error(error));

// full async / await example (node >= 7.6)
// async function cpu() {
//   try {
//     const data = await si.cpu();
//     console.log(data)
//   } catch (e) {
//     console.log(e)
//   }
// }
