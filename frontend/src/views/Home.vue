<template>
  <div class="home">
    <div class="mainCard">
      <div class="mainCardHeader">
        <h3>
          ESP8266 - AWS IoT Core dashboard ({{ lastPublished }})
          <button v-on:click="publish">Publish test message</button>
        </h3>
      </div>
      <div class="mainCardContent">
        <card
          type="area"
          title="Temperature"
          icon="fa-thermometer-three-quarters"
          sign="°C"
          :current="current.temperature"
          :values="temperature">
        </card>

          <card
            type="bar"
            title="Humidity"
            icon="fa-tint"
            sign="%"
            :current="current.humidity"
            :values="humidity">
          </card>

          <card
            type="area"
            title="Voltage"
            icon="fa-bolt"
            sign="V"
            :current="current.voltage"
            :values="voltage">
          </card>

          <!-- <card title="Power consumtion" icon="fa-bolt" sign="W" :values="sensors.voltage" type="line"></card> -->
          <!-- <card icon="fa-thermometer-three-quarters"></card>
          <card icon="fa-tint"></card>
          <card icon="fa-bolt"></card> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import listStates from '@/graphql/list-states.graphql'
import { mapState } from 'vuex'
// import gql from 'graphql-tag'

export default {
  name: 'home',
  components: {
    Card
  },

  // FIXME: Investigate vue-apollo - same record bug
  apollo: {
    listStates: listStates
  },

  data () {
    return {
      hydrated: false,
      data: [1, 2, 3, 4, 5],
      sensors: {
        temperature: this.random(20, 28),
        humidity: this.random(30, 50),
        voltage: this.random(3.0, 3.5)
      }
    }
  },

  mounted () {
    console.log('HOME MOUNTED')
    this.$mqtt.subscribe('esp8266_C05332/stats', {})

    // FIXME: Replace with simple aws-appsync library
    // this.$apollo.provider.defaultClient.hydrated()
    // this.hydrated = true
  },

  computed: {
    ...mapState(['lastPublished', 'current', 'temperature', 'humidity', 'voltage'])
  },

  methods: {
    random (min, max) {
      return Array(24).fill().map(() => {
        return Number((Math.random() * (max - min) + min).toFixed(1))
      })
    },

    publish () {
      this.$mqtt.publish('esp8266_C05332/stats', JSON.stringify({
        id: 'esp8266_C05332',
        timestamp: new Date().getTime() / 1000,
        temperature: Number((Math.random() * (30.0 - 18.0) + 18.0).toFixed(1)),
        humidity: Number((Math.random() * (60.0 - 30.0) + 30.0).toFixed(1)),
        voltage: Number((Math.random() * (3.6 - 3.0) + 3.0).toFixed(1))
      }))
    }
  },

  mqtt: {
    'esp8266_C05332/stats' (data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
      let serie = JSON.parse(String.fromCharCode.apply(null, data))
      this.$store.dispatch('setCurrent', serie)
      this.$store.dispatch('updateData', serie)
    }
  }
}

</script>

<style lang="sass">
  $main-color: #42b983

  *
    box-sizing: border-box

  h3, p
    text-align: center

  //Demo
  body
    height: 100%
    width: 100%
    background: #eee

  .home
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center

  .title
    font-size: 36px

  .mainCard
    background-color: white
    // box-shadow: 0 5px 40px rgba(0,0,0,0.2)
    box-shadow: 0 0 10px rgba(0,0,0,0.2)

    width: 92%
    border-radius: 15px
    overflow: hidden

    animation:
      name: mainCard
      duration: 1s
      delay: 0s
      fill-mode: both

  @keyframes mainCard
    0%
      transform: scale(0)

  .mainCardHeader
    background-color: #42b983
    height: 134px
    width: 100%
    padding: 15px
    color: #fff
    font-weight: bold

    animation:
      name: mainCardHeader
      duration: 0.4s
      delay: 0.5s
      fill-mode: both

  @keyframes mainCardHeader
    0%
      transform: scaleY(1)

  .mainCardContent
    margin: 0 auto
    text-align: center
    position: relative
    top: -50px
    height: 100%
    width: 100%

    display: flex
    align-items: center
    justify-content: space-evenly

</style>
