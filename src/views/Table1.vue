<template>
  <div style="margin: 10px">
    <v-table
      is-horizontal-resize
      style="width:100%"
      
      :columns="columns"
      :table-data="tableData"
    ></v-table>
  </div>
</template>

<style scoped>
.header {
  background-color: #7fdbd5;
}

.normal{
  background-color: #a8d08d;
}

.warning{
  background-color: #ffe699;
}

.danger{
  background-color: #ff5757;
} 
</style>


<script>
export default {
  data() {
    return {
      tableData: [
        {
          BedNumber: "1",
          T: "36.6",
          P: "92",
          R: "20",
          BP: "131/77",
          O2Sat: "95",
          E: "4",
          V: "5",
          M: "6",
          Urine: "57",
          PainScore: "2",
          FallRisk: "2",
          Remark: "N/A",
          Recorder: "Tip"
        },
        {
          BedNumber: "2",
          T: "36.8",
          P: "66",
          R: "20",
          BP: "134/86",
          O2Sat: "95",
          E: "4",
          V: "5",
          M: "6",
          Urine: "60",
          PainScore: "1",
          FallRisk: "1",
          Remark: "N/A",
          Recorder: "Tip"
        },
        {
          BedNumber: "3",
          T: "36.5",
          P: "70",
          R: "20",
          BP: "139/91",
          O2Sat: "100",
          E: "4",
          V: "5",
          M: "6",
          Urine: "72",
          PainScore: "2",
          FallRisk: "1",
          Remark: "N/A",
          Recorder: "Tip"
        },
        {
          BedNumber: "4",
          T: "36.8",
          P: "73",
          R: "20",
          BP: "100/75",
          O2Sat: "100",
          E: "4",
          V: "5",
          M: "6",
          Urine: "49",
          PainScore: "1",
          FallRisk: "1",
          Remark: "N/A",
          Recorder: "Tip"
        },
        {
          BedNumber: "5",
          T: "36.7",
          P: "78",
          R: "20",
          BP: "148/81",
          O2Sat: "95",
          E: "4",
          V: "5",
          M: "6",
          Urine: "69",
          PainScore: "1",
          FallRisk: "1",
          Remark: "N/A",
          Recorder: "Tip"
        }
      ],
      columns: [
        { field: "BedNumber", width: 150, titleAlign: "center", isResize:true, titleCellClassName: "header" },
        { field: "T", width: 80, columnAlign: "center", isFrozen: true },
        { field: "P", width: 80, columnAlign: "center", isFrozen: true },
        { field: "R", width: 80, columnAlign: "center", isFrozen: true },
        { field: "BP", width: 80, columnAlign: "center", isFrozen: true },
        { field: "O2Sat", width: 80, columnAlign: "center", isFrozen: true },
        { field: "E", width: 80, columnAlign: "center", isFrozen: true },
        { field: "V", width: 80, columnAlign: "center", isFrozen: true },
        { field: "M", width: 80, columnAlign: "center", isFrozen: true },
        { field: "Urine", width: 80, columnAlign: "center", isFrozen: true },
        { field: "PainScore", width: 100, columnAlign: "center", isFrozen: true},
        { field: "FallRisk", width: 100, columnAlign: "center", isFrozen: true },
        { field: "Remark", width: 150, columnAlign: "center", isFrozen: true },
        { field: "Recorder", width: 100, columnAlign: "center", isFrozen: true }
      ]
      // ,
      // titleRows: [
      //   [
      //     {
      //       fields: ["BedNumber"],
      //       title: "BedNumber",
      //       titleAlign: "center",
      //       rowspan: 2,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["T", "P", "R", "BP"],
      //       title: "Vital Sign",
      //       titleAlign: "center",
      //       colspan: 4,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["O2Sat"],
      //       title: "O2 Sat",
      //       titleAlign: "center",
      //       rowspan: 2,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["E", "V", "M"],
      //       title: "Coma Score",
      //       titleAlign: "center",
      //       colspan: 3,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["Urine"],
      //       title: "Urine",
      //       titleAlign: "center",
      //       rowspan: 2,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["PainScore"],
      //       title: "PainScore",
      //       titleAlign: "center",
      //       rowspan: 2
      //     },
      //     {
      //       fields: ["FallRisk"],
      //       title: "FallRisk",
      //       titleAlign: "center",
      //       rowspan: 2,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["Remark"],
      //       title: "Remark",
      //       titleAlign: "center",
      //       rowspan: 2,
      //       titleCellClassName: "header"
      //     },
      //     {
      //       fields: ["Recorder"],
      //       title: "Recorder",
      //       titleAlign: "center",
      //       rowspan: 2,
      //       titleCellClassName: "header"
      //     }
      //   ],

      //   [
      //     { fields: ["T"], title: "T", titleAlign: "center"},
      //     { fields: ["P"], title: "P", titleAlign: "center" },
      //     { fields: ["R"], title: "R", titleAlign: "center"},
      //     { fields: ["BP"], title: "BP", titleAlign: "center" },
      //     { fields: ["E"], title: "E", titleAlign: "center" },
      //     { fields: ["V"], title: "V", titleAlign: "center" },
      //     { fields: ["M"], title: "M", titleAlign: "center" }
      //   ]
      // ]
    };
  }
};
</script>