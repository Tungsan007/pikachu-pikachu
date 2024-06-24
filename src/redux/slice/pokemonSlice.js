import { createSlice } from '@reduxjs/toolkit'

const pokeArrayDefault = localStorage.getItem("pokeArray")
  ? JSON.parse(localStorage.getItem("pokeArray"))
  : [];

  const shuffleArray = (array) => {
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
export const pokemonSlice = createSlice({
   name: 'pokemon',
   initialState: pokeArrayDefault,
   reducers: {
      create: (state, action) => {
         localStorage.setItem("pokeArray", JSON.stringify(action.payload));
         return { pokeArray: action.payload };
      },
      ///////////////////////////////
      setSelectPokemon: (state, action) => {
         const newSelectArr = state.pokeArray.map((row) => {
            return row.map((cell) => {
              if (
                cell.row === action.payload.row &&
                cell.col === action.payload.col
              ) {
                return { ...cell, status: 1 };
              }
              return cell;
            });
          });
         return { pokeArray: newSelectArr };
      },
      /////////////////////////////////////////
      update: (state, action) => {
        const updatedArray = state.pokeArray.map((row) => {
          return row.map((cell) => {
            if (
              cell.row === action.payload.row &&
              cell.col === action.payload.col
            ) {
              return { ...cell, status: 0 };
            }
            return cell;
          });
        });
        localStorage.setItem("pokeArray", JSON.stringify(updatedArray));
        return { pokeArray: updatedArray };
      },
      //////////////////////////////////////////////////////
      unSelect: (state, action) => {
        const newUnSelect = state.pokeArray.map((row) => {
          return row.map((cell) => {
            if (
              cell.row === action.payload.row &&
              cell.col === action.payload.col
            ) {
              return { ...cell, status: 5 };
            }
            return cell;
          });
        });
        
        return { pokeArray: newUnSelect };
      },
      /////////////////////////////////////////
      shuffle: (state) => {
        const rootArr = [...state.pokeArray];

      //lay arr 10*10 ben trong
      const insideArr = [];

      for (let i = 0; i < 10; i++) {
        insideArr[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
          insideArr[i][j] = rootArr[i + 1][j + 1];
        }
      }
      //xao tron
      shuffleArray(insideArr);

      //Tao 1 mang 12*12 de tao duong bao quanh insideArr
      const shuffleArr = [];
      for (let i = 0; i < 12; i++) {
        shuffleArr[i] = new Array(12);

        for (let j = 0; j < 12; j++) {
          shuffleArr[i][j] = {
            row: i,
            col: j,
            status: 0,
            data: { id: "", img: "" },
          };
        }
      }

      //nap gia tri tu A vao B
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          shuffleArr[i + 1][j + 1] = insideArr[i][j];
        }
      }

      //thay doi thuoc tinh row, col theo vi tri moi
      const finalArr = shuffleArr.map((row, index) => {
        return row.map((cell, i) => {
          return { ...cell, row: index, col: i };
        });
      });

      // console.log(finalArr);

      localStorage.setItem("pokeArray", JSON.stringify(finalArr));
      return { pokeArray: finalArr };
      }
   }
})

export const { create, setSelectPokemon, update, unSelect, shuffle } = pokemonSlice.actions
export default pokemonSlice.reducer