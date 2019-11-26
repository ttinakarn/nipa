<template>
  <div>
    <navbar />
    <div class="container">
      <h1>Patient List</h1>
    
      <table class="table table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">Bed Number</th>
            <th scope="col">AN</th>
            <th scope="col">HN</th>
            <th scope="col">Name</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.an">
            <th scope="row">{{ patient.bednumber }}</th>
            <td>{{patient.an}}</td>
            <td>{{patient.hn}}</td>
            <td>{{patient.title}}{{patient.name}} {{patient.surname}}</td>
            <td>
              <b-button size="sm" style="background: #7FDBD5; border: #7FDBD5;">
                <router-link
                  :to="{ name: 'patient', params: {an: patient.an}}"
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
import axios from "axios";
import navbar from "@/components/NavbarHome.vue";
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
      .get("https://nipaapi.herokuapp.com/api/patient")
      .then(function(response) {
        instance.patients = response.data.data;
        console.log(instance.patients);
      });
  }
};
</script>