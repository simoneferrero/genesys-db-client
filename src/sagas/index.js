import { all, call } from 'redux-saga/effects'

// Root sagas
import playerCharactersRootSaga from './playerCharacters'

// This is the main entrypoint from which all sagas are started
export default function* rootSaga() {
  yield all([call(playerCharactersRootSaga)])
}
