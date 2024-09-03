import axios from "axios";

const pokemonAPi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export  {pokemonAPi}