<template>
  <div>
    <navbar />

    <br />
    <div class="container">
      <div v-if="score == null">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>
      <table class="table table-bordered table-hover" v-if="score != null">
        <thead class="thead-light">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Factor</th>
            <th scope="col">Minimum</th>
            <th scope="col">Maximun</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in score" :key="data.id">
            <th scope="row">{{ data.id }}</th>
            <td>{{data.name}}</td>
            <td>{{data.factor}}</td>
            <td>{{data.min}}</td>
            <td>{{data.max}}</td>
            <td>{{data.score}}</td>
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
      score: null
    };
  },
  mounted() {
    var instance = this;
    axios
      .get("https://nipaapi.herokuapp.com/api/score")
      .then(function(response) {
        console.log(response.data.data);
        instance.score = response.data.data;
      });
  }
};
</script>

<style scoped>
</style>