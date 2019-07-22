<template>
  <b-col :md="md" :xs="xs">
    <b-button style="background-color: #7fdbd5;" :class="{'bg-dark' : this.activePlan == this.title}" block @click="updateActivePlan">
      <img :src="icon" class="responsive" />
      <br />{{title}}
    </b-button>
  </b-col>
</template>

<script>
export default {
  model: {
    prop: 'activePlan',
    event: 'onUpdatePlan'
  },
  props:['title','md','xs', 'icon', 'activePlan'],
  methods: {
      updateActivePlan(){
          this.$emit('onUpdatePlan', this.title)
      }
  }
}
</script>

<style>
.responsive {
  width: 30%;
  height: auto;
  margin: 10px;
}
</style>

