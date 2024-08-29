
<script setup lang="ts">
import PokemonPicture from '@/modules/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/components/PokemonOptions.vue';
</script>

<template>
    <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokémon</h3>
    </section>

    <section class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5">Cual es este Pokemon?</h1>
        <!---Pokemon Picture--->
        <pokemon-picture/>

        <!---Pokemon Options------>
        <pokemon-options/>
    </section>
</template>

<style scoped>

</style>
