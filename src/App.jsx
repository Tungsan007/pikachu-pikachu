import { useCallback, useEffect, useState } from "react";
import { pokeData } from "./data/data";
import { useSelector, useDispatch } from "react-redux";
import { create, setSelectPokemon, shuffle, unSelect, update } from "./redux/slice/pokemonSlice";
import { addSelectPokemon, removeSelectPokemon } from "./redux/slice/selectPokemonSlice";
import Algorithm from "./Algorithm/algorithm";
import ModalUI from "./antd/ModalUL";

function App() {
  const matrix = useSelector((state) => state.pokemon.pokeArray)
  const selectPokemon = useSelector((state) => state.selectPokemon.selectPokemon)
  const dispatch = useDispatch()
  const { checkPath, resetValidPath, latestPath, resetLatestPathHandler } = Algorithm()
  const [ reGame, setReGame ] = useState(false)

  //Ham xao tron 1 Array
  const shuffleArr = (array) => {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  };

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
  useEffect(() => {
    checkHandler();
  }, [selectPokemon, checkHandler]);

  useEffect(() => {
    const pokeArrayDefault = localStorage.getItem("pokeArray");

    if (!pokeArrayDefault) {
      const A = [];
      const B = [];

      const data = pokeData.concat(pokeData);
      shuffleArr(data);

      //tao 1 mang 10*10
      for (let i = 0; i < 10; i++) {
        let index = i * 10;
        A[i] = new Array(10);

        for (let j = 0; j < 10; j++) {
          A[i][j] = {
            row: i + 1,
            col: j + 1,
            status: 5,
            data: data[index + j],
          };
        }
      }

      //Tao 1 mang 12*12
      for (let i = 0; i < 12; i++) {
        B[i] = new Array(12);

        for (let j = 0; j < 12; j++) {
          B[i][j] = { row: i, col: j, status: 0, data: { id: "", img: "" } };
        }
      }

      //nap gia tri tu A vao B
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          B[i + 1][j + 1] = A[i][j];
        }
      }

      
      dispatch(create(B))
    } else {
      
      dispatch(create(JSON.parse(localStorage.getItem("pokeArray"))))
    }
  }, [reGame, dispatch]);
  
  function handleSelect(item) {
    dispatch(setSelectPokemon(item));
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
