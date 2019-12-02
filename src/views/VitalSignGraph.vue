<template>
  <div>
    <navbar />

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
            <b-col cols="6" style="text-align: left;">
              <h5>Admited date: {{moment(bedinfo.admitdate).format('ll')}}</h5>
            </b-col>
            <b-col cols="6" style="text-align: left;">
              <h5>Discharge date: {{moment(bedinfo.dischargedate).format('ll')}}</h5>
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
        <b-tab title="Last 8 hrs of temperate" title-link-class="text-secondary">
          <div v-if="tabIndex == 2">
            <chart label="Last 8hrs temp" :x="lastesttemp" :y="lastesttempdate"></chart>
          </div>
        </b-tab>
        <b-tab title="Last 8 hrs of pulse" title-link-class="text-secondary">
          <div v-if="tabIndex == 3">
            <chart label="last8hrspulse" :x="lastestpulse" :y="lastestpulsedate"></chart>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <div style="margin: 10px" v-if="showdata == true">
      <b-row align-h="end" style="margin: 10px" class="hide">
        <b-button style="background: #7FDBD5; border: #7FDBD5; margin: 5px" @click="onExport()">
          <span class="text-dark">Export as excel</span>
        </b-button>
        <b-button style="background: #7FDBD5; border: #7FDBD5; margin: 5px" @click="print()">
          <span class="text-dark">Print</span>
        </b-button>
      </b-row>
      <div>
        <VSTable
          firstcol="Date&Time"
          :summaryvs="vitalsigns"
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
import navbar from "@/components/NavbarHome.vue";
import XLSX from 'xlsx';

export default {
  components: {
    chart,
    VSTable,
    navbar
  },
  data() {
    return {
      bedinfo: null,
      vitalsigns: [],
      showdata: false,
      temp: [],
      tempdate: [],
      pulse: [],
      pulsedate: [],
      lastesttemp: [],
      lastesttempdate: [],
      lastestpulse: [],
      lastestpulsedate: [],
      tabIndex: 0
    };
  },
  mounted() {
    var instance = this;
    console.log(instance.$route.params.an);

    axios
      .get(
        "https://nipaapi.herokuapp.com/api/vitalsign/" +
          instance.$route.params.an
      )
      .then(function(response) {
        console.log("vital sign data: ", response.data.data);
        instance.bedinfo = response.data.data[0];
        instance.vitalsigns = response.data.data;
        for (var i = 0; i < response.data.data.length; i++) {
          instance.vitalsigns[i].admitdate = moment(instance.vitalsigns[i].admitdate).format('ll')
          instance.vitalsigns[i].dischargedate = moment(instance.vitalsigns[i].dischargedate).format('ll')
          instance.vitalsigns[i].date = moment(instance.vitalsigns[i].date).format('lll')
          if (response.data.data[i].temp != null) {
            instance.temp.push(response.data.data[i].temp);
            instance.tempdate.push(
              moment(response.data.data[i].date).format("lll")
            );
          }
        }
        instance.lastesttemp = instance.temp.slice(instance.temp.length-8, instance.temp.length)
        instance.lastesttempdate = instance.tempdate.slice(instance.tempdate.length-8, instance.tempdate.length)
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i].pulse != null) {
            instance.pulse.push(response.data.data[i].pulse);
            instance.pulsedate.push(
              moment(response.data.data[i].date).format("lll")
            );
          }
        }
        instance.lastestpulse = instance.pulse.slice(instance.pulse.length-8, instance.pulse.length)
        instance.lastestpulsedate = instance.pulsedate.slice(instance.pulsedate.length-8, instance.pulsedate.length)
      });
  },
  methods: {
    print() {
      window.print();
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.vitalsigns)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb, 'AN_'+this.$route.params.an + '.xlsx')
    }
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