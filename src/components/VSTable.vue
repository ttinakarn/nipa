<template>
  <div>
    <table class="table table-bordered" style="text-align:center">
      <tr class="header" v-if="header == true">
        <td rowspan="2" style="width:60px">{{firstcol}}</td>
        <td colspan="4" style="width:300px">Vital Sign</td>
        <td rowspan="2" style="width:100px">O2Sat</td>
        <td colspan="3" style="width:150px">Coma Score</td>
        <td rowspan="2" style="width:100px">Urine</td>
        <td rowspan="2" style="width:100px">
          Pain
          <br />Score
        </td>
        <td rowspan="2" style="width:100px">
          Fall
          <br />Risk
        </td>
        <td rowspan="2">Remark</td>
        <td rowspan="2" v-if="name == true">Recorder</td>
        <td rowspan="2" v-if="show == true" style="width:100px">View</td>
      </tr>
      <tr class="header" v-if="header == true">
        <td style="width:60px">T</td>
        <td style="width:60px">P</td>
        <td style="width:60px">R</td>
        <td style="width:120px">BP</td>
        <td style="width:50px">E</td>
        <td style="width:50px">V</td>
        <td style="width:50px">M</td>
      </tr>
      <tr
        v-for="data in vs"
        :key="data.date"
        :class="rowCondition(data.temp, data.pulse, data.sbp, data.dbp, data.o2sat, data.eye, data.verbal, data.motor, data.urine, data.painscore, data.fallrisk)"
      >
        <td v-if="firstcol == 'Bed'" style="width:60px">{{data.bednumber}}</td>
        <td v-else style="width:250px">{{moment(data.date).format('lll')}}</td>

        <!-- <VSColumn :dataBednumber='data.bednumber' :bednumber="bednumber" :column="temp" condition="data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp" :dataColumn="data.temp"></VSColumn> -->
        <td
          v-if="data.bednumber == bednumber && temp == true && (data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp)"
          class="text-danger font-weight-bold invalid"
          style="width:60px"
        >{{data.temp}}</td>
        <td
          v-else-if="data.temp < condition[0].mintemp || data.temp > condition[0].maxtemp"
          class="text-danger font-weight-bold"
          style="width:60px"
        >{{data.temp}}</td>
        <td v-else-if="data.bednumber == bednumber && temp == true" class="invalid" style="width:60px">{{data.temp}}</td>
        <td v-else style="width:60px">{{data.temp}}</td>

        <!-- <td
          :class="{'text-danger font-weight-bold' : data.pulse < condition[0].minpulse || data.pulse > condition[0].maxpulse }"
        >{{data.pulse}}</td>-->
        <td
          v-if="data.bednumber == bednumber && pulse == true && (data.pulse < condition[0].minpulse || data.pulse > condition[0].maxpulse)"
          class="text-danger font-weight-bold invalid"
          style="width:60px"
        >{{data.pulse}}</td>
        <td
          v-else-if="data.pulse < condition[0].minpulse || data.pulse > condition[0].maxpulse"
          class="text-danger font-weight-bold"
          style="width:60px"
        >{{data.pulse}}</td>
        <td v-else-if="data.bednumber == bednumber && pulse == true" class="invalid" style="width:60px">{{data.pulse}}</td>
        <td v-else style="width:60px">{{data.pulse}}</td>

        <!-- <td
          :class="{'text-danger font-weight-bold' : data.resp < condition[0].minresp || data.resp > condition[0].maxresp }"
        >{{data.resp}}</td>-->
        <td
          v-if="data.bednumber == bednumber && resp == true && (data.resp < condition[0].minresp || data.resp > condition[0].maxresp)"
          class="text-danger font-weight-bold invalid"
          style="width:60px"
        >{{data.resp}}</td>
        <td
          v-else-if="data.resp < condition[0].minresp || data.resp > condition[0].maxresp"
          class="text-danger font-weight-bold"
          style="width:60px"
        >{{data.resp}}</td>
        <td v-else-if="data.bednumber == bednumber && resp == true" class="invalid" style="width:60px">{{data.resp}}</td>
        <td v-else style="width:60px">{{data.resp}}</td>

        <!-- <td>
          <span
            :class="{'text-danger font-weight-bold' : data.sbp < condition[0].minsbp || data.sbp > condition[0].maxsbp }"
          >{{data.sbp}}</span> /
          <span
            :class="{'text-danger font-weight-bold' : data.dbp < condition[0].mindbp || data.dbp > condition[0].maxdbp }"
          >{{data.dbp}}</span>
        </td> -->
        <td
          v-if="data.bednumber == bednumber && (sbp == true || dbp == true)"
          class="invalid" style="width:120px"
        >
          <span
            :class="{'text-danger font-weight-bold' : data.sbp < condition[0].minsbp || data.sbp > condition[0].maxsbp }"
          >{{data.sbp}}</span> /
          <span
            :class="{'text-danger font-weight-bold' : data.dbp < condition[0].mindbp || data.dbp > condition[0].maxdbp }"
          >{{data.dbp}}</span>
        </td>
        <td v-else style="width:120px">
          <span
            :class="{'text-danger font-weight-bold' : data.sbp < condition[0].minsbp || data.sbp > condition[0].maxsbp }"
          >{{data.sbp}}</span> /
          <span
            :class="{'text-danger font-weight-bold' : data.dbp < condition[0].mindbp || data.dbp > condition[0].maxdbp }"
          >{{data.dbp}}</span>
        </td>

        <!-- <td
          :class="{'text-danger font-weight-bold' : data.o2sat < condition[0].mino2sat }"
        >{{data.o2sat}}</td> -->
        <td
          v-if="data.bednumber == bednumber && o2sat == true && (data.o2sat < condition[0].mino2sat)"
          class="text-danger font-weight-bold invalid" style="width:100px"
        >{{data.o2sat}}</td>
        <td
          v-else-if="data.o2sat < condition[0].mino2sat"
          class="text-danger font-weight-bold" style="width:100px"
        >{{data.o2sat}}</td>
        <td v-else-if="data.bednumber == bednumber && o2sat == true" class="invalid" style="width:100px">{{data.o2sat}}</td>
        <td v-else style="width:100px">{{data.o2sat}}</td>

        <!-- <td :class="{'text-danger font-weight-bold' : data.eye < condition[0].maxeye }">{{data.eye}}</td> -->
        <td
          v-if="data.bednumber == bednumber && eye == true && (data.eye < condition[0].maxeye)"
          class="text-danger font-weight-bold invalid" style="width:50px"
        >{{data.eye}}</td>
        <td
          v-else-if="data.eye < condition[0].maxeye"
          class="text-danger font-weight-bold" style="width:50px"
        >{{data.eye}}</td>
        <td v-else-if="data.bednumber == bednumber && eye == true" class="invalid" style="width:50px">{{data.eye}}</td>
        <td v-else style="width:50px">{{data.eye}}</td>

        <!-- <td
          :class="{'text-danger font-weight-bold' : data.verbal < condition[0].maxverbal }"
        >{{data.verbal}}</td> -->
        <td
          v-if="data.bednumber == bednumber && verbal == true && (data.verbal < condition[0].maxverbal)"
          class="text-danger font-weight-bold invalid" style="width:50px"
        >{{data.verbal}}</td>
        <td
          v-else-if="data.verbal < condition[0].maxverbal"
          class="text-danger font-weight-bold" style="width:50px"
        >{{data.verbal}}</td>
        <td v-else-if="data.bednumber == bednumber && verbal == true" class="invalid" style="width:50px">{{data.verbal}}</td>
        <td v-else style="width:50px">{{data.verbal}}</td>

        <!-- <td
          :class="{'text-danger font-weight-bold' : data.motor < condition[0].maxmotor }"
        >{{data.motor}}</td> -->
        <td
          v-if="data.bednumber == bednumber && motor == true && (data.motor < condition[0].maxmotor)"
          class="text-danger font-weight-bold invalid" style="width:50px"
        >{{data.motor}}</td>
        <td
          v-else-if="data.motor < condition[0].maxmotor"
          class="text-danger font-weight-bold" style="width:50px"
        >{{data.motor}}</td>
        <td v-else-if="data.bednumber == bednumber && motor == true" class="invalid" style="width:50px">{{data.motor}}</td>
        <td v-else style="width:50px">{{data.motor}}</td>

        <!-- <td
          :class="{'text-danger font-weight-bold' : data.urine < condition[0].minurine }"
        >{{data.urine}}</td> -->
        <td
          v-if="data.bednumber == bednumber && urine == true && (data.urine < condition[0].minurine)"
          class="text-danger font-weight-bold invalid" style="width:100px"
        >{{data.urine}}</td>
        <td
          v-else-if="data.urine < condition[0].minurine"
          class="text-danger font-weight-bold" style="width:100px"
        >{{data.urine}}</td>
        <td v-else-if="data.bednumber == bednumber && urine == true" class="invalid" style="width:100px">{{data.urine}}</td>
        <td v-else style="width:100px">{{data.urine}}</td>

        <!-- <td>{{data.painscore}}</td> -->
        <!-- <td
          v-if="data.bednumber == bednumber && painscore == true"
          class="invalid" style="width:100px"
        >
          {{data.painscore}}
        </td>
        <td v-else style="width:100px">
          {{data.painscore}}
        </td> -->
        <td
          v-if="data.bednumber == bednumber && painscore == true && (data.painscore > condition[1].maxpainscore)"
          class="text-danger font-weight-bold invalid" style="width:100px"
        >{{data.painscore}}</td>
        <td
          v-else-if="data.painscore > condition[1].maxpainscore"
          class="text-danger font-weight-bold" style="width:100px"
        >{{data.painscore}}</td>
        <td v-else-if="data.bednumber == bednumber && painscore == true" class="invalid" style="width:100px">{{data.painscore}}</td>
        <td v-else style="width:100px">{{data.painscore}}</td>

        <!-- <td>{{data.fallrisk}}</td> -->
        <!-- <td
          v-if="data.bednumber == bednumber && fallrisk == true"
          class="invalid" style="width:100px"
        >
          {{data.fallrisk}}
        </td>
        <td v-else style="width:100px">
          {{data.fallrisk}}
        </td> -->
        <td
          v-if="data.bednumber == bednumber && fallrisk == true && (data.fallrisk > condition[1].maxfallrisk)"
          class="text-danger font-weight-bold invalid" style="width:100px"
        >{{data.fallrisk}}</td>
        <td
          v-else-if="data.fallrisk > condition[1].maxfallrisk"
          class="text-danger font-weight-bold" style="width:100px"
        >{{data.fallrisk}}</td>
        <td v-else-if="data.bednumber == bednumber && fallrisk == true" class="invalid" style="width:100px">{{data.fallrisk}}</td>
        <td v-else style="width:100px">{{data.fallrisk}}</td>

        <!-- <td>{{data.remark}}</td> -->
        <td
          v-if="data.bednumber == bednumber && remark == true"
          class="invalid"
        >
          {{data.remark}}
        </td>
        <td v-else>
          {{data.remark}}
        </td>
        <td v-if="name == true">{{data.name}}</td>
        <td v-if="show == true" style="width:100px">
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
import { mapState } from "vuex";
import { log } from "util";
import VSColumn from "../components/VSColumn.vue";

export default {
  props: ["firstcol", "vs", "show", "name", "header"],
  components: {
    VSColumn
  },
  data() {
    return {
      condition: [],
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
  computed: mapState([
    "updated",
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
  ]),
  mounted() {
    var instance = this;
    instance.condition = condition.getCondition();
    // console.log("Bednumber", this.bednumber);
  }
};
</script>

<style>
@keyframes invalid {
  from {
    background-color: white;
  }
  to {
    background-color: inherit;
  }
}
.invalid {
  animation-name: invalid;
  animation-duration: 1s;
  animation-iteration-count: 20;
}
</style>