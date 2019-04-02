import { combineReducers } from 'redux-immutable'

// UI reducers
import playerCharacters from './playerCharacters'

export default combineReducers({
  playerCharacters,
})
