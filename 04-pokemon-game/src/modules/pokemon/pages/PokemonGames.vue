
<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue'
import { usePokemonGame } from '../composables/usePokemonGame'; 

const {gameStatus, isLoading,randomPokemon} = usePokemonGame();

</script>

<template>
    <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando pokémon</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5">Cual es este Pokemon?</h1>
        <h3>{{ randomPokemon }}</h3>
        <!---Pokemon Picture--->
        <pokemon-picture/>

        <!---Pokemon Options------>
        <pokemon-options/>
    </section>
</template>

<style scoped>

</style>
