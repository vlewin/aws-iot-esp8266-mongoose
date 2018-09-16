'use strict';

const AWS = require('aws-sdk');
const v4 = require('aws-signature-v4');
const crypto = require('crypto');

exports.handler = (event, context, callback) => {
  const options = {
    key: process.env.IOT_ACCESS_KEY,
    secret: process.env.IOT_SECRET_KEY,
    region: process.env.IOT_AWS_REGION,
    protocol: 'wss'
  }

  const url = v4.createPresignedURL(
    'GET',
    process.env.IOT_ENDPOINT_HOST.toLowerCase(),
    '/mqtt',
    'iotdevicegateway',
    crypto.createHash('sha256').update('', 'utf8').digest('hex'),
    options
  );

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  }

  callback(null, response);
}

// exports.handler()
