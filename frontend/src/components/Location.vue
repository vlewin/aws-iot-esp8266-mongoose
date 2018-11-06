<template>
  <div class="map">
    <v-map v-if="ready" :zoom="zoom" :center="center" :options='{zoomControl: false}'>
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="marker"></v-marker>
        <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.latlng">
          <v-popup :content="item.content"></v-popup>
        </v-marker>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'

export default {
  name: 'Map',

  components: {
    'v-map': Vue2Leaflet.LMap,
    'v-tilelayer': Vue2Leaflet.LTileLayer,
    'v-marker': Vue2Leaflet.LMarker,
    'v-popup': Vue2Leaflet.LPopup
  },

  props: {
    title: String,
    type: String,
  },

  data: function() {
    return {
      ready: false,
      zoom: 13,
      center: [47.413220, -1.219482],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      markers: []
    }
  },

  // https://codepen.io/setholito/pen/EvNKWw

  mounted() {  
    // console.log(Vue2Leaflet) 
    // window.addEventListener('resize', this.handleResize)
  	window.setTimeout(this.addMarker, 2000)

    setTimeout(() => {
      this.ready = true
      console.log('After timeout', this.$el.clientWidth, this.$el.clientHeight)
      this.handleResize()
    }, 200);
  },

  destroyed() {
    // console.log('Destroy resize event handler')
    // window.removeEventListener('resize', () => {

    // })
  },

  computed: {
    widthComputed () {

    }
  },

  methods: {

    // resizeEvent: function(i, newH, newW, newHPx, newWPx){
    //   console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    // },
    addMarker () {
      // console.log('addMArker', navigator.geolocation)
      // debugger
      // navigator.geolocation.getCurrentPosition((position) => {
      //   console.log('getCurrentPosition', position)

      //   console.log(position.coords.latitude, position.coords.longitude)
      //   this.markers.push({
      //     id: 1,
      //     latlng: L.latLng(position.coords.latitude, position.coords.longitude),
      //     content: 'Hi! this is my popup data'
      //   })
      // })

      this.marker = L.latLng(49.4478, 11.0683)
      this.center = [49.4478, 11.0683]
      this.markers.push({
        id: 1,
        latlng: L.latLng(49.4478, 11.0683),
        center: [49.4478, 11.0683],
        content: 'Hi! this is my popup data'
      })
    },

    handleResize () {
      // if(this.$el.clientWidth > 0) {
      //   this.width = this.$el.clientWidth
      // }

      // if(this.$el.clientHeight > 0) {
      //   this.height = this.$el.clientHeight
      // }
    }
  }

};
</script>

<style lang="sass" scoped>
  .map
    background-color: white
    height: calc(100% - 2em)
    width: calc(100% - 2em)
    // box-shadow: 0 0 10px rgba(0,0,0,0.2)
    box-shadow: 0 5px 40px rgba(0,0,0,0.2)

    overflow: hidden

    display: flex
    justify-content: center
    flex-direction: column

    text-align: center
    padding: 1em;

    animation:
      name: miniCard
      duration: 1s
      delay: 0.5s
      fill-mode: both



</style>
