import { all, call } from 'redux-saga/effects'

// Root sagas
import archetypesRootSaga from './archetypes'
import authenticationRootSaga from './authentication'
import careersRootSaga from './careers'
import factionsRootSaga from './factions'
import favorsRootSaga from './favors'
import playersCharactersRootSaga from './playersCharacters'
import skillsRootSaga from './skills'

// This is the main entrypoint from which all sagas are started
export default function* rootSaga() {
  yield all([
    call(archetypesRootSaga),
    call(authenticationRootSaga),
    call(careersRootSaga),
    call(factionsRootSaga),
    call(favorsRootSaga),
    call(playersCharactersRootSaga),
    call(skillsRootSaga),
  ])
}
