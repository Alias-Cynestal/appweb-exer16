<script setup lang="ts">
import {Song, Artist, templateArtist} from '../scripts/musicTemplate.ts'
import SongsService from '../scripts/songsService.ts'

const songService = new SongsService
const songs = await songService.getSongs()
const artists = await songService.getArtists()

var playlistIndex = 0;
var selectedSong:Song;


const emit = defineEmits<{
  (event: 'updateSong', song: Song, artist: Artist): void
}>()

function playRandomSong(){
  playlistIndex = Math.ceil(Math.random() * songs.length);
  changeSelectedSong(songs[playlistIndex]);
  let artist = findArtistFromSong(songs[playlistIndex], artists)
  emit('updateSong', songs[playlistIndex], artist)
}

function playNextSong(){
  if(playlistIndex >= songs.length - 1)
    playlistIndex = 0;
  else
    playlistIndex++;
  changeSelectedSong(songs[playlistIndex]);
  let artist = findArtistFromSong(songs[playlistIndex], artists)
  emit('updateSong', songs[playlistIndex], artist)
}

function playPreviousSong(){
  if(playlistIndex <= 0)
    playlistIndex = songs.length - 1;
  else
    playlistIndex--;
  changeSelectedSong(songs[playlistIndex]);
  let artist = findArtistFromSong(songs[playlistIndex], artists)
  emit('updateSong', songs[playlistIndex], artist)
}

function changeSelectedSong(song: Song)
{
  selectedSong = song;
  playlistIndex = selectedSong.id - 1;
  let artist = findArtistFromSong(song, artists)

  emit('updateSong', selectedSong, artist)
}

function findArtistFromSong(song: Song, listArtists: Artist[]): Artist
{
  for(let i=0; i<listArtists.length; i++)
  {
    if(song.artistId == listArtists[i].id){
        return listArtists[i];
    }
  }  
  return templateArtist;
}


</script>

<template>
<div id="songsList" class="p-3">
      <div class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone">
        <div class="row">
            <div class="col">
                <h2>Contrôles de la liste</h2>
                <button id="btnShuffle" type="button" class="btn btn-primary" @click="playRandomSong()">
                  <i class="bi bi-shuffle"></i> Au hasard!
                </button>
                <button id="btnNext" type="button" class="btn btn-primary" @click="playPreviousSong()">
                  <i class="bi bi-arrow-left-square"></i> Chanson précédente
                </button>
                <button id="btnPrevious" type="button" class="btn btn-primary" @click="playNextSong()">
                   Chanson suivante <i class="bi bi-arrow-right-square"></i>
                </button>
            </div>
        </div>  
        <div class="row">
              <div class="col">
                  <h2>Liste des chansons</h2>
                  <ul id="songsList" v-for="song in songs">
                    <li class="playlistDisplayedSongs" @click="changeSelectedSong(song)">{{song.songName}} -  {{ findArtistFromSong(song, artists).name }}</li>
                  </ul>
              </div>
          </div>
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