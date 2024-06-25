import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unSelect, update } from "../redux/slice/pokemonSlice";
import { removeSelectPokemon } from "../redux/slice/selectPokemonSlice";
import Algorithm from "../Algorithm/algorithm";


const useCheckHandler = () => {
   const selectPokemon = useSelector((state) => state.selectPokemon.selectPokemon)
   const { checkPath, resetValidPath } = Algorithm()
   const matrix = useSelector((state) => state.pokemon.pokeArray)
   const dispatch = useDispatch()



   const checkHandler = useCallback(() => {
      if (selectPokemon.length === 2) {
        //kiem tra img co giong nhau?
        if (selectPokemon[0].data.img === selectPokemon[1].data.img) {
          //kiem tra tinh hop le cua duong di
          const isValid = checkPath(matrix, selectPokemon[0], selectPokemon[1]);
  
          if (isValid) {
            // console.log("duong di hop le");
            dispatch(update({ row: selectPokemon[0].row, col: selectPokemon[0].col }));
            dispatch(update({ row: selectPokemon[1].row, col: selectPokemon[1].col }));
            resetValidPath();
          } else {
            // console.log("duong di khong hop le");
            // console.log("bo chon");
            dispatch(unSelect(selectPokemon[0]));
            dispatch(unSelect(selectPokemon[1]));
          }
        } else {
          // img khong giong nhau
          // console.log("bo chon");
          dispatch(unSelect(selectPokemon[0]));
          dispatch(unSelect(selectPokemon[1]));
        }
  
        // Xoa cac chosen poke:
        dispatch(removeSelectPokemon());
      }
      // const isVali = useCheck(pokeChoose)
    }, [selectPokemon, dispatch, matrix, checkPath, resetValidPath]);

    return checkHandler;
}

export default useCheckHandler;