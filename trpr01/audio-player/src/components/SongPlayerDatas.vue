<script setup lang="ts">

import {Song,Artist} from '../scripts/musicTemplate.ts'

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

<div id="songPlayerDatas" class="col-12">
            <p id="songName" class="bg-secondary text-white p-2 border border-3 border-dark">
              {{ props.selectedSong.songName }}
            </p>
            <p id="artistName" class="bg-secondary text-white p-2 border border-3 border-dark">
              {{ props.selectedArtist.name}}
            </p>
          </div>

</template>