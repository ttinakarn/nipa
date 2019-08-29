<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link to="/home">&lt; Back</router-link>
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">Patient's Information</b-navbar-brand>
    </b-navbar>
    <br/>
    <b-container v-if="bedinfo != null && $route.params.an != null">
      <b-jumbotron :header="bednumber">
        <b-col>
          <b-row>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5 >HN: {{bedinfo.hn}}</h5>
            </b-col>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>AN: {{bedinfo.an}}</h5>
            </b-col>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>Name: {{bedinfo.title}}{{bedinfo.name}} {{bedinfo.surname}}</h5> 
            </b-col>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>Age: 48 yrs</h5> 
            </b-col>
            <b-col lg="12" style="text-align: left;">
              <h5>Admit Date: {{bedinfo.admitdate}}</h5> 
            </b-col>
            <b-col lg="12" style="text-align: left;">
              <h5 v-if="bedinfo.max != null">Remark: {{bedinfo.max}}</h5> 
            </b-col>
          </b-row>
        </b-col>
      </b-jumbotron>
      <b-button size="lg" style="background: #7FDBD5; border: #7FDBD5;">
        <router-link :to="{ name: 'addvs', params: {bednumber: $route.params.bednumber, an: bedinfo.an}}" style="color: #2c3e50;">Next</router-link>
      </b-button>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bedinfo: null,
      bednumber: "BED " + this.$route.params.bednumber
    };
  },
  mounted() {
    var instance = this;    
    axios
      .get("https://nipa.herokuapp.com/api/getBedInfo/" + instance.$route.params.an)
      .then(function(response) {
        console.log(response.data.data);
        instance.bedinfo = response.data.data[0];
        // console.log(instance.bedinfo.an);
      });
  }
}
</script>

<style scoped>
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>