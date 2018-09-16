/*
 * Copyright (c) 2014-2017 Cesanta Software Limited
 * All rights reserved
 *
 * This example demonstrates how to use mJS DHT library API
 * to get data from DHTxx temperature and humidity sensors.
 */

// Load Mongoose OS API
load('api_config.js');
// load('api_events.js');
load('api_gpio.js');
load('api_mqtt.js');
// load('api_net.js');
load('api_timer.js');
load('api_dht.js');
load('api_sys.js');
load('api_adc.js');


let id = Cfg.get('device.id');
let pin = 2;
let dht = DHT.create(pin, DHT.DHT22);
let interval = 60000;
let next = interval;

Timer.set(5000, Timer.REPEAT, function() {
  next = next - 5000;
  if (next > 0) {
    print('Next read in:', next/1000, 'seconds');
  } else {
    print('Reset next counter');
    next = interval;
  }
}, null);

// This function reads data from the DHT sensor every 60 second
Timer.set(60000 /* milliseconds */, Timer.REPEAT, function() {
  let temperature = dht.getTemp();
  let humidity = dht.getHumidity();

  if (isNaN(temperature) || isNaN(humidity)) {
    print('Failed to read data from DHT22 sensor');

    let topic = Cfg.get('device.id') + '/errors';

    let message = JSON.stringify({
      id: id,
      timestamp: Timer.now(),
      message: 'Failed to read data from DHT22 sensor'
    });

    let status = MQTT.pub(topic, message, 1);
    print('Published:', status ? 'yes' : 'no', 'topic:', topic, 'message:', message);
    return;
  }

  print(JSON.stringify({now: Timer.now()}));
  print('Temperature:', temperature, '*C');
  print('Humidity:', humidity, '%');

  let topic = Cfg.get('device.id') + '/stats';

  let message = JSON.stringify({
    id: id,
    temperature: temperature,
    humidity: humidity,
    free_ram: Sys.free_ram(),
    total_ram: Sys.total_ram(),
    timestamp: Timer.now(),
    voltage: ADC.read(0) / 1000
  });

  let status = MQTT.pub(topic, message, 1);
  print('Published:', status ? 'yes' : 'no', 'topic:', topic, 'message:', message);

}, null);
