import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemon, setSelect, shuffle, unSelect, update } from "./redux/slice/pokemonSlice";
import { addSelectPokemon, removeSelectPokemon } from "./redux/slice/selectPokemonSlice";
import Algorithm from "./Algorithm/algorithm";
import ModalUI from "./antd/ModalUL";


function App() {
  const matrix = useSelector((state) => state.pokemon.pokeArray)
  const selectPokemon = useSelector((state) => state.selectPokemon.selectPokemon)
  const dispatch = useDispatch()
  const { latestPath, checkPath, resetValidPath,resetLatestPathHandler } = Algorithm()
  const [ reGame, setReGame ] = useState(false)
  
  const checkHandler = useCallback(() => {
    if (selectPokemon.length === 2) {
      //kiem tra img co giong nhau?
      if (selectPokemon[0].data.img === selectPokemon[1].data.img) {
        //kiem tra tinh hop le cua duong di
        const isValid = checkPath(matrix, selectPokemon[0], selectPokemon[1]);

        if (isValid) {
          console.log("duong di hop le");
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
  useEffect(() => {
    checkHandler();
  }, [selectPokemon, checkHandler]);

  useEffect(() => {
    const pokeArrayDefault = localStorage.getItem("pokeArray");

    if (!pokeArrayDefault) {
      dispatch(createPokemon())
    }
  }, [reGame, dispatch]);
  
  function handleSelect(item) {
    dispatch(setSelect(item));
    dispatch(addSelectPokemon([item]));
  }

  function handleReGame() {
    localStorage.removeItem('pokeArray');
    setReGame((pre) => !pre)
  }

  const shuffleHandler = () => {
    
    if (selectPokemon.length === 2) {
      dispatch(unSelect(selectPokemon[0]));
      dispatch(unSelect(selectPokemon[1]));
    }
    if (selectPokemon.length === 1) {
      dispatch(unSelect(selectPokemon[0]));
    }

    dispatch(removeSelectPokemon);

    //chay shuffle
    dispatch(shuffle());
  };
  // console.log(latestPath)
  const checkPathNode = (row, col) => {
    const filterArr = latestPath.filter((i) => i.row === row && i.col === col);
    //TH diem can xet co trong latestPath Array:
    if (filterArr.length > 0) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (latestPath.length > 0) {
      const timer = setTimeout(() => {
        resetLatestPathHandler();
      }, 800); 

      
      return () => clearTimeout(timer);
    }
  }, [latestPath, resetLatestPathHandler]);
  return (
    <>
      <div className="btn-container">
        <button onClick={handleReGame} className="btn btn-choilai">Chơi lại</button>
        <button onClick={shuffleHandler} className="btn">Trộn</button>
      </div>

      <div className="play-table">
        {matrix?.map((row, index) => (
          <div key={index} className="row-table">
            {row.map((item, i) => (
              <div key={i}
                className={`cell-table ${
                  checkPathNode(item.row, item.col) ? "path" : ""
                }`}
              >
              <img
                className={`item-img ${item.status === 0 ? "hidden" : ""} ${
                  item.status === 1 ? "chosen" : ""
                }`}
                
                src={item.data.img}
                alt=""
                onClick={() => {
                  handleSelect(item);
                }}
              />
              </div>
            ))}
          </div>
        ))}
      </div>
      <ModalUI />
    </>
  )
}

export default App
