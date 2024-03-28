<script setup lang="ts">
import ShortSongDto from './scripts/SongShortDto'
import SongDto from './scripts/SongDto'
import ArtistDto from './scripts/ArtistDto'
import { ref, Ref, onMounted } from 'vue'
import SongPlayer from './components/SongPlayer.vue';
import SongInfos from './components/SongInfos.vue';
import SongsList from './components/SongsList.vue';
import { SONGS, ARTISTS } from './scripts/dbConnection';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ErrorMessage from './components/ErrorMessage.vue'

const currentSong: Ref<SongDto> | Ref<undefined> = ref()
const currentArtist: Ref<ArtistDto> | Ref<undefined> = ref()
const showError: Ref<boolean> = ref(false)
const errorMessage: Ref<string> = ref("")
let currentSongIndex: number = -1

onMounted(() => {
    if (SONGS === undefined || ARTISTS === undefined) {
        handleErrorMessage("Les données n'ont pas bien été chargées, veuillez réessayer")
    }
})

function getSongsListData(): Array<ShortSongDto> {
    let songsListData: Array<ShortSongDto> = []
    SONGS?.forEach((song: SongDto) => {
        songsListData.push({ id: song.id, songName: song.songName })
    });
    return songsListData
}

function handleSongSelection(id: number): void {
    SONGS?.forEach((song: SongDto) => {
        if (song.id == id) {
            currentSong.value = song
            currentSongIndex = SONGS!.indexOf(song)
            getCurrentArtist()
        }
    });
}

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

function getCurrentArtist(): void {
    ARTISTS?.forEach((artist: ArtistDto) => {
        if (artist?.id == currentSong.value!.artistId) {
            currentArtist.value = artist
        }
    })
}

function handleErrorMessage(message: string): void {
    errorMessage.value = message 
    showError.value = true
    setTimeout(() => { showError.value = false }, 10000)
}

</script>

<template>
    <main>
        <Header site-title="Lecteur de musique J-Songs" />
        <Transition>
            <ErrorMessage v-if="showError" :message="errorMessage" />
        </Transition>
        <SongPlayer :song-data="currentSong" :artist-name="currentArtist?.name"
            @error="(message) => { handleErrorMessage(message) }" />
        <SongInfos :songDesc="currentSong?.desc" :artistDesc="currentArtist?.desc" />
        <SongsList :songShortDataList="getSongsListData()" @selectedSong="(id) => handleSongSelection(id)"
            @randomSong="handleRandomSong()" @previousSong="handlePreviousSong()" @nextSong="handleNextSong()" />
        <Footer copyright="Copyright Xavier Fortin" />
    </main>
</template>

<style scoped></style>