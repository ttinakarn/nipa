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
      <!-- <b-form-group>
        <b-form-checkbox-group id="checkbox-group" name="flavour-2">
          <b-form-checkbox value="temp" v-model="selectedData">Temperate</b-form-checkbox>
          <b-form-checkbox value="pulse" v-model="selectedData">Pulse</b-form-checkbox>
          <b-form-checkbox value="resp" v-model="selectedData">Respiration</b-form-checkbox>
          <b-form-checkbox value="sbp" v-model="selectedData">SBP</b-form-checkbox>
          <b-form-checkbox value="dbp" v-model="selectedData">DBP</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
      <chart></chart>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import chart from "@/components/Chart.vue";
export default {
  components: {
    chart
  },
  data() {
    return {
      time: null,
      selectedData: ['temp', 'pulse', 'resp', 'sbp', 'dbp']
    };
  },
  methods: {
    updateCurrentTime() {
      moment.locale("th");
      this.time = moment().format("LTS");
    }
  },
  // computed: {
  //   displayedDatasets() {
  //     return this.selectedData.map(year => datasets[year]);
  //   }
  // },
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>