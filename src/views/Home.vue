<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand class="topnav-centered">Ward 1</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-danger" right>
          <router-link to="/" class="text-danger">Logout</router-link>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <div class="display-4">Welcome Tip</div>
    <br />
    <b-row>
      <b-col lg="3" sm="4" xs="12" v-for="bed in beds" :key="bed.bednumber">
        <div v-if="bed.status == 'normal'">
          <router-link to="/bedinfo">
            <b-button variant="success" class="button-size">
              <div>
                <h1>BED {{bed.bednumber}}</h1>
                <h5>Lastest Vital: {{bed.max}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
        <div v-else-if="bed.status == 'warning'">
          <router-link to="/bedinfo">
            <b-button variant="warning" class="button-size">
              <div>
                <h1>BED {{bed.bednumber}}</h1>
                <h5>Lastest Vital: {{bed.max}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
        <div v-else-if="bed.status == 'danger'">
          <router-link to="/bedinfo">
            <b-button variant="danger" class="button-size">
              <div>
                <h1>BED {{bed.bednumber}}</h1>
                <h5>Lastest Vital: {{bed.max}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
        <div v-else>
          <router-link :to="{ name: 'bedinfo', params: {bednumber: bed.bednumber, an: bed.an}}">
            <b-button variant="secondary" class="button-size">
              <div>
                <h1>BED {{bed.bednumber}}</h1>
                <h5>Lastest Vital: {{bed.max}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      beds: []
    };
  },
  mounted() {
    var instance = this;
    axios
      .get("https://nipa.herokuapp.com/api/bednumber")
      .then(function(response) {
        console.log(response);
        instance.beds = response.data.data;
        // console.log(instance.beds);
      });
  }
};
</script>

<style scoped>
.button-size {
  width: 225px;
  height: 134px;
  margin: 5px;
}
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>