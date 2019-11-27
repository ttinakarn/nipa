<template>
  <b-col :cols="cols">
    <b-row>
      <b-col align="left">
        <h5>{{subtitle}}</h5>
      </b-col>
      <b-col align="right">
        <h5 :class="textColor">{{latestVS}}</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form @keyup="submitForm">
          <b-form-input
            v-if="description != 'remark'"
            type="number"
            v-model.lazy="$v.value.$model"
            @keyup="$emit('update:sendVSData', value);"
            v-on:blur="calsosscore()"
            :class="{'is-invalid' : $v.value.$error, 'is-valid' : $v.value.$invalid }"
            placeholder="N/A"
          ></b-form-input>
          <b-form-input
            v-else
            v-model="value"
            @keyup="$emit('update:sendVSData', value);"
            placeholder="N/A"
          ></b-form-input>
          <div class="invalid-feedback">
            <span
              v-if="!$v.value.between"
            >The number should be between {{$v.value.$params.between.min}} and {{$v.value.$params.between.max}}</span>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { between } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  props: [
    "subtitle",
    "latestVS",
    "textColor",
    "cols",
    "max",
    "min",
    "description"
  ],
  data() {
    return {
      value: null,
      sos: [],
      sosscore: 0
    };
  },
  validations() {
    return {
      value: {
        between: between(this.min, this.max)
      }
    };
  },
  mounted() {
    var instance = this;
    axios
      .get("https://nipaapi.herokuapp.com/api/score")
      .then(function(response) {
        instance.sos = response.data.data;
        // console.log(instance.sos);
      });
  },
  methods: {
    calsosscore() {
      console.log(this.sos[5].max);

      if (this.description == "temp") {
        if (this.value == null || this.value === "") {
          this.$store.commit("setsostemp", 0);
        } else {
          if (this.value <= this.sos[0].max) {
            this.$store.commit("setsostemp", this.sos[0].score);
          } else if (
            this.value >= this.sos[1].min &&
            this.value <= this.sos[1].max
          ) {
            this.$store.commit("setsostemp", this.sos[1].score);
          } else if (
            this.value >= this.sos[2].min &&
            this.value <= this.sos[2].max
          ) {
            this.$store.commit("setsostemp", this.sos[2].score);
          } else if (
            this.value >= this.sos[3].min &&
            this.value <= this.sos[3].max
          ) {
            this.$store.commit("setsostemp", this.sos[3].score);
          } else if (this.value >= this.sos[4].min) {
            this.$store.commit("setsostemp", this.sos[4].score);
          }
        }
        console.log(this.description, this.value);
      } else if (this.description == "pulse") {
        if (this.value == null || this.value === "") {
          this.$store.commit("setsospulse", 0);
        } else {
          if (this.value <= parseInt(this.sos[5].max)) {
            this.$store.commit("setsospulse", this.sos[5].score);
          } else if (
            this.value >= parseInt(this.sos[6].min) &&
            this.value <= parseInt(this.sos[6].max)
          ) {
            this.$store.commit("setsospulse", this.sos[6].score);
          } else if (
            this.value >= parseInt(this.sos[7].min) &&
            this.value <= parseInt(this.sos[7].max)
          ) {
            this.$store.commit("setsospulse", this.sos[7].score);
          } else if (
            this.value >= parseInt(this.sos[8].min) &&
            this.value <= parseInt(this.sos[8].max)
          ) {
            this.$store.commit("setsospulse", this.sos[8].score);
          } else if (
            this.value >= parseInt(this.sos[9].min) &&
            this.value <= parseInt(this.sos[9].max)
          ) {
            this.$store.commit("setsospulse", this.sos[9].score);
          } else if (this.value >= parseInt(this.sos[10].min)) {
            this.$store.commit("setsospulse", this.sos[10].score);
          }
        }
        console.log(this.description, this.value);
      } else if (this.description == "resp") {
        if (this.value == null || this.value === "") {
          this.$store.commit("setsosresp", 0);
        } else {
          if (this.value <= parseInt(this.sos[17].max)) {
            this.$store.commit("setsosresp", this.sos[17].score);
          } else if (
            this.value >= parseInt(this.sos[18].min) &&
            this.value <= parseInt(this.sos[18].max)
          ) {
            this.$store.commit("setsosresp", this.sos[18].score);
          } else if (
            this.value >= parseInt(this.sos[19].min) &&
            this.value <= parseInt(this.sos[19].max)
          ) {
            this.$store.commit("setsosresp", this.sos[19].score);
          } else if (
            this.value >= parseInt(this.sos[20].min) &&
            this.value <= parseInt(this.sos[20].max)
          ) {
            this.$store.commit("setsosresp", this.sos[20].score);
          } else if (this.value >= parseInt(this.sos[21].min)) {
            this.$store.commit("setsosresp", this.sos[21].score);
          }
        }
        console.log(this.description, this.value);
      } else if (this.description == "sbp") {
        if (this.value == null || this.value === "") {
          this.$store.commit("setsossbp", 0);
        } else {
          if (this.value <= parseInt(this.sos[11].max)) {
            this.$store.commit("setsossbp", this.sos[11].score);
          } else if (
            this.value >= parseInt(this.sos[12].min) &&
            this.value <= parseInt(this.sos[12].max)
          ) {
            this.$store.commit("setsossbp", this.sos[12].score);
          } else if (
            this.value >= parseInt(this.sos[13].min) &&
            this.value <= parseInt(this.sos[13].max)
          ) {
            this.$store.commit("setsossbp", this.sos[13].score);
          } else if (
            this.value >= parseInt(this.sos[14].min) &&
            this.value <= parseInt(this.sos[14].max)
          ) {
            this.$store.commit("setsossbp", this.sos[14].score);
          } else if (
            this.value >= parseInt(this.sos[15].min) &&
            this.value <= parseInt(this.sos[15].max)
          ) {
            this.$store.commit("setsossbp", this.sos[15].score);
          } else if (this.value >= parseInt(this.sos[16].min)) {
            this.$store.commit("setsossbp", this.sos[16].score);
          }
        }
        console.log(this.description, this.value);
      }

      console.log(
        this.$store.getters.sostemp,
        this.$store.getters.sospulse,
        this.$store.getters.sosresp,
        this.$store.getters.sossbp
      );

      this.sosscore =
        this.$store.getters.sostemp +
        this.$store.getters.sospulse +
        this.$store.getters.sosresp +
        this.$store.getters.sossbp;
      this.$store.commit("setsosscore", this.sosscore);
    },
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid && this.description != "remark") {
        this.$store.commit("setsubmitstatus" + this.description, false);
      } else if (this.value === null) {
        this.$store.commit("setsubmitstatus" + this.description, null);
      } else {
        this.$store.commit("setsubmitstatus" + this.description, true);
      }
    }
  }
};
</script>
