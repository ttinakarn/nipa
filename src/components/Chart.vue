<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ['x', 'y', 'label'],
  data() {
    return {
      chartdata: {
          type: 'line',
        labels: this.y,
        datasets: [
          {
            label: this.label,
            fill: false,
            data: this.x,
            borderColor: "rgba(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192)",
            // backgroundColor: "rgba(242, 113, 115, 1)",
            id: "0",
            lineTension: 0
          }
        ]
      },
      option: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
             mode: 'point',
             intersect: true,
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              console.log(data.datasets[tooltipItems.datasetIndex].label);
              return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel;
            }
          }
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.option);
  }
};
</script>