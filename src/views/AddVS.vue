<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link to="/home">&lt; Back</router-link>
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">Add New Vital Sign</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-success" right>
          <span @click="saveNewVS">Save</span>

          <b-modal
            id="saveNewVS"
            title="Confirmation"
            okVariant="success"
            headerClass="p-2 border-bottom-0"
            footerClass="p-2 border-top-0"
            centered
          >
            <p class="my-4">Data was submitted successfully!</p>
          </b-modal>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <div v-if="bedinfo == null">
      <b-spinner variant="info" label="Loading..."></b-spinner>
    </div>
    <b-container>
      <br />
      <b-tabs content-class="mt-3" fill v-if="bedinfo != null && $route.params.an != null">
        <b-tab>
          <template slot="title" >
          
             Vital Sign
              <b-badge v-if="sosscore <= 3 && sosscore != 0" pill class="text-dark button-color" style="font-size: 16px">SOS: {{sosscore}}</b-badge>
              <b-badge v-else-if="sosscore > 3" pill variant="danger" style="font-size: 16px">SOS: {{sosscore}}</b-badge>
          </template>
          <b-card bg-variant="light" text-variant="dark">
            <b-col>
              <b-row>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Bed {{bedinfo.bednumber}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Name: {{bedinfo.title}}{{bedinfo.name}} {{bedinfo.surname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;" v-if="lastestvs.length != 0">
                  <h5>Latest Vital: {{moment(lastestvs.max).format('LT')}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Recorder: {{lastestvs.emptitle}}{{lastestvs.empname}} {{lastestvs.empsurname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Fall Risk: {{lastestvs.fallrisk}}</h5>
                </b-col>
              </b-row>
            </b-col>
          </b-card>

          <br />

          <b-row>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="T"
                    description="temp"
                    :latestVS="lastestvs.temp"
                    :sendVSData.sync="temp"
                    :text-color="{'text-danger' : lastestvs.temp < condition[0].mintemp || lastestvs.temp > condition[0].maxtemp}"
                    min="35"
                    max="42"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="P"
                    description="pulse"
                    :latestVS="lastestvs.pulse"
                    :sendVSData.sync="pulse"
                    :text-color="{'text-danger' : lastestvs.pulse < condition[0].minpulse || lastestvs.pulse > condition[0].maxpulse}"
                    min="40"
                    max="150"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="R"
                    description="resp"
                    :latestVS="lastestvs.resp"
                    :sendVSData.sync="resp"
                    :text-color="{'text-danger' : lastestvs.resp < condition[0].minresp || lastestvs.resp > condition[0].maxresp}"
                    min="8"
                    max="35"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>BP</h5>
                </b-col>

                <b-row>
                  <MedInput
                    cols="6"
                    subtitle="SBP"
                    description="sbp"
                    :latestVS="lastestvs.sbp"
                    :sendVSData.sync="sbp"
                    :text-color="{'text-danger' : lastestvs.sbp < condition[0].minsbp || lastestvs.sbp > condition[0].maxsbp}"
                    min="80"
                    max="200"
                  ></MedInput>

                  <MedInput
                    cols="6"
                    subtitle="DBP"
                    description="dbp"
                    :latestVS="lastestvs.dbp"
                    :sendVSData.sync="dbp"
                    :text-color="{'text-danger' : lastestvs.dbp < condition[0].mindbp || lastestvs.dbp > condition[0].maxdbp}"
                    min="50"
                    max="230"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>Coma Score</h5>
                </b-col>

                <b-row>
                  <MedInput
                    cols="4"
                    subtitle="E"
                    description="eye"
                    :latestVS="lastestvs.eye"
                    :sendVSData.sync="eye"
                    :text-color="{'text-danger' : lastestvs.eye < condition[0].maxeye}"
                    min="0"
                    max="4"
                  ></MedInput>

                  <MedInput
                    cols="4"
                    subtitle="V"
                    description="verbal"
                    :latestVS="lastestvs.verbal"
                    :sendVSData.sync="verbal"
                    :text-color="{'text-danger' : lastestvs.verbal < condition[0].maxverbal}"
                    min="0"
                    max="5"
                  ></MedInput>

                  <MedInput
                    cols="4"
                    subtitle="M"
                    description="motor"
                    :latestVS="lastestvs.motor"
                    :sendVSData.sync="motor"
                    :text-color="{'text-danger' : lastestvs.motor < condition[0].maxmotor}"
                    min="0"
                    max="6"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="O2 Sat"
                    description="o2sat"
                    :latestVS="lastestvs.o2sat"
                    :text-color="{'text-danger' : lastestvs.o2sat < condition[0].mino2sat}"
                    :sendVSData.sync="o2sat"
                    min="80"
                    max="100"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="Urine"
                    description="urine"
                    :latestVS="lastestvs.urine"
                    :sendVSData.sync="urine"
                    :text-color="{'text-danger' : lastestvs.urine < condition[0].minurine}"
                    min="0"
                    max="1000"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="PainScore"
                    description="painscore"
                    :latestVS="lastestvs.painscore"
                    :sendVSData.sync="painscore"
                    :text-color="{'text-danger' : lastestvs.painscore > condition[0].maxpainscore}"
                    min="0"
                    max="10"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>

            <b-col cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Remark" description="remark" :sendVSData.sync="remark"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Action" description="remark" :sendVSData.sync="action"></MedInput>
                </b-row>
              </b-button>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab>
          <template slot="title">
            Fall Risk
            <b-badge v-if="fallrisk > 0 && fallrisk <= 3" pill variant="success">{{fallrisk}}</b-badge>
            <b-badge v-if="fallrisk == 4 || fallrisk == 5" pill variant="warning">{{fallrisk}}</b-badge>
            <b-badge v-if="fallrisk > 5" pill variant="danger">{{fallrisk}}</b-badge>
          </template>

          <b-card
            bg-variant="light"
            text-variant="dark"
            v-if="bedinfo != null && $route.params.an != null"
          >
            <b-col>
              <b-row>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Bed {{bedinfo.bednumber}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Name: {{bedinfo.title}}{{bedinfo.name}} {{bedinfo.surname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Latest Vital: {{moment(lastestvs.max).format('LT')}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Recorder: {{lastestvs.emptitle}}{{lastestvs.empname}} {{lastestvs.empsurname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Fall Risk: {{lastestvs.fallrisk}}</h5>
                </b-col>
              </b-row>
            </b-col>
          </b-card>

          <br />

          <b-row>
            <b-col md="4" xs="12">
              <b-button
                :pressed.sync="checked1"
                style="background-color: #7fdbd5;"
                block
                :class="{'bg-dark' : this.checked1 != false}"
                v-on:click="calchecked1"
              >
                <img alt="Vue logo" src="../assets/accident.png" class="responsive" />
                <br />History of falling immeditely
              </b-button>
            </b-col>

            <b-col md="4" xs="12">
              <b-button
                :pressed.sync="checked2"
                style="background-color: #7fdbd5;"
                block
                :class="{'bg-dark' : this.checked2 != false}"
                v-on:click="calchecked2"
              >
                <img alt="Vue logo" src="../assets/prescription.png" class="responsive" />
                <br />Secondary diagnosis
              </b-button>
            </b-col>

            <b-col md="4" xs="12">
              <b-button
                :pressed.sync="checked3"
                style="background-color: #7fdbd5;"
                block
                :class="{'bg-dark' : this.checked3 != false}"
                v-on:click="calchecked3"
              >
                <img alt="Vue logo" src="../assets/serum.png" class="responsive" />
                <br />IV / Heparin lock
              </b-button>
            </b-col>

            <b-col cols="12">
              <h5 align="left">Ambulatory aid</h5>
            </b-col>

            <Radio
              md="4"
              xs="12"
              title="Bed Rest / Nurse assist"
              v-model="checked4"
              @score="calchecked4"
            ></Radio>

            <Radio md="4" xs="12" title="Crutches / Cane" v-model="checked4" @score="calchecked4"></Radio>

            <Radio md="4" xs="12" title="Fracture" v-model="checked4" @score="calchecked4"></Radio>

            <b-col cols="12">
              <h5 align="left">Gate / Transfering</h5>
            </b-col>

            <Radio md="4" xs="12" title="Normal" v-model="checked5" @score="calchecked5"></Radio>

            <Radio md="4" xs="12" title="Weak" v-model="checked5" @score="calchecked5"></Radio>

            <Radio md="4" xs="12" title="Impaired" v-model="checked5" @score="calchecked5"></Radio>

            <b-col cols="12">
              <h5 align="left">Mental State</h5>
            </b-col>

            <Radio
              md="6"
              xs="12"
              title="Oriented own ability"
              v-model="checked6"
              @score="calchecked6"
            ></Radio>

            <Radio
              md="6"
              xs="12"
              title="Forget limitations"
              v-model="checked6"
              @score="calchecked6"
            ></Radio>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import MedInput from "@/components/MedInput.vue";
import Radio from "@/components/RadioButton.vue";
import axios from "axios";
import moment from "moment";
import { condition } from "../condition.js";
import Loading from "vue-loading-overlay";
import { mapState } from "vuex";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    MedInput,
    Radio,
    Loading
  },
  data() {
    return {
      isLoading: false,
      bedinfo: null,
      lastestvs: null,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: "",
      selected: "",
      checked5: "",
      checked6: "",
      checked4count: 0,
      checked4currentvalue: "",
      checked5count: 0,
      checked5currentvalue: "",
      checked6count: 0,
      checked6currentvalue: "",
      temp: null,
      pulse: null,
      resp: null,
      sbp: null,
      dbp: null,
      eye: null,
      verbal: null,
      motor: null,
      o2sat: null,
      urine: null,
      painscore: null,
      fallrisk: 0,
      remark: null,
      action: null,
      condition: [],
      bednumber: 0,
      sostemp: 0,
      sospulse: 0
    };
  },
  computed: mapState({
    sosscore: state => state.sosscore
  }),
  methods: {
    // History of falling immeditely
    calchecked1: function() {
      if (this.checked1 == true) {
        this.fallrisk = this.fallrisk + 1;
      } else {
        this.fallrisk = this.fallrisk - 1;
      }
    },

    // Secondary diagnosis
    calchecked2: function() {
      if (this.checked2 == true) {
        this.fallrisk = this.fallrisk + 1;
      } else {
        this.fallrisk = this.fallrisk - 1;
      }
    },

    // IV / Heparin lock
    calchecked3: function() {
      if (this.checked3 == true) {
        this.fallrisk = this.fallrisk + 1;
      } else {
        this.fallrisk = this.fallrisk - 1;
      }
    },

    //Ambulatory aid
    calchecked4(value) {
      this.checked4count = this.checked4count + 1;
      if (this.checked4 != this.checked4currentvalue) {
        if (this.checked4count > 1) {
          if (this.checked4 == "Bed Rest / Nurse assist") {
            this.fallrisk = this.fallrisk - 1;
          } else if (
            (this.checked4 == "Crutches / Cane" &&
              this.checked4currentvalue == "Fracture") ||
            (this.checked4 == "Fracture" &&
              this.checked4currentvalue == "Crutches / Cane")
          ) {
            console.log("Do nothing");
          } else if (
            this.checked4 == "Crutches / Cane" ||
            this.checked4 == "Fracture"
          ) {
            this.fallrisk = this.fallrisk + value;
          }
        } else {
          this.fallrisk = this.fallrisk + value;
        }
      }
      this.checked4currentvalue = this.checked4;
    },

    //Gate / transfering
    calchecked5(value) {
      this.checked5count = this.checked5count + 1;
      if (this.checked5 != this.checked5currentvalue) {
        if (this.checked5count > 1) {
          if (this.checked5 == "Normal") {
            this.fallrisk = this.fallrisk - 1;
          } else if (
            (this.checked5 == "Weak" &&
              this.checked5currentvalue == "Impaired") ||
            (this.checked5 == "Impaired" && this.checked5currentvalue == "Weak")
          ) {
            console.log("Do nothing");
          } else if (this.checked5 == "Weak" || this.checked5 == "Impaired") {
            this.fallrisk = this.fallrisk + value;
          }
        } else {
          this.fallrisk = this.fallrisk + value;
        }
      }
      this.checked5currentvalue = this.checked5;
    },

    //Mental State
    calchecked6(value) {
      this.checked6count = this.checked6count + 1;
      if (this.checked6 != this.checked6currentvalue) {
        if (this.checked6count > 1) {
          if (this.checked6 == "Oriented own ability") {
            this.fallrisk = this.fallrisk - 1;
          } else {
            this.fallrisk = this.fallrisk + value;
          }
        } else {
          this.fallrisk = this.fallrisk + value;
        }
      }
      this.checked6currentvalue = this.checked6;
    },
    saveNewVS() {
      var instance = this;
      instance.isLoading = true;
      instance.bednumber = instance.bedinfo.bednumber;
      console.log("bed", instance.bednumber);
      if (
        this.$store.getters.submitstatustemp == null &&
        this.$store.getters.submitstatuspulse == null &&
        this.$store.getters.submitstatusresp == null &&
        this.$store.getters.submitstatussbp == null &&
        this.$store.getters.submitstatusdbp == null &&
        this.$store.getters.submitstatuseye == null &&
        this.$store.getters.submitstatusverbal == null &&
        this.$store.getters.submitstatusmotor == null &&
        this.$store.getters.submitstatuso2sat == null &&
        this.$store.getters.submitstatusurine == null &&
        this.$store.getters.submitstatuspainscore == null &&
        this.$store.getters.submitstatusremark == null &&
        this.$store.getters.submitstatusaction == null &&
        this.fallrisk == 0
      ) {
        instance.isLoading = false;
        this.$bvModal.msgBoxOk("Please complete the form", {
          title: "Can't Save",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        });
      } else if (
        this.$store.getters.submitstatustemp == false ||
        this.$store.getters.submitstatuspulse == false ||
        this.$store.getters.submitstatusresp == false ||
        this.$store.getters.submitstatussbp == false ||
        this.$store.getters.submitstatusdbp == false ||
        this.$store.getters.submitstatuseye == false ||
        this.$store.getters.submitstatusverbal == false ||
        this.$store.getters.submitstatusmotor == false ||
        this.$store.getters.submitstatuso2sat == false ||
        this.$store.getters.submitstatusurine == false ||
        this.$store.getters.submitstatuspainscore == false ||
        this.$store.getters.submitstatusremark == false ||
        this.$store.getters.submitstatusaction == false
      ) {
        instance.isLoading = false;
        this.$bvModal.msgBoxOk("Invalid input", {
          title: "Can't Save",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        });
      } else {
        axios
          .post("https://nipaapi.herokuapp.com/api/vitalsign", {
            an: instance.$route.params.an,
            temp: this.temp,
            pulse: parseInt(this.pulse),
            resp: parseInt(this.resp),
            sbp: parseInt(this.sbp),
            dbp: parseInt(this.dbp),
            eye: parseInt(this.eye),
            verbal: parseInt(this.verbal),
            motor: parseInt(this.motor),
            o2sat: parseInt(this.o2sat),
            urine: parseInt(this.urine),
            painscore: parseInt(this.painscore),
            fallrisk: parseInt(this.fallrisk),
            remark: this.remark,
            action: this.action,
            empid: instance.$store.getters.currentuser[0].empid,
            date: moment().format(),
            bednumber: instance.bednumber,
            sos: parseInt(this.$store.getters.sosscore)
          })
          .then(response => {
            instance.isLoading = false;
            this.$bvModal
              .msgBoxOk("Data was submitted successfully", {
                title: "Confirmation",
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true
              })
              .then(value => {
                this.$router.push("/home");
              })
              .catch(err => {
                // An error occurred
              });
            console.log(response);
          })
          .catch(error => {
            instance.isLoading = false;
            this.$bvModal.msgBoxOk(error.message, {
              title: "Can't Save",
              size: "sm",
              buttonSize: "sm",
              okVariant: "danger",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true
            });
            console.log(error);
          });
      }
    }
  },
  mounted() {
    var instance = this;
    axios
      .get(
        "https://nipaapi.herokuapp.com/api/lastestVS/" +
          instance.$route.params.an
      )
      .then(function(response) {
        if (response.data.data.length == 0) {
          instance.lastestvs = response.data.data;
          console.log("No lastest vital sign data");
        } else {
          instance.lastestvs = response.data.data[0];
          console.log("lastestvs",instance.lastestvs);
        }
      });
    instance.condition = condition.getCondition();
    axios
      .get(
        "https://nipaapi.herokuapp.com/api/bednumber/" +
          instance.$route.params.an
      )
      .then(function(response) {
        instance.bedinfo = response.data.data[0];
        console.log("bedinfo", response.data.data);
      });
  }
};
</script>

<style scoped>
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button-color {
  margin: 5px;
  background-color: #7fdbd5;
  color: #2c3e50;
  border-color: #7fdbd5;
}

.color {
  background-color: #7fdbd5;
  border-color: #7fdbd5;
}

.responsive {
  width: 30%;
  height: auto;
  margin: 10px;
}
</style>