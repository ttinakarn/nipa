<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    <navbar />
    <div class="container">
      <b-row align-h="end">
        <b-col cols="4">
          <h1>Patient List</h1>
        </b-col>
        <b-col cols="4">
          <b-button style="background: #7FDBD5; border: #7FDBD5;">
            <router-link to="/addpatient" style="color: #2c3e50;">Add new patient</router-link>
          </b-button>
        </b-col>
      </b-row>

      <div v-if="patients == null">
        <b-spinner variant="info" label="Loading..."></b-spinner>
      </div>

      <table class="table table-bordered table-hover" v-if="patients != null">
        <thead class="thead-light">
          <tr>
            <th scope="col">Bed Number</th>
            <th scope="col">AN</th>
            <th scope="col">HN</th>
            <th scope="col">Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Discharge</th>
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
                >Edit</router-link>
              </b-button>
            </td>
            <td>
              <b-button
                size="sm"
                style="background: #dc3545; border: #dc3545;"
                @click="discharge(patient.bednumber, patient.an)"
              >Discharge</b-button>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";

export default {
  components: {
    navbar,
    Loading
  },
  data() {
    return {
      isLoading: false,
      patients: null
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      var instance = this;
      instance.patients = null;
      axios
        .get("https://nipaapi.herokuapp.com/api/patient")
        .then(function(response) {
          instance.patients = response.data.data;
          console.log("Patients", instance.patients);
        });
    },
    discharge(bednumber, an) {
      var instance = this;
      this.$bvModal
        .msgBoxConfirm(
          "Are you sure you want discharge bed number " + bednumber + "?",
          {
            title: "Confirmation Discharge Patient",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value == true) {
            console.log("discharge");
            instance.isLoading = true;
            axios
              .put("https://nipaapi.herokuapp.com/api/dischargedate/" + an, {
                dischargedate: moment().format("YYYY-MM-DD")
              })
              .then(function(response) {
                instance.isLoading = false;
                instance.$bvModal
                  .msgBoxOk("Bed " + bednumber + " has been discharged", {
                    title: "Confirmation",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "success",
                    headerClass: "p-2 border-bottom-0",
                    footerClass: "p-2 border-top-0",
                    centered: true
                  })
                  .then(value => {
                    instance.isLoading = true;
                    instance.getdata();
                    instance.isLoading = false;
                  })
                  .catch(err => {
                    // An error occurred
                  });
              })
              .catch(error => {
                instance.isLoading = false;
                instance.$bvModal.msgBoxOk(error.message, {
                  title: "Can't discharge",
                  size: "sm",
                  buttonSize: "sm",
                  okVariant: "danger",
                  headerClass: "p-2 border-bottom-0",
                  footerClass: "p-2 border-top-0",
                  centered: true
                });
                console.log(error);
              });
          }
        })
        .catch(err => {
          // An error occurred
        });
    }
  }
};
</script>