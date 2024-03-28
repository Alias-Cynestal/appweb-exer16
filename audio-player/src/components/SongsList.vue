<script setup lang="ts">
import SongShortDto from '../scripts/SongShortDto'
defineProps({
  songShortDataList: {
    type: Array<SongShortDto>,
    required: true
  }

})

const emit = defineEmits({
  selectedSong(id: number): number {
    return id
  },
  randomSong: null,
  previousSong: null,
  nextSong: null
})


</script>

<template>
  <div id="songsList" class="p-3">
    <div class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone">
      <div class="row">
        <div class="col">
          <h2>Contrôles de la liste</h2>
          <button id="btnShuffle" type="button" class="btn btn-primary"
            v-on="songShortDataList.length !== 0 ? { click: () => emit('randomSong') } : {}">
            <i class="bi bi-shuffle"></i> Au hasard!
          </button>
          <button id="btnNext" type="button" class="btn btn-primary"
            v-on="songShortDataList.length !== 0 ? { click: () => emit('previousSong') } : {}">
            <i class="bi bi-arrow-left-square"></i> Chanson précédente
          </button>
          <button id="btnPrevious" type="button" class="btn btn-primary"
            v-on="songShortDataList.length !== 0 ? { click: () => emit('nextSong') } : {}">
            Chanson suivante <i class="bi bi-arrow-right-square"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Liste des chansons</h2>
          <ul id="songsList">
            <li v-if="songShortDataList" v-for="song in songShortDataList" :key="song.id"
              @click="emit('selectedSong', song.id)"> {{ song.songName }} </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>