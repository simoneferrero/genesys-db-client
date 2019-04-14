import { all, call } from 'redux-saga/effects'

// Root sagas
import archetypesRootSaga from './archetypes'
import careersRootSaga from './careers'
import playersCharactersRootSaga from './playersCharacters'
import skillsRootSaga from './skills'

// This is the main entrypoint from which all sagas are started
export default function* rootSaga() {
  yield all([
    call(archetypesRootSaga),
    call(careersRootSaga),
    call(playersCharactersRootSaga),
    call(skillsRootSaga),
  ])
}
