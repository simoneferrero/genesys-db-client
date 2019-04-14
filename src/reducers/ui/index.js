import { combineReducers } from 'redux-immutable'

// UI reducers
import archetypes from './archetypes'
import careers from './careers'
import playersCharacters from './playersCharacters'
import skills from './skills'

export default combineReducers({
  archetypes,
  careers,
  playersCharacters,
  skills,
})
