<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand class="topnav-centered">Ward 1</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-danger" right>
          <span @click="logout">Logout</span>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <div class="display-4">Welcome {{currentuser[0].name}}</div>
    <br />
    <div v-if="beds == null">
      <b-spinner variant="info" label="Loading..."></b-spinner>
    </div>
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
            <b-button class="button-size button-color">
              <div>
                <h3>BED {{bed.bednumber}}</h3>
                <h5 v-if="bed.max != null">Lastest Vital:</h5>
                <h3 v-if="bed.max != null">{{moment(bed.max).format('LT')}}</h3>
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
import moment from "moment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      beds: null
    };
  },
  computed: mapState(["currentuser"]),
  mounted() {
    // moment.locale("th");
    this.$store.commit("setsosscore", 0);
    var instance = this;
    axios
      .get("https://nipaapi.herokuapp.com/api/bednumber")
      .then(function(response) {
        instance.beds = response.data.data;
        console.log("Beds", instance.beds);
      });
  },
  methods: {
    logout(){
      console.log("log out");
      this.$store.commit("setcurrentuser", null);
      this.$router.push("/");
    }
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
.button-color {
  margin: 5px;
  background-color: #7fdbd5;
  color: #2c3e50;
  border-color: #7fdbd5;
}
</style>