import { all, put, takeEvery, select } from 'redux-saga/effects'
import { addSelectPokemonSuccess } from '../redux/slice/selectPokemonSlice';

function* addSelectPokemonGenerator(action) {
   const state = yield select((state) => state)
   const newSelect = state.selectPokemon.selectPokemon.concat(action.payload);
   yield put(addSelectPokemonSuccess(newSelect))
}

function* watchSelectPokemon() {
   yield takeEvery('selectPokemon/addSelectPokemon', addSelectPokemonGenerator)
}

export function* selectPokemonSaga() {
   yield all([
      watchSelectPokemon(),
   ])
}