import { combineReducers } from 'redux-immutable'

// UI reducers
import archetypes from './archetypes'
import authentication from './authentication'
import careers from './careers'
import criticalInjuries from './criticalInjuries'
import factions from './factions'
import favors from './favors'
import playersCharacters from './playersCharacters'
import skills from './skills'
import weapons from './weapons'

export default combineReducers({
  archetypes,
  authentication,
  careers,
  criticalInjuries,
  factions,
  favors,
  playersCharacters,
  skills,
  weapons,
})
