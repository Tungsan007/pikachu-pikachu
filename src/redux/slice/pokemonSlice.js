import { createSlice } from '@reduxjs/toolkit'

const pokeArrayDefault = localStorage.getItem("pokeArray")
  ? JSON.parse(localStorage.getItem("pokeArray"))
  : [];

export const pokemonSlice = createSlice({
   name: 'pokemon',
   initialState: {
      pokeArray: pokeArrayDefault,
      isLoading: false
   },
   reducers: {
      //CREATE
      createPokemon: (state) => {
        state.isLoading = true
      },
      createPokemonSuccess: (state, action) => {
        localStorage.setItem("pokeArray", JSON.stringify(action.payload));
        state.pokeArray = action.payload
        state.isLoading = false
      },
      createPokemonFailure: (state) => {
        state.isLoading = false
      },
      //SELECT
      setSelect: () => {
        //Trigger saga
      },
      setSelectPokemon: (state, action) => {
         state.pokeArray = action.payload
      },
      /////////////////////////////////////////
      update: () => {
        //Trigger update
      },
      updateSuccess: (state, action) => {
        localStorage.setItem("pokeArray", JSON.stringify(action.payload));
        state.pokeArray = action.payload
      },
      //////////////////////////////////////////////////////
      unSelect: () => {
        //Trigger unSelect
      },
      unSelectSuccess: (state, action) => {
        localStorage.setItem("pokeArray", JSON.stringify(action.payload));
        state.pokeArray = action.payload
      },
      /////////////////////////////////////////
      shuffle: () => {
        //Trigger shuffle
      },
      shuffleSuccess: (state, action) => {
        localStorage.setItem("pokeArray", JSON.stringify(action.payload));
        state.pokeArray = action.payload
      }
   }
})

export const { createPokemon, createPokemonFailure, createPokemonSuccess, setSelect, setSelectPokemon, update, updateSuccess, unSelect, unSelectSuccess, shuffle, shuffleSuccess } = pokemonSlice.actions
export default pokemonSlice.reducer