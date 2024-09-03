import { GameStatus, type Pokemon, type PokemonListResponse } from "@/modules/pokemon/interfaces"
import { computed, onMounted, ref } from "vue"
import { pokemonAPi } from "../api/pokemonAPi";

export  const usePokemonGame = () =>{

    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    
    const pokemons = ref<Pokemon[]>([]);
    const pokemonsOptions = ref<Pokemon[]>([]);

    const randomPokemon = computed(
        () => pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)],
    );

    const isLoading = computed(() => pokemons.value.length === 0);

    const getPokemons = async():Promise<Pokemon[]> =>{
        const response = await  pokemonAPi.get<PokemonListResponse>('/?limit=151');

        const pokemonArray:Pokemon[] = response.data.results.map( pokemon =>{
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return{
                name: pokemon.name,
                id: +id
            }
        });

        return pokemonArray.sort(()=>Math.random() -0.5);
    }

    const getNextOptions = (howMany:number =4) =>{
        gameStatus.value = GameStatus.Playing;
        pokemonsOptions.value = pokemons.value.slice(0,howMany);
        pokemons.value = pokemons.value.slice(howMany);
    }


    onMounted(async() =>{
        // await new Promise((r) => setTimeout(r, 1500)); //dar tiempo a que cargue el listado de pokemones
        pokemons.value = await getPokemons();
        getNextOptions();
        console.log(pokemonsOptions.value);
    })

    return {
        GameStatus,
        isLoading,
        pokemonsOptions,
        randomPokemon,

        //methods
        getNextOptions
    }
}