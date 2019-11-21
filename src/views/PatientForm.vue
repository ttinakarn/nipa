<template>
  <div>
    <navbar />

    <h1>Patient Information</h1>
    <div class="container" style="text-align: left;">
      <b-row class="m-3">
        <b-col cols="1">
          <label for="text">Bed</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="number"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">HN</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">AN</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="text"></b-form-input>
        </b-col>
      </b-row>
      <hr />
      <b-row class="m-3">
        <b-col cols="1">
          <label for="text">Title</label>
        </b-col>
        <b-col cols="2">
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">Name</label>
        </b-col>
        <b-col cols="3">
          <b-form-input type="text"></b-form-input>
        </b-col>
        <b-col cols="1">
          <label for="text">Surname</label>
        </b-col>
        <b-col cols="4">
          <b-form-input type="text"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="m-3">
        <b-col cols="1">
          <label for="text">Birthday</label>
        </b-col>
        <b-col cols="11">
          <b-form-input type="text"></b-form-input>
        </b-col>
      </b-row>
      <hr />
      <b-row class="m-3">
        <b-col cols="2">
          <label for="text">Admit Date</label>
        </b-col>
        <b-col cols="4">
          <b-form-input type="date"></b-form-input>
        </b-col>
        <b-col cols="2">
          <label for="text">Discharge Date</label>
        </b-col>
        <b-col cols="4">
          <b-form-input type="date"></b-form-input>
        </b-col>
      </b-row>
    </div>
    <b-button style="background: #7FDBD5; border: #7FDBD5; margin: 5px;" class="text-dark">Save</b-button>
    <b-button style="background: #6c757d; border: #6c757d; margin: 5px;">Cancel</b-button>
  </div>
</template>

<script>
import navbar from "@/components/NavbarHome.vue";
export default {
  components: {
    navbar
  }
};
</script>