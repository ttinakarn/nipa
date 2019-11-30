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
            <b-form-text
              text-variant="danger"
              v-if="available == true"
            >Bed {{bednumber}} is not available</b-form-text>
          </b-col>
          <b-col cols="1">
            <label for="text">HN</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="hn"/>
          </b-col>
          <b-col cols="1">
            <label for="text">AN</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="number" v-model="an"/>
          </b-col>
        </b-row>
        <hr />
        <b-row class="m-3">
          <b-col cols="1">
            <label for="text">Title</label>
          </b-col>
          <b-col cols="2">
            <b-form-input type="text" v-model="title" />
          </b-col>
          <b-col cols="1">
            <label for="text">Name</label>
          </b-col>
          <b-col cols="3">
            <b-form-input type="text" v-model="name" />
          </b-col>
          <b-col cols="1">
            <label for="text">Surname</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="text" v-model="surname" />
          </b-col>
        </b-row>
        <b-row class="m-3">
          <b-col cols="2">
            <label for="text">Birthday</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="date" v-model="dob" />
          </b-col>
          <b-col cols="2">
            <label for="text">Admit Date</label>
          </b-col>
          <b-col cols="4">
            <b-form-input type="date" v-model="admitdate" />
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
      available: false
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
        this.available == true ||
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
          title: "Can't admit new patient",
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
            dob: this.dob,
            admitdate: this.admitdate
          })
          .then(response => {
            instance.isLoading = false;
            this.$bvModal
              .msgBoxOk("Successfully added new patient", {
                title: "Confirmation",
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
              title: "Can't admit new patient",
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
      instance.available = false;
      for (var i = 0; i < instance.beds.length; i++) {
        if (instance.bednumber == instance.beds[i].bednumber) {
          instance.available = true;
        }
      }
      console.log("Bed "+ instance.bednumber + " is not availiable", instance.available);
    },
    cancel(){
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
          title: 'Please Confirm',
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