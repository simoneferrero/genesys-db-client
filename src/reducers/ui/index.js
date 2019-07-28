import { combineReducers } from 'redux-immutable'

// UI reducers
import adversaries from './adversaries'
import archetypes from './archetypes'
import authentication from './authentication'
import careers from './careers'
import criticalInjuries from './criticalInjuries'
import factions from './factions'
import favors from './favors'
import playersCharacters from './playersCharacters'
import skills from './skills'
import talents from './talents'
import weapons from './weapons'

export default combineReducers({
  adversaries,
  archetypes,
  authentication,
  careers,
  criticalInjuries,
  factions,
  favors,
  playersCharacters,
  skills,
  talents,
  weapons,
})
