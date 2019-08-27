<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ['x'],
  data() {
    return {
      chartdata: {
          type: 'line',
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "2018 Sales",
            fill: false,
            data: [300, 700, 700, 750, 450],
            borderColor: "rgba(50, 115, 220, 0.5)",
            backgroundColor: "rgba(50, 115, 220, 0.1)",
            id: "0"
          },
          {
            label: "2017 Sales",
            fill: false,
            data: [600, 550, 750, 250, 700],
            borderColor: "rgba(255, 56, 96, 0.5)",
            backgroundColor: "rgba(255, 56, 96, 0.1)",
            id: "1"
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