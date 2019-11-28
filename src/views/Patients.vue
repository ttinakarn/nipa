<template>
  <div>
    <navbar />
    <div class="container">
      <h1>Patients</h1>

      <!-- <div v-if="patients == null">
      <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>-->
      <!-- <table class="table table-bordered table-hover" v-if="patients != null"> -->
      <table class="table table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">AN</th>
            <th scope="col">Name</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.an">
            <td>{{patient.an}}</td>
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
export default {
  components: {
    navbar
  },
  data() {
    return {
      patients: null
    };
  }
};
</script>