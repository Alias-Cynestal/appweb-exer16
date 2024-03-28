<script setup lang="ts">
const props = defineProps({
  duration:{
    type: String,
    required: true
  },
  currentTime:{
    type: String,
    required: true
  }
})
</script>

<template>

<div id="songPlayerTime" class="col-3 offset-3 text-white">
            <p class="p-2 bg-secondary text-center">
              Temps courant: <span id="currentTime">{{props.currentTime}}</span><br />
              Durée: <span id="duration">{{props.duration}}</span>
            </p>
          </div>
</template>