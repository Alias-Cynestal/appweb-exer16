<script setup lang="ts">

import { ComputedRef, Ref, computed, onMounted, ref, watch } from 'vue'
import { PropType } from 'vue/dist/vue.js'
import SongDto from '../scripts/SongDto'
import SongPlayerControls from './SongPlayerControls.vue'
import SongPlayerData from './SongPlayerData.vue'
import SongPlayerTime from './SongPlayerTime.vue'

const emit = defineEmits({
    error(message : string){
        return message
    }
})
const props: any = defineProps({
    songData: {
        type: Object as PropType<SongDto>
    },
    artistName: String
})
const audioElement: HTMLAudioElement = new Audio()
const currentTime: Ref<number> = ref(audioElement.currentTime)
const duration: Ref<number> = ref(audioElement.duration)
const songSource: ComputedRef<string> = computed(function (): string {
    return props.songData != undefined ? "src\\assets\\songs\\" + props.songData?.fileName : ""
})

function handlePlayEvent(): void {
    if (audioElement.paused) {
        audioElement?.play()
    } else {
        emit("error", "La chanson n'est pas en pause")
    }
}

function handlePauseEvent(): void {
    if (!audioElement.paused) {
        audioElement?.pause()
    } else {
        emit("error", "La chanson n'est pas en marche")
    }
}

function handleStopEvent(): void {
    if (!audioElement.paused) {
        audioElement?.pause()
        audioElement.currentTime = 0
    } else {
        emit("error", "La chanson n'est pas en marche")
    }
}

onMounted(function (): void {
    audioElement.addEventListener("timeupdate", () => {
        currentTime.value = audioElement.currentTime
    })
    audioElement.addEventListener("durationchange", () => {
        duration.value = audioElement.duration
    })
    audioElement.addEventListener("onerror", () => {
        emit('error', "Le fichier audio a rencontré une erreur lors du chargement, veuillez réessayer")
    })
    audioElement.preload = "auto"
    
    //Si la chanson est changée, on change la source de l'élément audio
    watch(computed(function (): SongDto | undefined { return props.songData }), function (): void {
        audioElement.src = songSource.value
    })
})

</script>
<template>
    <div id="songPlayer" class="p-3">
        <div class="container p-3 bg-dark text-light shadow border border-5 border-primary">
            <div class="row p-2">
                <SongPlayerData :song-name="props.songData?.songName" :artist-name="props.artistName" />
            </div>

            <div class="row p-2">
                <SongPlayerControls @play="handlePlayEvent()" @pause="handlePauseEvent()" @stop="handleStopEvent()"
                    :playing="!audioElement.paused" :song-loaded="computed(() => songData !== undefined).value" />
                <SongPlayerTime :current-time="currentTime" :duration="duration" />
            </div>

        </div>
    </div>
</template>
<style scoped></style>