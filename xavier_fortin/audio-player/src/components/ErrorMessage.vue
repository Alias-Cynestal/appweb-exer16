<script setup lang="ts">
defineProps({
    message : String,
    toggled : Boolean
})

</script>
<template>
<div id="errorAlert" class="b-alert alert alert-danger " role="alert">
  <div>
    {{ message }}
  </div>
</div>

</template>
<style scoped>
.b-alert {
  display: block;
  width: 33%;
  position : fixed;
  top : 7rem;
  right : 1rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>