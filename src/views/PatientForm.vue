<template>
  <div>
    <navbar />

    <h1>Patient Information</h1>
    <div class="container" style="text-align: left;" v-if="patientinfo != null">
      <b-row class="m-3">
        <b-col cols="1">
          <label for="text">Bed</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="number" :value="patientinfo[0].bednumber"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">HN</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="number" :value="patientinfo[0].hn"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">AN</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="number" :value="patientinfo[0].an"></b-form-input>
        </b-col>
      </b-row>
      <hr />
      <b-row class="m-3">
        <b-col cols="1">
          <label for="text">Title</label>
        </b-col>
        <b-col cols="2">
          <b-form-input type="text" :value="patientinfo[0].title"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">Name</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="text" :value="patientinfo[0].name"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">Surname</label>
        </b-col>
        <b-col cols="4">
          <b-form-input type="text" :value="patientinfo[0].surname"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="m-3">
        <b-col cols="1">
          <label for="text">Birthday</label>
        </b-col>
        <b-col cols="11">
          <b-form-input type="date" :value="patientinfo[0].dob"></b-form-input>
        </b-col>
      </b-row>
      <hr />
      <b-row class="m-3">
        <b-col cols="2">
          <label for="text">Admit Date</label>
        </b-col>
        <b-col cols="4">
          <b-form-input type="date" :value="moment(patientinfo[0].admitdate).format('YYYY-MM-DD')"></b-form-input>
        </b-col>
        <b-col cols="2">
          <label for="text">Discharge Date</label>
        </b-col>
        <b-col cols="4">
          <b-form-input type="date" :value="patientinfo[0].dischargedate"></b-form-input>
        </b-col>
      </b-row>
      <div class="text-center">
        <b-button style="background: #7FDBD5; border: #7FDBD5; margin: 5px;" class="text-dark">Save</b-button>
        <router-link to="/patients">
          <b-button style="background: #6c757d; border: #6c757d; margin: 5px;">Cancel</b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/NavbarHome.vue";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    navbar
  },
  data() {
    return {
      patientinfo: null
    };
  },
  mounted() {
    var instance = this;
    axios
      .get(
        "https://nipaapi.herokuapp.com/api/patientInformation/" +
          instance.$route.params.an
      )
      .then(function(response) {
        console.log(response.data.data);
        instance.patientinfo = response.data.data;
      });
  }
};
</script>