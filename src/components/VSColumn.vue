<template>
  <div>
    <td
      v-if="dataBednumber == bednumber && column == true && condition"
      class="text-danger font-weight-bold invalid"
    >{{dataColumn}}</td>
    <td
      v-else-if="dataBednumber == bednumber && column == true"
      class="invalid"
    >{{dataColumn}}</td>
    <td v-else-if="condition" class="text-danger font-weight-bold">{{dataColumn}}</td>
    <td v-else>{{dataColumn}}</td>
  </div>
</template>

<script>
export default {
    props: ["dataBednumber","bednumber", "column", "condition", "dataColumn"]
}
</script>