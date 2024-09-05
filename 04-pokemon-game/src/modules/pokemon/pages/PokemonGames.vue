<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue'
import PokemonOptions from '../components/PokemonOptions.vue'
import { usePokemonGame } from '../composables/usePokemonGame'
import confetti from 'canvas-confetti'; 

const { gameStatus, isLoading, randomPokemon, GameStatus,pokemonsOptions:options, checkAnswer } = usePokemonGame()

const onSelectedOption = (value:number):void =>{
    
}
</script>

<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pokémon</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="mt-5">Cual es este Pokemon?</h1>
    <h3 class="capitalize">{{ gameStatus }}</h3>
    <!---Pokemon Picture--->
    <pokemon-picture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!---Pokemon Options------>
    <pokemon-options :options="options"  @selected-option="checkAnswer"/>
  </section>
</template>

<style scoped></style>
