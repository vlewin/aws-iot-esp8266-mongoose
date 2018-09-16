# aws-iot-esp8266-mongoose
Setup ESP8266 device connected to AWS IoT publishing DHT22 sensor data (JavaScript)

## Project setup
TBD


## TODO:
Test device shadow OTA update
- https://github.com/mongoose-os-libs/ota-shadow

AppSync + CF
- https://read.acloud.guru/deploy-an-aws-appsync-graphql-api-with-amazon-cloudformation-9a783fdd8491
- https://gist.github.com/adrianhall/50e9fdf08e7a7e52d3ab0f01467b72f7

- https://medium.com/open-graphql/build-a-graphql-weather-api-with-openweathermap-and-aws-appsync-7d987df6d9df

IoT Core + CF
- https://aws.amazon.com/de/blogs/iot/bites-of-iot-creating-aws-iot-rules-with-aws-cloudformation/
- https://serverless.com/blog/realtime-updates-using-lambda-websockets-iot/


## LINKS
AWS IoT vs Microsoft IoT Hub vs Google Cloud IoT
https://www.kevinsidwar.com/iot/2017/8/24/mqtt-broker-options-from-amazon-microsoft-and-google

Known issues:
- Using both AWS and Dallas OneWire temp sensor causes core dump #313 (https://github.com/cesanta/mongoose-os/issues/313)


### Screenshots

![Alt text](https://github.com/vlewin/aws-iot-esp8266-mongoose/raw/master/images/dashboard.png?raw=true "ESP8266 Dashboard")

![Alt text](https://github.com/vlewin/aws-iot-esp8266-mongoose/raw/master/images/mos_console.png?raw=true "Mos console")
