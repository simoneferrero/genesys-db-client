import { fromJS } from 'immutable'

import {
  GET_CRITICAL_INJURIES,
  GET_CRITICAL_INJURIES_SUCCESS,
  GET_CRITICAL_INJURIES_ERROR,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY_SUCCESS,
  ADD_PLAYER_CHARACTER_CRITICAL_INJURY_ERROR,
} from 'actions/criticalInjuries/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLAYER_CHARACTER_CRITICAL_INJURY:
    case GET_CRITICAL_INJURIES: {
      return uiRecord({
        loading: true,
      })
    }

    case ADD_PLAYER_CHARACTER_CRITICAL_INJURY_SUCCESS:
    case GET_CRITICAL_INJURIES_SUCCESS: {
      return uiRecord()
    }

    case ADD_PLAYER_CHARACTER_CRITICAL_INJURY_ERROR:
    case GET_CRITICAL_INJURIES_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
