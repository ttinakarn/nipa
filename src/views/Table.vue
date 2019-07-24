<template>
  <div style="margin: 10px">
    <v-table
      is-horizontal-resize
      style="width:100%"
      :title-rows="titleRows"
      :columns="columns"
      :table-data="tableData"
      :column-cell-class-name="columnCellClass"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
  </div>
</template>

<style>
.header {
  background-color: #7fdbd5;
}

.normal {
  background-color: #a8d08d;
}

.warning {
  background-color: #ffe699;
}

.danger {
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
          Recorder: "Tip",
          status: "warning"
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
          Recorder: "Tip",
          status: "normal"
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
          Recorder: "Tip",
          status: "normal"
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
          Recorder: "Tip",
          status: "danger"
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
          Recorder: "Tip",
          status: "warning"
        }
      ],
      columns: [
        { field: "BedNumber", width: 150, titleAlign: "center", isFrozen: true },
        { field: "T", width: 80, columnAlign: "center", isResize: true },
        { field: "P", width: 80, columnAlign: "center", isResize: true },
        { field: "R", width: 80, columnAlign: "center", isResize: true },
        { field: "BP", width: 80, columnAlign: "center", isResize: true },
        { field: "O2Sat", width: 80, columnAlign: "center", isResize: true },
        { field: "E", width: 80, columnAlign: "center", isResize: true },
        { field: "V", width: 80, columnAlign: "center", isResize: true },
        { field: "M", width: 80, columnAlign: "center", isResize: true },
        { field: "Urine", width: 80, columnAlign: "center", isResize: true },
        {
          field: "PainScore",
          width: 100,
          columnAlign: "center",
          isResize: true
        },
        {
          field: "FallRisk",
          width: 100,
          columnAlign: "center",
          isResize: true
        },
        { field: "Remark", width: 150, columnAlign: "center", isResize: true },
        { field: "Recorder", width: 100, columnAlign: "center", isResize: true }
      ],
      titleRows: [
        [
          {
            fields: ["BedNumber"],
            title: "BedNumber",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          },
          {
            fields: ["T", "P", "R", "BP"],
            title: "Vital Sign",
            titleAlign: "center",
            colspan: 4,
            titleCellClassName: "header"
          },
          {
            fields: ["O2Sat"],
            title: "O2 Sat",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          },
          {
            fields: ["E", "V", "M"],
            title: "Coma Score",
            titleAlign: "center",
            colspan: 3,
            titleCellClassName: "header"
          },
          {
            fields: ["Urine"],
            title: "Urine",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          },
          {
            fields: ["PainScore"],
            title: "PainScore",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          },
          {
            fields: ["FallRisk"],
            title: "FallRisk",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          },
          {
            fields: ["Remark"],
            title: "Remark",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          },
          {
            fields: ["Recorder"],
            title: "Recorder",
            titleAlign: "center",
            rowspan: 2,
            titleCellClassName: "header"
          }
        ],

        [
          {
            fields: ["T"],
            title: "T",
            titleAlign: "center",
            titleCellClassName: "header"
          },
          {
            fields: ["P"],
            title: "P",
            titleAlign: "center",
            titleCellClassName: "header"
          },
          {
            fields: ["R"],
            title: "R",
            titleAlign: "center",
            titleCellClassName: "header"
          },
          {
            fields: ["BP"],
            title: "BP",
            titleAlign: "center",
            titleCellClassName: "header"
          },
          {
            fields: ["E"],
            title: "E",
            titleAlign: "center",
            titleCellClassName: "header"
          },
          {
            fields: ["V"],
            title: "V",
            titleAlign: "center",
            titleCellClassName: "header"
          },
          {
            fields: ["M"],
            title: "M",
            titleAlign: "center",
            titleCellClassName: "header"
          }
        ]
      ]
    };
  },
  methods: {
    columnCellClass(rowIndex,columnName,rowData) {
      if (rowData.status === "warning") {
        return "warning";
      }
      else if (rowData.status === "danger") {
        return "danger";
      }
      else{
          return "normal"
      }
    },

    rowClick(rowIndex, rowData) {
      console.log(rowIndex);
      console.log(rowData);
    }
  }
};
</script>