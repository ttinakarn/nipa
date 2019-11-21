<template>
    <b-navbar toggleable="sm" type="light" style="background-color: #e9ecef;">
      <b-navbar-brand>
        <img src="../assets/logo-main.png" alt="HospitalLogo" height="50" style="margin-right: 5px" />
        <span class="text-dark">x</span>
        <img src="../assets/PSU_CoC_ENG.png" alt="CoCLogo" height="30" style="margin-left: 5px" />
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">
        <span>{{time}}</span>
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand right>
          <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret right>
            <template v-slot:button-content>
              <img src="../assets/logo.png" alt="NiPALogo" height="60" />
            </template>
            <b-dropdown-item>
              <router-link to="/dashboard" class="text-dark">Dashboard</router-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <router-link to="/tv" class="text-dark">Dashboard for TV</router-link>
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>
              <router-link to="#" class="text-dark">Patient's Information</router-link>
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>
              <router-link to="/condition" class="text-dark">Condition and rules</router-link>
            </b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>
              <router-link to="/" class="text-danger">Logout</router-link>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      time: null
    };
  },
  methods: {
    updateCurrentTime() {
      moment.locale("th");
      this.time = moment().format("LTS");
    }
  },
  created() {
    this.time = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>