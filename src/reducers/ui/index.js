import { combineReducers } from 'redux-immutable'

// UI reducers
import archetypes from './archetypes'
import authentication from './authentication'
import careers from './careers'
import factions from './factions'
import favors from './favors'
import playersCharacters from './playersCharacters'
import skills from './skills'

export default combineReducers({
  archetypes,
  authentication,
  careers,
  factions,
  favors,
  playersCharacters,
  skills,
})
