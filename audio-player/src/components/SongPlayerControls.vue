<script setup lang="ts">
defineProps({
    playing: Boolean,
    songLoaded: Boolean
})
const emit = defineEmits({
    play : null,
    pause : null,
    stop : null
})
</script>
<template>
    <div id="songPlayerControls" class="col-6">
        <button :disabled="!songLoaded" v-show="!playing" id="btnPlay" type="button"
            class="btn btn-primary {{ props.playing ? '' : 'd-none' }}" @click="emit('play')">
            <i class="bi bi-play-fill"></i> Jouer
        </button>
        <button v-show="playing" id="btnPause" type="button" class="btn btn-primary" @click="emit('pause')">
            <i class="bi bi-pause-fill"></i> Pause
        </button>
        <button v-show="playing" id="btnStop" type="button" class="btn btn-primary" @click="emit('stop')">
            <i class="bi bi-stop-fill"></i> Stop
        </button>
    </div>
</template>
<style scoped></style>