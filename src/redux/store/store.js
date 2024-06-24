import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../slice/pokemonSlice'
import selectPokemonReducer from '../slice/selectPokemonSlice' 

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    selectPokemon: selectPokemonReducer
  },
})