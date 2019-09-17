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
      <VSTable firstcol="Bed" :vs="alerted" :show="false"></VSTable>
      <VSTable firstcol="Bed" :vs="vitalsigns" :show="true"></VSTable>
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
import {condition} from "../condition.js";
export default {
  components: {
    VSTable
  },
  // name: "vitalsigns",
  data() {
    return {
      vitalsigns: [],
      alerted: [],
      condition: [],
      time: null
    };
  },
  methods: {
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
        temp >= this.condition[3].mintemp ||
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
    },
    updateCurrentTime() {
      moment.locale("th");
      this.time = moment().format("LTS");
    }
  },
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
  mounted() {
    var instance = this;
    axios
      .get("https://nipa.herokuapp.com/api/vitalsign")
      .then(function(response) {
        console.log("vital sign data: " + response);
        instance.vitalsigns = response.data.data;
        for (var i = 0; i < response.data.data.length; i++) {
          var zone = instance.rowCondition(
            instance.vitalsigns[i].temp,
            instance.vitalsigns[i].pulse,
            instance.vitalsigns[i].sbp,
            instance.vitalsigns[i].dbp,
            instance.vitalsigns[i].o2sat,
            instance.vitalsigns[i].eye,
            instance.vitalsigns[i].verbal,
            instance.vitalsigns[i].motor,
            instance.vitalsigns[i].urine,
            instance.vitalsigns[i].painscore,
            instance.vitalsigns[i].fallrisk
          );
          if (zone != "normal") {
            instance.alerted.push(instance.vitalsigns[i]);
          }
        }
      });
    instance.condition = condition.getCondition();
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