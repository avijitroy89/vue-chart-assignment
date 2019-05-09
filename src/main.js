import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
// import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs';
import {mapState} from "vuex"



Vue.config.productionTip = false;

Vue.component('line-chart', {
  extends: Line,  
  computed: {
    ...mapState(["chartLabels","chartData"])
  },
  mounted () {
    this.renderChart({
      labels: this.chartLabels,
      datasets: this.chartData
    }, {responsive: true, maintainAspectRatio: false})
  }
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
