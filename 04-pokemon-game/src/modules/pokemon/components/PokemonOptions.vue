
<script setup lang="ts">
import {onMounted} from 'vue';
import {type Pokemon } from "@/modules/pokemon/interfaces"

interface Props{
    options:Pokemon[];
}

defineProps<Props>();

defineEmits<{
    selectedOption: [id:number]
}>();

</script>

<template>
    <section class="mt-5 flex flex-col">
        <button v-for="{ name,id} in options" :key="id" class="capitalize" @click="$emit('selectedOption', id)">
            {{ name }}
        </button>
    </section>
</template>

<style scoped>
button{
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}
</style>
