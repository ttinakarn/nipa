<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <img src="../assets/logo-main.png" alt="HospitalLogo" height="60" />
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">
        <span>{{time}}</span>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-danger" right>
          <img src="../assets/logo.png" alt="NiPALogo" height="60" />
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>

    <br />
    <div style="margin: 10px">
      <VSTable firstcol="Bed" :vs="alerted" :show="true" :name="false" :header="true"></VSTable>
      <VSTable firstcol="Bed" :vs="normal" :show="true" :name="false" :header="false"></VSTable>
      <!-- <VSTable firstcol="Bed" :vs="vs" :show="false"></VSTable> -->
    </div>
  </div>
</template>

<script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.0/bootstrap.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script>
import axios from "axios";
import moment from "moment";
import VSTable from "@/components/VSTable.vue";
import { condition } from "../condition.js";
import io from "socket.io-client";

export default {
  components: {
    VSTable
  },
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
      summary: [],
      alerted: [],
      normal: [],
      condition: [],
      time: null,
      messages: [],
      socket: io("https://nipa.herokuapp.com/"),
      count: 0,
      vs: []
    };
  },
  methods: {
    updateCurrentTime() {
      moment.locale("th");
      this.time = moment().format("LTS");
    },
    getData() {
      var instance = this;
      instance.condition = condition.getCondition();
      axios
        .get("https://nipa.herokuapp.com/api/vitalsign")
        .then(function(response) {
          // console.log("vital sign data: ", response);
          instance.vitalsigns = response.data.data;
          instance.vs = response.data.data;
          console.log("vs", instance.vs);
          
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
                    instance.summary[i][instance.column[k]] = instance.vitalsigns[j][instance.column[k]];
                    instance.count = j;
                  }
                }
              }
            }
          }
          for (var i = 0; i < instance.summary.length; i++) {
            var zone = condition.checkCondition(
              instance.summary[i].temp,
              instance.summary[i].pulse,
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
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
    // console.log("Bednumber", this.$store.state.bednumber);
  },
  mounted() {
    this.getData();
    this.socket.on("dataUpdated", data => {
      this.summary = [];
      this.normal = [];
      this.alerted = [];
      this.$store.commit('setbednumber', data.bednumber);
      for(var i in data.status){
        this.$store.commit('set'+Object.keys(data.status[i])[0], data.status[i][Object.keys(data.status[i])[0]]);
        // console.log('set'+Object.keys(data.status[i])[0], data.status[i][Object.keys(data.status[i])[0]]);
      }
      // this.$store.commit('set', data.pulse);
      // console.log("Bednumber", this.$store.state.bednumber);
      this.getData() ;
      // console.log(data);      
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