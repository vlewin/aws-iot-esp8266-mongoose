<template>
  <div class="log">
    <!-- {{ layout }} -->
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true">

      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" @resize="resizeEvent">
        <widget v-if="item.component === 'widget'" :title="item.i"></widget>
        <chart v-if="item.component === 'chart'" :title="item.i" :type="item.type"></chart>
        <location v-if="item.component === 'map'" :title="item.i" :type="item.type"></location>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>

import Widget from '@/components/Widget'
import Chart from '@/components/Chart'
import Location from '@/components/Location'

import { mapState } from 'vuex'

export default {
  name: 'Grid',
  components: {
    Widget,
    Chart,
    Location
  },



  data () {
    return {
      layout: [
        { 'x': 0, 'y': 0, 'w': 3, 'h': 4, 'i': 'Temp', 'moved': false, component: 'widget', },
        { 'x': 3, 'y': 0, 'w': 3, 'h': 4, 'i': 'Humid', 'moved': false, component: 'widget', },
        { 'x': 6, 'y': 0, 'w': 3, 'h': 4, 'i': 'Battery', 'moved': false, component: 'widget', },
        { 'x': 9, 'y': 0, 'w': 3, 'h': 4, 'i': 'Heart beat', 'moved': false, component: 'widget', },
        { 'x': 0, 'y': 4, 'w': 6, 'h': 6, 'i': 'Temp Chart', 'moved': false, component: 'chart', type: 'bar' },
        { 'x': 6, 'y': 4, 'w': 6, 'h': 6, 'i': 'Humidity Chart', 'moved': false, component: 'chart', type: 'line' },
        { 'x': 0, 'y': 8, 'w': 12, 'h': 8, 'i': 'Map', 'moved': false, component: 'map', }
      ]
    }
  },

  computed: {
    ...mapState(['current', 'temperature', 'humidity', 'voltage'])
  },

  methods: {

    resizeEvent: function(i, newH, newW, newHPx, newWPx) {
      console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },

    toDate (timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>

<style lang="sass">
  #content
    width: 100%

  .vue-grid-layout
    background: #eee

  .layoutJSON
    background: #ddd
    border: 1px solid black
    margin-top: 10px
    padding: 10px

  .eventsJSON
    background: #ddd
    border: 1px solid black
    margin-top: 10px
    padding: 10px
    height: 100px
    overflow-y: scroll

  .columns
    -moz-columns: 120px
    -webkit-columns: 120px
    columns: 120px

  .vue-grid-item
    &:not(.vue-grid-placeholder)
      background: #ccc
      border: 1px solid black
    &.resizing
      opacity: 0.9
    &.static
      background: #cce
    .text
      font-size: 24px
      text-align: center
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
      height: 100%
      width: 100%
    .no-drag
      height: 100%
      width: 100%
    .minMax
      font-size: 12px
    .add
      cursor: pointer

  .vue-draggable-handle
    position: absolute
    width: 20px
    height: 20px
    top: 0
    left: 0
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat
    background-position: bottom right
    padding: 0 8px 8px 0
    background-repeat: no-repeat
    background-origin: content-box
    box-sizing: border-box
    cursor: pointer
</style>
