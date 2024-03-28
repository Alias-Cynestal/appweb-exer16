<script setup lang="ts">
import {Song, Artist} from '../scripts/musicTemplate.ts'

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


</script>

<template>

<div id="songInfos" class="p-3">
      <div class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone">
        <div class="row">
          <div class="col">
            <h2>Informations de la chanson</h2>
            <p id="songDesc">{{props.selectedSong.desc}}</p>
            <p id="artistDesc">{{props.selectedArtist.desc}}</p>
          </div>
        </div>
      </div>
    </div>

</template>