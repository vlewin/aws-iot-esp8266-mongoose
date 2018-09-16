<template>
  <div class="log">
    <div class="mainCard">
      <div class="mainCardHeader">
        <h3>
          Number of log records: {{ temperature.length }}
        </h3>
      </div>
      <div class="mainCardContent">
        <table>
          <thead>
            <th>Date</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Voltage</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in temperature" :key="item[0]">
              <td>
                {{ toDate(item[0]) }}
              </td>
              <td>
                {{ item[1] }}°C
              </td>
              <td>
                {{ humidity[index][1] }}%
              </td>
              <td>
                {{ voltage[index][1] }}V
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Log',

  data () {
    return {
      msg: 'Test message'
    }
  },

  computed: {
    ...mapState(['current', 'temperature', 'humidity', 'voltage'])
  },

  methods: {
    toDate (timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>

<style lang="sass">
  .log
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: center

  table
    width: 100%
    border-collapse: separate
    border-spacing: 1em
    margin-top: 10px

    td
      width: 25%
</style>
