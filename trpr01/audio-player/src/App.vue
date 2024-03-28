<script setup lang="ts">
import {Song, templateSong, templateArtist, Artist} from './scripts/musicTemplate.ts'
import { ref, Ref } from 'vue'
import SongPlayer from './components/SongPlayer.vue';
import SongInfos from './components/SongInfos.vue';
import SongsList from './components/SongsList.vue';

const actualSong : Ref<Song> = ref(templateSong);
const actualArtist : Ref<Artist> = ref(templateArtist);

function handleUpdateSong(song: Song, artist: Artist)
{
  actualSong.value = song
  actualArtist.value = artist
}
</script>

<template>
  <header class="container-fluid bg-dark text-light p-4 text-center">
    <h1>Lecteur de musique (La balle s'en vient vite)</h1>
  </header>
  <main>
    <SongPlayer :selectedSong="actualSong" :selectedArtist="actualArtist"/>
    <SongInfos :selectedSong="actualSong" :selectedArtist="actualArtist"/>
    <Suspense>
      <SongsList @updateSong="handleUpdateSong"/>
    </Suspense>
  </main>
  <footer class="container-fluid bg-secondary text-light p-1">
    <p class="text-center">Copyright James Savoie</p>
  </footer>
  
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