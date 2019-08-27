<template>
  <div>
    <table class="table table-bordered" style="text-align:center">
        <tr class="header">
          <td rowspan="2">
            {{firstcol}}
          </td>
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
          v-for="data in vs"
          :key="data.bednumber"
          :class="rowCondition(data.temp, data.pulse, data.sbp, data.dbp, data.o2sat, data.eye, data.verbal, data.motor, data.urine, data.painscore, data.fallrisk)"
        >
          <td>{{data.bednumber}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp}"
          >{{data.temp}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.pulse < condition[0].minpulse || data.pulse > condition[0].maxpulse }"
          >{{data.pulse}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.resp < condition[0].minresp || data.resp > condition[0].maxresp }"
          >{{data.resp}}</td>
          <td>
            <span
              :class="{'text-danger font-weight-bold' : data.sbp < condition[0].minsbp || data.sbp > condition[0].maxsbp }"
            >{{data.sbp}}</span> /
            <span
              :class="{'text-danger font-weight-bold' : data.dbp < condition[0].mindbp || data.dbp > condition[0].maxdbp }"
            >{{data.dbp}}</span>
          </td>
          <td
            :class="{'text-danger font-weight-bold' : data.o2sat < condition[0].mino2sat }"
          >{{data.o2sat}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.eye < condition[0].maxeye }"
          >{{data.eye}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.verbal < condition[0].maxverbal }"
          >{{data.verbal}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.motor < condition[0].maxmotor }"
          >{{data.motor}}</td>
          <td
            :class="{'text-danger font-weight-bold' : data.urine < condition[0].minurine }"
          >{{data.urine}}</td>
          <td>{{data.painscore}}</td>
          <td>{{data.fallrisk}}</td>
          <td>{{data.remark}}</td>
          <td>{{data.name}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ['firstcol', 'vs'],
  data() {
    return {
      condition: []
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
    }
  },
  
  mounted() {
    var instance = this;
    console.log(instance.vs);

    // localStorage.removeItem("condition");
    if (localStorage.getItem("condition") == null) {
      console.log("Retrieved data");
      axios
        .get("https://nipa.herokuapp.com/api/condition")
        .then(function(response) {
          console.log(response);
          localStorage.setItem("condition", JSON.stringify(response.data.data));
          console.log(localStorage.getItem("condition"));
          // instance.condition = localStorage.getItem("condition");
          // console.log(instance.condition);
        });
    }
    instance.condition = JSON.parse(localStorage.getItem("condition"));
    // console.log(instance.condition);
  }
};
</script>