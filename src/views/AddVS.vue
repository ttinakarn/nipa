<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link :to="{ name: 'bedinfo', params: {bednumber: $route.params.bednumber, an: $route.params.an}}">&lt; Back</router-link>
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
    <b-container>
      <b-tabs content-class="mt-3" fill v-if="bedinfo != null && $route.params.an != null">
        <b-tab title="Vital Sign" active>
          <b-card bg-variant="light" text-variant="dark" >
            <b-col>
              <b-row>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Bed {{bedinfo.bednumber}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Name: {{bedinfo.title}}{{bedinfo.name}} {{bedinfo.surname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Latest Vital: {{bedinfo.max}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Recorder: {{bedinfo.emptitle}}{{bedinfo.empname}} {{bedinfo.empsurname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Fall Risk: {{bedinfo.fallrisk}}</h5>
                </b-col>
              </b-row>
            </b-col>
          </b-card>
          <br />
          <b-row>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="T" :latestVS="bedinfo.temp" :sendVSData.sync="temp"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="P" :latestVS="bedinfo.pulse" :sendVSData.sync="pulse"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="R" :latestVS="bedinfo.resp" :sendVSData.sync="resp"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>BP</h5>
                </b-col>
                <b-row>
                  <MedInput cols="6" subtitle="SBP" :latestVS="bedinfo.sbp" :sendVSData.sync="sbp"></MedInput>
                  <MedInput cols="6" subtitle="DBP" :latestVS="bedinfo.dbp" :sendVSData.sync="dbp"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>Coma Score</h5>
                </b-col>
                <b-row>
                  <MedInput cols="4" subtitle="E" :latestVS="bedinfo.eye" :sendVSData.sync="eye"></MedInput>
                  <MedInput cols="4" subtitle="V" :latestVS="bedinfo.verbal" :sendVSData.sync="verbal"></MedInput>
                  <MedInput cols="4" subtitle="M" :latestVS="bedinfo.motor" :sendVSData.sync="motor"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="O2 Sat"
                    :latestVS="bedinfo.o2sat"
                    textColor="text-danger"
                    :sendVSData.sync="o2sat"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Urine" :latestVS="bedinfo.urine" :sendVSData.sync="urine"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="PainScore" :latestVS="bedinfo.painscore" :sendVSData.sync="painscore"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col cols="12">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Remark" :sendVSData.sync="remark"></MedInput>
                </b-row>
              </b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab>
          <template slot="title">
            Fall Risk
            <b-badge v-if="fallrisk > 0" pill variant="success">{{fallrisk}}</b-badge>
          </template>
          <b-card bg-variant="light" text-variant="dark" v-if="bedinfo != null && $route.params.an != null">
            <b-col>
              <b-row>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Bed {{bedinfo.bednumber}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Name: {{bedinfo.title}}{{bedinfo.name}} {{bedinfo.surname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Latest Vital: {{bedinfo.max}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Recorder: {{bedinfo.emptitle}}{{bedinfo.empname}} {{bedinfo.empsurname}}</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Fall Risk: {{bedinfo.fallrisk}}</h5>
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
                <img alt="Vue logo" src="../assets/falling-man.png" class="responsive" />
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
export default {
  components: {
    MedInput,
    Radio
  },
  data() {
    return {
      bedinfo: null,
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
      temp: "",
      pulse: "",
      resp: "",
      sbp: "",
      dbp: "",
      eye: "",
      verbal: "",
      motor: "",
      o2sat: "",
      urine: "",
      painscore: "",
      fallrisk: 0,
      remark: ""
    };
  },
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
      moment.locale("th");
      axios
        .post("https://nipa.herokuapp.com/api/vitalsign", {
          an: instance.$route.params.an,
          temp: parseInt(this.temp),
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
          empid: "213049",
          date: moment().format("YYYY-MM-DD LTS")
        })
        .then((response) => {
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
        .catch((error) => {
          this.$bvModal
            .msgBoxOk(error.message, {
              title: "Can't Save",
              size: "sm",
              buttonSize: "sm",
              okVariant: "danger",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true
            })
          console.log(error);
        });
    }
  },
  mounted() {
    var instance = this;    
    axios
      .get("https://nipa.herokuapp.com/api/getLastestVS/" + instance.$route.params.an)
      .then(function(response) {
        console.log(response.data.data);
        instance.bedinfo = response.data.data[0];
        console.log(instance.bedinfo);
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