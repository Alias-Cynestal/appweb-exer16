<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
    currentTime: Number,
    duration: Number
})

const formatedCurrentTime = computed(() => {
    return new Date((props.currentTime == undefined || isNaN(props.currentTime) ? 0 : props.currentTime) * 1000).toISOString().slice(14, 19)
})

const formatedDuration = computed(() => {
    return new Date((props.duration == undefined || isNaN(props.duration) ? 0 : props.duration) * 1000).toISOString().slice(14, 19)
})

</script>
<template>
    <div id="songPlayerTime" class="col-3 offset-3 text-white">
        <p class="p-2 bg-secondary text-center">
            Temps courant: <span id="currentTime">{{ formatedCurrentTime }}</span><br />
            Durée: <span id="duration">{{ formatedDuration }} </span>
        </p>
    </div>
</template>
<style scoped></style>