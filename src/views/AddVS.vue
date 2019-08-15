<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link to="/bedinfo">&lt; Back</router-link>
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">Add Vital Sign</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-success" right>
          <span v-b-modal.saveNewVS>Save</span>
          <b-modal
            id="saveNewVS"
            title="Confirmation"
            okVariant="success"
            headerClass="p-2 border-bottom-0"
            footerClass="p-2 border-top-0"
            centered ok-only
            @ok="saveNewVS"
          >
          <p class="my-4">Data was submitted successfully!</p>
          </b-modal>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <b-container>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Vital Sign" active>
          <b-card bg-variant="light" text-variant="dark">
            <b-col>
              <b-row>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Bed 1</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Name: นายสมชาย ใจดี</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Latest Vital: 10:12</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Recorder: Tip</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Painscore: 2</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Fall Risk: 2</h5>
                </b-col>
              </b-row>
            </b-col>
          </b-card>
          <br />
          <b-row>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="T" latestVS="36.6" :sendVSData.sync="temp"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="P" latestVS="92" :sendVSData.sync="pulse"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="R" latestVS="20" :sendVSData.sync="resp"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>BP</h5>
                </b-col>
                <b-row>
                  <MedInput cols="6" subtitle="SBP" latestVS="131" :sendVSData.sync="sbp"></MedInput>
                  <MedInput cols="6" subtitle="DBP" latestVS="77" :sendVSData.sync="dbp"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>Coma Score</h5>
                </b-col>
                <b-row>
                  <MedInput cols="4" subtitle="E" latestVS="4" :sendVSData.sync="eye"></MedInput>
                  <MedInput cols="4" subtitle="V" latestVS="5" :sendVSData.sync="verbal"></MedInput>
                  <MedInput cols="4" subtitle="M" latestVS="6" :sendVSData.sync="motor"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput
                    subtitle="O2 Sat"
                    latestVS="95"
                    textColor="text-danger"
                    :sendVSData.sync="o2sat"
                  ></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Urine" latestVS="57" :sendVSData.sync="urine"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="PainScore" latestVS="2" :sendVSData.sync="painscore"></MedInput>
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
            <b-badge v-if="fallrisk > 0" 
              pill 
              variant="success">
              {{fallrisk}}
            </b-badge>
          </template>
          <b-card bg-variant="light" text-variant="dark">
            <b-col>
              <b-row>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Bed 1</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Name: นายสมชาย ใจดี</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Latest Vital: 10:12</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Recorder: Tip</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Painscore: 2</h5>
                </b-col>
                <b-col md="6" xs="12" style="text-align: left;">
                  <h5>Fall Risk: 2</h5>
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
              <h5 align="left">Ambulatory aid {{checked4}}</h5>
            </b-col>
            <Radio
              md="4"
              xs="12"
              title="Bed Rest / Nurse assist"
              v-model="checked4"
              @score="calchecked4"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Crutches / Cane"
              v-model="checked4"
              @score="calchecked4"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Fracture"
              v-model="checked4"
              @score="calchecked4"
            ></Radio>
            <b-col cols="12">
              <h5 align="left">Gate / Transfering</h5>
            </b-col>
            <Radio
              md="4"
              xs="12"
              title="Normal"
              v-model="checked5"
              @score="calchecked5"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Weak"
              v-model="checked5"
              @score="calchecked5"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Impaired"
              v-model="checked5"
              @score="calchecked5"
            ></Radio>
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
export default {
  components: {
    MedInput,
    Radio
  },
  data() {
    return {
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
      this.checked4count = this.checked4count + 1
        if(this.checked4 != this.checked4currentvalue){
          if(this.checked4count > 1){
            if(this.checked4 == 'Bed Rest / Nurse assist'){
              this.fallrisk = this.fallrisk - 1;
            }
            else if((this.checked4 == 'Crutches / Cane' && this.checked4currentvalue == 'Fracture') || (this.checked4 == 'Fracture' && this.checked4currentvalue == 'Crutches / Cane')){
              console.log('Do nothing');
            }
            else if(this.checked4 == 'Crutches / Cane' || this.checked4 == 'Fracture'){
              this.fallrisk = this.fallrisk + value;
            }
          }
          else {
          this.fallrisk = this.fallrisk + value;
        }
      } 
      this.checked4currentvalue = this.checked4;
    },
    
    //Gate / transfering
    calchecked5(value) {
      this.checked5count = this.checked5count + 1
        if(this.checked5 != this.checked5currentvalue){
          if(this.checked5count > 1){
            if(this.checked5 == 'Normal'){
              this.fallrisk = this.fallrisk - 1;
            }
            else if((this.checked5 == 'Weak' && this.checked5currentvalue == 'Impaired') || (this.checked5 == 'Impaired' && this.checked5currentvalue == 'Weak')){
              console.log('Do nothing');
            }
            else if(this.checked5 == 'Weak' || this.checked5 == 'Impaired'){
              this.fallrisk = this.fallrisk + value;
            }
          }
          else {
          this.fallrisk = this.fallrisk + value;
        }
      } 
      this.checked5currentvalue = this.checked5;
    },
    
    //Mental State
    calchecked6(value) {
      this.checked6count = this.checked6count + 1
        if(this.checked6 != this.checked6currentvalue){
          if(this.checked6count > 1){
            if(this.checked6 == 'Oriented own ability'){
              this.fallrisk = this.fallrisk - 1;
            }
            else {
              this.fallrisk = this.fallrisk + value;
            }
          }
          else {
          this.fallrisk = this.fallrisk + value;
        }
      } 
      this.checked6currentvalue = this.checked6;
    },
    saveNewVS() {
      // axios.post('/addVS', {
      //   temp: this.temp,
      //   pulse: this.pulse,
      //   resp: this.resp,
      //   sbp: this.sbp,
      //   dbp: this.dbp,
      //   eye: this.eye,
      //   verbal: this.verbal,
      //   motor: this.motor,
      //   o2sat: this.o2sat,
      //   urine: this.urine,
      //   painscore: this.painscore,
      //   fallrisk: this.fallrisk,
      //   remark: this.remark,
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      console.log(this.temp);
      console.log(this.pulse);
      console.log(this.resp);
      console.log(this.sbp);
      console.log(this.dbp);
      console.log(this.eye);
      console.log(this.verbal);
      console.log(this.motor);
      console.log(this.o2sat);
      console.log(this.urine);
      console.log(this.painscore);
      console.log(this.fallrisk);
      console.log(this.remark);
      this.$router.push('/home')
    }
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