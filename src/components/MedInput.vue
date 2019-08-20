<template>
  <b-col :cols="cols">
    <b-row>
      <b-col align="left">
        <h5>{{subtitle}}</h5>
      </b-col>
      <b-col align="right">
        <h5 :class="textColor">{{latestVS}}</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-input v-if="subtitle != 'Remark'" v-model="value" @keyup="$emit('update:sendVSData', value);" type="number" placeholder="N/A"></b-form-input>
        <b-form-input v-else v-model="value" @keyup="$emit('update:sendVSData', value);" placeholder="N/A"></b-form-input>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  data(){
    return{
      value: null
    }
  },
  props: ['subtitle', 'latestVS', 'textColor', 'cols']
};
</script>
