<template>
  <div>
    <navbar />
    <div class="container">
      <h1>Discharged Patients</h1>
      <b-card bg-variant="light" text-variant="dark" v-if="patients != null">
        <b-col sm="10">
          <b-row>
            <b-col cols="6" style="text-align: left;">
              <h5>Name: {{patients[0].title}}{{patients[0].name}} {{patients[0].surname}}</h5>
            </b-col>
            <b-col cols="6" style="text-align: left;">
              <h5>HN: {{$route.params.hn}}</h5>
            </b-col>
          </b-row>
        </b-col>
      </b-card>
      <br />

      <div v-if="patients == null">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
      <table class="table table-bordered table-hover" v-if="patients != null">
        <thead class="thead-light">
          <tr>
            <th scope="col">AN</th>
            <th scope="col">Admited Date</th>
            <th scope="col">Discharged Date</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.hn">
            <td>{{patient.an}}</td>
            <td>{{moment(patient.admitdate).format("ll")}}</td>
            <td>{{moment(patient.dischargedate).format("ll")}}</td>
            <td>
              <b-button size="sm" style="background: #7FDBD5; border: #7FDBD5;">
                <router-link
                  :to="{ name: 'graph', params: {an: patient.an}}"
                  style="color: #2c3e50;"
                >View</router-link>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/NavbarHome.vue";
import axios from "axios";

export default {
  components: {
    navbar
  },
  data() {
    return {
      patients: null
    };
  },
  mounted() {
    var instance = this;
    axios
      .get("https://nipaapi.herokuapp.com/api/admithistory/" + instance.$route.params.hn)
      .then(function(response) {
        instance.patients = response.data.data;
        console.log("patients", instance.patients);
      });
  }
};
</script>