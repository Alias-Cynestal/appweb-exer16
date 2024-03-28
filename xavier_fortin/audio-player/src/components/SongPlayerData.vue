<script setup lang="ts">

defineProps({
    songName: String,
    artistName: String
})

</script>
<template>
    <div id="songPlayerDatas" class="col-12">
        <p id="songName" class="bg-secondary text-white p-2 border border-3 border-dark">
            {{ songName ? songName : "Nom de la chanson" }}
        </p>
        <p id="artistName" class="bg-secondary text-white p-2 border border-3 border-dark">
            {{ artistName ? artistName : "Nom de l'artiste" }}
        </p>
    </div>
</template>
<style scoped></style>