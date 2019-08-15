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
    },
    calfallrisk: function() {
      if(this.title != 'Bed Rest / Nurse assist' && this.title != 'Normal' && this.title != 'Oriented own ability'){
        this.score = 1;
        this.$emit("score", this.score);
      }
      else {
        this.score = 0;
        this.$emit("score", this.score);
      }
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

