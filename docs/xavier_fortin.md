---
outline: deep
---
# Revue du code de Xavier Fortin

### Par James Savoie

## App.Vue

Beaucoup de responsabilités données à `App.vue`. Peut-être penser à mettre les méthodes appropriées aux bonnes vues (Par exemple, les fonctions pour gérer le changement des chansons devrait être la responsabilité de `SongList.vue`). Le reste semble impeccable.

```md

<script setup lang="ts">
    function handleRandomSong(): void {
        currentSongIndex = Math.floor(Math.random() * SONGS!.length)
        currentSong.value = SONGS![currentSongIndex]
        getCurrentArtist()
    }

    function handlePreviousSong(): void {
        if (currentSongIndex > 0) {
            currentSong.value = SONGS![--currentSongIndex]
            getCurrentArtist()
        }
    }

    function handleNextSong(): void {
        if (currentSongIndex < SONGS!.length - 1 && currentSongIndex != -1) {
            currentSong.value = SONGS![++currentSongIndex]
            getCurrentArtist()
        }
    }
</script>
<template>
    <SongsList :songShortDataList="getSongsListData()" @selectedSong="(id) => handleSongSelection(id)"
            @randomSong="handleRandomSong()" @previousSong="handlePreviousSong()" @nextSong="handleNextSong()" />
</template>
```

## Scripts (En Général)

Bonne utilisation d'interface pour les chansons (SongDto) et les artists (ArtistDto) pour ensuite faire de la création d'objet avec les ajouts de readonly pour empêcher la modification des chansons de la bd.

```typescript
export default interface ArtistDto {
  readonly id: number;
  readonly name: string;
  readonly desc: string;
}

export default interface SongDto {
  readonly id: number;
  readonly fileName: string;
  readonly songName: string;
  readonly desc: string;
  readonly infosUrl: string;
  readonly artistId: number;
}
```

## SongInfos.vue

Très simple et facile à comprendre j'aime la simplicité! Rien à dire !

## Footer et Header

Bonne idée de faire des vues pour le Header et le Footer j'y avais pas pensé !

## SongPlayer.vue

Les erreurs, en général, sont très bien gérés ! Bonne utilisation du commentaire pour préciser la manière dont fonctionne le changement de chanson !

```md
<script setup lang="ts">
    //Si la chanson est changée, on change la source de l'élément audio
    watch(computed(function (): SongDto | undefined { return props.songData }), function (): void {
        audioElement.src = songSource.value
    })
</script>
```

Comme pour le `App.vue` j'aurais mis les fonctions dans les vue enfants respectives. Par exemple, l'état de l'audio (Play, Pause ou Stop) ou encore la duration et le currentTime qui est donné par le parent (`SongPlayer.vue`) à l'enfant (`SongPlayerTime.vue`).

```md
<script setup lang="ts">

const currentTime: Ref<number> = ref(audioElement.currentTime)
const duration: Ref<number> = ref(audioElement.duration)

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
</script>
<template>
    <div class="row p-2">
        <SongPlayerControls @play="handlePlayEvent()" @pause="handlePauseEvent()" @stop="handleStopEvent()"
            :playing="!audioElement.paused" :song-loaded="computed(() => songData !== undefined).value" />
        <SongPlayerTime :current-time="currentTime" :duration="duration" />
    </div>
</template>
```

J'aurais aussi utilisé plus de constantes pour les erreurs par exemple `"La chanson n'est pas en marche"` est répété plusieurs fois dans la vue

```md
<script setup lang="ts">
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
</script>
```



Sinon très bon code !

## SongPlayerControls.vue

Le bouton Stop devrait être affiché quand la musique est en pause. Hormis cette erreur (qui n'a jamais été précisé dans le tp >:( ) j'aime l'efficacité et la simplicité 🎉️ !

```md
<template>
    <button v-show="playing" id="btnStop" type="button" class="btn btn-primary" @click="emit('stop')">
        <i class="bi bi-stop-fill"></i> Stop
    </button>
</template>
```

## SongPlayerData.vue

Rien à dire ! Short and Sweet 🏮!

## SongPlayerTime.vue

Pour le formattage du temps, tu aurais pu faire une fonction commune aux deux au lieu de constantes bien que ça reste très clean !
Cependant je vais critiquer un peu l'indentation : Le return sort de l'écran pour les deux constantes. Cela pourrait être tout mis
à l'intérieur du cadre de l'écran.

```md

<script setup lang="ts">

    const formatedCurrentTime = computed(() => {
        return new Date((props.currentTime == undefined || isNaN(props.currentTime) ? 0 : props.currentTime) * 1000).toISOString().slice(14, 19)
    })

    const formatedDuration = computed(() => {
        return new Date((props.duration == undefined || isNaN(props.duration) ? 0 : props.duration) * 1000).toISOString().slice(14, 19)
    })

</script>

```

Sinon le reste reste très simple et facile à comprendre !

## SongList.vue

Bonne vérification pour éviter le changement de chanson sur une liste de chanson vide !
