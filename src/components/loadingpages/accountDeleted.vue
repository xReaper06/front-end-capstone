<template>
    <div class="d-flex justify-center align-center">
      <div class="items-center ms-16 ml-16 mt-16">
        <v-alert
          color="error"
          icon="$error"
          title="Account has been Deleted"
          text="You cannot access this account anymore"
          class="w-50 ms-16 ml-16 mt-16"
        ></v-alert>
        <v-btn class="ms-16" to="/">Go Back</v-btn>
      </div>
    </div>
  </template>

<script setup>

</script>

<style scoped>

</style>