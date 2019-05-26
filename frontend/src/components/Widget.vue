<template>
  <div class="widget">
    <div class="header">
      {{ device.name }} - {{ channel }}
    </div>

    <div class="body">
      <div class="icon"></div>
      <h2>{{ value }} <small>C°</small></h2>
    </div>

    <div class="footer">
      Source:
      <select v-model="device">
        <option v-for="device in devices" :value="device">{{ device.name }}</option>
      </select>

      <select v-if="channels" v-model="channel">
        <option v-for="channel in channels">{{ channel }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Widget',
  components: {
  },

  props: {
    title: String,
    current: Number,
    values: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data: () => {
    return {
      device: '',
      channel: ''
    }
  },

  computed: {
    ...mapState(['devices']),

    channels() {
      return this.device && this.device.data ? Object.keys(this.device.data) : null
    },

    value () {
      return this.device && this.device.data ? this.device.data[this.channel] : 'N/A'
    }
  },

  methods: {
    ...mapActions(['setRange']),
    round (value) {
      return Math.round(value * 100) / 100
    }
  }
}
</script>

<style lang="sass" scoped>

  h1, h3
    margin: 0

  .widget
    background-color: white
    height: 100%
    width: 100%
    // box-shadow: 0 0 10px rgba(0,0,0,0.2)
    box-shadow: 0 5px 40px rgba(0,0,0,0.2)
    // color: rgba(0, 143, 251, 0.85);
    overflow: hidden

    display: flex
    justify-content: center
    flex-direction: column


    animation:
      name: miniCard
      duration: 1s
      delay: 0.5s
      fill-mode: both

  @keyframes miniCard
    0%
      transform: scale(0)
    50%
      transform: scale(1.05)
    100%
      transform: scale(1)

  .header
    flex: 2
    // background: tomato

    display: flex
    justify-content: center
    align-items: center

    text-transform: uppercase

  .body
    flex: 4
    // background: #FFCA28

    display: flex
    justify-content: center
    align-items: center

    .icon 
      width: 2em
      height: 2em
      border : 2px dotted #ddd
      margin: 0 1em

    h2 
      font-size: 4em

    h4
      font-size: 2em

  .footer
    // background: green
    flex: 2

    display: flex
    justify-content: center
    align-items: center

    text-align: left
    color: #888;
    padding: 0 1em

</style>
