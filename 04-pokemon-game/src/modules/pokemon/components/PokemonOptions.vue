
<script setup lang="ts">
// import {onMounted} from 'vue';
// import {type Pokemon } from "@/modules/pokemon/interfaces"
// const props = defineProps<{
//     data: Pokemon[]
// }>()

</script>

<template>
    <section class="mt-5">
        <ul>
            <li>Pokémon 1</li>
            <li>Pokémon 2</li>
            <li>Pokémon 3</li>
            <li>Pokémon 4</li>
        </ul>
    </section>
</template>

<style scoped>
li{
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}
</style>
