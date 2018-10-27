<template>
  <div class="chart" v-on:resize="handleResize">
    WIDTH: {{ width }} {{ height }} - {{ type }}
    <apexcharts :width="width" :height="height" :type="type" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',

  components: {
    apexcharts: VueApexCharts,
  },

  props: {
    title: String,
    type: String,
  },

  data: function() {
    return {
      width: 100,
      height: 100,

      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  },

  // https://codepen.io/setholito/pen/EvNKWw

  mounted() {   
    window.addEventListener('resize', this.handleResize)

    setTimeout(() => {
      console.log('After timeout', this.$el.clientWidth, this.$el.clientHeight)
      // this.width = this.$el.clientWidth
      // this.height = this.$el.clientHeight
      this.handleResize()
    }, 200);
  },

  destroyed() {
    console.log('Destroy resize event handler')
    window.removeEventListener('resize', () => {

    })
  },

  computed: {
    widthComputed () {

    }
  },

  methods: {

    // resizeEvent: function(i, newH, newW, newHPx, newWPx){
    //   console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    // },

    handleResize () {
      if(this.$el.clientWidth > 0) {
        this.width = this.$el.clientWidth
      }

      if(this.$el.clientHeight > 0) {
        this.height = this.$el.clientHeight
      }
    }
  }

};
</script>

<style lang="sass" scoped>
  .chart
    // background-color: white
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



</style>
