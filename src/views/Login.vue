<template>
  <div class="center-div">
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    <img alt="Vue logo" src="../assets/logo.png" />
    <b-container fluid>
      <b-row class="my-1 justify-content-center">
        <b-col>
          <b-form-input placeholder="Username" v-model="username"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1 justify-content-center">
        <b-col>
          <b-form-input placeholder="Password" type="password" v-model="password"></b-form-input>
        </b-col>
      </b-row>
      <b-button
        size="lg"
        style="background: #7FDBD5; border: #7FDBD5; color: #2c3e50;"
        @click="login"
      >Login</b-button>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      username: null,
      password: null,
      size: window.matchMedia("(max-width: 1025px)")
    };
  },
  methods: {
    checksize(x) {
      if (x.matches) {
        this.$router.push("/home");
      } else {
        this.$router.push("/index");
      }
    },
    login() {
      this.isLoading = true;
      if (
        this.username == null ||
        this.password == null ||
        this.username.length == 0 ||
        this.password.length == 0
      ) {
        this.isLoading = false;
        this.$bvModal.msgBoxOk("Please enter username and password", {
          size: "sm",
          buttonsize: "sm",
          okVariant: "danger",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        });
      } else {
        this.checklogin();
      }
    },
    checklogin() {
      var instance = this;
      axios
        .post("https://nipaapi.herokuapp.com/api/login", {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status == "success") {
            instance.$store.commit("setcurrentuser", response.data.data);
            instance.checksize(instance.size);
            // console.log(instance.$store.getters.currentuser);
            // console.log(instance.$store.getters.currentuser[0].name);
            // console.log(instance.$store.getters.currentuser[0].empid);
          } else {
            instance.$bvModal.msgBoxOk(response.data.message, {
              size: "sm",
              buttonsize: "sm",
              okVariant: "danger",
              headerClass: "p-2 border-bottom-0",
              footerClass: "p-2 border-top-0",
              centered: true
            });
          }
          instance.isLoading = false;
        })
        .catch(error => {
          console.log(error.message);
          instance.isLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.center-div {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 400px;
  height: 400px;
}
</style>
