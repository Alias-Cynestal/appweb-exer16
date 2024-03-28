<script setup lang="ts">
defineProps({
    siteTitle : {
        type : String,
        required : true,
    }
})
</script>
<template>
  <header class="container-fluid bg-dark text-light p-4 text-center">
    <h1>{{siteTitle}}</h1>
  </header>
</template>
<style>

</style>