import { all, call } from 'redux-saga/effects'

// Root sagas
import adversariesRootSaga from './adversaries'
import archetypesRootSaga from './archetypes'
import authenticationRootSaga from './authentication'
import careersRootSaga from './careers'
import criticalInjuriesRootSaga from './criticalInjuries'
import factionsRootSaga from './factions'
import favorsRootSaga from './favors'
import playersCharactersRootSaga from './playersCharacters'
import skillsRootSaga from './skills'
import talentsRootSaga from './talents'
import weaponsRootSaga from './weapons'

// This is the main entrypoint from which all sagas are started
export default function* rootSaga() {
  yield all([
    call(adversariesRootSaga),
    call(archetypesRootSaga),
    call(authenticationRootSaga),
    call(careersRootSaga),
    call(criticalInjuriesRootSaga),
    call(factionsRootSaga),
    call(favorsRootSaga),
    call(playersCharactersRootSaga),
    call(skillsRootSaga),
    call(talentsRootSaga),
    call(weaponsRootSaga),
  ])
}
