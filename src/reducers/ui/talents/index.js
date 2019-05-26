import { fromJS } from 'immutable'

import {
  GET_TALENTS,
  GET_TALENTS_SUCCESS,
  GET_TALENTS_ERROR,
  ADD_TALENT,
  ADD_TALENT_SUCCESS,
  ADD_TALENT_ERROR,
  ADD_PLAYER_CHARACTER_TALENT,
  ADD_PLAYER_CHARACTER_TALENT_SUCCESS,
  ADD_PLAYER_CHARACTER_TALENT_ERROR,
} from 'actions/talents/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLAYER_CHARACTER_TALENT:
    case ADD_TALENT:
    case GET_TALENTS: {
      return uiRecord({
        loading: true,
      })
    }

    case ADD_PLAYER_CHARACTER_TALENT_SUCCESS:
    case ADD_TALENT_SUCCESS:
    case GET_TALENTS_SUCCESS: {
      return uiRecord()
    }

    case ADD_PLAYER_CHARACTER_TALENT_ERROR:
    case ADD_TALENT_ERROR:
    case GET_TALENTS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
