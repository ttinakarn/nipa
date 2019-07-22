<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand>
        <router-link to="/home">&lt; Back</router-link>
      </b-navbar-brand>
      <b-navbar-brand class="topnav-centered">Patient's Information</b-navbar-brand>
    </b-navbar>
    <br/>
    <b-container>
      <b-jumbotron header="BED 1">
        <b-col>
          <b-row>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>HN: 199281</h5>
            </b-col>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>AN: 933822</h5>
            </b-col>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>Name: นายสมชาย ใจดี</h5> 
            </b-col>
            <b-col lg="6" xs="12" style="text-align: left;">
              <h5>Age: 48 yrs</h5> 
            </b-col>
            <b-col lg="12" style="text-align: left;">
              <h5>Admit Date: 15 พฤษภาคม 2562</h5> 
            </b-col>
            <b-col lg="12" style="text-align: left;">
              <h5>Doctor: นพ.กรวิทย์ พฤษชัยมงคล</h5> 
            </b-col>
            <b-col lg="12" style="text-align: left;">
              <h5>Remark: งดอาหาร 3 ชั่วโมง</h5> 
            </b-col>
          </b-row>
        </b-col>
      </b-jumbotron>
      <b-button size="lg" style="background: #7FDBD5; border: #7FDBD5;">
        <router-link to="/addvs" style="color: #2c3e50;">Next</router-link>
      </b-button>
    </b-container>
  </div>
</template>

<style scoped>
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>