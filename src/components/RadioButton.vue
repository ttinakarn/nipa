<template>
  <b-col :md="md" :xs="xs">
    <b-button
      style="background-color: #7fdbd5;"
      :class="{'bg-dark' : this.activePlan == this.title}"
      block
      @click="updateActivePlan"
      v-on:click="calfallrisk"
    >
      <img v-if="title == 'Bed Rest / Nurse assist'" src="../assets/asleep.png" class="responsive" />
      <img v-if="title == 'Crutches / Cane' || title == 'Weak'" src="../assets/disabled.png" class="responsive" />
      <img v-if="title == 'Fracture'" src="../assets/injured.png" class="responsive" />
      <img v-if="title == 'Normal'" src="../assets/walk.png" class="responsive" />
      <img v-if="title == 'Impaired'" src="../assets/handicap.png" class="responsive" />
      <img v-if="title == 'Oriented own ability'" src="../assets/empathy.png" class="responsive" />
      <img v-if="title == 'Forget limitations'" src="../assets/apathy.png" class="responsive" />
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
      count: 0,
      imgPath: this.icon
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

