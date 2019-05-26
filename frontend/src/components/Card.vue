<template>
  <div class="card">
    <div class="header">
      <h2>{{ title }}</h2>
      <span @click="setRange('24h')" :class="{ active: range === '24h'}">24 hours</span>
      <span @click="setRange('week')" :class="{ active: range === 'week'}">1 week</span>
      <span @click="setRange('month')" :class="{ active: range === 'month'}">1 month</span>
    </div>

    <div class="body">
      <apexcharts :type="type"  :options="chartOptions" :series="[{ title: title, data: values }]"></apexcharts>
    </div>

    <div class="text">
      <div class="fab"><i class="fas" :class="icon"></i></div>
      <h3>Current {{ title }}</h3>
      <h1>{{ roundedCurrent }}<small>{{ sign }}</small></h1>
      <br />
      <h3>Average last 24 hours</h3>
      <h1>{{ average }}<small>{{ sign }}</small></h1>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Card',
  components: {
    apexcharts: VueApexCharts
  },

  props: {
    type: String,
    title: String,
    icon: String,
    sign: String,
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
      chartOptions: {
        colors: ['#42b983', '#0066A2'],

        chart: {
          height: 160,
          zoom: {
            enabled: false
          },

          toolbar: {
            show: false
          },

          scroller: {
            enabled: false
          },

          sparkline: {
            enabled: false
          },

          animations: {
            enabled: true,
            easing: 'easein',
            speed: 1800,
            animateGradually: {
              enabled: false,
              delay: 1500
            },

            dynamicAnimation: {
              enabled: true,
              speed: 1000
            }
          }
        },

        tooltip: {
          enabled: true,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          onDatasetHover: {
            highlightDataSeries: false
          },
          x: {
            show: true,
            format: 'dd MMM - HH:mm',
            formatter: undefined
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => 'Value'
            }
          }
        },

        dataLabels: {
          enabled: false
        },

        stroke: {
          width: 3,
          curve: 'smooth'
        },

        grid: {
          show: true,
          borderColor: '#fff'
        },

        xaxis: {
          type: 'datetime',

          labels: {
            show: true,
            rotateAlways: false,
            trim: true,
            maxHeight: 20,
            style: {
              colors: [],
              fontSize: '10px',
              cssClass: 'apexcharts-xaxis-label'
            },
            offsetX: 0,
            offsetY: -2,
            // format: 'ddd HH:mm',
            formatter: undefined,
            datetimeFormatter: {
              year: 'yy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm'
            }
          },

          axisBorder: {
            show: true
          },

          axisTicks: {
            show: true
          }
        },

        yaxis: {
          decimalsInFloat: 1,
          labels: {
            show: false,
            rotateAlways: false,
            trim: true,
            maxHeight: 20,
            style: {
              colors: [],
              fontSize: '10px',
              cssClass: 'apexcharts-xaxis-label'
            },
            offsetX: 10,
            offsetY: -2,
            format: 'HH:mm',
            formatter: undefined,
            datetimeFormatter: {
              year: 'yy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm'
            }
          },

          axisBorder: {
            show: false
          },

          axisTicks: {
            show: false
          }
        }
      }
    }
  },

  mounted () {
    console.log('CARD MOUNTED')
  },

  computed: {
    ...mapState(['range']),

    roundedCurrent () {
      return this.round(this.current) || '--- '
    },

    average () {
      const key = this.title.toLowerCase()

      if (this.$store.state[key].length) {
        const average = this.$store.state[key].map(item => item[1]).reduce((a, b) => a + b) / this.$store.state.temperature.length
        return this.round(average)
      }

      return '--- '
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

  .card
    display: inline-block
    // margin: 0 20px 20px 0
    background-color: white
    height: auto
    width: 30%
    border-radius: 15px
    // box-shadow: 0 0 10px rgba(0,0,0,0.2)
    box-shadow: 0 5px 40px rgba(0,0,0,0.2)

    overflow: hidden

    display: inline-flex
    justify-content: start
    flex-direction: column

    animation:
      name: miniCard
      duration: 1s
      delay: 0.8s
      fill-mode: both

  @keyframes miniCard
    0%
      transform: scale(0)
    50%
      transform: scale(1.05)
    100%
      transform: scale(1)

  .header
    height: 60%
    background: #FFC107
    padding: 15px
    background-size: cover
    border-bottom: 2px solid #fff

    h2
      color: #fff

    span
      color: #fff
      font-weight: bold
      padding: 5px
      // border-bottom: 1px solid #fff
      margin: 5px
      cursor: pointer
      display: inline-block

      &.active
        color: #42b983
        border-bottom: 2px solid #42b983

  .body
    background: #FFCA28
    padding: 0 5%

  .text
    height: 40%
    text-align: left
    display: flex
    align-items: flex-start
    padding: 10%
    justify-content: center
    flex-direction: column

    h1
      font-size: 3rem
    h3
      color: grey

  .fab
    width: 4rem
    height: 4rem
    border-radius: 50%
    position: absolute
    margin-top: -26%
    right: 20px
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3)

    color: #fff
    font-size: 1.4rem
    line-height: 1.4rem
    text-align: center
    background: #42b983
    display: flex
    align-items: center
    justify-content: center
    -webkit-transition: -webkit-transform .2s ease-in-out
    transition: transform .2s ease-in-out

    &:hover
      background: #0066A2
      cursor: pointer
      -ms-transform: rotate(90deg)
      -webkit-transform: rotate(90deg)
      transform: rotate(90deg)
</style>
