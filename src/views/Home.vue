<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <line-chart/>

    <h5>Upload CSV file</h5>

    <papa-parse :config="{header: false}" @complete="getCsv"></papa-parse>
  </div>
</template>

<script>
// @ is an alias to /src
import PapaParse from "@/components/PapaParse.vue";
import { mapState, mapMutations } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "home",
  data: () => {
    return {
      chartData1: [],
      labels: []
    };
  },
  components: { PapaParse },
  computed: {
    ...mapState(["chartData"])
  },
  methods: {
    ...mapMutations(["changeLabelsData", "changeChartData"]),

    getCsv(results) {
      let data = results.data;
      for (let i = 0; i < data.length - 1; i++) {
        let labelTitle = data[i][0];
        this.makeChartData(labelTitle, data[i]);
      }

      this.changeLabelsData(this.labels);
      this.modifyData(data);
    },
    makeChartData(labelTitle, data) {
      for (let i = 1; i < data.length; i++) {
        let splittedValue = data[i].split("|");

        this.makeUniqueLabels(splittedValue[0]);
      }
    },
    makeUniqueLabels(chartLabel) {
      if (this.labels.indexOf(chartLabel) === -1) {
        this.labels.push(chartLabel);
      }
    },
    modifyData(data) {
      let allLabels = this.labels.sort();
      for (let m = 0; m < data.length - 1; m++) {
        let cData = {
          label: data[m][0],
          data: []
        };
        for (let i = 0; i < allLabels.length; i++) {
          for (let n = 0; n < data[m].length; n++) {
            let splittedValue = data[m][n].split("|");
            if (allLabels[i] === splittedValue[0]) {
              cData.data[i] = splittedValue[1];
            }
          }
        }
        for (let a = 0; a < cData.data.length; a++) {
          if (typeof cData.data[a] == "undefined") {
            cData.data[a] = "0";
          }
        }
        // console.log(cData);

        this.chartData1.push(cData);
      }

      console.log(this.chartData1);
      this.changeChartData(this.chartData1);
    }
  }
};
</script>
