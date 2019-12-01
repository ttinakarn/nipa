<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    <navbar />

    <h1>Patient Information</h1>
    <div v-if="allDataLoaded == false">
      <b-spinner variant="info" label="Loading..."></b-spinner>
    </div>
    <div class="container" style="text-align: left;" v-if="allDataLoaded == true">
      <b-form>
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Bed</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="bednumber" @keyup="checkbed()" :state="available"></b-form-input>
            <b-form-invalid-feedback :state="available">Bed {{bednumber}} is not available</b-form-invalid-feedback>
          </b-col>
          <b-col cols="1">
            <label for="text">HN</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="hn" :state="hn.length != 0"></b-form-input>
          </b-col>
          <b-col cols="1">
            <label for="text">AN</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="an" :state="an.length != 0"></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Title</label>
          </b-col>
          <b-col cols="2">
            <b-form-input type="text" v-model="title" :state="title.length != 0"></b-form-input>
          </b-col>
          <b-col cols="1">
            <label for="text">Name</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="text" v-model="name" :state="name.length != 0"></b-form-input>
          </b-col>
          <b-col cols="1">
            <label for="text">Surname</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="text" v-model="surname" :state="surname.length != 0"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Birthday</label>
          </b-col>
          <b-col cols="11">
            <b-form-input type="date" v-model="dob" :state="dob != null"></b-form-input>
          </b-col>
        </b-row>
        <hr />
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Admit Date</label>
          </b-col>
          <b-col cols="11">
            <b-form-input type="date" v-model="admitdate" :state="admitdate != null"></b-form-input>
          </b-col>
        </b-row>
        <div class="text-center">
          <b-button
            style="background: #7FDBD5; border: #7FDBD5; margin: 5px;"
            class="text-dark"
            @click="editPatient"
          >Save</b-button>
          <b-button
            style="background: #6c757d; border: #6c757d; margin: 5px;"
            @click="cancel"
          >Cancel</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/NavbarHome.vue";
import axios from "axios";
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
      allDataLoaded: false,
      beds: null,
      bednumber: null,
      currentbed: null,
      hn: null,
      an: null,
      title: null,
      name: null,
      surname: null,
      dob: null,
      admitdate: null,
      available: true
    };
  },
  mounted() {
    var instance = this;
    axios
      .get(
        "https://nipaapi.herokuapp.com/api/patient/" +
          instance.$route.params.an
      )
      .then(function(response) {
        console.log(response.data.data);
        instance.bednumber = response.data.data[0].bednumber;
        instance.currentbed = response.data.data[0].bednumber;
        instance.hn = response.data.data[0].hn;
        instance.an = response.data.data[0].an;
        instance.title = response.data.data[0].title;
        instance.name = response.data.data[0].name;
        instance.surname = response.data.data[0].surname;
        if (response.data.data[0].dob != null) {
          instance.dob = moment(response.data.data[0].dob).format("YYYY-MM-DD");
        }
        if (response.data.data[0].admitdate != null) {
          instance.admitdate = moment(response.data.data[0].admitdate).format(
            "YYYY-MM-DD"
          );
        }
        instance.allDataLoaded = true;
      });
    axios
      .get("https://nipaapi.herokuapp.com/api/bednumber")
      .then(function(response) {
        instance.beds = response.data.data;
        console.log(instance.beds);
      });
  },
  methods: {
    editPatient() {
      var instance = this;
      instance.isLoading = true;
      if (
        this.bednumber == null ||
        this.hn == null ||
        this.an == null ||
        this.title == null ||
        this.name == null ||
        this.surname == null ||
        this.dob == null ||
        this.admitdate == null
      ) {
        instance.isLoading = false;
        this.$bvModal.msgBoxOk("Please complete the form", {
          title: "Can't Save",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        });
      } else if (
        this.available == false
      ) {
        instance.isLoading = false;
        this.$bvModal.msgBoxOk("Bed " + this.bednumber + " is not available", {
          title: "Can't Save",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        });
      } else {
        axios
          .put(
            "https://nipaapi.herokuapp.com/api/patient/" +
              instance.$route.params.an,
            {
              bednumber: this.bednumber,
              hn: this.hn,
              an: this.an,
              title: this.title,
              name: this.name,
              surname: this.surname,
              dob: moment(this.dob).format(),
              admitdate: moment(this.admitdate).format()
            }
          )
          .then(response => {
            instance.isLoading = false;
            this.$bvModal
              .msgBoxOk("The data was successfully updated", {
                title: "Data Saved",
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true
              })
              .then(value => {
                this.$router.push("/patientslist");
              })
              .catch(err => {
                // An error occurred
              });
            console.log(response);
          })
          .catch(error => {
            instance.isLoading = false;
            this.$bvModal.msgBoxOk(error.message, {
              title: "Can't save",
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
    },
    checkbed() {
      var instance = this;
      instance.available = true;
      console.log(instance.bednumber.length);

      for (var i = 0; i < instance.beds.length; i++) {
        if (
          instance.bednumber != instance.currentbed &&
          instance.bednumber == instance.beds[i].bednumber
        ) {
          instance.available = false;
        } else if (instance.bednumber.length == 0) {
          instance.available = false;
        }
      }
      console.log(
        "Bed " + instance.bednumber + " is availiable",
        instance.available
      );
    },
    cancel() {
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to discard all the change?", {
          title: "Confirmation Discard Changes",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value == true) {
            this.$router.push("/patientslist");
          }
        })
        .catch(err => {
          // An error occurred
        });
    }
  }
};
</script>