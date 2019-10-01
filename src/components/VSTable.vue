<template>
  <div>
    <table class="table table-bordered" style="text-align:center">
      <tr class="header">
    <td rowspan="2">{{firstcol}}</td>      
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
        <td rowspan="2" v-if="name == true">Recorder</td>
        <td rowspan="2" v-if="show == true">View</td>
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
        :key="data.date"
        :class="rowCondition(data.temp, data.pulse, data.sbp, data.dbp, data.o2sat, data.eye, data.verbal, data.motor, data.urine, data.painscore, data.fallrisk)"
      >
        <td v-if="firstcol == 'Bed'">{{data.bednumber}}</td>
        <td v-else>{{moment(data.date).format('lll')}}</td>
             
        <td v-if="data.bednumber == bednumber && i == 'temp' && (data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp)" class="text-danger font-weight-bold invalid">{{data.temp}}</td>
        <td v-else-if="data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp" class="text-danger font-weight-bold">{{data.temp}}</td>
        <td v-else-if="data.bednumber == bednumber && i == 'temp'" class="invalid">{{data.temp}}</td>
        <td v-else>{{data.temp}}</td>
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
        <td :class="{'text-danger font-weight-bold' : data.eye < condition[0].maxeye }">{{data.eye}}</td>
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
        <td v-if="name == true">{{data.name}}</td>
        <td v-if="show == true">
          <b-button size="sm" style="background: #7FDBD5; border: #7FDBD5;">
            <router-link :to="{ name: 'graph', params: {an: data.an}}" style="color: #2c3e50;">View</router-link>
          </b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { condition } from "../condition.js";

export default {
  props: ["firstcol", "vs", "show", "name"],
  data() {
    return {
      condition: [],
      updated: this.$store.state.updated,
      status: this.$store.state.status,
      bednumber: this.$store.state.bednumber,
      i: this.$store.state.i
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
      return condition.checkCondition(
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
      );
    }
  },
  mounted() {
    var instance = this;
    instance.condition = condition.getCondition();    
  }
};
</script>

<style>
@keyframes invalid {
  from { background-color: white; }
  to { background-color: inherit; }
}
.invalid {
  animation-name: invalid;
  animation-duration: 1s;
  animation-iteration-count: 20;
}
</style>