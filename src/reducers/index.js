import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import history from 'utils/history'

// Other reducers
import statuses from './statuses'

export default combineReducers({
  router: connectRouter(history),
  statuses,
})
