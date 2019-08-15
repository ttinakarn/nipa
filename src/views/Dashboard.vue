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
      <table class="table table-bordered" style="text-align:center">
        <tr class="header">
          <td rowspan="2">vsid</td>
          <td colspan="4">Vital Sign</td>
          <td rowspan="2">O2Sat</td>
          <td colspan="3">Coma Score</td>
          <td rowspan="2">Urine</td>
          <td rowspan="2">
            Pain
            <br />Score
          </td>
          <td rowspan="2">
            Fall
            <br />Risk
          </td>
          <td rowspan="2">Remark</td>
          <td rowspan="2">Recorder</td>
        </tr>
        <tr class="header">
          <td>T</td>
          <td>P</td>
          <td>R</td>
          <td>BP</td>
          <td>E</td>
          <td>V</td>
          <td>M</td>
        </tr>
        <tr
          v-for="data in vitalsigns"
          :key="data.vsid"
          :class="rowCondition(data.temp, data.pulse, data.sbp, data.dbp, data.o2sat, data.eye, data.verbal, data.motor, data.urine, data.painscore, data.fallrisk)"
        >
          <td>{{data.vsid}}</td>
          <td
            :class="{'text-danger' : data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp}"
          >{{data.temp}}</td>
          <td
            :class="{'text-danger' : data.pulse < condition[0].minpulse || data.pulse > condition[0].maxpulse }"
          >{{data.pulse}}</td>
          <td
            :class="{'text-danger' : data.resp < condition[0].minresp || data.resp > condition[0].maxresp }"
          >{{data.resp}}</td>
          <td>
            <span
              :class="{'text-danger' : data.sbp < condition[0].minsbp || data.sbp > condition[0].maxsbp }"
            >{{data.sbp}}</span>/
            <span
              :class="{'text-danger' : data.dbp < condition[0].mindbp || data.dbp > condition[0].maxdbp }"
            >{{data.dbp}}</span>
          </td>
          <td
            :class="{'text-danger font-weight-bold' : data.o2sat < condition[0].mino2sat }"
          >{{data.o2sat}}</td>
          <td :class="{'text-danger' : data.eye < condition[0].maxeye }">{{data.eye}}</td>
          <td :class="{'text-danger' : data.verbal < condition[0].maxverbal }">{{data.verbal}}</td>
          <td :class="{'text-danger' : data.motor < condition[0].maxmotor }">{{data.motor}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.urine < condition[0].minurine }"
          >{{data.urine}}</td>
          <td>{{data.painscore}}</td>
          <td>{{data.fallrisk}}</td>
          <td>{{data.remark}}</td>
          <td>{{data.nurseid}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.0/bootstrap.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.css" rel="stylesheet" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
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
  background-color: #ff5757;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "vitalsigns",
  data() {
    return {
      vitalsigns: [],
      condition: [],
      time: null
    };
  },
  methods: {
    updateCurrentTime() {
      this.time = moment().format("LTS");
    },
    rowCondition(
      temp,
      pulse,
      sbp,
      dbp,
      o2sat,
      eye,
      verbal,
      motor,
      urine,
      painscore,
      fallrisk
    ) {
      if (
        temp >= this.condition[3].mino2sat ||
        pulse >= this.condition[3].minpulse ||
        sbp >= this.condition[3].minsbp ||
        dbp >= this.condition[3].mindbp ||
        o2sat <= this.condition[3].mino2sat ||
        eye <= this.condition[3].maxeye ||
        verbal <= this.condition[3].maxverbal ||
        motor <= this.condition[3].maxmotor ||
        urine <= this.condition[3].maxurine ||
        painscore >= this.condition[3].minpainscore ||
        fallrisk == this.condition[3].maxfallrisk
      ) {
        return "danger";
      } else if (
        (temp >= this.condition[2].mintemp &&
          temp <= this.condition[2].maxtemp) ||
        (pulse >= this.condition[2].minpulse &&
          pulse <= this.condition[2].maxpulse) ||
        ((sbp >= this.condition[2].minsbp || sbp <= this.condition[2].maxsbp) &&
          (dbp >= this.condition[2].mindbp ||
            dbp <= this.condition[2].maxdbp) &&
          o2sat < this.condition[2].mino2sat) ||
        eye == this.condition[2].maxeye ||
        verbal == this.condition[2].minverbal ||
        verbal == this.condition[2].maxverbal ||
        motor == this.condition[2].minmotor ||
        motor == this.condition[2].maxmotor ||
        urine <= this.condition[2].maxurine ||
        (painscore >= this.condition[2].minpainscore &&
          painscore <= this.conditon[2].maxpainscore) ||
        fallrisk == this.condition[2].minfallrisk ||
        fallrisk == this.condition[2].maxfallrisk
      ) {
        return "warning";
      } else {
        return "normal";
      }
    }
  },
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  mounted() {
    var instance = this;
    axios.get("http://localhost:8080/api/vitalsign").then(function(response) {
      console.log("vital sign data: " + response);
      instance.vitalsigns = response.data.data;
    });
    // localStorage.removeItem("condition");
    if (localStorage.getItem("condition") == null) {
      console.log("Retrieved data");
      axios.get("http://localhost:8080/api/condition").then(function(response) {
        console.log(response);
        localStorage.setItem("condition", JSON.stringify(response.data.data));
        console.log(localStorage.getItem("condition"));
        // instance.condition = localStorage.getItem("condition");
        // console.log(instance.condition);
      });
    }
    instance.condition = JSON.parse(localStorage.getItem("condition"));
    console.log(instance.condition);
  }
};
</script>