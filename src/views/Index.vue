<template>
  <div>
    <navbar />

    <div class="display-4">Welcome {{currentuser[0].name}}</div>
    <br />
    <b-row>
      <b-col lg="6">
        <router-link to="/dashboard">
          <b-button class="button-color">
            <div>
              <img src="../assets/dashboard.png" class="responsive" />
              <h4>Dashboard</h4>
            </div>
          </b-button>
        </router-link>
      </b-col>
      <b-col lg="6">
        <router-link to="/patientslist">
          <b-button class="button-color">
            <div>
              <img src="../assets/profile.png" class="responsive" />
              <h4>Patient's information</h4>
            </div>
          </b-button>
        </router-link>
      </b-col>
      <b-col lg="6">
        <router-link to="/condition">
          <b-button class="button-color">
            <div>
              <img src="../assets/terms-and-conditions.png" class="responsive" />
              <h4>Condition and rule</h4>
            </div>
          </b-button>
        </router-link>
      </b-col>
      <b-col lg="6">
        <router-link to="/tv">
          <b-button class="button-color">
            <div>
              <img src="../assets/tv.png" class="responsive" />
              <h4>Dashboard for TV</h4>
            </div>
          </b-button>
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import navbar from "@/components/NavbarHome.vue";
import { mapState } from "vuex";
export default {
  components: {
    navbar
  },
  computed: mapState(["currentuser"])
};
</script>

<style scoped>
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