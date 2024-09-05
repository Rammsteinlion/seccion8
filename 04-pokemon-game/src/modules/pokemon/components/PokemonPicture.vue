<script setup lang="ts">
import {computed } from 'vue'

interface Props{
    pokemonId:number,
    showPokemon?:boolean
}

const props = withDefaults(defineProps<Props>(), {
    showPokemon: false
})

//propiedad computada
const pokemonImage = computed(
    () =>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
)
</script>

<template>
    <section>
        <img v-if="!showPokemon" :src="pokemonImage" 
        class="brightness-0 h-[200px] cursor-pointer select-none">
        <img v-else :src="pokemonImage" 
        class="fade-in h-[200px] cursor-pointer select-none">
    </section>
</template>

<style scoped>
img{
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
}
</style>
