<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link to="/dashboard" style="color: #2c3e50;">
          <img src="../assets/logo-main.png" alt="HospitalLogo" height="60" />
        </router-link>
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
    <b-card bg-variant="light" text-variant="dark">
      <b-col>
        <b-row>
          <b-col md="6" xs="12" style="text-align: left;">
            <h5>Bed</h5>
          </b-col>
          <b-col md="6" xs="12" style="text-align: left;">
            <h5>Name:</h5>
          </b-col>
        </b-row>
      </b-col>
      <b-tabs content-class="mt-3" align="center" v-model="tabIndex" v-if="temp.length != 0">
        <b-tab title="Temperature" active>
          <div v-if="tabIndex == 0">
            <chart label="Temperate" :x="temp" :y="tempdate"></chart>
          </div>
        </b-tab>
        <b-tab title="Pulse">
          <div v-if="tabIndex == 1">
              <chart label="pulse" :x="pulse" :y="pulsedate"></chart>
            </div>
        </b-tab>
        <b-tab title="Respiration">
          <div v-if="tabIndex == 2">
              <chart label="Respiration" :x="resp" :y="respdate"></chart>
            </div>
        </b-tab>
        <b-tab title="SBP">
          <div v-if="tabIndex == 3">
              <chart label="SBP" :x="sbp" :y="sbpdate"></chart>
            </div>
        </b-tab>
        <b-tab title="DBP">
           <div v-if="tabIndex == 4">
              <chart label="DBP" :x="dbp" :y="dbpdate"></chart>
            </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <div></div>
    <div style="margin: 10px">
      <br />
      <VSTable
        firstcol="Date&Time"
        :vs="vitalsigns"
        :show="false"
        firstcolsize="width:200px"
        :header="true"
        :name="true"
      ></VSTable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import chart from "@/components/Chart.vue";
import VSTable from "@/components/VSTable.vue";
export default {
  components: {
    chart,
    VSTable
  },
  data() {
    return {
      vitalsigns: [],
      time: null,
      temp: [],
      tempdate: [],
      pulse: [],
      pulsedate: [],
      resp: [],
      respdate: [],
      sbp: [],
      sbpdate: [],
      dbp: [],
      dbpdate: [],
      namelist: ["temp", "pulse", "resp", "sbp", "dbp"],
      tabIndex: 0
    };
  },
  mounted() {
    var instance = this;
    console.log(instance.$route.params.an);

    axios
      .get(
        "https://nipa.herokuapp.com/api/vitalsign/" + instance.$route.params.an
      )
      .then(function(response) {
        console.log("vital sign data: ", response.data.data);
        instance.vitalsigns = response.data.data;
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].temp != null) {
            instance.temp.push(response.data.data[i].temp);
            instance.tempdate.push(moment(response.data.data[i].date).format('lll'));
          }
        }
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].pulse != null) {
            instance.pulse.push(response.data.data[i].pulse);
            instance.pulsedate.push(moment(response.data.data[i].date).format('lll'));
          }
        }
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].resp != null) {
            instance.resp.push(response.data.data[i].resp);
            instance.respdate.push(moment(response.data.data[i].date).format('lll'));
          }
        }
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].sbp != null) {
            instance.sbp.push(response.data.data[i].sbp);
            instance.sbpdate.push(moment(response.data.data[i].date).format('lll'));
          }
        }
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].dbp != null) {
            instance.dbp.push(response.data.data[i].dbp);
            instance.dbpdate.push(moment(response.data.data[i].date).format('lll'));
          }
        }
        console.log("temp", instance.temp);
        // console.log("tempdate", instance.tempdate);
      });
  },
  methods: {
    updateCurrentTime() {
      moment.locale("th");
      this.time = moment().format("LTS");
    }
  },
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>