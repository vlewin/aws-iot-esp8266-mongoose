# ESP8266 device connected to AWS IoT publishing DHT22 sensor data (JavaScript)


## Configure

`cp mos.example.yml mos.yml`

- ["wifi.sta.ssid", <SSID>]
- ["wifi.sta.pass", <PASS>]
- ["dash.token", <DASHBOARD TOKEN>]
- ["aws.thing_name", <THING_NAME>] # e.g. "esp8266_C05332"
- ["mqtt.server", <IOT ENDPOINT>] # "<ID>.iot.eu-central-1.amazonaws.com:1883"
- ["mqtt.ssl_cert", <CERT>] # <DEVICE_ID>.crt.pem
- ["mqtt.ssl_key", <CERT_KEY>] # <DEVICE_ID>.key.pem



## Setup

- Install [mos tool](https://mongoose-os.com/software.html)

- Build ESP8266 firmware
`mos build --arch=esp8266`

- Flash ESP8266 board
`mos flash`

- Provision the device for AWS IoT cloud
`mos aws-iot-setup`
