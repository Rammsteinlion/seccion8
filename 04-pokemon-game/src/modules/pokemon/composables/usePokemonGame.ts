import { GameStatus, type Pokemon, type PokemonListResponse } from '@/modules/pokemon/interfaces'
import { computed, onMounted, ref } from 'vue'
import { pokemonAPi } from '../api/pokemonAPi'
import confetti from 'canvas-confetti'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)

  const pokemons = ref<Pokemon[]>([])
  const pokemonsOptions = ref<Pokemon[]>([])

  const randomPokemon = computed(
    () => pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)],
  )

  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonAPi.get<PokemonListResponse>('/?limit=151')

    const pokemonArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2) ?? 0
      return {
        name: pokemon.name,
        id: +id,
      }
    })

    return pokemonArray.sort(() => Math.random() - 0.5)
  }

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing
    pokemonsOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id

    if (hasWon) {
      gameStatus.value = GameStatus.Won

      let duration = 15 * 1000 // 15 segundos en milisegundos
      let endTime = Date.now() + duration

      let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
      let intervalId = setInterval(function () {
        // Verifica si el tiempo actual ha superado el tiempo de finalización
        if (Date.now() > endTime) {
          clearInterval(intervalId) // Detiene el intervalo
          return
        }

        // Calcula el tiempo restante
        let timeLeft = endTime - Date.now()
        const particleCount = 50 * (timeLeft / duration)

        // Genera confeti en dos posiciones
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 1000)
    }
  }

  onMounted(async () => {
    // await new Promise((r) => setTimeout(r, 1500)); //dar tiempo a que cargue el listado de pokemones
    pokemons.value = await getPokemons()
    getNextOptions()
    console.log(pokemonsOptions.value)
  })

  return {
    gameStatus,
    GameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,

    checkAnswer,
    //methods
    getNextOptions,
  }
}
