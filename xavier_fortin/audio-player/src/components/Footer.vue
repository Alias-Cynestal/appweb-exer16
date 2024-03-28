<script setup lang="ts">
defineProps({
    copyright : {
        type : String,
        required : true
    }
})
</script>
<template>
    <footer class="container-fluid bg-secondary text-light p-1">
        <p class="text-center">{{copyright}}</p>
    </footer>
</template>
<style scoped>
</style>