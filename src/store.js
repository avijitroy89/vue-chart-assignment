import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chartData: [
      {
        label: 'Data 2',
        data: [0, 39, 10, 0, 39, 80, 40]
      }
    ],
    chartLabels: ["1", "2", "3", "4", "5", "6"]
  },
  mutations: {
    changeLabelsData(state, labels) {
      let filterLabels = labels.sort();
      state.chartLabels = filterLabels;
    },
    changeChartData(state, cData) {
      state.chartData = cData;
    }
  },
  actions: {},
  getters: {}
})
