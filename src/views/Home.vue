<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-brand class="topnav-centered">Ward 1</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-navbar-brand class="text-danger" right>
          <router-link to="/" class="text-danger">Logout</router-link>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <br />
    <div class="display-4">Welcome Tip</div>
    <br />
    <b-row id="my-beds">
      <b-col lg="3" sm="4" xs="12" v-for="bed in beds" :key="bed.bedNo">
        <div v-if="bed.status == 'normal'">
          <router-link to="/bedinfo">
            <b-button variant="success" class="button-size">
              <div>
                <h1>BED {{bed.bedNo}}</h1>
                <h5>Lastest Vital: {{bed.latestVS}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
        <div v-else-if="bed.status == 'warning'">
          <router-link to="/bedinfo">
            <b-button variant="warning" class="button-size">
              <div>
                <h1>BED {{bed.bedNo}}</h1>
                <h5>Lastest Vital: {{bed.latestVS}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
        <div v-else-if="bed.status == 'danger'">
          <router-link to="/bedinfo">
            <b-button variant="danger" class="button-size">
              <div>
                <h1>BED {{bed.bedNo}}</h1>
                <h5>Lastest Vital: {{bed.latestVS}}</h5>
              </div>
            </b-button>
          </router-link>
        </div>
        <div v-else>
            <b-button variant="secondary" class="button-size">
              <div>
                <h1>BED {{bed.bedNo}}</h1>
              </div>
            </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.button-size {
  width: 225px;
  height: 134px;
  margin: 5px;
}
.topnav-centered {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
export default {
  data() {
    return {
      beds: [
        { bedNo: "1", latestVS: "10:12", status: "warning" },
        { bedNo: "2", latestVS: "10:12", status: "normal" },
        { bedNo: "3", latestVS: "10:12", status: "normal" },
        { bedNo: "4", latestVS: "10:12", status: "warning" },
        { bedNo: "5", latestVS: "10:12", status: "danger" },
        { bedNo: "6", latestVS: null, status: null },
        { bedNo: "7", latestVS: null, status: null },
        { bedNo: "8", latestVS: null, status: null },
        { bedNo: "9", latestVS: "10:12", status: "normal" },
        { bedNo: "10", latestVS: "10:12", status: "normal" },
        { bedNo: "11", latestVS: "10:12", status: "warning" },
        { bedNo: "12", latestVS: "10:12", status: "danger" },
        { bedNo: "13", latestVS: null, status: null },
        { bedNo: "14", latestVS: null, status: null },
        { bedNo: "15", latestVS: null, status: null },
        { bedNo: "16", latestVS: "10:12", status: "warning" },
        { bedNo: "17", latestVS: null, status: null },
        { bedNo: "18", latestVS: null, status: null },
        { bedNo: "19", latestVS: "10:12", status: "normal" },
        { bedNo: "20", latestVS: "10:12", status: "normal" },
        { bedNo: "21", latestVS: "10:12", status: "warning" },
        { bedNo: "22", latestVS: "10:12", status: "danger" },
        { bedNo: "23", latestVS: null, status: null },
        { bedNo: "24", latestVS: null, status: null },
        { bedNo: "25", latestVS: null, status: null },
        { bedNo: "26", latestVS: "10:12", status: "warning" }
      ]
    };
  }
};
</script>
