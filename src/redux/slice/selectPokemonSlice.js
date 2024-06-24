import { createSlice } from '@reduxjs/toolkit'

const initStateSelectPokemon = {
   selectPokemon: [],
 };
export const selectPokemonSlice = createSlice({
   name: 'selectPokemon',
   initialState: initStateSelectPokemon,
   reducers: {
      addSelectPokemon: (state, action) => {
         const newSelect = state.selectPokemon.concat(action.payload);
         // console.log("chosen! >>>", newChosen);
         return { selectPokemon: newSelect };
      },
      removeSelectPokemon: (state) => {
         state.selectPokemon = [];
      }
   }
})

export const { addSelectPokemon, removeSelectPokemon } = selectPokemonSlice.actions
export default selectPokemonSlice.reducer