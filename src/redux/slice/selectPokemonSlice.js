import { createSlice } from '@reduxjs/toolkit'

const initStateSelectPokemon = {
   selectPokemon: [],
 };
export const selectPokemonSlice = createSlice({
   name: 'selectPokemon',
   initialState: initStateSelectPokemon,
   reducers: {
      addSelectPokemon: () => {
         //Trigger
      },
      addSelectPokemonSuccess: (state, action) => {
         state.selectPokemon = action.payload
      },
      removeSelectPokemon: (state) => {
         state.selectPokemon = [];
      }
   }
})

export const { addSelectPokemon, removeSelectPokemon, addSelectPokemonSuccess } = selectPokemonSlice.actions
export default selectPokemonSlice.reducer