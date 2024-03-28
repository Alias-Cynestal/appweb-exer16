<script setup lang="ts">
defineProps({
    songDesc : {
        type : String,
        required : false
    },
    artistDesc : {
        type : String,
        required : false
    }
})

</script>
<template>
    <div id="songInfos" class="p-3">
      <div class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone">
        <div class="row">
          <div class="col">
            <h2>Informations de la chanson</h2>
            <p id="songDesc">{{songDesc}}</p>
            <p id="artistDesc">{{artistDesc}}</p>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>


</style>