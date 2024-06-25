import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from '../slice/pokemonSlice'
import selectPokemonReducer from '../slice/selectPokemonSlice' 
import createSagaMiddleware from 'redux-saga'
import { pokemonSaga } from '../../saga/pokemonSaga'
import { selectPokemonSaga } from '../../saga/selectPokemonSaga'

const saga = createSagaMiddleware()

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
    selectPokemon: selectPokemonReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
})

saga.run(pokemonSaga)
saga.run(selectPokemonSaga)