<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    <navbar />
    <h1>Add New Patient</h1>
    <div class="container" style="text-align: left;">
      <b-form>
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Bed</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="bednumber" @keyup="checkbed()" />
            <b-form-invalid-feedback :state="available">Bed {{bednumber}} is not available</b-form-invalid-feedback>
            
          </b-col>
          <b-col cols="1">
            <label for="text">HN</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="hn" :state="hn != null"/>
          </b-col>
          <b-col cols="1">
            <label for="text">AN</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="an" :state="an != null"/>
          </b-col>
        </b-row>
        <hr />
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Title</label>
          </b-col>
          <b-col cols="2">
            <b-form-input type="text" v-model="title" :state="title != null"/>
          </b-col>
          <b-col cols="1">
            <label for="text">Name</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="text" v-model="name" :state="name != null"/>
          </b-col>
          <b-col cols="1">
            <label for="text">Surname</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="text" v-model="surname" :state="surname != null"/>
          </b-col>
        </b-row>
        <b-row class="m-3">
          <b-col cols="2">
            <label for="text">Birthday</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="date" v-model="dob" :state="dob != null"/>
          </b-col>
          <b-col cols="2">
            <label for="text">Admit Date</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="date" v-model="admitdate" :state="admitdate != null"/>
          </b-col>
        </b-row>
        <div class="text-center">
          <b-button
            style="background: #7FDBD5; border: #7FDBD5; margin: 5px;"
            class="text-dark" 
            @click="addPatient"
          >Add</b-button>
          <!-- <router-link to="/patients"> -->
            <b-button style="background: #6c757d; border: #6c757d; margin: 5px;" @click="cancel">Cancel</b-button>
          <!-- </router-link> -->
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import navbar from "@/components/NavbarHome.vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  components: {
    navbar,
    Loading
  },
  data() {
    return {
      isLoading: false,
      beds: null,
      bednumber: null,
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
      .get("https://nipaapi.herokuapp.com/api/bednumber")
      .then(function(response) {
        instance.beds = response.data.data;
        console.log(instance.beds);
      });
  },
  methods: {
    addPatient() {
      var instance = this;
      instance.isLoading = true;
      //   console.log(
      //     this.bednumber,
      //     this.hn,
      //     this.an,
      //     this.title,
      //     this.name,
      //     this.surname,
      //     this.dob,
      //     this.admitdate
      //   );
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
          title: "Can't add new patient",
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
        this.$bvModal.msgBoxOk("Bed " + this.bednumber + " is not avaliable", {
          title: "Can't add new patient",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        });
      } else {
        axios
          .post("https://nipaapi.herokuapp.com/api/patient", {
            bednumber: this.bednumber,
            hn: this.hn,
            an: this.an,
            title: this.title,
            name: this.name,
            surname: this.surname,
            dob: moment(this.dob).format(),
            admitdate: moment(this.admitdate).format(),
          })
          .then(response => {
            instance.isLoading = false;
            this.$bvModal
              .msgBoxOk("Successfully added new patient", {
                title: "Data saved",
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
              title: "Can't add new patient",
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
      for (var i = 0; i < instance.beds.length; i++) {
        if (instance.bednumber == instance.beds[i].bednumber) {
          instance.available = false;
        }
      }
      console.log("Bed "+ instance.bednumber + " is not availiable", instance.available);
    },
    cancel(){
      this.$bvModal.msgBoxConfirm("You haven't add new patient yet. Are you sure cancel this?", {
          title: 'Confirmation Discard Changes',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value == true){
              this.$router.push("/patientslist");
            }
          })
          .catch(err => {
            // An error occurred
          })
    }
  }
};
</script>