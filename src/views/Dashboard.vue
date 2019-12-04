<template>
  <div>
    <navbar />
    <div style="margin: 10px" v-if="getdata == true">
      <VSTable firstcol="Bed" :summaryvs="summary" :show="true" :name="false" :header="true"></VSTable>
      <!-- <VSTable firstcol="Bed" :summaryvs="normal" :show="true" :name="false" :header="false"></VSTable> -->
    </div>
  </div>
</template>

<script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.0/bootstrap.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script>
import axios from "axios";
import VSTable from "@/components/VSTable.vue";
import { condition } from "../condition.js";
import io from "socket.io-client";
import navbar from "@/components/NavbarHome.vue";
import { mapState } from "vuex";

export default {
  components: {
    VSTable,
    navbar
  },
  computed: mapState(["getdata"]),
  data() {
    return {
      column: [
        "bednumber",
        "temp",
        "pulse",
        "resp",
        "sbp",
        "dbp",
        "o2sat",
        "eye",
        "verbal",
        "motor",
        "urine",
        "painscore",
        "fallrisk",
        "remark"
      ],
      vitalsigns: [],
      getsummary: false,
      summary: [],
      alerted: [],
      normal: [],
      condition: null,
      messages: [],
      socket: io("https://nipaapi.herokuapp.com/"),
      count: 0,
      sos: null,
      updatecol: [],
      updatecoldata: [],
      addnewrow: false
    };
  },
  methods: {
    getData() {
      this.$store.commit("setgetdata", false);
      var instance = this;
      instance.condition = condition.getCondition();
      console.log(instance.condition);
      axios
        .get("https://nipaapi.herokuapp.com/api/score")
        .then(function(response) {
          instance.sos = response.data.data;
          console.log(instance.sos);
        });

      axios
        .get("https://nipaapi.herokuapp.com/api/vitalsign")
        .then(function(response) {
          instance.vitalsigns = response.data.data;
          console.log("vs", instance.vitalsigns);

          for (var i = 0; i < response.data.data.length; i++) {
            if (
              i == 0 ||
              response.data.data[i].bednumber !=
                response.data.data[i - 1].bednumber
            ) {
              instance.summary.push(response.data.data[i]);
            }
          }
          for (var i = 0; i < instance.summary.length; i++) {
            for (var k = 1; k < instance.column.length; k++) {
              if (instance.summary[i][instance.column[k]] == null) {
                instance.count = instance.vitalsigns.length;
                for (var j = 0; j < instance.count; j++) {
                  if (
                    instance.summary[i][instance.column[0]] ==
                      instance.vitalsigns[j][instance.column[0]] &&
                    instance.vitalsigns[j][instance.column[k]] != null
                  ) {
                    instance.summary[i][instance.column[k]] =
                      instance.vitalsigns[j][instance.column[k]];
                    instance.count = j;
                  }
                }
              }
            }
            if (i == instance.summary.length - 1) {
              instance.getsummary = true;
            }
          }

          if (instance.getsummary == true) {
            for (var i = 0; i < instance.summary.length; i++) {
              instance.summary[i].sos = 0;
              if (instance.summary[i].temp <= instance.sos[0].max) {
                instance.summary[i].sos += instance.sos[0].score;
              } else if (
                instance.summary[i].temp >= instance.sos[1].min &&
                instance.summary[i].temp <= instance.sos[1].max
              ) {
                instance.summary[i].sos += instance.sos[1].score;
              } else if (
                instance.summary[i].temp >= instance.sos[2].min &&
                instance.summary[i].temp <= instance.sos[2].max
              ) {
                instance.summary[i].sos += instance.sos[2].score;
              } else if (
                instance.summary[i].temp >= instance.sos[3].min &&
                instance.summary[i].temp <= instance.sos[3].max
              ) {
                instance.summary[i].sos += instance.sos[3].score;
              } else if (instance.summary[i].temp >= instance.sos[4].min) {
                instance.summary[i].sos += instance.sos[4].score;
              }

              if (instance.summary[i].pulse <= parseInt(instance.sos[5].max)) {
                instance.summary[i].sos += instance.sos[5].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[6].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[6].max)
              ) {
                instance.summary[i].sos += instance.sos[6].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[7].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[7].max)
              ) {
                instance.summary[i].sos += instance.sos[7].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[8].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[8].max)
              ) {
                instance.summary[i].sos += instance.sos[8].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[9].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[9].max)
              ) {
                instance.summary[i].sos += instance.sos[9].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[10].min)
              ) {
                instance.summary[i].sos += instance.sos[10].score;
              }

              if (instance.summary[i].resp <= parseInt(instance.sos[17].max)) {
                instance.summary[i].sos += instance.sos[17].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[18].min) &&
                instance.summary[i].resp <= parseInt(instance.sos[18].max)
              ) {
                instance.summary[i].sos += instance.sos[18].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[19].min) &&
                instance.summary[i].resp <= parseInt(instance.sos[19].max)
              ) {
                instance.summary[i].sos += instance.sos[19].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[20].min) &&
                instance.summary[i].resp <= parseInt(instance.sos[20].max)
              ) {
                instance.summary[i].sos += instance.sos[20].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[21].min)
              ) {
                instance.summary[i].sos += instance.sos[21].score;
              }

              if (instance.summary[i].sbp <= parseInt(instance.sos[11].max)) {
                instance.summary[i].sos += instance.sos[11].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[12].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[12].max)
              ) {
                instance.summary[i].sos += instance.sos[12].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[13].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[13].max)
              ) {
                instance.summary[i].sos += instance.sos[13].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[14].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[14].max)
              ) {
                instance.summary[i].sos += instance.sos[14].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[15].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[15].max)
              ) {
                instance.summary[i].sos += instance.sos[15].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[16].min)
              ) {
                instance.summary[i].sos += instance.sos[16].score;
              }
            }
          }

          for (var i = 0; i < instance.summary.length; i++) {
            var zone = condition.checkCondition(
              instance.summary[i].temp,
              instance.summary[i].pulse,
              instance.summary[i].resp,
              instance.summary[i].sbp,
              instance.summary[i].dbp,
              instance.summary[i].o2sat,
              instance.summary[i].eye,
              instance.summary[i].verbal,
              instance.summary[i].motor,
              instance.summary[i].urine,
              instance.summary[i].painscore,
              instance.summary[i].fallrisk
            );
            if (zone != "normal") {
              instance.alerted.push(instance.summary[i]);
            } else {
              instance.normal.push(instance.summary[i]);
            }
          }
        });
    }
  },
  mounted() {
    var instance = this;
    this.getData();

    this.$store.commit("setgetdata", true);
    this.socket.on("dataUpdated", data => {
      console.log(data);
      this.$store.commit("setbednumber", data.bednumber);
      console.log("data.status", data.status);

      for (var i in data.status) {
        this.$store.commit(
          "set" + Object.keys(data.status[i])[0],
          data.status[i][Object.keys(data.status[i])[0]]
        );
        if (data.status[i][Object.keys(data.status[i])[0]] == true) {
          this.updatecol.push(Object.keys(data.status[i])[0]);
          this.updatecoldata.push(data.status[i].data);
        }
      }

      for (var i = 0; i < instance.summary.length; i++) {
        if (instance.summary[i].bednumber == data.bednumber) {
          for (var j = 0; j < this.updatecol.length; j++) {
            console.log("updated data",instance.summary[i][this.updatecol[j]], this.updatecoldata[j]);
            instance.summary[i][this.updatecol[j]] = this.updatecoldata[j];
            console.log("updated data",instance.summary[i][this.updatecol[j]], this.updatecoldata[j]);
            

            //Calculate new sos score
            instance.summary[i].sos = 0;
            if (instance.summary[i].temp <= instance.sos[0].max) {
                instance.summary[i].sos += instance.sos[0].score;
              } else if (
                instance.summary[i].temp >= instance.sos[1].min &&
                instance.summary[i].temp <= instance.sos[1].max
              ) {
                instance.summary[i].sos += instance.sos[1].score;
              } else if (
                instance.summary[i].temp >= instance.sos[2].min &&
                instance.summary[i].temp <= instance.sos[2].max
              ) {
                instance.summary[i].sos += instance.sos[2].score;
              } else if (
                instance.summary[i].temp >= instance.sos[3].min &&
                instance.summary[i].temp <= instance.sos[3].max
              ) {
                instance.summary[i].sos += instance.sos[3].score;
              } else if (instance.summary[i].temp >= instance.sos[4].min) {
                instance.summary[i].sos += instance.sos[4].score;
              }

              if (instance.summary[i].pulse <= parseInt(instance.sos[5].max)) {
                instance.summary[i].sos += instance.sos[5].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[6].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[6].max)
              ) {
                instance.summary[i].sos += instance.sos[6].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[7].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[7].max)
              ) {
                instance.summary[i].sos += instance.sos[7].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[8].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[8].max)
              ) {
                instance.summary[i].sos += instance.sos[8].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[9].min) &&
                instance.summary[i].pulse <= parseInt(instance.sos[9].max)
              ) {
                instance.summary[i].sos += instance.sos[9].score;
              } else if (
                instance.summary[i].pulse >= parseInt(instance.sos[10].min)
              ) {
                instance.summary[i].sos += instance.sos[10].score;
              }

              if (instance.summary[i].resp <= parseInt(instance.sos[17].max)) {
                instance.summary[i].sos += instance.sos[17].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[18].min) &&
                instance.summary[i].resp <= parseInt(instance.sos[18].max)
              ) {
                instance.summary[i].sos += instance.sos[18].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[19].min) &&
                instance.summary[i].resp <= parseInt(instance.sos[19].max)
              ) {
                instance.summary[i].sos += instance.sos[19].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[20].min) &&
                instance.summary[i].resp <= parseInt(instance.sos[20].max)
              ) {
                instance.summary[i].sos += instance.sos[20].score;
              } else if (
                instance.summary[i].resp >= parseInt(instance.sos[21].min)
              ) {
                instance.summary[i].sos += instance.sos[21].score;
              }

              if (instance.summary[i].sbp <= parseInt(instance.sos[11].max)) {
                instance.summary[i].sos += instance.sos[11].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[12].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[12].max)
              ) {
                instance.summary[i].sos += instance.sos[12].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[13].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[13].max)
              ) {
                instance.summary[i].sos += instance.sos[13].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[14].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[14].max)
              ) {
                instance.summary[i].sos += instance.sos[14].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[15].min) &&
                instance.summary[i].sbp <= parseInt(instance.sos[15].max)
              ) {
                instance.summary[i].sos += instance.sos[15].score;
              } else if (
                instance.summary[i].sbp >= parseInt(instance.sos[16].min)
              ) {
                instance.summary[i].sos += instance.sos[16].score;
              }
            
          }
          i = instance.summary.length - 1;
          instance.addnewrow = false;
        } else {
          instance.addnewrow = true;
        }

        if (i == instance.summary.length - 1 && instance.addnewrow == true) {
          console.log(i);
          console.log("Refresh page");

          this.summary = [];
          this.getData();
          this.$store.commit("setgetdata", true);
          instance.addnewrow = false;
        }
      }

      this.updatecol = [];
      this.updatecoldata = [];
    });
  }
};
</script>

<style>
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header {
  background-color: #7fdbd5;
  border: black;
}

.normal {
  background-color: #a8d08d;
}

.warning {
  background-color: #ffe699;
}

.danger {
  background-color: #fda7a7;
}
</style>