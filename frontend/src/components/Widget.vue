<template>
  <div class="widget">
    <div class="header">
      {{ title }}
    </div>

    <div class="body">
      <h2>20</h2>
      <h4>C°</h4>
    </div>

    <div class="footer">
      FOOTER
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
    }
  },

  computed: {
    ...mapState(['range']),

    roundedCurrent () {
      return true
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

    overflow: hidden

    display: flex
    justify-content: center
    flex-direction: column

    text-align: center

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
    flex: 1
    background: tomato

    display: flex
    justify-content: center
    align-items: center

    text-transform: uppercase

  .body
    flex: 4
    background: #FFCA28

    display: flex
    justify-content: center
    align-items: center

    h2 
      font-size: 4em

    h4
      font-size: 2em

  .footer
    background: green
    flex: 2

    display: flex
    justify-content: center
    align-items: center

</style>
