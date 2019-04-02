import { fromJS } from 'immutable'

import {
  GET_PLAYER_CHARACTERS,
  GET_PLAYER_CHARACTERS_SUCCESS,
  GET_PLAYER_CHARACTERS_ERROR,
} from 'actions/playerCharacters/constants'

import uiRecord from 'reducers/ui/records'

export const initialState = uiRecord()
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PLAYER_CHARACTERS: {
      return uiRecord({
        loading: true,
      })
    }

    case GET_PLAYER_CHARACTERS_SUCCESS: {
      return uiRecord()
    }

    case GET_PLAYER_CHARACTERS_ERROR: {
      return uiRecord({
        error: fromJS(payload.error),
      })
    }

    default: {
      return state
    }
  }
}
