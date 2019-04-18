import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import history from 'utils/history'

// Other reducers
import archetypes from './archetypes'
import careers from './careers'
import factions from './factions'
import playersCharacters from './playersCharacters'
import skills from './skills'
import ui from './ui'

export default combineReducers({
  archetypes,
  careers,
  factions,
  playersCharacters,
  router: connectRouter(history),
  skills,
  ui,
})
