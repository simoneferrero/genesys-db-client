import { all, call } from 'redux-saga/effects'

// Root sagas
import archetypesRootSaga from './archetypes'
import careersRootSaga from './careers'
import favorsRootSaga from './favors'
import playersCharactersRootSaga from './playersCharacters'
import skillsRootSaga from './skills'

// This is the main entrypoint from which all sagas are started
export default function* rootSaga() {
  yield all([
    call(archetypesRootSaga),
    call(careersRootSaga),
    call(favorsRootSaga),
    call(playersCharactersRootSaga),
    call(skillsRootSaga),
  ])
}
