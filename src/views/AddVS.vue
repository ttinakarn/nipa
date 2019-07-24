<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link to="/bedinfo">&lt; Back</router-link>
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">Add Vital Sign</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-danger" right>
          <router-link to="/table" class="text-success">Table</router-link>
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
                  <MedInput subtitle="T" latestVS="36.6"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="P" latestVS="92"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="R" latestVS="20"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>BP</h5>
                </b-col>
                <b-row>
                  <MedInput cols="6" subtitle="SBP" latestVS="131"></MedInput>
                  <MedInput cols="6" subtitle="DBP" latestVS="77"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="6" xs="12">
              <b-button block class="button-color">
                <b-col cols="12" align="center">
                  <h5>Coma Score</h5>
                </b-col>
                <b-row>
                  <MedInput cols="4" subtitle="E" latestVS="4"></MedInput>
                  <MedInput cols="4" subtitle="V" latestVS="5"></MedInput>
                  <MedInput cols="4" subtitle="M" latestVS="6"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="O2 Sat" latestVS="95" textColor="text-danger"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Urine" latestVS="57"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col md="4" cols="6">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="PainScore" latestVS="2"></MedInput>
                </b-row>
              </b-button>
            </b-col>
            <b-col cols="12">
              <b-button block class="button-color">
                <b-row>
                  <MedInput subtitle="Remark"></MedInput>
                </b-row>
              </b-button>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Fall Risk">
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
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Crutches / Cane"
              v-model="checked4"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Fracture"
              v-model="checked4"
            ></Radio>
            <b-col cols="12">
              <h5 align="left">Gate / Transfering</h5>
            </b-col>
           <Radio
              md="4"
              xs="12"
              title="Normal"
              v-model="checked5"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Weak"
              v-model="checked5"
            ></Radio>
            <Radio
              md="4"
              xs="12"
              title="Impaired"
              v-model="checked5"
            ></Radio>
            <b-col cols="12">
              <h5 align="left">Mental State</h5>
            </b-col>
            <Radio
              md="6"
              xs="12"
              title="Oriented own ability"
              v-model="checked6"
            ></Radio>
            <Radio
              md="6"
              xs="12"
              title="Forget limitations"
              v-model="checked6"
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
      checked5: "",
      checked6: ""
    };
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