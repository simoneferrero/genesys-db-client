import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import history from 'utils/history'

// Other reducers
import adversaries from './adversaries'
import archetypes from './archetypes'
import authentication from './authentication'
import careers from './careers'
import criticalInjuries from './criticalInjuries'
import factions from './factions'
import playersCharacters from './playersCharacters'
import skills from './skills'
import talents from './talents'
import ui from './ui'
import weapons from './weapons'

export default combineReducers({
  adversaries,
  archetypes,
  authentication,
  careers,
  criticalInjuries,
  factions,
  playersCharacters,
  router: connectRouter(history),
  skills,
  talents,
  ui,
  weapons,
})
