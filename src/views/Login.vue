<template>
  <div class="center-div">
    <img alt="Vue logo" src="../assets/logo.png" />
    <b-container fluid>
      <b-row class="my-1 justify-content-center">
        <b-col>
          <b-form-input placeholder="Username"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1 justify-content-center">
        <b-col>
          <b-form-input placeholder="Password" type="password"></b-form-input>
        </b-col>
      </b-row>
      <b-button size="lg" style="background: #7FDBD5; border: #7FDBD5;">
        <router-link to="/home" style="color: #2c3e50;">Login</router-link>
      </b-button>
    </b-container>
  </div>
</template>

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
