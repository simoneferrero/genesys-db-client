import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import history from 'utils/history'

// Other reducers
import archetypes from './archetypes'
import careers from './careers'
import playersCharacters from './playersCharacters'
import ui from './ui'

export default combineReducers({
  archetypes,
  careers,
  playersCharacters,
  router: connectRouter(history),
  ui,
})
