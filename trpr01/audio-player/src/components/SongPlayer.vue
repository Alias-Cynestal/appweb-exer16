<script setup lang="ts">
import {ref, Ref, watch} from 'vue'
import {Song, templateSong, Artist} from '../scripts/musicTemplate.ts'
import SongPlayerControls from './SongPlayerControls.vue';
import SongPlayerDatas from './SongPlayerDatas.vue';
import SongPlayerTime from './SongPlayerTime.vue';
const props = defineProps({
  selectedSong:{
    type: Object as ()=> Song,
    required: true
  },
  selectedArtist:{
    type: Object as ()=> Artist,
    required: true
  }
})

const audioRoute = "src/assets/songs/";
const songAudio: Ref<HTMLAudioElement> = ref(new Audio(""));
const status:Ref<string> = ref("")
const previousStatus: Ref<string> = ref("")
const lastTimeRegistered: Ref<number> = ref(0)
const duration: Ref<number> = ref(0)

watch(props, ()=>{
    getSongAudio()
})

function getSongAudio(){
    if(props.selectedSong != templateSong)
    {
      songAudio.value.src = audioRoute + props.selectedSong.fileName
      songAudio.value.load()
      songAudio.value.addEventListener('loadedmetadata', function() {
            duration.value = songAudio.value.duration 
        });
      lastTimeRegistered.value = 0;
      
    }    
}

function updateStatus(newStatus: string)
{
    previousStatus.value = status.value
    status.value = newStatus
    
    if (status.value == "PLAY" && previousStatus.value == "PAUSE"){
        songAudio.value.play()
        songAudio.value.currentTime = lastTimeRegistered.value
    }
    else if(status.value == "PLAY"){
        songAudio.value.play()
        songAudio.value.ontimeupdate = () => {
            lastTimeRegistered.value = songAudio.value.currentTime
        }
    }
    else if (status.value == "PAUSE"){
        songAudio.value.pause()
        lastTimeRegistered.value = songAudio.value.currentTime
    }
    else{
        songAudio.value.load()
        lastTimeRegistered.value = 0
    }
}

//Fonction suggerée par Chat-GPT
function formatTime(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}



</script>

<template>
    <div id="songPlayer" class="p-3">
        <div class="container p-3 bg-dark text-light shadow border border-5 border-primary">
            <div class="row p-2">
                <SongPlayerDatas :selected-song="props.selectedSong" :selected-artist="props.selectedArtist"/>
            </div>
            <div class="row p-2">
                <SongPlayerControls :selected-song="props.selectedSong" @song-status="updateStatus"/>
                <SongPlayerTime :duration="formatTime(duration)" :current-time="formatTime(lastTimeRegistered)"/>
            </div>
        </div>
    </div>
</template>