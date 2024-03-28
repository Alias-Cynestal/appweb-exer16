# Revue de code du travail de James Savoie
Par Xavier Fortin

## App.vue
### Ligne 25 - Suspense
```html
<Suspense>
  <SongsList @updateSong="handleUpdateSong"/>
</Suspense>
```
Le maudit Suspense... La manière que j'ai trouvé de m'en sauver est de faire une constante dans mon songService et de l'importer dans mon application après. Tant que la feature est expérimentale je pense que c'est une bonne idée de l'éviter.

## musicTemplate.ts
### Ligne 32 - searchForAudioSong
```ts
export function searchForAudioSong(songName:string): HTMLAudioElement
{
    return new Audio('../assets/songs/' + songName)
}
```
Du code mort, tout simplement. Maintenant, honnêtement, c'est mieux comme ça.  
  

Les interfaces je pense que c'est une bonne idée. Maintenant, les templates de base que tu fournis me sembles un peu superflus. Une gestion d'un état undefined avec des valeurs de placeholder pour SongInfos/SongPlayerDatas auraient sûrement mieux rendus IMO.

## SongInfos.vue
### Ligne 4 - Props
```ts
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
```
SongInfos a vraiment besoin des objets Song et Artist? Il pourrait juste prendre les descriptions.

## SongPlayer.vue

### Ligne 18
```ts
const audioRoute = "src/assets/songs/";
```
Mettre le type de la constante

### Ligne 19
```ts
const songAudio: Ref<HTMLAudioElement> = ref(new Audio(""));
```
Ref inutile, on change les attributs du songAudio, mais on ne change pas sa valeur, c'est toujours le même objet.

### Ligne 42 - updateStatus
```ts
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
```
Le status, au final, c'est juste :
```ts
songAudio.value.paused()
```
Aussi, currentTime devrait pouvoir conserver son temps par lui-même, pas besoin de lastTimeRegistered (en théorie).

## SongPlayerControls.vue
### Ligne 11
```ts
const play = "PLAY"
const stop = "STOP"
const pause = "PAUSE"
```
Pourquoi pas faire une enum? Surtout que tu t'en sers après dans SongPlayer...

### Ligne 51
```html
<button id="btnPlay" type="button" class="btn btn-primary" v-bind:class="{ 'd-none': isHidden === false}" @click="playSong()">
  <i class="bi bi-play-fill"></i> Jouer
</button>
```
v-bind peut être remplacé par v-show. C'est pas grand-chose mais c'est plus concis.

## SongPlayerDatas.vue
Voir [SongInfos.vue](#songinfos-vue)

## SongPlayerDatas.vue
Rien à rajouter, c'est parfait comme ça.

## SongsList.vue
Pour être franc, je préfère ta manière de vérifier la liste. Solide. Plus l'ajout de l'artiste dans la liste est une bonne idée.
Juste...
### Ligne 53
```ts
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
```
Comme Catherine disait la session passée, au point où on en est, on peut faire des forEach.

## songsService.ts
### Ligne 18 - getSong
```ts
  async getSong (songId: string) {
    const { data } = await axios.get(this.API_URL + SONGS_PATH + '/' + songId)
    return data
  }
```
Je comprends ce que tu essayais de faire, mais c'est du code mort.

### Ligne 29 - getArtist
```ts
  async getArtist (artistId: string){
    const { data } = await axios.get(this.API_URL + SONGS_PATH + '/' + artistId)
    return data
  }
```
Même chose que [getSong](#ligne-18-getsong)
  
J'ai pas utilisé Axios donc je peux pas trop en parler mais ça m'a l'air de faire du sens tout ça. L'idée de faire un objet pour obtenir les chansons est intéressante, je pense qu'elle pourrait être amélioré en en faisant un simpleton, vu qu'on ne veux pas plusieurs objets SongService (je crois).

## Autres
Gestion d'erreur absente, mais tu le sais déjà. Overall, avec ce que je viens de voir si on a pas 100% au TP02 on est des __fraudes__.