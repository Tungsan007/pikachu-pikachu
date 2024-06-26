import { all, put, takeEvery, select } from 'redux-saga/effects'
import { pokeData } from '../data/data';
import { createPokemonSuccess, setSelectPokemon, shuffleSuccess, unSelectSuccess, updateSuccess } from '../redux/slice/pokemonSlice';

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
function* createPokemon() {
   const pokeArrayDefault = localStorage.getItem("pokeArray");

   if(!pokeArrayDefault) {
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
         yield put(createPokemonSuccess(B))
   } 
      
}

function* selectPokemon(action) {
   const state = yield select((state) => state)
   const newSelectArr = state.pokemon.pokeArray.map((row) => {
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
   yield put(setSelectPokemon(newSelectArr));
}

function* handleUpdate(action) {
   const state = yield select((state) => state)
   const updatedArray = state.pokemon.pokeArray.map((row) => {
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
    yield put(updateSuccess(updatedArray))
}

function* handleUnselect(action) {
   const state = yield select((state) => state)
   console.log(state.pokemon.pokeArray)
   const newUnSelect = state.pokemon.pokeArray.map((row) => {
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
   yield put(unSelectSuccess(newUnSelect))
}

function* handleShuffle() {
   const state = yield select((state) => state)
   const rootArr = [...state.pokemon.pokeArray];

      //lay arr 10*10 ben trong
      const insideArr = [];

      for (let i = 0; i < 10; i++) {
        insideArr[i] = new Array(10);
        for (let j = 0; j < 10; j++) {
          insideArr[i][j] = rootArr[i + 1][j + 1];
        }
      }
      //xao tron
      shuffleArr(insideArr);

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
      yield put(shuffleSuccess(finalArr))
}

////////////////////////////////////////////////////

function* watchCreatePokemon() {
   yield takeEvery('pokemon/createPokemon', createPokemon)
}

function* watchSetSelectPokemon() {
   yield takeEvery('pokemon/setSelect', selectPokemon)
}

function* watchUpdate() {
   yield takeEvery('pokemon/update', handleUpdate)
}


function* watchUnselect() {
   yield takeEvery('pokemon/unSelect', handleUnselect)
}

function* watchShuffle() {
   yield takeEvery('pokemon/shuffle', handleShuffle)
}


export function* pokemonSaga() {
   yield all([
      watchCreatePokemon(),
      watchSetSelectPokemon(),
      watchUpdate(),
      watchUnselect(),
      watchShuffle(),
   ])
}