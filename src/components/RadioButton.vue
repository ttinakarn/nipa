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
export default {
  model: {
    prop: "activePlan",
    event: "onUpdatePlan"
  },
  props: ["title", "md", "xs", "icon", "activePlan", "score"],
  methods: {
    updateActivePlan() {
      this.$emit("onUpdatePlan", this.title);
    },
    calfallrisk: function() {
      if (this.title == 'Bed Rest / Nurse assist') {
        // this.score = 0;
        console.log(this.title);
      } 
      else if (this.title == 'Crutches / Cane') {
        // this.score = 15;
        console.log(this.title);
      } 
      else if (this.title == 'Fracture') {
        // this.score = 30;
        console.log(this.title);
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

