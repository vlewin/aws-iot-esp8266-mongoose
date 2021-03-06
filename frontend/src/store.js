import Vue from 'vue'
import Vuex from 'vuex'
import appSyncClient from './appsync'
import listStatesQuery from '@/graphql/list-states.graphql'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    range: '24h',
    lastPublished: null,
    current: {},
    temperature: [],
    humidity: [],
    voltage: [],

    devices: [{
      id: 1,
      name: 'Device 1',
      data: {
        'Battery Level': 3.95,
        'Reserved': 5,
        'Mode': 1,
        'Alert Flag': 1,
        'Temperature': 20.75,
        'Humidity': 59.5
      }
    },
    {
      id: 2,
      name: 'Device 2',
      data: {
        'Battery Level': 3.82,
        'Reserved': 5,
        'Mode': 1,
        'Alert Flag': 1,
        'Temperature': 18.75,
        'Humidity': 42.5
      }
    }]
  },

  mutations: {
    SET_CONNECTED (state, value) {
      console.log('SET_CONNECTED')
      state.connected = value
    },

    SET_RANGE (state, value) {
      console.log('SET_RANGE')
      state.range = value
    },

    SET_LAST_PUBLISHED (state, value) {
      console.log('SET_LAST_PUBLISHED')
      state.lastPublished = value
    },

    SET_DATA (state, value) {
      console.log('SET_DATA')
      state.temperature = value.map(item => [item.timestamp * 1000, item.temperature])
      state.humidity = value.map(item => [item.timestamp * 1000, item.humidity])
      state.voltage = value.map(item => [item.timestamp * 1000, item.voltage])
    },

    UPDATE_DATA (state, value) {
      console.log('UPDATE_DATA')
      state.temperature.push([value.timestamp * 1000, Math.round(value.temperature * 100) / 100])
      state.humidity.push([value.timestamp * 1000, Math.round(value.humidity * 100) / 100])
      state.voltage.push([value.timestamp * 1000, Math.round(value.voltage * 100) / 100])
    },

    SET_CURRENT (state, value) {
      console.log('SET_CURRENT')
      state.current = value
    }
  },

  actions: {
    setConnected: async ({ commit }, value) => {
      commit('SET_CONNECTED', value)
    },

    setRange: ({ commit, dispatch }, value) => {
      commit('SET_RANGE', value)
      dispatch('getData', value)
    },

    setLastPublished: async ({ commit }, value) => {
      commit('SET_LAST_PUBLISHED', value)
    },

    getData: ({ commit, state }) => {
      // const map = {
      //   '24h': 1,
      //   'week': 3,
      //   'month': 24
      // }

      const map = {
        '24h': 24,
        'week': 168,
        'month': 730
      }

      let to = Math.round(new Date().getTime() / 1000)
      let from = to - (map[state.range] * 3600)

      console.log(`Get data for range: ${new Date(from * 1000).toLocaleString()} - ${new Date(to * 1000).toLocaleString()}`)
      const query = `
        query getStatesInRange {
          getStatesInRange(
           id: "esp8266_C05332",
           from: ${from},
           to: ${to}) {
            items {
              id,
              timestamp,
              temperature,
              humidity,
              voltage
            }
          }
        }`

      appSyncClient.request(query).then((response) => {
        commit('SET_DATA', response.data.getStatesInRange.items)
      })
    },

    setData: async ({ commit }, value) => {
      commit('SET_DATA', value)
    },

    updateData: async ({ commit }, value) => {
      commit('UPDATE_DATA', value)
      commit('SET_LAST_PUBLISHED', new Date().toLocaleString())
    },

    setCurrent: async ({ commit }, value) => {
      commit('SET_CURRENT', value)
    }
  }
})
