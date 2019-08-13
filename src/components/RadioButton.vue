<template>
  <b-col :md="md" :xs="xs">
    <b-button
      style="background-color: #7fdbd5;"
      :class="{'bg-dark' : this.activePlan == this.title}"
      block
      @click="updateActivePlan"
      v-on:click="calfallrisk"
    >
      <img :src="icon" class="responsive" />
      <br />
      {{title}}
    </b-button>
  </b-col>
</template>

<script>
import { parse } from "path";
export default {
  data() {
    return {
      score: 0,
      currentvalue: "",
      count: 0
    };
  },
  model: {
    prop: "activePlan",
    event: "onUpdatePlan"
  },
  props: [
    "title",
    "md",
    "xs",
    "icon",
    "activePlan",
    "checked4score",
    "checked5score",
    "checked6score"
  ],
  methods: {
    updateActivePlan() {
      this.$emit("onUpdatePlan", this.title);
      this.score = this.score + parseInt(this.checked4score);
      this.count = this.count + 1;
    },
    calfallrisk: function() {
      if (this.count > 1) {
        if (this.title == "Crutches / Cane") {
          this.score = this.score - 15;
        } else if (this.title == "Fracture") {
          this.score = this.score - 30;
        }
      }
      this.currentvalue = this.title;

      // else if(this.title == 'Normal' || this.title == 'Weak' || this.title == "Impaired"){
      //   this.score = this.score + parseInt(this.checked5score);
      // } else {
      //   this.score = this.score + parseInt(this.checked6score);
      // }
      this.$emit("score", this.score);
    }
  }
};
</script>

<style>
.responsive {
  width: 30%;
  height: auto;
  margin: 10px;
}
</style>

