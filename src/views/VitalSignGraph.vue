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
    <b-card bg-variant="light" text-variant="dark" v-if="temp.length != 0">
      <b-row align-v="center">
        <b-col sm="10">
          <b-row>
            <b-col cols="6" style="text-align: left;">
              <h5>Bed {{bedinfo.bednumber}}</h5>
            </b-col>
            <b-col cols="6" style="text-align: left;">
              <h5>Name: {{bedinfo.title}}{{bedinfo.patientname}} {{bedinfo.patientsurname}}</h5>
            </b-col>
            <b-col cols="6" style="text-align: left;">
              <h5>HN: {{bedinfo.hn}}</h5>
            </b-col>
            <b-col cols="6" style="text-align: left;">
              <h5>AN: {{bedinfo.an}}</h5>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="2" class="hide">
          <b-col style="text-align: right;">
            <b-button style="background: #7FDBD5; border: #7FDBD5;" @click="showdata = !showdata">
              <span v-if="showdata == false" class="text-dark">View data</span>
              <span v-else class="text-dark">Hide data</span>
            </b-button>
          </b-col>
        </b-col>
      </b-row>

      <b-tabs
        content-class="mt-3"
        align="center"
        justified
        active-nav-item-class="font-weight-bold text-info"
        v-model="tabIndex"
        class="hide"
      >
        <b-tab title="Temperature" active title-link-class="text-secondary">
          <div v-if="tabIndex == 0">
            <chart label="Temperate" :x="temp" :y="tempdate"></chart>
          </div>
        </b-tab>
        <b-tab title="Pulse" title-link-class="text-secondary">
          <div v-if="tabIndex == 1">
            <chart label="Pulse" :x="pulse" :y="pulsedate"></chart>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <div style="margin: 10px" v-if="showdata == true">
      <b-row align-h="end" style="margin: 10px" class="hide">
        <b-button style="background: #7FDBD5; border: #7FDBD5;" @click="print()">
          <span class="text-dark">Print</span>
        </b-button>
      </b-row>
      <div>
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
      bedinfo: null,
      vitalsigns: [],
      time: null,
      showdata: false,
      temp: [],
      tempdate: [],
      pulse: [],
      pulsedate: [],
      tabIndex: 0
    };
  },
  mounted() {
    var instance = this;
    console.log(instance.$route.params.an);

    axios
      .get(
        "https://nipaapi.herokuapp.com/api/vitalsign/" + instance.$route.params.an
      )
      .then(function(response) {
        console.log("vital sign data: ", response.data.data);
        instance.bedinfo = response.data.data[0];
        instance.vitalsigns = response.data.data;
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].temp != null) {
            instance.temp.push(response.data.data[i].temp);
            instance.tempdate.push(
              moment(response.data.data[i].date).format("lll")
            );
          }
        }
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].pulse != null) {
            instance.pulse.push(response.data.data[i].pulse);
            instance.pulsedate.push(
              moment(response.data.data[i].date).format("lll")
            );
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
    },
    print() {
      window.print();
    }
  },
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>

<style scoped>
.text-blue {
  color: rgba(75, 192, 192);
}

@media print {
  .hide {
    display: none;
  }
}
</style>