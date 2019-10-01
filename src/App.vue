<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import moment from "moment";
import { store } from "./store/store.js"
export default {
  store,
  mounted(){
    moment.locale("th");
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Days+One&display=swap');
@import url('https://fonts.googleapis.com/css?family=Mitr:500,600&display=swap');
*{
  font-family: 'Days One', 'Mitr';
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
