import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import history from 'utils/history'

// Other reducers
import playerCharacters from './playerCharacters'
import ui from './ui'

export default combineReducers({
  playerCharacters,
  router: connectRouter(history),
  ui,
})
