<template>
  <div>
    <h5>x: {{x}}</h5>
    <h5>answer: {{answer}}</h5>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: [],
      number: [],
      x: [],
      sum: 0
    };
  },
  mounted() {
    for (var i = 2; i < 30; i++) {
      this.number.push(i);
    }
    for (var i = 0; i < this.number.length; i++) {
      for (var j = 1; j < this.number[i]; j++) {
        console.log("this.number[i]",this.number[i]);
        if (this.number[i] % j == 0) {
          console.log(j);
          
          this.x.push(j);
        }
      }
      for (var g = 0; g < this.x.length; g++) {
        this.sum = this.sum + this.x[g];
        if (this.sum == this.number[i]) {
          this.answer.push(this.sum);
          console.log(this.sum);
        }
      }
      // this.x = []
    }
  }
};
</script>