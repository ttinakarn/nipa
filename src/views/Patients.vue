<template>
  <div>
    <navbar />
    <div class="container">
      <h1>Discharged Patients</h1>

      <div v-if="patients == null">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
      <table class="table table-bordered table-hover" v-if="patients != null">
        <thead class="thead-light">
          <tr>
            <th scope="col">HN</th>
            <th scope="col">Name</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.hn">
            <td>{{patient.hn}}</td>
            <td>{{patient.title}}{{patient.name}} {{patient.surname}}</td>
            <td>
              <b-button size="sm" style="background: #7FDBD5; border: #7FDBD5;">
                <router-link
                  :to="{ name: 'admit', params: {hn: patient.hn}}"
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
      .get("https://nipaapi.herokuapp.com/api/dischargepatient")
      .then(function(response) {
        instance.patients = response.data.data;
        console.log("patients", instance.patients);
      });
  }
};
</script>