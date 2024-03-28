<script setup lang="ts">
import { ref } from 'vue'
import {Song,templateSong} from '../scripts/musicTemplate.ts'
const props = defineProps({
  selectedSong:{
    type: Object as ()=> Song,
    required: true
  }
})

const play = "PLAY"
const stop = "STOP"
const pause = "PAUSE"


const isHidden = ref(true);
const isError = ref(false)


const emit = defineEmits<{
  (event: 'songStatus', status: string): void
}>()


function stopSong(){
  isHidden.value = true;
  emit('songStatus', stop)
}
function playSong(){
  let error = document.getElementById("error") as HTMLElement
  if(props.selectedSong.id != templateSong.id)
  {
    isHidden.value = false;
    emit('songStatus', play)
    error.innerText = ""
    isError.value = false
  }else{
    error.innerText = "Aucune chanson séléctionnée";
    isError.value = true
  }
}
function pauseSong(){
  isHidden.value = true;
  emit('songStatus', pause)
}


</script>

<template>
          <div id="songPlayerControls" class="col-6">
            <button id="btnPlay" type="button" class="btn btn-primary" v-bind:class="{ 'd-none': isHidden === false}" @click="playSong()">
              <i class="bi bi-play-fill"></i> Jouer
            </button>
            <button id="btnPause" type="button" class="btn btn-primary" v-bind:class="{ 'd-none': isHidden === true}" @click="pauseSong()">
              <i class="bi bi-pause-fill"></i> Pause
            </button>
            <button id="btnStop" type="button" class="btn btn-primary" v-bind:class="{ 'd-none': isHidden === true}" @click="stopSong()">
              <i class="bi bi-stop-fill"></i> Stop
            </button>
            <div class="alert alert-danger" role="alert" id="error" v-bind:class="{ 'd-none': isError === false}">

            </div>
          </div>
          
</template>

<style scoped>
.playlistDisplayedSongs:hover{
  font-size: 120%;
  cursor:pointer;
  transition:0.25s;
  color: aquamarine;
}
button:hover{
  transition: 0.25s ease-in-out;
  transform: scale(1.15);
}
</style>