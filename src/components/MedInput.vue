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
        <b-form @keyup="submitForm">
          <b-form-input
            v-if="subtitle != 'Remark'"
            type="number"
            v-model.lazy="$v.value.$model"
            @keyup="$emit('update:sendVSData', value);"
            :class="{'is-invalid' : $v.value.$error, 'is-valid' : $v.value.$invalid }"
            placeholder="N/A"
          ></b-form-input>
          <b-form-input
            v-else
            v-model="value"
            @keyup="$emit('update:sendVSData', value);"
            placeholder="N/A"
          ></b-form-input>
          <div class="invalid-feedback">
            <span
              v-if="!$v.value.between"
            >The number should be between {{$v.value.$params.between.min}} and {{$v.value.$params.between.max}}</span>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { between } from "vuelidate/lib/validators";
export default {
  props: ["subtitle", "latestVS", "textColor", "cols", "max", "min", "description"],
  data() {
    return {
      value: null
    };
  },
  validations() {
    return {
      value: {
        between: between(this.min, this.max)
      }
    };
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$store.commit("setsubmitstatus" + this.description, false);
        console.log(this.value);
      } 
      else if(this.value == null){
        this.$store.commit("setsubmitstatus" + this.description, null);
      }
      else {
        this.$store.commit("setsubmitstatus" + this.description, true);
      }
    }
  }
};
</script>
